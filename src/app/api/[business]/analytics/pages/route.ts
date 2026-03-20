import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { scPages, businesses } from '@/db/schema'
import { eq, like, desc, asc } from 'drizzle-orm'
import { requireBusinessAccess } from '@/lib/auth'

export async function GET(
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

    const url = new URL(request.url)
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
    const limit = Math.min(100, Number(url.searchParams.get('limit')) || 25)
    const filter = url.searchParams.get('filter') || ''
    const sort = url.searchParams.get('sort') || 'clicks'
    const order = url.searchParams.get('order') || 'desc'

    const offset = (page - 1) * limit

    const sortCol = sort === 'impressions' ? scPages.impressions
      : sort === 'ctr' ? scPages.ctr
      : sort === 'position' ? scPages.position
      : scPages.clicks

    const orderFn = order === 'asc' ? asc : desc

    let query = db
      .select()
      .from(scPages)
      .where(eq(scPages.businessId, biz.id))
      .$dynamic()

    if (filter) {
      query = query.where(like(scPages.url, `%${filter}%`))
    }

    const rows = await query
      .orderBy(orderFn(sortCol))
      .limit(limit)
      .offset(offset)

    const total = await db
      .select()
      .from(scPages)
      .where(eq(scPages.businessId, biz.id))

    return NextResponse.json({
      pages: rows.map((p) => ({
        url: p.url,
        clicks: p.clicks,
        impressions: p.impressions,
        ctr: p.ctr,
        position: p.position,
      })),
      total: total.length,
      page,
      limit,
      totalPages: Math.ceil(total.length / limit),
    })
  } catch {
    return NextResponse.json({ error: 'Sayfa verileri yüklenemedi' }, { status: 500 })
  }
}
