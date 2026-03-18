import { NextResponse } from 'next/server'
import { queryCategories, queryTags } from '@/lib/blog'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params
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
