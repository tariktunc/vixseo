import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireBusinessAccess } from '@/lib/auth'
import { searchAndCache } from '@/lib/keywords'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requireBusinessAccess(business)
    if (guard) return guard

    const body = await request.json()
    const keywords: string[] = body.keywords

    if (!Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json({ error: 'keywords dizisi gerekli' }, { status: 400 })
    }

    if (keywords.length > 20) {
      return NextResponse.json({ error: 'Maksimum 20 keyword aranabilir' }, { status: 400 })
    }

    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    const results = await searchAndCache(biz.id, keywords)

    return NextResponse.json({ results })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Keyword araması başarısız'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
