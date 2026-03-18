import { NextResponse } from 'next/server'
import { requirePermission } from '@/lib/auth'
import { deleteRedirect } from '@/lib/redirects'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ business: string; id: string }> }
) {
  try {
    const { id } = await params

    const guard = await requirePermission('write:redirects')
    if (guard) return guard

    await deleteRedirect(id)

    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Redirect silinemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
