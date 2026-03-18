import { NextResponse } from 'next/server'
import { queryPosts } from '@/lib/blog'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params
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
