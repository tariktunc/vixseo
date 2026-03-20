import { NextResponse } from 'next/server'

import { requirePermission } from '@/lib/auth'
import { listSites } from '@/lib/gsc'

export async function GET() {
  try {
    const guard = await requirePermission('admin:businesses')
    if (guard) return guard

    const sites = await listSites()

    return NextResponse.json(sites)
  } catch {
    return NextResponse.json({ error: 'Site listesi yüklenemedi' }, { status: 500 })
  }
}
