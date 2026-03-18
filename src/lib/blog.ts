import { createWixClient, getSiteId } from './wix'
import type { PostMeta } from '@/types/post'

interface WixPost {
  id: string
  slug: string
  title: string
  seoData?: {
    tags?: Array<{
      type: string
      children?: string
      props?: { name?: string; content?: string }
    }>
  }
  categoryIds?: string[]
  tagIds?: string[]
  language?: string
  firstPublishedDate?: string
  lastPublishedDate?: string
  media?: {
    wixMedia?: { image?: { url?: string } }
  }
}

function extractSeo(post: WixPost) {
  const tags = post.seoData?.tags || []
  return {
    seoTitle: tags.find((t) => t.type === 'title')?.children?.trim() || null,
    description:
      tags.find((t) => t.type === 'meta' && t.props?.name === 'description')
        ?.props?.content?.trim() || null,
  }
}

function toPostMeta(post: WixPost): PostMeta {
  const seo = extractSeo(post)
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    seoTitle: seo.seoTitle,
    description: seo.description,
    categoryIds: post.categoryIds || [],
    tagIds: post.tagIds || [],
    language: post.language || 'tr',
    publishedAt: post.firstPublishedDate || null,
    updatedAt: post.lastPublishedDate || null,
    imageUrl: post.media?.wixMedia?.image?.url || null,
  }
}

export async function queryPosts(businessName: string): Promise<PostMeta[]> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const all: WixPost[] = []
  let offset = 0

  while (true) {
    const res = await wix<{ posts: WixPost[] }>('POST', '/blog/v3/posts/query', {
      query: {
        paging: { limit: 100, offset },
        fieldsets: ['SEO'],
      },
    })

    if (res.status !== 200) {
      throw new Error(`Wix posts query failed (${res.status})`)
    }

    const posts = res.data.posts || []
    all.push(...posts)
    if (posts.length < 100) break
    offset += posts.length
  }

  return all.map(toPostMeta)
}

export async function queryCategories(businessName: string) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ categories: Array<{ id: string; label: string; slug: string }> }>(
    'POST',
    '/blog/v3/categories/query',
    { query: { paging: { limit: 100 } } }
  )

  if (res.status !== 200) throw new Error(`Categories query failed (${res.status})`)
  return res.data.categories || []
}

export async function queryTags(businessName: string) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ tags: Array<{ id: string; label: string; slug: string }> }>(
    'POST',
    '/blog/v3/tags/query',
    { query: { paging: { limit: 100 } } }
  )

  if (res.status !== 200) throw new Error(`Tags query failed (${res.status})`)
  return res.data.tags || []
}
