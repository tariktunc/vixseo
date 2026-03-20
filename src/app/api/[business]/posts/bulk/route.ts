import { NextResponse } from 'next/server'

import type { BulkPostResult } from '@/types/post'
import { bulkPostsRequestSchema } from '@/types/post'
import { requirePermission } from '@/lib/auth'
import { createPost, publishPost } from '@/lib/blog'

type RouteParams = { params: Promise<{ business: string }> }

const DELAY_MS = 200

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const { business } = await params
    const body = await request.json()

    const parsed = bulkPostsRequestSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'Geçersiz veri'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { posts } = parsed.data
    const results: BulkPostResult[] = []
    let successCount = 0
    let failedCount = 0

    for (let i = 0; i < posts.length; i++) {
      const item = posts[i]

      try {
        const created = await createPost(business, {
          title: item.title,
          seoTitle: item.seoTitle,
          description: item.description,
          richContent: item.richContent,
          categoryIds: item.categoryIds,
          tagIds: item.tagIds,
          language: item.language,
        })

        // Yayınlama isteği varsa taslağı yayınla
        if (item.publish) {
          await publishPost(business, created.id)
        }

        results.push({
          title: item.title,
          status: 'success',
          postId: created.id,
        })
        successCount++
      } catch {
        results.push({
          title: item.title,
          status: 'error',
          error: 'Yazı oluşturulamadı',
        })
        failedCount++
      }

      // Rate limit koruması — son öğe hariç
      if (i < posts.length - 1) {
        await delay(DELAY_MS)
      }
    }

    return NextResponse.json({
      total: posts.length,
      success: successCount,
      failed: failedCount,
      results,
    })
  } catch {
    return NextResponse.json({ error: 'Toplu gönderim başarısız' }, { status: 500 })
  }
}
