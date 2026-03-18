import { NextResponse } from 'next/server'
import { requirePermission } from '@/lib/auth'
import { syncFromWix } from '@/lib/sync'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requirePermission('write:sync')
    if (guard) return guard

    const result = await syncFromWix(business)

    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Sync başarısız'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
