import type { QualityGateResult, QualityCheck } from './types'

/**
 * Deterministik kalite kontrolü — LLM çağrısı yok.
 * Frontmatter, slug, kelime sayısı, başlık yapısı kontrol eder.
 */
export function runQualityGate(
  markdown: string,
  validCategories: string[],
  validTags: string[]
): QualityGateResult {
  const checks: QualityCheck[] = []

  // 1. Frontmatter var mı?
  const fmMatch = markdown.match(/^---\n([\s\S]*?)\n---/)
  checks.push({
    name: 'frontmatter_exists',
    passed: !!fmMatch,
    detail: fmMatch ? 'Frontmatter mevcut' : 'Frontmatter bulunamadı',
  })

  if (!fmMatch) {
    return { passed: false, checks }
  }

  const fm = fmMatch[1]
  const body = markdown.slice(fmMatch[0].length).trim()

  // 2. Required fields
  const requiredFields = ['title', 'slug', 'seoTitle', 'description']
  for (const field of requiredFields) {
    const hasField = new RegExp(`^${field}:`, 'm').test(fm)
    checks.push({
      name: `has_${field}`,
      passed: hasField,
      detail: hasField ? `${field} mevcut` : `${field} eksik`,
    })
  }

  // 3. Slug ASCII-only
  const slugMatch = fm.match(/^slug:\s*"?([^"\n]+)"?/m)
  if (slugMatch) {
    const slug = slugMatch[1].trim()
    const isAscii = /^[a-z0-9-]+$/.test(slug)
    checks.push({
      name: 'slug_ascii',
      passed: isAscii,
      detail: isAscii ? `Slug ASCII: ${slug}` : `Slug ASCII değil: ${slug}`,
    })
  }

  // 4. Description length
  const descMatch = fm.match(/^description:\s*"?([^"\n]+)"?/m)
  if (descMatch) {
    const desc = descMatch[1].trim()
    const len = desc.length
    const ok = len >= 120 && len <= 170
    checks.push({
      name: 'description_length',
      passed: ok,
      detail: `Description ${len} karakter (120-170 arası olmalı)`,
    })
  }

  // 5. Word count
  const wordCount = body.split(/\s+/).filter(Boolean).length
  const wordOk = wordCount >= 1200 // slightly lower threshold for quality gate
  checks.push({
    name: 'word_count',
    passed: wordOk,
    detail: `${wordCount} kelime (minimum 1200)`,
  })

  // 6. Has H2 headings
  const h2Count = (body.match(/^## /gm) || []).length
  checks.push({
    name: 'has_h2',
    passed: h2Count >= 2,
    detail: `${h2Count} adet H2 başlık (minimum 2)`,
  })

  // 7. Categories valid
  const catMatch = fm.match(/categories:\n((?:\s+-\s+.+\n?)+)/m)
  if (catMatch) {
    const cats = catMatch[1].match(/\s+-\s+(.+)/g)?.map((l) => l.replace(/\s+-\s+/, '').trim()) || []
    const allValid = cats.every((c) => validCategories.includes(c))
    checks.push({
      name: 'categories_valid',
      passed: allValid || validCategories.length === 0,
      detail: allValid ? 'Kategoriler geçerli' : `Geçersiz kategoriler: ${cats.filter((c) => !validCategories.includes(c)).join(', ')}`,
    })
  }

  // 8. Tags valid
  const tagMatch = fm.match(/tags:\n((?:\s+-\s+.+\n?)+)/m)
  if (tagMatch) {
    const tgs = tagMatch[1].match(/\s+-\s+(.+)/g)?.map((l) => l.replace(/\s+-\s+/, '').trim()) || []
    const allValid = tgs.every((t) => validTags.includes(t))
    checks.push({
      name: 'tags_valid',
      passed: allValid || validTags.length === 0,
      detail: allValid ? 'Etiketler geçerli' : `Geçersiz etiketler: ${tgs.filter((t) => !validTags.includes(t)).join(', ')}`,
    })
  }

  // 9. No forbidden HTML
  const forbidden = ['<table', '<iframe', '<script', '<style']
  const hasForbidden = forbidden.some((tag) => body.toLowerCase().includes(tag))
  checks.push({
    name: 'no_forbidden_html',
    passed: !hasForbidden,
    detail: hasForbidden ? 'Yasaklı HTML etiketleri bulundu' : 'Yasaklı HTML yok',
  })

  const passed = checks.every((c) => c.passed)
  return { passed, checks }
}
