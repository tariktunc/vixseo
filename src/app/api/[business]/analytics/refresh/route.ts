import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses, scPages, scQueries, scDailyMetrics, scDevices, scCountries, scSearchTypes } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireBusinessAccess } from '@/lib/auth'
import { fetchAllDimensions } from '@/lib/gsc'

export async function POST(
  request: Request,
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

    if (!biz.searchConsoleUrl) {
      return NextResponse.json({ error: 'Search Console URL tanımlı değil' }, { status: 400 })
    }

    // Body'den opsiyonel parametreler
    let bodyParams: { startDate?: string; endDate?: string; searchType?: string } = {}
    try {
      const body = await request.json()
      bodyParams = body || {}
    } catch {
      // Body yoksa default parametreler kullanılır
    }

    const result = await fetchAllDimensions(biz.searchConsoleUrl, bodyParams)
    const { period } = result

    // Eski cache'i sil (paralel)
    await Promise.all([
      db.delete(scPages).where(eq(scPages.businessId, biz.id)),
      db.delete(scQueries).where(eq(scQueries.businessId, biz.id)),
      db.delete(scDailyMetrics).where(eq(scDailyMetrics.businessId, biz.id)),
      db.delete(scDevices).where(eq(scDevices.businessId, biz.id)),
      db.delete(scCountries).where(eq(scCountries.businessId, biz.id)),
      db.delete(scSearchTypes).where(eq(scSearchTypes.businessId, biz.id)),
    ])

    // Yeni veri ekle (paralel)
    const inserts: Promise<unknown>[] = []

    if (result.pages.length > 0) {
      inserts.push(
        db.insert(scPages).values(
          result.pages.map((r) => ({
            businessId: biz.id,
            url: r.url,
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position,
            periodStart: period.start,
            periodEnd: period.end,
          }))
        )
      )
    }

    if (result.queries.length > 0) {
      inserts.push(
        db.insert(scQueries).values(
          result.queries.map((r) => ({
            businessId: biz.id,
            query: r.query,
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position,
            periodStart: period.start,
            periodEnd: period.end,
          }))
        )
      )
    }

    if (result.dates.length > 0) {
      inserts.push(
        db.insert(scDailyMetrics).values(
          result.dates.map((r) => ({
            businessId: biz.id,
            date: r.date,
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position,
            searchType: result.searchType,
            periodStart: period.start,
            periodEnd: period.end,
          }))
        )
      )
    }

    if (result.devices.length > 0) {
      inserts.push(
        db.insert(scDevices).values(
          result.devices.map((r) => ({
            businessId: biz.id,
            device: r.device,
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position,
            periodStart: period.start,
            periodEnd: period.end,
          }))
        )
      )
    }

    if (result.countries.length > 0) {
      inserts.push(
        db.insert(scCountries).values(
          result.countries.map((r) => ({
            businessId: biz.id,
            country: r.country,
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position,
            periodStart: period.start,
            periodEnd: period.end,
          }))
        )
      )
    }

    if (result.searchTypes.length > 0) {
      inserts.push(
        db.insert(scSearchTypes).values(
          result.searchTypes.map((r) => ({
            businessId: biz.id,
            searchType: r.searchType,
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position,
            periodStart: period.start,
            periodEnd: period.end,
          }))
        )
      )
    }

    await Promise.all(inserts)

    return NextResponse.json({
      ok: true,
      pages: result.pages.length,
      queries: result.queries.length,
      dates: result.dates.length,
      devices: result.devices.length,
      countries: result.countries.length,
      searchTypes: result.searchTypes.length,
    })
  } catch (err) {
    console.error('[GSC refresh error]', err)
    return NextResponse.json({ error: 'Analytics yenilenemedi' }, { status: 500 })
  }
}
