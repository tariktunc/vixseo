import { NextResponse } from 'next/server'
import { z } from 'zod/v4'

import type { BulkCollectionResult } from '@/types/post'
import { requirePermission } from '@/lib/auth'
import { createCollectionItem } from '@/lib/wix'

type RouteParams = { params: Promise<{ business: string }> }

const DELAY_MS = 200

const bulkCollectionRequestSchema = z.object({
  collectionId: z.string().min(1, 'collectionId zorunludur'),
  items: z.array(z.record(z.string(), z.unknown()))
    .min(1, 'En az bir öğe gereklidir')
    .max(50, 'Tek seferde en fazla 50 öğe'),
})

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const guard = await requirePermission('write:publish')
    if (guard) return guard

    const { business } = await params
    const body = await request.json()

    const parsed = bulkCollectionRequestSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'Geçersiz veri'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { collectionId, items } = parsed.data
    const results: BulkCollectionResult[] = []
    let successCount = 0
    let failedCount = 0

    for (let i = 0; i < items.length; i++) {
      const itemData = items[i]

      try {
        const created = await createCollectionItem(business, collectionId, itemData)
        results.push({
          status: 'success',
          itemId: created.id,
        })
        successCount++
      } catch {
        results.push({
          status: 'error',
          error: 'Öğe oluşturulamadı',
        })
        failedCount++
      }

      // Rate limit koruması — son öğe hariç
      if (i < items.length - 1) {
        await delay(DELAY_MS)
      }
    }

    return NextResponse.json({
      total: items.length,
      success: successCount,
      failed: failedCount,
      results,
    })
  } catch {
    return NextResponse.json({ error: 'Toplu gönderim başarısız' }, { status: 500 })
  }
}
