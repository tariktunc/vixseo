import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SeoAnalysisResult = {
  url: string
  title: string | null
  titleLength: number
  description: string | null
  descriptionLength: number
  ogImage: string | null
  ogTitle: string | null
  ogDescription: string | null
  canonical: string | null
  h1: string | null
  h1Count: number
  imgWithoutAlt: number
  fetchedAt: string
}

// ---------------------------------------------------------------------------
// Helpers — regex-based HTML parsing
// ---------------------------------------------------------------------------

function extractTag(html: string, regex: RegExp): string | null {
  const match = html.match(regex)
  return match?.[1]?.trim() || null
}

function countMatches(html: string, regex: RegExp): number {
  const matches = html.match(regex)
  return matches?.length ?? 0
}

function parseHtml(html: string, url: string): SeoAnalysisResult {
  // <title>...</title>
  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i)

  // <meta name="description" content="...">
  const description = extractTag(
    html,
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i,
  ) ?? extractTag(
    html,
    /<meta\s+[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*\/?>/i,
  )

  // <meta property="og:image" content="...">
  const ogImage = extractTag(
    html,
    /<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i,
  ) ?? extractTag(
    html,
    /<meta\s+[^>]*content=["']([\s\S]*?)["'][^>]*property=["']og:image["'][^>]*\/?>/i,
  )

  // <meta property="og:title" content="...">
  const ogTitle = extractTag(
    html,
    /<meta\s+[^>]*property=["']og:title["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i,
  ) ?? extractTag(
    html,
    /<meta\s+[^>]*content=["']([\s\S]*?)["'][^>]*property=["']og:title["'][^>]*\/?>/i,
  )

  // <meta property="og:description" content="...">
  const ogDescription = extractTag(
    html,
    /<meta\s+[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i,
  ) ?? extractTag(
    html,
    /<meta\s+[^>]*content=["']([\s\S]*?)["'][^>]*property=["']og:description["'][^>]*\/?>/i,
  )

  // <link rel="canonical" href="...">
  const canonical = extractTag(
    html,
    /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["'][^>]*\/?>/i,
  ) ?? extractTag(
    html,
    /<link\s+[^>]*href=["']([\s\S]*?)["'][^>]*rel=["']canonical["'][^>]*\/?>/i,
  )

  // First <h1> content
  const h1 = extractTag(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)

  // Total <h1> count
  const h1Count = countMatches(html, /<h1[\s>]/gi)

  // <img> tags without alt attribute
  const allImages = html.match(/<img\s[^>]*>/gi) ?? []
  const imgWithoutAlt = allImages.filter(
    (tag) => !tag.match(/\balt\s*=\s*["'][^"']+["']/i),
  ).length

  return {
    url,
    title,
    titleLength: title?.length ?? 0,
    description,
    descriptionLength: description?.length ?? 0,
    ogImage,
    ogTitle,
    ogDescription,
    canonical,
    h1: h1 ? h1.replace(/<[^>]*>/g, '').trim() : null,
    h1Count,
    imgWithoutAlt,
    fetchedAt: new Date().toISOString(),
  }
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  let body: { url?: string }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Geçersiz istek formatı' },
      { status: 400 },
    )
  }

  const rawUrl = body.url?.trim()

  if (!rawUrl) {
    return NextResponse.json(
      { error: 'URL alanı zorunludur' },
      { status: 400 },
    )
  }

  // Validate URL
  let validatedUrl: URL
  try {
    validatedUrl = new URL(
      rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`,
    )
  } catch {
    return NextResponse.json(
      { error: 'Geçersiz URL formatı' },
      { status: 400 },
    )
  }

  // Fetch HTML
  let html: string
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    const response = await fetch(validatedUrl.href, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; VixSEO Bot/1.0; +https://vixseo.com)',
        Accept: 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    })

    clearTimeout(timeout)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Site ${response.status} hatası döndürdü` },
        { status: 422 },
      )
    }

    html = await response.text()
  } catch {
    return NextResponse.json(
      { error: 'Site erişilemedi' },
      { status: 422 },
    )
  }

  const result = parseHtml(html, validatedUrl.href)

  return NextResponse.json(result)
}
