import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses, sitemapEntries } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireBusinessAccess } from '@/lib/auth'
import { getSitemapStats } from '@/lib/sitemap'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requireBusinessAccess(business)
    if (guard) return guard

    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    const stats = await getSitemapStats(biz.id)
    const entries = await db
      .select()
      .from(sitemapEntries)
      .where(eq(sitemapEntries.businessId, biz.id))

    return NextResponse.json({
      stats,
      entries: entries.map((e) => ({
        url: e.url,
        slug: e.slug,
        lastmod: e.lastmod,
        priority: e.priority,
        section: e.section,
      })),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Sitemap yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
