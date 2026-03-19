import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { db } from '@/lib/db'
import { businesses, scPages, scQueries } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireBusinessAccess } from '@/lib/auth'

export async function POST(
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

    if (!biz.searchConsoleUrl) {
      return NextResponse.json({ error: 'Search Console URL tanımlı değil' }, { status: 400 })
    }

    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    if (!serviceAccountJson) {
      return NextResponse.json({ error: 'Google servis hesabı yapılandırılmamış' }, { status: 500 })
    }

    const credentials = JSON.parse(serviceAccountJson)

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    })

    const searchconsole = google.searchconsole({ version: 'v1', auth })

    // Son 28 gün (GSC'de ~3 günlük gecikme var)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() - 3)
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - 27)

    const periodStart = startDate.toISOString().split('T')[0]
    const periodEnd = endDate.toISOString().split('T')[0]

    const [pagesRes, queriesRes] = await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl: biz.searchConsoleUrl,
        requestBody: {
          startDate: periodStart,
          endDate: periodEnd,
          dimensions: ['page'],
          rowLimit: 500,
        },
      }),
      searchconsole.searchanalytics.query({
        siteUrl: biz.searchConsoleUrl,
        requestBody: {
          startDate: periodStart,
          endDate: periodEnd,
          dimensions: ['query'],
          rowLimit: 500,
        },
      }),
    ])

    const pagesRows = pagesRes.data.rows || []
    const queriesRows = queriesRes.data.rows || []

    // Eski cache sil
    await Promise.all([
      db.delete(scPages).where(eq(scPages.businessId, biz.id)),
      db.delete(scQueries).where(eq(scQueries.businessId, biz.id)),
    ])

    // Yeni veri ekle
    if (pagesRows.length > 0) {
      await db.insert(scPages).values(
        pagesRows.map((row) => ({
          businessId: biz.id,
          url: row.keys?.[0] || '',
          clicks: Math.round(row.clicks || 0),
          impressions: Math.round(row.impressions || 0),
          ctr: row.ctr || 0,
          position: row.position || 0,
          periodStart,
          periodEnd,
        }))
      )
    }

    if (queriesRows.length > 0) {
      await db.insert(scQueries).values(
        queriesRows.map((row) => ({
          businessId: biz.id,
          query: row.keys?.[0] || '',
          clicks: Math.round(row.clicks || 0),
          impressions: Math.round(row.impressions || 0),
          ctr: row.ctr || 0,
          position: row.position || 0,
          periodStart,
          periodEnd,
        }))
      )
    }

    return NextResponse.json({
      ok: true,
      pages: pagesRows.length,
      queries: queriesRows.length,
    })
  } catch {
    return NextResponse.json({ error: 'Analytics yenilenemedi' }, { status: 500 })
  }
}
