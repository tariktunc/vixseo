import { createWixClient, getSiteId } from './wix'
import { db } from '@/lib/db'
import { auditResults } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface WixPost {
  id: string
  slug: string
  title: string
  seoData?: {
    tags?: Array<{
      type: string
      children?: string
      props?: { name?: string; content?: string; property?: string }
    }>
    settings?: { keywords?: Array<{ term: string }> }
  }
}

interface AuditIssue {
  postSlug: string
  wixId: string
  field: string
  severity: 'kritik' | 'orta' | 'dusuk'
  detail: string
}

function extractSeoTags(post: WixPost) {
  const tags = post.seoData?.tags || []
  return {
    title: tags.find((t) => t.type === 'title')?.children || null,
    desc: tags.find((t) => t.type === 'meta' && t.props?.name === 'description')?.props?.content || null,
    ogTitle: tags.find((t) => t.type === 'meta' && t.props?.property === 'og:title')?.props?.content || null,
    ogDesc: tags.find((t) => t.type === 'meta' && t.props?.property === 'og:description')?.props?.content || null,
    ogImage: tags.find((t) => t.type === 'meta' && t.props?.property === 'og:image')?.props?.content || null,
    keywords: post.seoData?.settings?.keywords || [],
  }
}

function auditPost(post: WixPost): AuditIssue[] {
  const issues: AuditIssue[] = []
  const seo = extractSeoTags(post)

  if (!post.slug) {
    issues.push({ postSlug: post.slug || '', wixId: post.id, field: 'seoSlug', severity: 'kritik', detail: 'URL slug tanımlı değil' })
  }

  if (!seo.title) {
    issues.push({ postSlug: post.slug, wixId: post.id, field: 'seoTitle', severity: 'kritik', detail: 'seoData\'da title tag yok' })
  }

  if (!seo.desc) {
    issues.push({ postSlug: post.slug, wixId: post.id, field: 'seoDesc', severity: 'kritik', detail: 'seoData\'da description meta yok' })
  }

  if (!seo.ogTitle) {
    issues.push({ postSlug: post.slug, wixId: post.id, field: 'og:title', severity: 'orta', detail: 'og:title tanımlı değil' })
  }

  if (!seo.ogDesc) {
    issues.push({ postSlug: post.slug, wixId: post.id, field: 'og:description', severity: 'orta', detail: 'og:description tanımlı değil' })
  }

  if (!seo.ogImage) {
    issues.push({ postSlug: post.slug, wixId: post.id, field: 'og:image', severity: 'orta', detail: 'og:image tanımlı değil' })
  }

  if (seo.keywords.length === 0) {
    issues.push({ postSlug: post.slug, wixId: post.id, field: 'keywords', severity: 'dusuk', detail: 'SEO keyword tanımlı değil' })
  }

  return issues
}

export async function runAudit(businessName: string) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  // Tüm yazıları çek
  const allPosts: WixPost[] = []
  let offset = 0

  while (true) {
    const res = await wix<{ posts: WixPost[] }>('POST', '/blog/v3/posts/query', {
      query: { paging: { limit: 100, offset }, fieldsets: ['SEO'] },
    })
    if (res.status !== 200) throw new Error(`Wix posts query failed (${res.status})`)
    const posts = res.data.posts || []
    allPosts.push(...posts)
    if (posts.length < 100) break
    offset += posts.length
  }

  // Her yazıyı kontrol et
  const allIssues: AuditIssue[] = []
  for (const post of allPosts) {
    allIssues.push(...auditPost(post))
  }

  return {
    totalPosts: allPosts.length,
    postsWithIssues: new Set(allIssues.map((i) => i.postSlug)).size,
    issues: allIssues,
    summary: {
      kritik: allIssues.filter((i) => i.severity === 'kritik').length,
      orta: allIssues.filter((i) => i.severity === 'orta').length,
      dusuk: allIssues.filter((i) => i.severity === 'dusuk').length,
    },
  }
}

export async function cacheResults(businessId: string, issues: AuditIssue[]) {
  // Eski sonuçları sil
  await db.delete(auditResults).where(eq(auditResults.businessId, businessId))

  if (issues.length > 0) {
    const now = new Date()
    await db.insert(auditResults).values(
      issues.map((i) => ({
        businessId,
        postSlug: i.postSlug,
        wixId: i.wixId,
        field: i.field,
        severity: i.severity,
        detail: i.detail,
        auditedAt: now,
      }))
    )
  }
}

export async function getLastAudit(businessId: string) {
  const results = await db
    .select()
    .from(auditResults)
    .where(eq(auditResults.businessId, businessId))

  if (results.length === 0) return null

  return {
    auditedAt: results[0]?.auditedAt?.toISOString() || null,
    totalIssues: results.length,
    issues: results,
    summary: {
      kritik: results.filter((r) => r.severity === 'kritik').length,
      orta: results.filter((r) => r.severity === 'orta').length,
      dusuk: results.filter((r) => r.severity === 'dusuk').length,
    },
  }
}
