import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requirePermission, getSessionAuth, canAccessBusiness } from '@/lib/auth'
import { DEFAULT_BUSINESSES } from '@/db/default-businesses'

async function ensureDefaultBusinesses() {
  const existing = await db.select({ name: businesses.name }).from(businesses)
  const existingNames = new Set(existing.map((b) => b.name))

  const missing = DEFAULT_BUSINESSES.filter((b) => !existingNames.has(b.name))
  if (missing.length === 0) return

  await db.insert(businesses).values([...missing]).onConflictDoNothing()
}

export async function GET() {
  try {
    const { role, metadata } = await getSessionAuth()

    // Varsayılan işletmeleri kontrol et ve yoksa oluştur
    await ensureDefaultBusinesses()

    const all = await db.select().from(businesses).orderBy(businesses.name)

    // Her işletme için env key durumunu kontrol et
    const withStatus = all.map((b) => ({
      ...b,
      wixKeyConfigured: !!process.env[`WIX_SITE_ID_${b.name.toUpperCase()}`],
      scKeyConfigured: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
      adsKeyConfigured: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    }))

    // Viewer → sadece kendi işletmeleri
    if (role === 'viewer') {
      const filtered = withStatus.filter((b) =>
        canAccessBusiness(metadata, b.name)
      )
      return NextResponse.json(filtered)
    }

    return NextResponse.json(withStatus)
  } catch {
    return NextResponse.json({ error: 'İşletmeler yüklenemedi' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const guard = await requirePermission('admin:businesses')
  if (guard) return guard

  try {
    const body = await request.json()
    const { name, domain, siteId, memberId, language, searchConsoleUrl } = body

    if (!name || !domain || !siteId) {
      return NextResponse.json({ error: 'name, domain ve siteId zorunlu' }, { status: 400 })
    }

    const [created] = await db
      .insert(businesses)
      .values({
        name: name.toLowerCase().replace(/[^a-z0-9-]/g, ''),
        domain,
        siteId,
        memberId,
        language: language || 'tr',
        searchConsoleUrl,
      })
      .returning()

    return NextResponse.json(created, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'İşletme eklenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const guard = await requirePermission('admin:businesses')
  if (guard) return guard

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id zorunlu' }, { status: 400 })
    }

    await db.delete(businesses).where(eq(businesses.id, id))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'İşletme silinemedi' }, { status: 500 })
  }
}
