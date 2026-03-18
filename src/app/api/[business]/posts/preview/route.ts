import { NextResponse } from 'next/server'
import { requireBusinessAccess } from '@/lib/auth'
import { markdownToWixNodes } from '@/lib/markdown-to-wix'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requireBusinessAccess(business)
    if (guard) return guard

    const body = await request.json()
    const { markdown } = body

    if (!markdown) {
      return NextResponse.json({ error: 'markdown gerekli' }, { status: 400 })
    }

    const nodes = markdownToWixNodes(markdown)

    return NextResponse.json({ nodes, nodeCount: nodes.length })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Preview oluşturulamadı'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
