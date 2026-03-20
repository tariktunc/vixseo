import { NextResponse } from 'next/server'
import { requirePermission } from '@/lib/auth'
import { createPost, updatePost, publishPost, deletePost } from '@/lib/blog'
import { createPostSchema, updatePostSchema } from '@/types/post'

type RouteParams = { params: Promise<{ business: string }> }

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const { business } = await params
    const body = await request.json()

    const parsed = createPostSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'Geçersiz veri'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const post = await createPost(business, parsed.data)

    // Yayınlama isteği varsa taslağı yayınla
    if (body.publish) {
      await publishPost(business, post.id)
    }

    return NextResponse.json(post, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Yazı oluşturulamadı' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const { business } = await params
    const body = await request.json()

    const { postId, ...fields } = body as { postId: string } & Record<string, unknown>
    if (!postId) {
      return NextResponse.json({ error: 'postId zorunludur' }, { status: 400 })
    }

    const parsed = updatePostSchema.safeParse(fields)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'Geçersiz veri'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const post = await updatePost(business, postId, parsed.data)
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Yazı güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const { business } = await params
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (!postId) {
      return NextResponse.json({ error: 'postId zorunludur' }, { status: 400 })
    }

    await deletePost(business, postId)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Yazı silinemedi' }, { status: 500 })
  }
}
