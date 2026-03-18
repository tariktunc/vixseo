import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requirePermission } from '@/lib/auth'
import { validateRedirects } from '@/lib/redirects'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requirePermission('write:redirects')
    if (guard) return guard

    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    const result = await validateRedirects(biz.id)

    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Doğrulama başarısız'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
