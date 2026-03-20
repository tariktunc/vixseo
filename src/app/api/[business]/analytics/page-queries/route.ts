import { NextResponse } from 'next/server'

import { requireBusinessAccess } from '@/lib/auth'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { queryPageQueries } from '@/lib/gsc'

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

    if (!biz.searchConsoleUrl) {
      return NextResponse.json({ error: 'Search Console URL tanımlı değil' }, { status: 400 })
    }

    const { searchParams } = new URL(request.url)

    const result = await queryPageQueries(biz.searchConsoleUrl, {
      startDate: searchParams.get('startDate') ?? undefined,
      endDate: searchParams.get('endDate') ?? undefined,
      searchType: searchParams.get('searchType') ?? undefined,
      rowLimit: searchParams.get('rowLimit') ? Number(searchParams.get('rowLimit')) : undefined,
      pageFilter: searchParams.get('pageFilter') ?? undefined,
    })

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Sayfa-sorgu verileri yüklenemedi' }, { status: 500 })
  }
}
