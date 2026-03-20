import { NextResponse } from 'next/server'
import { queryPosts, queryCategories } from '@/lib/blog'
import { requireBusinessAccess } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requireBusinessAccess(business)
    if (guard) return guard

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    // Kategori listesi
    if (type === 'categories') {
      const categories = await queryCategories(business)
      return NextResponse.json({ categories })
    }

    const posts = await queryPosts(business)

    return NextResponse.json({
      posts,
      total: posts.length,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Yazılar yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
