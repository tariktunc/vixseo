import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { scPages, scQueries, businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requirePermission } from '@/lib/auth'
import { getTopPages, getTopQueries } from '@/lib/search-console'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requirePermission('write:sync')
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
      return NextResponse.json(
        { error: 'Bu işletme için Search Console URL tanımlı değil' },
        { status: 400 }
      )
    }

    // GSC'den veri çek
    const [pages, queries] = await Promise.all([
      getTopPages(biz.searchConsoleUrl, 90, 500),
      getTopQueries(biz.searchConsoleUrl, 90, 200),
    ])

    const now = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 90)
    const periodStart = startDate.toISOString().slice(0, 10)
    const periodEnd = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

    // Eski verileri sil
    await Promise.all([
      db.delete(scPages).where(eq(scPages.businessId, biz.id)),
      db.delete(scQueries).where(eq(scQueries.businessId, biz.id)),
    ])

    // Yeni verileri ekle
    if (pages.length > 0) {
      await db.insert(scPages).values(
        pages.map((p) => ({
          businessId: biz.id,
          url: p.page || '',
          clicks: p.clicks,
          impressions: p.impressions,
          ctr: p.ctr,
          position: p.position,
          periodStart,
          periodEnd,
          fetchedAt: now,
        }))
      )
    }

    if (queries.length > 0) {
      await db.insert(scQueries).values(
        queries.map((q) => ({
          businessId: biz.id,
          query: q.query || '',
          clicks: q.clicks,
          impressions: q.impressions,
          ctr: q.ctr,
          position: q.position,
          periodStart,
          periodEnd,
          fetchedAt: now,
        }))
      )
    }

    // SCOverview döndür
    const totals = {
      clicks: pages.reduce((s, p) => s + p.clicks, 0),
      impressions: pages.reduce((s, p) => s + p.impressions, 0),
      ctr: pages.length ? pages.reduce((s, p) => s + p.ctr, 0) / pages.length : 0,
      position: pages.length ? pages.reduce((s, p) => s + p.position, 0) / pages.length : 0,
      pages: pages.length,
    }

    return NextResponse.json({
      totals,
      period: { start: periodStart, end: periodEnd },
      pages: pages.map((p) => ({
        url: p.page,
        clicks: p.clicks,
        impressions: p.impressions,
        ctr: p.ctr,
        position: p.position,
      })),
      queries: queries.map((q) => ({
        query: q.query,
        clicks: q.clicks,
        impressions: q.impressions,
        ctr: q.ctr,
        position: q.position,
      })),
      fetchedAt: now.toISOString(),
      isStale: false,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analytics yenilenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
