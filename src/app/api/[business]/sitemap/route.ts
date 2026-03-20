import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requirePermission, requireBusinessAccess } from '@/lib/auth'

type SitemapUrl = {
  loc: string
  lastmod: string | null
  changefreq: string | null
  priority: string | null
  section: string
}

function extractUrls(xml: string): SitemapUrl[] {
  const urls: SitemapUrl[] = []
  const urlBlocks = xml.match(/<url>([\s\S]*?)<\/url>/g)
  if (!urlBlocks) return urls

  for (const block of urlBlocks) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1] || ''
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] || null
    const changefreq = block.match(/<changefreq>(.*?)<\/changefreq>/)?.[1] || null
    const priority = block.match(/<priority>(.*?)<\/priority>/)?.[1] || null

    // URL'den section belirle
    let section = 'sayfa'
    const path = loc.replace(/https?:\/\/[^/]+/, '')
    if (path.includes('/post/') || path.includes('/blog/')) section = 'blog'
    else if (path.includes('/product')) section = 'urun'
    else if (path.includes('/categor') || path.includes('/kategori')) section = 'kategori'
    else if (path === '/' || path === '') section = 'anasayfa'

    urls.push({ loc, lastmod, changefreq, priority, section })
  }

  return urls
}

function extractSitemapIndex(xml: string): string[] {
  const locs: string[] = []
  const matches = xml.match(/<sitemap>([\s\S]*?)<\/sitemap>/g)
  if (!matches) return locs

  for (const block of matches) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
    if (loc) locs.push(loc)
  }

  return locs
}

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
      .select({ searchConsoleUrl: businesses.searchConsoleUrl })
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz || !biz.searchConsoleUrl) {
      return NextResponse.json(
        { error: 'Search Console URL tanımlı değil' },
        { status: 404 }
      )
    }

    const baseUrl = biz.searchConsoleUrl.replace(/\/$/, '')
    const sitemapUrl = `${baseUrl}/sitemap.xml`

    const res = await fetch(sitemapUrl, {
      headers: { 'User-Agent': 'VixSEO/1.0' },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Sitemap alınamadı (${res.status})` },
        { status: 502 }
      )
    }

    const xml = await res.text()
    let allUrls: SitemapUrl[] = []

    // Sitemap index mi yoksa doğrudan sitemap mi kontrol et
    if (xml.includes('<sitemapindex')) {
      const childSitemaps = extractSitemapIndex(xml)
      for (const childUrl of childSitemaps) {
        try {
          const childRes = await fetch(childUrl, {
            headers: { 'User-Agent': 'VixSEO/1.0' },
          })
          if (childRes.ok) {
            const childXml = await childRes.text()
            allUrls.push(...extractUrls(childXml))
          }
        } catch {
          // Alt sitemap hatasını yoksay, devam et
        }
      }
    } else {
      allUrls = extractUrls(xml)
    }

    // Section istatistikleri
    const sections: Record<string, number> = {}
    for (const u of allUrls) {
      sections[u.section] = (sections[u.section] || 0) + 1
    }

    return NextResponse.json({
      urls: allUrls,
      total: allUrls.length,
      sections,
      sitemapUrl,
      fetchedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json({ error: 'Sitemap işlenemedi' }, { status: 500 })
  }
}
