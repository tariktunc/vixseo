import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { keywordSearches, scQueries } from '@/db/schema'
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

    // GSC sorgu verilerini çek
    const queries = await db
      .select()
      .from(scQueries)
      .where(eq(scQueries.businessId, biz.id))
      .orderBy(desc(scQueries.clicks))
      .limit(200)

    // Google Ads keyword araştırma geçmişi
    const adKeywords = await db
      .select()
      .from(keywordSearches)
      .where(eq(keywordSearches.businessId, biz.id))
      .orderBy(desc(keywordSearches.searchedAt))
      .limit(50)

    return NextResponse.json({
      keywords: queries.map((q) => ({
        query: q.query,
        clicks: q.clicks,
        impressions: q.impressions,
        ctr: q.ctr,
        position: q.position,
        fetchedAt: q.fetchedAt?.toISOString(),
      })),
      adKeywords: adKeywords.map((k) => ({
        keyword: k.keyword,
        avgMonthly: k.avgMonthly,
        competition: k.competition,
        searchedAt: k.searchedAt?.toISOString(),
      })),
      total: queries.length,
      hasScData: queries.length > 0,
    })
  } catch {
    return NextResponse.json({ error: 'Anahtar kelimeler yüklenemedi' }, { status: 500 })
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
