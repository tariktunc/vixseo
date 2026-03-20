import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { redirects, businesses } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { requirePermission, requireBusinessAccess } from '@/lib/auth'
import { createRedirectSchema, updateRedirectSchema, bulkImportSchema } from '@/types/redirect'

async function getBusinessId(businessName: string) {
  const [biz] = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(eq(businesses.name, businessName))
    .limit(1)
  return biz?.id
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const permGuard = await requirePermission('read:redirects')
    if (permGuard) return permGuard
    const accessGuard = await requireBusinessAccess(business)
    if (accessGuard) return accessGuard

    const businessId = await getBusinessId(business)
    if (!businessId) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    const rows = await db
      .select()
      .from(redirects)
      .where(eq(redirects.businessId, businessId))
      .orderBy(redirects.createdAt)

    return NextResponse.json(
      rows.map((r) => ({
        id: r.id,
        businessId: r.businessId,
        oldUrl: r.oldUrl,
        newUrl: r.newUrl,
        type: r.type,
        status: r.status,
        note: r.note,
        createdAt: r.createdAt?.toISOString() || null,
      }))
    )
  } catch {
    return NextResponse.json({ error: 'Redirect listesi yüklenemedi' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const permGuard = await requirePermission('write:redirects')
    if (permGuard) return permGuard
    const accessGuard = await requireBusinessAccess(business)
    if (accessGuard) return accessGuard

    const businessId = await getBusinessId(business)
    if (!businessId) {
      return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
    }

    const body = await request.json()

    // Toplu import mu?
    if (Array.isArray(body)) {
      const parsed = bulkImportSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json({ error: 'Geçersiz veri formatı' }, { status: 400 })
      }

      // Duplicate kontrolü
      const existing = await db
        .select({ oldUrl: redirects.oldUrl })
        .from(redirects)
        .where(eq(redirects.businessId, businessId))

      const existingUrls = new Set(existing.map((r) => r.oldUrl))
      const newItems = parsed.data.filter((r) => !existingUrls.has(r.oldUrl))

      if (newItems.length === 0) {
        return NextResponse.json({ error: 'Tüm redirect\'ler zaten mevcut' }, { status: 400 })
      }

      await db.insert(redirects).values(
        newItems.map((r) => ({
          businessId,
          oldUrl: r.oldUrl,
          newUrl: r.newUrl,
          type: r.type,
          note: r.note || null,
        }))
      )

      return NextResponse.json({ ok: true, imported: newItems.length, skipped: parsed.data.length - newItems.length }, { status: 201 })
    }

    // Tekil ekleme
    const parsed = createRedirectSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Geçersiz redirect verisi' }, { status: 400 })
    }

    // oldUrl === newUrl kontrolü
    if (parsed.data.oldUrl === parsed.data.newUrl) {
      return NextResponse.json({ error: 'Eski ve yeni URL aynı olamaz' }, { status: 400 })
    }

    // Duplicate kontrolü
    const [dup] = await db
      .select()
      .from(redirects)
      .where(and(eq(redirects.businessId, businessId), eq(redirects.oldUrl, parsed.data.oldUrl)))
      .limit(1)

    if (dup) {
      return NextResponse.json({ error: 'Bu eski URL için zaten bir redirect mevcut' }, { status: 400 })
    }

    // Döngüsel kontrol
    const [circular] = await db
      .select()
      .from(redirects)
      .where(and(eq(redirects.businessId, businessId), eq(redirects.oldUrl, parsed.data.newUrl)))
      .limit(1)

    if (circular) {
      return NextResponse.json({ error: 'Döngüsel redirect tespit edildi' }, { status: 400 })
    }

    const [created] = await db
      .insert(redirects)
      .values({
        businessId,
        oldUrl: parsed.data.oldUrl,
        newUrl: parsed.data.newUrl,
        type: parsed.data.type,
        note: parsed.data.note || null,
      })
      .returning()

    return NextResponse.json({
      id: created.id,
      businessId: created.businessId,
      oldUrl: created.oldUrl,
      newUrl: created.newUrl,
      type: created.type,
      status: created.status,
      note: created.note,
      createdAt: created.createdAt?.toISOString() || null,
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Redirect eklenemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const permGuard = await requirePermission('write:redirects')
    if (permGuard) return permGuard
    const accessGuard = await requireBusinessAccess(business)
    if (accessGuard) return accessGuard

    const body = await request.json()
    const parsed = updateRedirectSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Geçersiz güncelleme verisi' }, { status: 400 })
    }

    const { id, ...updates } = parsed.data

    const [updated] = await db
      .update(redirects)
      .set(updates)
      .where(eq(redirects.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json({ error: 'Redirect bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({
      id: updated.id,
      businessId: updated.businessId,
      oldUrl: updated.oldUrl,
      newUrl: updated.newUrl,
      type: updated.type,
      status: updated.status,
      note: updated.note,
      createdAt: updated.createdAt?.toISOString() || null,
    })
  } catch {
    return NextResponse.json({ error: 'Redirect güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  try {
    const { business } = await params

    const permGuard = await requirePermission('write:redirects')
    if (permGuard) return permGuard
    const accessGuard = await requireBusinessAccess(business)
    if (accessGuard) return accessGuard

    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID parametresi zorunlu' }, { status: 400 })
    }

    await db.delete(redirects).where(eq(redirects.id, id))

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Redirect silinemedi' }, { status: 500 })
  }
}
