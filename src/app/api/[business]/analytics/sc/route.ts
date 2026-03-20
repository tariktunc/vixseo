import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { scPages, scQueries, scDailyMetrics, scDevices, scCountries, scSearchTypes, businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { SC_CACHE_HOURS } from '@/lib/constants'
import { requireBusinessAccess } from '@/lib/auth'

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

    // Tüm tablolardan paralel oku
    const [pages, queries, daily, devices, countries, searchTypes] = await Promise.all([
      db.select().from(scPages).where(eq(scPages.businessId, biz.id)).orderBy(scPages.clicks),
      db.select().from(scQueries).where(eq(scQueries.businessId, biz.id)).orderBy(scQueries.clicks),
      db.select().from(scDailyMetrics).where(eq(scDailyMetrics.businessId, biz.id)).orderBy(scDailyMetrics.date),
      db.select().from(scDevices).where(eq(scDevices.businessId, biz.id)),
      db.select().from(scCountries).where(eq(scCountries.businessId, biz.id)).orderBy(scCountries.clicks),
      db.select().from(scSearchTypes).where(eq(scSearchTypes.businessId, biz.id)),
    ])

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
      dailyTrend: daily.map((d) => ({
        date: d.date,
        clicks: d.clicks,
        impressions: d.impressions,
        ctr: d.ctr,
        position: d.position,
      })),
      devices: devices.map((d) => ({
        device: d.device,
        clicks: d.clicks,
        impressions: d.impressions,
        ctr: d.ctr,
        position: d.position,
      })),
      countries: countries.reverse().map((c) => ({
        country: c.country,
        clicks: c.clicks,
        impressions: c.impressions,
        ctr: c.ctr,
        position: c.position,
      })),
      searchTypes: searchTypes.map((s) => ({
        searchType: s.searchType,
        clicks: s.clicks,
        impressions: s.impressions,
        ctr: s.ctr,
        position: s.position,
      })),
      fetchedAt,
      isStale,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analytics yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
