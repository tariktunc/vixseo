import { db } from '@/lib/db'
import { redirects } from '@/db/schema'
import { eq } from 'drizzle-orm'

const TR_CHARS = /[ğşçıöüĞŞÇİÖÜ]/

export function toAsciiSlug(str: string): string {
  return str
    .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
    .replace(/ş/g, 's').replace(/Ş/g, 'S')
    .replace(/ç/g, 'c').replace(/Ç/g, 'C')
    .replace(/ı/g, 'i').replace(/İ/g, 'I')
    .replace(/ö/g, 'o').replace(/Ö/g, 'O')
    .replace(/ü/g, 'u').replace(/Ü/g, 'U')
}

export async function addRedirect(
  businessId: string,
  oldUrl: string,
  newUrl: string,
  note?: string
) {
  // Normalize
  let normalizedOld = oldUrl.startsWith('/') ? oldUrl : '/' + oldUrl
  let normalizedNew = newUrl.startsWith('/') || newUrl.startsWith('http') ? newUrl : '/' + newUrl

  // Türkçe karakter düzeltme
  let turkishFixed = false
  if (TR_CHARS.test(normalizedNew)) {
    normalizedNew = toAsciiSlug(normalizedNew)
    turkishFixed = true
  }

  // Duplicate kontrol
  const existing = await db
    .select()
    .from(redirects)
    .where(eq(redirects.businessId, businessId))

  const dup = existing.find((r) => r.oldUrl === normalizedOld)
  if (dup) {
    if (dup.newUrl === normalizedNew) {
      return { added: false, reason: 'Zaten mevcut', turkishFixed }
    }
    // Güncelle
    await db
      .update(redirects)
      .set({ newUrl: normalizedNew, note: note || dup.note })
      .where(eq(redirects.id, dup.id))
    return { added: false, updated: true, turkishFixed }
  }

  const [inserted] = await db
    .insert(redirects)
    .values({
      businessId,
      oldUrl: normalizedOld,
      newUrl: normalizedNew,
      type: '301',
      status: 'active',
      note: note || null,
    })
    .returning()

  return { added: true, id: inserted.id, turkishFixed }
}

interface ValidationIssue {
  id: string
  type: 'KRITIK' | 'UYARI'
  msg: string
}

export async function validateRedirects(businessId: string) {
  const rows = await listRedirects(businessId)
  const issues: ValidationIssue[] = []

  // Türkçe karakter kontrolleri
  for (const r of rows) {
    if (TR_CHARS.test(r.newUrl)) {
      issues.push({ id: r.id, type: 'KRITIK', msg: `Yeni URL'de Türkçe karakter: ${r.newUrl}` })
    }
    if (TR_CHARS.test(r.oldUrl)) {
      issues.push({ id: r.id, type: 'UYARI', msg: `Eski URL'de Türkçe karakter: ${r.oldUrl}` })
    }
  }

  // Zincir kontrolü
  const oldMap = new Map(rows.map((r) => [r.oldUrl, r.newUrl]))
  for (const r of rows) {
    if (oldMap.has(r.newUrl)) {
      issues.push({
        id: r.id,
        type: 'UYARI',
        msg: `Zincir: ${r.oldUrl} → ${r.newUrl} → ${oldMap.get(r.newUrl)}`,
      })
    }
  }

  // Döngü kontrolü
  for (const r of rows) {
    const target = rows.find((r2) => r2.oldUrl === r.newUrl && r2.newUrl === r.oldUrl)
    if (target) {
      issues.push({ id: r.id, type: 'KRITIK', msg: `Döngü: ${r.oldUrl} ↔ ${r.newUrl}` })
    }
  }

  return { total: rows.length, issues }
}

export async function listRedirects(businessId: string) {
  return db.select().from(redirects).where(eq(redirects.businessId, businessId))
}

export async function deleteRedirect(redirectId: string) {
  await db.delete(redirects).where(eq(redirects.id, redirectId))
}

export function exportCsv(rows: { oldUrl: string; newUrl: string; type: string | null; status: string | null; note: string | null }[]): string {
  const header = 'Eski URL,Yeni URL,Yönlendirme Türü,Yönlendirme Durumu,Notlar'
  const lines = rows.map((r) =>
    [r.oldUrl, r.newUrl, r.type || '301', r.status || 'active', r.note || ''].join(',')
  )
  return header + '\n' + lines.join('\n')
}
