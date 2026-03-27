import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PageData = {
  title: string | null
  description: string | null
  viewport: boolean
  canonical: string | null
  statusCode: number
  contentLength: number
}

type MfiCheckResult = {
  url: string
  mobile: PageData
  desktop: PageData
  matches: {
    title: boolean
    description: boolean
    canonical: boolean
    viewport: boolean
  }
  score: number
  fetchedAt: string
}

// ---------------------------------------------------------------------------
// User Agents
// ---------------------------------------------------------------------------

const MOBILE_UA =
  'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'

const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

// ---------------------------------------------------------------------------
// Helpers — regex-based HTML parsing
// ---------------------------------------------------------------------------

function extractTag(html: string, regex: RegExp): string | null {
  const match = html.match(regex)
  return match?.[1]?.trim() || null
}

function parsePageData(html: string, statusCode: number): PageData {
  // <title>...</title>
  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i)

  // <meta name="description" content="...">
  const description =
    extractTag(
      html,
      /<meta\s+[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i,
    ) ??
    extractTag(
      html,
      /<meta\s+[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*\/?>/i,
    )

  // <meta name="viewport" ...>
  const viewportTag = html.match(
    /<meta\s+[^>]*name=["']viewport["'][^>]*\/?>/i,
  )
  const viewport = !!viewportTag

  // <link rel="canonical" href="...">
  const canonical =
    extractTag(
      html,
      /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["'][^>]*\/?>/i,
    ) ??
    extractTag(
      html,
      /<link\s+[^>]*href=["']([\s\S]*?)["'][^>]*rel=["']canonical["'][^>]*\/?>/i,
    )

  return {
    title,
    description,
    viewport,
    canonical,
    statusCode,
    contentLength: html.length,
  }
}

function calculateMfiScore(matches: MfiCheckResult['matches'], mobile: PageData): number {
  let score = 0
  const total = 5

  if (matches.title) score += 1
  if (matches.description) score += 1
  if (matches.canonical) score += 1
  if (matches.viewport) score += 1
  if (mobile.viewport) score += 1

  return Math.round((score / total) * 100)
}

// ---------------------------------------------------------------------------
// Fetch helper
// ---------------------------------------------------------------------------

async function fetchWithUA(url: string, userAgent: string): Promise<{ html: string; status: number }> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      'User-Agent': userAgent,
      Accept: 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  })

  clearTimeout(timeout)

  const html = await response.text()
  return { html, status: response.status }
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
      { error: 'Gecersiz istek formati' },
      { status: 400 },
    )
  }

  const rawUrl = body.url?.trim()

  if (!rawUrl) {
    return NextResponse.json(
      { error: 'URL alani zorunludur' },
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
      { error: 'Gecersiz URL formati' },
      { status: 400 },
    )
  }

  // Fetch with both user agents
  let mobileResult: { html: string; status: number }
  let desktopResult: { html: string; status: number }

  try {
    ;[mobileResult, desktopResult] = await Promise.all([
      fetchWithUA(validatedUrl.href, MOBILE_UA),
      fetchWithUA(validatedUrl.href, DESKTOP_UA),
    ])
  } catch {
    return NextResponse.json(
      { error: 'Site erisilemedi. Lutfen URL\'yi kontrol edin.' },
      { status: 422 },
    )
  }

  const mobile = parsePageData(mobileResult.html, mobileResult.status)
  const desktop = parsePageData(desktopResult.html, desktopResult.status)

  const matches = {
    title:
      (mobile.title ?? '') === (desktop.title ?? ''),
    description:
      (mobile.description ?? '') === (desktop.description ?? ''),
    canonical:
      (mobile.canonical ?? '') === (desktop.canonical ?? ''),
    viewport: mobile.viewport,
  }

  const score = calculateMfiScore(matches, mobile)

  const result: MfiCheckResult = {
    url: validatedUrl.href,
    mobile,
    desktop,
    matches,
    score,
    fetchedAt: new Date().toISOString(),
  }

  return NextResponse.json(result)
}
