import { NextResponse } from 'next/server'
import { queryPosts } from '@/lib/blog'
import { requireBusinessAccess, requirePermission } from '@/lib/auth'

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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const body = await request.json()
    const { title, slug, seoTitle, description, markdown, excerpt, categorySlugs, tagSlugs, imageUrl, imageAlt, language } = body

    if (!title || !slug || !markdown) {
      return NextResponse.json({ error: 'title, slug ve markdown gerekli' }, { status: 400 })
    }

    const { toAsciiSlug } = await import('@/lib/publisher')
    const asciiSlug = toAsciiSlug(slug)

    return NextResponse.json({
      status: 'draft',
      slug: asciiSlug,
      title,
      seoTitle,
      description,
      excerpt,
      categorySlugs,
      tagSlugs,
      imageUrl,
      imageAlt,
      language: language || 'tr',
      markdown,
    }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Post oluşturulamadı'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
