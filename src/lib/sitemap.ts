import { db } from '@/lib/db'
import { sitemapEntries, businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'

// XML'den URL'leri çıkar
function parseSitemapIndex(xml: string): string[] {
  const urls: string[] = []
  const re = /<loc>\s*(https?:\/\/[^<]+)\s*<\/loc>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) {
    const loc = m[1].trim()
    if (loc.includes('sitemap') || loc.endsWith('.xml')) urls.push(loc)
  }
  return urls
}

function parseSitemap(xml: string) {
  const entries: { url: string; slug: string; lastmod: string | null; priority: number | null }[] = []
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/gi) || []

  for (const block of blocks) {
    const locMatch = block.match(/<loc>\s*(.*?)\s*<\/loc>/i)
    const lastmodMatch = block.match(/<lastmod>\s*(.*?)\s*<\/lastmod>/i)
    const prioMatch = block.match(/<priority>\s*(.*?)\s*<\/priority>/i)

    if (!locMatch) continue
    const loc = locMatch[1].trim()
    const slug = loc.replace(/\/$/, '').split('/').pop() || ''

    entries.push({
      url: loc,
      slug,
      lastmod: lastmodMatch ? lastmodMatch[1].trim() : null,
      priority: prioMatch ? parseFloat(prioMatch[1]) : null,
    })
  }
  return entries
}

function isSitemapIndex(xml: string): boolean {
  return xml.includes('<sitemapindex') || xml.includes('<sitemap>')
}

export async function fetchSitemap(domain: string) {
  const base = domain.startsWith('http') ? domain : `https://${domain}`
  const rootUrl = `${base}/sitemap.xml`

  const rootRes = await fetch(rootUrl, {
    headers: { 'User-Agent': 'VixSEO-sitemap/1.0' },
    redirect: 'follow',
  })
  if (!rootRes.ok) throw new Error(`Sitemap çekilemedi: HTTP ${rootRes.status}`)
  const rootXml = await rootRes.text()

  let allEntries: ReturnType<typeof parseSitemap> = []

  if (isSitemapIndex(rootXml)) {
    const childUrls = parseSitemapIndex(rootXml)
    for (const childUrl of childUrls) {
      try {
        const childRes = await fetch(childUrl, {
          headers: { 'User-Agent': 'VixSEO-sitemap/1.0' },
          redirect: 'follow',
        })
        if (!childRes.ok) continue
        const childXml = await childRes.text()
        allEntries = allEntries.concat(parseSitemap(childXml))
      } catch {
        // Alt sitemap hatası atlanır
      }
    }
  } else {
    allEntries = parseSitemap(rootXml)
  }

  return allEntries
}

export async function pullAndCache(businessId: string, domain: string) {
  const entries = await fetchSitemap(domain)
  const now = new Date()

  // Eski verileri sil
  await db.delete(sitemapEntries).where(eq(sitemapEntries.businessId, businessId))

  // Yeni verileri ekle
  if (entries.length > 0) {
    // Section: URL'nin ilk path segmenti
    await db.insert(sitemapEntries).values(
      entries.map((e) => {
        let section = 'root'
        try {
          const parts = new URL(e.url).pathname.split('/').filter(Boolean)
          section = parts[0] || 'root'
        } catch {
          // URL parse hatası
        }
        return {
          businessId,
          url: e.url,
          slug: e.slug,
          lastmod: e.lastmod,
          priority: e.priority,
          section,
          fetchedAt: now,
        }
      })
    )
  }

  return { totalUrls: entries.length, fetchedAt: now.toISOString() }
}

export async function checkSlugConflict(businessId: string, slug: string) {
  const entries = await db
    .select()
    .from(sitemapEntries)
    .where(eq(sitemapEntries.businessId, businessId))

  const match = entries.find(
    (e) => e.slug === slug || e.url.endsWith('/' + slug) || e.url.endsWith('/' + slug + '/')
  )

  if (match) {
    return { exists: true, url: match.url, lastmod: match.lastmod, source: 'sitemap' }
  }
  return { exists: false, url: null }
}

export async function getSitemapStats(businessId: string) {
  const entries = await db
    .select()
    .from(sitemapEntries)
    .where(eq(sitemapEntries.businessId, businessId))

  if (entries.length === 0) return null

  const groups: Record<string, number> = {}
  for (const entry of entries) {
    const section = entry.section || 'root'
    groups[section] = (groups[section] || 0) + 1
  }

  return {
    totalUrls: entries.length,
    fetchedAt: entries[0]?.fetchedAt?.toISOString() || null,
    groups,
  }
}
