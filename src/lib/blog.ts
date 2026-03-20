import { randomUUID } from 'crypto'

import { createWixClient, getSiteId } from './wix'
import type { PostMeta, CreatePostData, UpdatePostData } from '@/types/post'

interface WixPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  customExcerpt?: boolean
  seoData?: {
    title?: string
    description?: string
    tags?: Array<{
      type: string
      children?: string
      props?: { name?: string; content?: string }
    }>
  }
  categoryIds?: string[]
  tagIds?: string[]
  language?: string
  firstPublishedDate?: string
  lastPublishedDate?: string
  media?: {
    wixMedia?: { image?: { url?: string } }
  }
  status?: string
}

function extractSeo(post: WixPost) {
  const tags = post.seoData?.tags || []

  const seoTitle =
    tags.find((t) => t.type === 'title')?.children?.trim() ||
    post.seoData?.title?.trim() ||
    null

  // Wix admin SEO açıklaması yoksa excerpt'i kullan
  // Not: customExcerpt boolean (true/false), metin değil — excerpt asıl metindir
  const description =
    tags.find((t) => t.type === 'meta' && t.props?.name === 'description')
      ?.props?.content?.trim() ||
    post.seoData?.description?.trim() ||
    post.excerpt?.trim() ||
    null

  return { seoTitle, description }
}

function toPostMeta(post: WixPost): PostMeta {
  const seo = extractSeo(post)
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    seoTitle: seo.seoTitle,
    description: seo.description,
    categoryIds: post.categoryIds || [],
    tagIds: post.tagIds || [],
    language: post.language || 'tr',
    publishedAt: post.firstPublishedDate || null,
    updatedAt: post.lastPublishedDate || null,
    imageUrl: post.media?.wixMedia?.image?.url || null,
  }
}

export async function queryPosts(businessName: string): Promise<PostMeta[]> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const all: WixPost[] = []
  let offset = 0

  while (true) {
    const res = await wix<{ posts: WixPost[] }>('POST', '/blog/v3/posts/query', {
      query: {
        paging: { limit: 100, offset },
      },
      fieldsets: ['SEO'],
    })

    if (res.status !== 200) {
      throw new Error(`Wix posts query failed (${res.status})`)
    }

    const posts = res.data.posts || []
    all.push(...posts)
    if (posts.length < 100) break
    offset += posts.length
  }

  return all.map(toPostMeta)
}

export async function queryCategories(businessName: string) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ categories: Array<{ id: string; label: string; slug: string }> }>(
    'POST',
    '/blog/v3/categories/query',
    { query: { paging: { limit: 100 } } }
  )

  if (res.status !== 200) throw new Error(`Categories query failed (${res.status})`)
  return res.data.categories || []
}

export async function queryTags(businessName: string) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ tags: Array<{ id: string; label: string; slug: string }> }>(
    'POST',
    '/blog/v3/tags/query',
    { query: { paging: { limit: 100 } } }
  )

  if (res.status !== 200) throw new Error(`Tags query failed (${res.status})`)
  return res.data.tags || []
}

// ── HTML → Ricos richContent ──────────────────────────────

type RicosDecoration = {
  type: string
  linkData?: { link: { url: string } }
}

type RicosTextNode = {
  type: 'TEXT'
  id: string
  textData: {
    text: string
    decorations: RicosDecoration[]
  }
}

type RicosNode = {
  type: string
  id: string
  nodes?: RicosNode[]
  headingData?: { level: number }
  textData?: { text: string; decorations: RicosDecoration[] }
}

type RicosDocument = {
  nodes: RicosNode[]
}

function uid(): string {
  return randomUUID()
}

function makeTextNode(text: string, decorations: RicosDecoration[] = []): RicosTextNode {
  return {
    type: 'TEXT',
    id: uid(),
    textData: { text, decorations },
  }
}

function parseInlineHtml(html: string): RicosTextNode[] {
  const nodes: RicosTextNode[] = []
  // Basit inline tag parser: <strong>, <em>, <a href="...">
  const regex = /<(strong|b|em|i|a)(\s[^>]*)?>([^<]*)<\/\1>/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  match = regex.exec(html)
  while (match !== null) {
    // Eşleşme öncesi düz metin
    if (match.index > lastIndex) {
      const plain = html.slice(lastIndex, match.index)
      if (plain) nodes.push(makeTextNode(plain))
    }

    const tag = match[1]
    const attrs = match[2] || ''
    const innerText = match[3]

    const decorations: RicosDecoration[] = []
    if (tag === 'strong' || tag === 'b') {
      decorations.push({ type: 'BOLD' })
    } else if (tag === 'em' || tag === 'i') {
      decorations.push({ type: 'ITALIC' })
    } else if (tag === 'a') {
      const hrefMatch = attrs.match(/href="([^"]*)"/)
      if (hrefMatch) {
        decorations.push({ type: 'LINK', linkData: { link: { url: hrefMatch[1] } } })
      }
    }

    nodes.push(makeTextNode(innerText, decorations))
    lastIndex = match.index + match[0].length
    match = regex.exec(html)
  }

  // Kalan düz metin
  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex)
    if (remaining) nodes.push(makeTextNode(remaining))
  }

  // Hiç node yoksa boş text ekle
  if (nodes.length === 0) {
    nodes.push(makeTextNode(html))
  }

  return nodes
}

