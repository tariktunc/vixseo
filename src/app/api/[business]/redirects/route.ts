import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireBusinessAccess, requirePermission } from '@/lib/auth'
import { listRedirects, addRedirect } from '@/lib/redirects'

export async function GET(
  _request: Request,
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

    const rows = await listRedirects(biz.id)

    return NextResponse.json({ redirects: rows })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Redirect listesi yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const guard = await requirePermission('write:redirects')
    if (guard) return guard

    const body = await request.json()
    const { oldUrl, newUrl, note } = body

    if (!oldUrl || !newUrl) {
      return NextResponse.json({ error: 'oldUrl ve newUrl gerekli' }, { status: 400 })
    }

    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.name, business))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    const result = await addRedirect(biz.id, oldUrl, newUrl, note)

    return NextResponse.json(result, { status: result.added ? 201 : 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Redirect eklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
