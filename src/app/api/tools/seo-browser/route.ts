import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MetaTag = {
  name: string | null
  content: string | null
  property: string | null
}

type HeadingInfo = {
  tag: string
  text: string
}

type SeoBrowserResult = {
  url: string
  statusCode: number
  responseHeaders: Record<string, string>
  title: string | null
  metaTags: MetaTag[]
  scripts: { count: number; external: string[] }
  stylesheets: { count: number; hrefs: string[] }
  images: { total: number; withoutAlt: number; first10: string[] }
  links: { total: number; internal: number; external: number; first20: string[] }
  headings: {
    counts: Record<string, number>
    items: HeadingInfo[]
  }
  structuredData: unknown[]
  robots: string | null
  canonical: string | null
  viewport: string | null
  contentLength: number
  wordCount: number
  fetchedAt: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractMetaTags(html: string): MetaTag[] {
  const tags: MetaTag[] = []
  const regex = /<meta\s+([^>]*)\/?>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    const attrs = match[1]
    const name =
      attrs.match(/\bname=["']([^"']*)["']/i)?.[1] ?? null
    const content =
      attrs.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? null
    const property =
      attrs.match(/\bproperty=["']([^"']*)["']/i)?.[1] ?? null

    if (name || property || content) {
      tags.push({ name, content, property })
    }
  }

  return tags
}

function extractScripts(html: string): { count: number; external: string[] } {
  const allScripts = html.match(/<script[\s>]/gi) ?? []
  const external: string[] = []
  const srcRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi
  let match: RegExpExecArray | null

  while ((match = srcRegex.exec(html)) !== null) {
    external.push(match[1])
  }

  return { count: allScripts.length, external }
}

function extractStylesheets(html: string): { count: number; hrefs: string[] } {
  const hrefs: string[] = []
  const regex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi
  const regex2 = /<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']stylesheet["'][^>]*\/?>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    hrefs.push(match[1])
  }
  while ((match = regex2.exec(html)) !== null) {
    if (!hrefs.includes(match[1])) {
      hrefs.push(match[1])
    }
  }

  return { count: hrefs.length, hrefs }
}

function extractImages(html: string): { total: number; withoutAlt: number; first10: string[] } {
  const allImages = html.match(/<img\s[^>]*>/gi) ?? []
  const withoutAlt = allImages.filter(
    (tag) => !tag.match(/\balt\s*=\s*["'][^"']+["']/i),
  ).length

  const srcs: string[] = []
  const srcRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi
  let match: RegExpExecArray | null

  while ((match = srcRegex.exec(html)) !== null) {
    srcs.push(match[1])
    if (srcs.length >= 10) break
  }

  return { total: allImages.length, withoutAlt, first10: srcs }
}

function extractLinks(html: string, baseUrl: string): {
  total: number
  internal: number
  external: number
  first20: string[]
} {
  const hrefs: string[] = []
  const regex = /<a\s+[^>]*href=["']([^"'#]+)["'][^>]*>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    hrefs.push(match[1])
  }

  let baseHost: string
  try {
    baseHost = new URL(baseUrl).hostname
  } catch {
    baseHost = ''
  }

  let internal = 0
  let external = 0

  for (const href of hrefs) {
    try {
      const resolved = new URL(href, baseUrl)
      if (resolved.hostname === baseHost) {
        internal++
      } else {
        external++
      }
    } catch {
      internal++
    }
  }

  return {
    total: hrefs.length,
    internal,
    external,
    first20: hrefs.slice(0, 20),
  }
}

function extractHeadings(html: string): {
  counts: Record<string, number>
  items: HeadingInfo[]
} {
  const counts: Record<string, number> = {
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
  }
  const items: HeadingInfo[] = []
  const regex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    const tag = match[1].toLowerCase()
    const text = match[2].replace(/<[^>]*>/g, '').trim()
    counts[tag] = (counts[tag] ?? 0) + 1
    items.push({ tag, text })
  }

  return { counts, items }
}

function extractStructuredData(html: string): unknown[] {
  const results: unknown[] = []
  const regex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    try {
      results.push(JSON.parse(match[1]))
    } catch {
      // JSON parse hatasi - atla
    }
  }

  return results
}

function extractMetaContent(html: string, nameOrProperty: string): string | null {
  const byName = html.match(
    new RegExp(
      `<meta\\s+[^>]*name=["']${nameOrProperty}["'][^>]*content=["']([^"']*)["'][^>]*/?>`,
      'i',
    ),
  )
  if (byName) return byName[1]

  const byNameReversed = html.match(
    new RegExp(
      `<meta\\s+[^>]*content=["']([^"']*)["'][^>]*name=["']${nameOrProperty}["'][^>]*/?>`,
      'i',
    ),
  )
  if (byNameReversed) return byNameReversed[1]

  return null
}

function extractCanonical(html: string): string | null {
  const match = html.match(
    /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*\/?>/i,
  ) ?? html.match(
    /<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*\/?>/i,
  )
  return match?.[1] ?? null
}

function getWordCount(html: string): number {
  // Body icerigi al
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyContent = bodyMatch?.[1] ?? html

  // HTML taglari ve script/style icerikleri kaldir
  const text = bodyContent
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!text) return 0
  return text.split(/\s+/).length
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
  let statusCode: number
  let responseHeaders: Record<string, string>

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)

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

    statusCode = response.status
    responseHeaders = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    html = await response.text()
  } catch {
    return NextResponse.json(
      { error: 'Siteye erisilemedi veya zaman asimi olustu' },
      { status: 422 },
    )
  }

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null
  const metaTags = extractMetaTags(html)
  const scripts = extractScripts(html)
  const stylesheets = extractStylesheets(html)
  const images = extractImages(html)
  const links = extractLinks(html, validatedUrl.href)
  const headings = extractHeadings(html)
  const structuredData = extractStructuredData(html)
  const robots = extractMetaContent(html, 'robots')
  const canonical = extractCanonical(html)
  const viewport = extractMetaContent(html, 'viewport')
  const contentLength = new Blob([html]).size
  const wordCount = getWordCount(html)

  const result: SeoBrowserResult = {
    url: validatedUrl.href,
    statusCode,
    responseHeaders,
    title,
    metaTags,
    scripts,
    stylesheets,
    images,
    links,
    headings,
    structuredData,
    robots,
    canonical,
    viewport,
    contentLength,
    wordCount,
    fetchedAt: new Date().toISOString(),
  }

  return NextResponse.json(result)
}
