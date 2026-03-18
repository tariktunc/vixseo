import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireBusinessAccess } from '@/lib/auth'
import { getCachedKeywords } from '@/lib/keywords'

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

    const keywords = await getCachedKeywords(biz.id)

    return NextResponse.json({ keywords })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Keyword verileri yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
