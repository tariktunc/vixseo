import { NextResponse } from 'next/server'

import { requireBusinessAccess } from '@/lib/auth'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { listSitemaps } from '@/lib/gsc'

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

    if (!biz.searchConsoleUrl) {
      return NextResponse.json({ error: 'Search Console URL tanımlı değil' }, { status: 400 })
    }

    const sitemaps = await listSitemaps(biz.searchConsoleUrl)

    return NextResponse.json(sitemaps)
  } catch {
    return NextResponse.json({ error: 'GSC sitemap durumu yüklenemedi' }, { status: 500 })
  }
}
