import { NextResponse } from 'next/server'

import type { GSCFilter } from '@/types/analytics'
import { requireBusinessAccess } from '@/lib/auth'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { queryGSC } from '@/lib/gsc'

type FilterRequestBody = {
  startDate?: string
  endDate?: string
  dimensions?: string[]
  searchType?: string
  rowLimit?: number
  filters?: GSCFilter[]
}

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

    const body = await request.json() as FilterRequestBody

    if (!body.startDate || !body.endDate) {
      return NextResponse.json({ error: 'startDate ve endDate zorunlu' }, { status: 400 })
    }

    if (!body.dimensions || body.dimensions.length === 0) {
      return NextResponse.json({ error: 'En az bir dimension gerekli' }, { status: 400 })
    }

    const dimensionFilterGroups = body.filters && body.filters.length > 0
      ? [{ groupType: 'and' as const, filters: body.filters }]
      : undefined

    const rows = await queryGSC({
      siteUrl: biz.searchConsoleUrl,
      startDate: body.startDate,
      endDate: body.endDate,
      dimensions: body.dimensions,
      searchType: body.searchType,
      rowLimit: body.rowLimit,
      dimensionFilterGroups,
    })

    return NextResponse.json({
      rows: rows.map((r) => ({
        keys: r.keys || [],
        clicks: Math.round(r.clicks || 0),
        impressions: Math.round(r.impressions || 0),
        ctr: r.ctr || 0,
        position: r.position || 0,
      })),
      period: { start: body.startDate, end: body.endDate },
    })
  } catch {
    return NextResponse.json({ error: 'Filtreli arama sorgusu başarısız' }, { status: 500 })
  }
}
