import { NextResponse } from 'next/server'
import { requirePermission } from '@/lib/auth'
import {
  createCollectionItem,
  updateCollectionItem,
  deleteCollectionItem,
} from '@/lib/wix'

type RouteParams = { params: Promise<{ business: string }> }

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const { business } = await params
    const body = await request.json()

    const { collectionId, data } = body as {
      collectionId: string
      data: Record<string, unknown>
    }

    if (!collectionId) {
      return NextResponse.json({ error: 'collectionId zorunludur' }, { status: 400 })
    }

    const item = await createCollectionItem(business, collectionId, data || {})
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Öğe oluşturulamadı' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const { business } = await params
    const body = await request.json()

    const { collectionId, itemId, data } = body as {
      collectionId: string
      itemId: string
      data: Record<string, unknown>
    }

    if (!collectionId || !itemId) {
      return NextResponse.json(
        { error: 'collectionId ve itemId zorunludur' },
        { status: 400 }
      )
    }

    const item = await updateCollectionItem(business, collectionId, itemId, data || {})
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: 'Öğe güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const { business } = await params
    const { searchParams } = new URL(request.url)
    const collectionId = searchParams.get('collectionId')
    const itemId = searchParams.get('itemId')

    if (!collectionId || !itemId) {
      return NextResponse.json(
        { error: 'collectionId ve itemId zorunludur' },
        { status: 400 }
      )
    }

    await deleteCollectionItem(business, collectionId, itemId)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Öğe silinemedi' }, { status: 500 })
  }
}
