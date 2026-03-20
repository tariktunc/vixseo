import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses, sitemapEntries } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requirePermission, requireBusinessAccess } from '@/lib/auth'
import { queryPosts } from '@/lib/blog'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const permGuard = await requirePermission('read:sitemap')
    if (permGuard) return permGuard
    const accessGuard = await requireBusinessAccess(business)
    if (accessGuard) return accessGuard

    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    // Sitemap URL'leri
    const entries = await db
      .select()
      .from(sitemapEntries)
      .where(eq(sitemapEntries.businessId, biz.id))

    // Blog yazıları
    let blogPosts: { slug: string; url: string }[] = []
    try {
      const posts = await queryPosts(business)
      blogPosts = posts.map((p: { slug: string }) => ({
        slug: p.slug || '',
        url: `${biz.searchConsoleUrl?.replace(/\/$/, '')}/post/${p.slug}`,
      }))
    } catch {
      // Wix API hatası durumunda boş devam et
    }

    const sitemapUrlSet = new Set(entries.map((e) => e.url))
    const blogUrlSet = new Set(blogPosts.map((p) => p.url))

    // Blog'da olup sitemap'te olmayan
    const missingInSitemap = blogPosts
      .filter((p) => !sitemapUrlSet.has(p.url))
      .map((p) => p.url)

    // Sitemap'te blog bölümünde olup Wix'te olmayan
    const blogEntries = entries.filter((e) => e.section === 'blog')
    const orphanUrls = blogEntries
      .filter((e) => !blogUrlSet.has(e.url))
      .map((e) => e.url)

    // 6 aydan eski lastmod'lar
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    const staleUrls = entries
      .filter((e) => {
        if (!e.lastmod) return true
        return new Date(e.lastmod) < sixMonthsAgo
      })
      .map((e) => ({
        id: e.id,
        url: e.url,
        slug: e.slug,
        lastmod: e.lastmod,
        priority: e.priority,
        section: e.section,
        status: e.status || 'unchanged',
        previousLastmod: e.previousLastmod,
        firstSeenAt: e.firstSeenAt?.toISOString() || null,
        fetchedAt: e.fetchedAt?.toISOString() || null,
      }))

    return NextResponse.json({
      missingInSitemap,
      orphanUrls,
      staleUrls,
      totalBlogPosts: blogPosts.length,
      totalSitemapUrls: entries.length,
    })
  } catch {
    return NextResponse.json({ error: 'Sağlık raporu oluşturulamadı' }, { status: 500 })
  }
}
