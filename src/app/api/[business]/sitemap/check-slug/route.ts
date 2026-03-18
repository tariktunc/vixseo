import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireBusinessAccess } from '@/lib/auth'
import { checkSlugConflict } from '@/lib/sitemap'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requireBusinessAccess(business)
    if (guard) return guard

    const body = await request.json()
    const slug: string = body.slug

    if (!slug) {
      return NextResponse.json({ error: 'slug gerekli' }, { status: 400 })
    }

    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    const result = await checkSlugConflict(biz.id, slug)

    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Slug kontrol hatası'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
