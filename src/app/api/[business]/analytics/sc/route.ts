import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { scPages, scQueries, businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { SC_CACHE_HOURS } from '@/lib/constants'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    // İşletmeyi bul
    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    // Cache'ten oku
    const pages = await db
      .select()
      .from(scPages)
      .where(eq(scPages.businessId, biz.id))
      .orderBy(scPages.clicks)

    const queries = await db
      .select()
      .from(scQueries)
      .where(eq(scQueries.businessId, biz.id))
      .orderBy(scQueries.clicks)

    if (pages.length === 0) {
      return NextResponse.json(null)
    }

    const fetchedAt = pages[0]?.fetchedAt?.toISOString() || null
    const isStale = fetchedAt
      ? Date.now() - new Date(fetchedAt).getTime() > SC_CACHE_HOURS * 60 * 60 * 1000
      : true

    const totals = {
      clicks: pages.reduce((s, p) => s + (p.clicks || 0), 0),
      impressions: pages.reduce((s, p) => s + (p.impressions || 0), 0),
      ctr: pages.length
        ? pages.reduce((s, p) => s + (p.ctr || 0), 0) / pages.length
        : 0,
      position: pages.length
        ? pages.reduce((s, p) => s + (p.position || 0), 0) / pages.length
        : 0,
      pages: pages.length,
    }

    return NextResponse.json({
      totals,
      period: {
        start: pages[0]?.periodStart || '',
        end: pages[0]?.periodEnd || '',
      },
      pages: pages.reverse().map((p) => ({
        url: p.url,
        clicks: p.clicks,
        impressions: p.impressions,
        ctr: p.ctr,
        position: p.position,
      })),
      queries: queries.reverse().map((q) => ({
        query: q.query,
        clicks: q.clicks,
        impressions: q.impressions,
        ctr: q.ctr,
        position: q.position,
      })),
      fetchedAt,
      isStale,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analytics yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
