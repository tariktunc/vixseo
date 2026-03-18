import { NextResponse } from 'next/server'
import { requirePermission } from '@/lib/auth'
import { publishFullPost } from '@/lib/publisher'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string; postId: string }> }
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

    const result = await publishFullPost(business, {
      title,
      slug,
      seoTitle: seoTitle || `${title} | ${business}`,
      description: description || '',
      markdown,
      excerpt,
      categorySlugs,
      tagSlugs,
      imageUrl,
      imageAlt,
      language,
    })

    return NextResponse.json({
      ok: true,
      draftId: result.draftId,
      slug: result.slug,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Wix\'e gönderilemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
