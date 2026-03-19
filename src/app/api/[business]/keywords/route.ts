import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { keywordSearches } from '@/db/schema'
import { businesses } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { requirePermission, requireBusinessAccess } from '@/lib/auth'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const permGuard = await requirePermission('read:keywords')
    if (permGuard) return permGuard

    const accessGuard = await requireBusinessAccess(business)
    if (accessGuard) return accessGuard

    // İşletmeyi bul
    const [biz] = await db
      .select({ id: businesses.id })
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    const keywords = await db
      .select()
      .from(keywordSearches)
      .where(eq(keywordSearches.businessId, biz.id))
      .orderBy(desc(keywordSearches.searchedAt))
      .limit(50)

    return NextResponse.json({
      keywords: keywords.map((k) => ({
        keyword: k.keyword,
        avgMonthly: k.avgMonthly,
        competition: k.competition,
        searchedAt: k.searchedAt?.toISOString(),
      })),
      total: keywords.length,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Anahtar kelimeler yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const permGuard = await requirePermission('read:keywords')
    if (permGuard) return permGuard

    const accessGuard = await requireBusinessAccess(business)
    if (accessGuard) return accessGuard

    const body = await request.json()
    if (!body.keyword || typeof body.keyword !== 'string') {
      return NextResponse.json({ error: 'keyword alanı zorunlu' }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Google Ads API onayı bekleniyor', pending: true },
      { status: 503 }
    )
  } catch {
    return NextResponse.json({ error: 'Anahtar kelime araması başarısız' }, { status: 500 })
  }
}
