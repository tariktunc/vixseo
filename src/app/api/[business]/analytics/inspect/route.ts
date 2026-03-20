import { NextResponse } from 'next/server'

import { requireBusinessAccess } from '@/lib/auth'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { inspectUrl } from '@/lib/gsc'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requireBusinessAccess(business)
    if (guard) return guard

    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    if (!biz.searchConsoleUrl) {
      return NextResponse.json({ error: 'Search Console URL tanımlı değil' }, { status: 400 })
    }

    const body = await request.json() as { url?: string }

    if (!body.url) {
      return NextResponse.json({ error: 'URL parametresi zorunlu' }, { status: 400 })
    }

    const result = await inspectUrl(biz.searchConsoleUrl, body.url)

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'URL inceleme işlemi başarısız' }, { status: 500 })
  }
}
