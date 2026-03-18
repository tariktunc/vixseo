import { NextResponse } from 'next/server'
import { requirePermission } from '@/lib/auth'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ business: string; postId: string }> }
) {
  try {
    const { business, postId } = await params

    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const body = await request.json()

    return NextResponse.json({
      ok: true,
      postId,
      business,
      updated: body,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Post güncellenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ business: string; postId: string }> }
) {
  try {
    const { postId } = await params

    const guard = await requirePermission('write:publish')
    if (guard) return guard

    return NextResponse.json({ ok: true, deleted: postId })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Post silinemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
