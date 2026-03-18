import { NextResponse } from 'next/server'
import { queryPosts } from '@/lib/blog'
import { requireBusinessAccess } from '@/lib/auth'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requireBusinessAccess(business)
    if (guard) return guard

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