function parseParagraph(innerHtml: string): RicosNode {
  return {
    type: 'PARAGRAPH',
    id: uid(),
    nodes: parseInlineHtml(innerHtml),
  }
}

function parseHeading(level: number, innerHtml: string): RicosNode {
  return {
    type: 'HEADING',
    id: uid(),
    headingData: { level },
    nodes: parseInlineHtml(innerHtml),
  }
}

function parseListItems(itemsHtml: string): RicosNode[] {
  const items: RicosNode[] = []
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
  let liMatch = liRegex.exec(itemsHtml)
  while (liMatch !== null) {
    items.push({
      type: 'LIST_ITEM',
      id: uid(),
      nodes: [{
        type: 'PARAGRAPH',
        id: uid(),
        nodes: parseInlineHtml(liMatch[1].trim()),
      }],
    })
    liMatch = liRegex.exec(itemsHtml)
  }
  return items
}

export function htmlToRichContent(html: string): RicosDocument {
  const nodes: RicosNode[] = []

  // Block-level tag'leri bul
  const blockRegex = /<(p|h[1-6]|ul|ol|div|blockquote)(\s[^>]*)?>[\s\S]*?<\/\1>/gi
  let lastIndex = 0
  let match = blockRegex.exec(html)

  while (match !== null) {
    // Tag öncesi düz metin varsa paragraf olarak ekle
    if (match.index > lastIndex) {
      const plain = html.slice(lastIndex, match.index).trim()
      if (plain) {
        nodes.push(parseParagraph(plain))
      }
    }

    const tag = match[1].toLowerCase()
    const fullMatch = match[0]
    // İç HTML'i çıkar (dış tag'ları kaldır)
    const innerHtml = fullMatch.replace(new RegExp(`^<${match[1]}[^>]*>`, 'i'), '')
      .replace(new RegExp(`</${match[1]}>$`, 'i'), '')
      .trim()

    if (tag === 'p' || tag === 'div') {
      nodes.push(parseParagraph(innerHtml))
    } else if (tag.startsWith('h')) {
      const level = parseInt(tag[1], 10)
      nodes.push(parseHeading(level, innerHtml))
    } else if (tag === 'ul') {
      nodes.push({
        type: 'BULLETED_LIST',
        id: uid(),
        nodes: parseListItems(fullMatch),
      })
    } else if (tag === 'ol') {
      nodes.push({
        type: 'ORDERED_LIST',
        id: uid(),
        nodes: parseListItems(fullMatch),
      })
    } else if (tag === 'blockquote') {
      nodes.push({
        type: 'BLOCKQUOTE',
        id: uid(),
        nodes: [parseParagraph(innerHtml)],
      })
    }

    lastIndex = match.index + match[0].length
    match = blockRegex.exec(html)
  }

  // Kalan düz metin
  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex).trim()
    if (remaining) {
      nodes.push(parseParagraph(remaining))
    }
  }

  // Hiç node yoksa en azından bir paragraf ekle
  if (nodes.length === 0) {
    nodes.push(parseParagraph(html || ''))
  }

  return { nodes }
}

// ── Blog CRUD ─────────────────────────────────────────────

function buildPostBody(data: CreatePostData | UpdatePostData) {
  const post: Record<string, unknown> = {}

  if ('title' in data && data.title !== undefined) post.title = data.title

  if (data.categoryIds?.length) post.categoryIds = data.categoryIds
  if (data.tagIds?.length) post.tagIds = data.tagIds
  if (data.language) post.language = data.language

  // SEO alanları
  if (data.seoTitle || data.description) {
    const tags: Array<Record<string, unknown>> = []

    if (data.seoTitle) {
      tags.push({ type: 'title', children: data.seoTitle })
    }
    if (data.description) {
      tags.push({
        type: 'meta',
        props: { name: 'description', content: data.description },
      })
    }

    post.seoData = { tags }
  }

  // richContent — HTML string ise Ricos formatına çevir
  if ('richContent' in data && typeof data.richContent === 'string' && data.richContent.trim()) {
    post.richContent = htmlToRichContent(data.richContent)
  }

  return post
}

export async function createPost(
  businessName: string,
  data: CreatePostData
): Promise<WixPost> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const post = buildPostBody(data)
  post.title = data.title

  const res = await wix<{ post: WixPost }>('POST', '/blog/v3/posts', { post })

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`Yazı oluşturulamadı (${res.status})`)
  }

  return res.data.post
}

export async function updatePost(
  businessName: string,
  postId: string,
  data: UpdatePostData
): Promise<WixPost> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const post = buildPostBody(data)

  const res = await wix<{ post: WixPost }>(
    'PATCH',
    `/blog/v3/posts/${postId}`,
    { post }
  )

  if (res.status !== 200) {
    throw new Error(`Yazı güncellenemedi (${res.status})`)
  }

  return res.data.post
}

export async function publishPost(
  businessName: string,
  postId: string
): Promise<void> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<unknown>('POST', `/blog/v3/posts/${postId}/publish`)

  if (res.status !== 200) {
    throw new Error(`Yazı yayınlanamadı (${res.status})`)
  }
}

export async function deletePost(
  businessName: string,
  postId: string
): Promise<void> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<unknown>('DELETE', `/blog/v3/posts/${postId}`)

  if (res.status !== 200 && res.status !== 204) {
    throw new Error(`Yazı silinemedi (${res.status})`)
  }
}
