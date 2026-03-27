import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type KeywordCheck = {
  inTitle: boolean
  inH1: boolean
  inDescription: boolean
  inUrl: boolean
  density: number
  titlePosition: 'beginning' | 'middle' | 'end' | 'not-found'
}

type SiraBulucuResult = {
  url: string
  keyword: string
  device: 'desktop' | 'mobile'
  checks: KeywordCheck
  relevanceScore: number
  suggestions: string[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractTag(html: string, regex: RegExp): string | null {
  const match = html.match(regex)
  return match?.[1]?.trim() || null
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function getBodyText(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyContent = bodyMatch?.[1] ?? html

  return bodyContent
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function calculateDensity(bodyText: string, keyword: string): number {
  const words = bodyText.split(/\s+/)
  if (words.length === 0) return 0

  const keywordLower = keyword.toLowerCase()
  const keywordWords = keywordLower.split(/\s+/)

  let occurrences = 0
  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const slice = words.slice(i, i + keywordWords.length).join(' ')
    if (slice === keywordLower) {
      occurrences++
    }
  }

  // Kelime yoğunluğu: (anahtar kelime tekrar * kelime sayisi) / toplam kelime * 100
  return Math.round((occurrences * keywordWords.length / words.length) * 10000) / 100
}

function getTitlePosition(title: string, keyword: string): 'beginning' | 'middle' | 'end' | 'not-found' {
  const titleLower = title.toLowerCase()
  const keywordLower = keyword.toLowerCase()
  const index = titleLower.indexOf(keywordLower)

  if (index === -1) return 'not-found'

  const ratio = index / titleLower.length
  if (ratio <= 0.2) return 'beginning'
  if (ratio >= 0.6) return 'end'
  return 'middle'
}

function calculateRelevanceScore(checks: KeywordCheck): number {
  let score = 0

  // Title'da varsa (30 puan)
  if (checks.inTitle) {
    score += 30
    // Title basinda ise bonus
    if (checks.titlePosition === 'beginning') score += 10
    else if (checks.titlePosition === 'middle') score += 5
  }

  // H1'de varsa (20 puan)
  if (checks.inH1) score += 20

  // Description'da varsa (15 puan)
  if (checks.inDescription) score += 15

  // URL'de varsa (10 puan)
  if (checks.inUrl) score += 10

  // Keyword density puani (0-15 arasi)
  if (checks.density > 0) {
    if (checks.density >= 0.5 && checks.density <= 2.5) {
      score += 15 // Ideal aralik
    } else if (checks.density > 0 && checks.density < 0.5) {
      score += 8 // Dusuk ama var
    } else if (checks.density > 2.5) {
      score += 5 // Cok yuksek - keyword stuffing riski
    }
  }

  return Math.min(100, score)
}

function generateSuggestions(checks: KeywordCheck, keyword: string): string[] {
  const suggestions: string[] = []

  if (!checks.inTitle) {
    suggestions.push(`"${keyword}" anahtar kelimesini sayfa basliginiza (title) ekleyin.`)
  } else if (checks.titlePosition !== 'beginning') {
    suggestions.push(`"${keyword}" anahtar kelimesini basligin basina tasiyarak onem derecesini artirin.`)
  }

  if (!checks.inH1) {
    suggestions.push(`"${keyword}" anahtar kelimesini ana basliginiza (H1) ekleyin.`)
  }

  if (!checks.inDescription) {
    suggestions.push(`"${keyword}" anahtar kelimesini meta description alaniniza ekleyin.`)
  }

  if (!checks.inUrl) {
    suggestions.push(`URL yapinizda "${keyword}" anahtar kelimesini kullanmayi deneyin.`)
  }

  if (checks.density === 0) {
    suggestions.push(`Sayfa iceriginizde "${keyword}" anahtar kelimesini dogal bir sekilde kullanin.`)
  } else if (checks.density < 0.5) {
    suggestions.push(`Anahtar kelime yogunlugu dusuk (%${checks.density}). Icerikte daha fazla kullanim eklemeyi deneyin.`)
  } else if (checks.density > 2.5) {
    suggestions.push(`Anahtar kelime yogunlugu yuksek (%${checks.density}). Asiri kullanim arama motorlari tarafindan olumsuz degerlendirilir.`)
  }

  if (suggestions.length === 0) {
    suggestions.push('Sayfaniz bu anahtar kelime icin iyi optimize edilmis gorunuyor.')
  }

  return suggestions
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  let body: { url?: string; keyword?: string; device?: string }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Gecersiz istek formati' },
      { status: 400 },
    )
  }

  const rawUrl = body.url?.trim()
  const keyword = body.keyword?.trim()
  const device = body.device === 'mobile' ? 'mobile' : 'desktop' as const

  if (!rawUrl) {
    return NextResponse.json(
      { error: 'URL alani zorunludur' },
      { status: 400 },
    )
  }

  if (!keyword) {
    return NextResponse.json(
      { error: 'Anahtar kelime alani zorunludur' },
      { status: 400 },
    )
  }

  // URL dogrulama
  let validatedUrl: URL
  try {
    validatedUrl = new URL(
      rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`,
    )
  } catch {
    return NextResponse.json(
      { error: 'Gecersiz URL formati' },
      { status: 400 },
    )
  }

  // HTML cek
  let html: string
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)

    const userAgent = device === 'mobile'
      ? 'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

    const response = await fetch(validatedUrl.href, {
      signal: controller.signal,
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    })

    clearTimeout(timeout)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Site ${response.status} hatasi dondurdu` },
        { status: 422 },
      )
    }

    html = await response.text()
  } catch {
    return NextResponse.json(
      { error: 'Siteye erisilemedi veya zaman asimi olustu' },
      { status: 422 },
    )
  }

  const keywordLower = keyword.toLowerCase()

  // Title kontrolu
  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i) ?? ''
  const titleText = stripHtml(title).toLowerCase()
  const inTitle = titleText.includes(keywordLower)
  const titlePosition = inTitle ? getTitlePosition(titleText, keywordLower) : 'not-found' as const

  // H1 kontrolu
  const h1Raw = extractTag(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) ?? ''
  const h1Text = stripHtml(h1Raw).toLowerCase()
  const inH1 = h1Text.includes(keywordLower)

  // Meta description kontrolu
  const description = html.match(
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i,
  )?.[1] ?? html.match(
    /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*\/?>/i,
  )?.[1] ?? ''
  const inDescription = description.toLowerCase().includes(keywordLower)

  // URL kontrolu
  const urlPath = validatedUrl.pathname.toLowerCase() + validatedUrl.search.toLowerCase()
  const inUrl = urlPath.includes(keywordLower.replace(/\s+/g, '-')) || urlPath.includes(keywordLower.replace(/\s+/g, '_'))

  // Keyword density
  const bodyText = getBodyText(html)
  const density = calculateDensity(bodyText, keyword)

  const checks: KeywordCheck = {
    inTitle,
    inH1,
    inDescription,
    inUrl,
    density,
    titlePosition,
  }

  const relevanceScore = calculateRelevanceScore(checks)
  const suggestions = generateSuggestions(checks, keyword)

  const result: SiraBulucuResult = {
    url: validatedUrl.href,
    keyword,
    device,
    checks,
    relevanceScore,
    suggestions,
  }

  return NextResponse.json(result)
}
