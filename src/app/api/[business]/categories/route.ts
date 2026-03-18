import { NextResponse } from 'next/server'
import { queryCategories, queryTags } from '@/lib/blog'
import { requireBusinessAccess } from '@/lib/auth'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requireBusinessAccess(business)
    if (guard) return guard

    const [categories, tags] = await Promise.all([
      queryCategories(business),
      queryTags(business),
    ])

    return NextResponse.json({ categories, tags })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Kategoriler yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
