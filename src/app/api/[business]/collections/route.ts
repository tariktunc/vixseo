import { NextResponse } from 'next/server'
import { requireBusinessAccess } from '@/lib/auth'
import { queryCollections, queryCollectionItems } from '@/lib/wix'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const accessGuard = await requireBusinessAccess(business)
    if (accessGuard) return accessGuard

    const { searchParams } = new URL(request.url)
    const collectionId = searchParams.get('collectionId')

    // Belirli koleksiyonun öğelerini getir
    if (collectionId) {
      const result = await queryCollectionItems(business, collectionId)
      return NextResponse.json(result)
    }

    // Koleksiyon listesi
    const collections = await queryCollections(business)
    return NextResponse.json({ collections })
  } catch {
    return NextResponse.json({ error: 'CMS verileri yüklenemedi' }, { status: 500 })
  }
}
