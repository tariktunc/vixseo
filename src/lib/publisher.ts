import { createWixClient, getSiteId } from './wix'
import { queryCategories, queryTags } from './blog'
import { markdownToWixNodes, parseFrontmatter } from './markdown-to-wix'

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export function toAsciiSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

interface PublishPayload {
  title: string
  slug: string
  seoTitle: string
  description: string
  markdown: string
  excerpt?: string
  categorySlugs?: string[]
  tagSlugs?: string[]
  imageUrl?: string
  imageAlt?: string
  language?: string
}

export async function createDraftPost(businessName: string, payload: PublishPayload) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  // Slug → ID çözümle
  const [categories, tags] = await Promise.all([
    queryCategories(businessName),
    queryTags(businessName),
  ])

  const categoryIds = (payload.categorySlugs || [])
    .map((slug) => categories.find((c) => c.slug === slug)?.id)
    .filter(Boolean) as string[]

  const tagIds = (payload.tagSlugs || [])
    .map((slug) => tags.find((t) => t.slug === slug)?.id)
    .filter(Boolean) as string[]

  // Markdown → Wix nodes
  const nodes = markdownToWixNodes(payload.markdown)

  const draftPost = {
    title: payload.title,
    richContent: { nodes },
    excerpt: payload.excerpt || '',
    categoryIds,
    tagIds,
    language: payload.language || 'tr',
  }

  const res = await wix<{ draftPost: { id: string } }>('POST', '/blog/v3/draft-posts', {
    draftPost,
  })

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`Draft oluşturulamadı [${res.status}]`)
  }

  return res.data.draftPost.id
}

export async function patchSeoSlug(businessName: string, draftId: string, slug: string) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  await wix('PATCH', `/blog/v3/draft-posts/${draftId}`, {
    draftPost: { seoSlug: slug },
    fieldMask: { paths: ['seoSlug'] },
  })
}

export async function patchSeoData(
  businessName: string,
  draftId: string,
  seoData: { seoTitle: string; description: string; imageUrl?: string }
) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const keywords = seoData.seoTitle.split('|')[0]?.trim() || ''

  await wix('PATCH', `/blog/v3/draft-posts/${draftId}`, {
    draftPost: {
      seoData: {
        tags: [
          { type: 'title', children: seoData.seoTitle, custom: false, disabled: false },
          {
            type: 'meta',
            props: { name: 'description', content: seoData.description },
            children: '',
            custom: false,
            disabled: false,
          },
          {
            type: 'meta',
            props: { name: 'keywords', content: keywords },
            children: '',
            custom: false,
            disabled: false,
          },
          {
            type: 'meta',
            props: { property: 'og:title', content: seoData.seoTitle },
            children: '',
            custom: false,
            disabled: false,
          },
          {
            type: 'meta',
            props: { property: 'og:description', content: seoData.description },
            children: '',
            custom: false,
            disabled: false,
          },
          ...(seoData.imageUrl
            ? [
                {
                  type: 'meta' as const,
                  props: { property: 'og:image', content: seoData.imageUrl },
                  children: '',
                  custom: false,
                  disabled: false,
                },
              ]
            : []),
        ],
        settings: {
          preventAutoRedirect: false,
          keywords: [{ term: keywords, isMain: true }],
        },
      },
    },
    fieldMask: { paths: ['seoData'] },
  })
}

export async function importImage(businessName: string, imageUrl: string, slug: string) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ file: { id: string } }>('POST', '/site-media/v1/files/import', {
    url: imageUrl,
    displayName: slug + '.jpg',
    mimeType: 'image/jpeg',
    mediaType: 'IMAGE',
    parentFolderId: 'media-root',
  })

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`Görsel import hatası [${res.status}]`)
  }

  const fileId = res.data?.file?.id
  if (!fileId) throw new Error('file.id boş')

  await delay(3000) // PENDING → READY
  return fileId
}

export async function patchMedia(
  businessName: string,
  draftId: string,
  media: { fileId: string; altText: string }
) {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  await wix('PATCH', `/blog/v3/draft-posts/${draftId}`, {
    draftPost: {
      media: {
        wixMedia: { image: { id: media.fileId, altText: media.altText } },
        displayed: true,
        custom: true,
        altText: media.altText,
      },
    },
    fieldMask: { paths: ['media'] },
  })
}

export async function publishFullPost(businessName: string, payload: PublishPayload) {
  const slug = toAsciiSlug(payload.slug)

  // 1. Draft oluştur
  const draftId = await createDraftPost(businessName, { ...payload, slug })

  // 2. SEO slug patch
  await delay(600)
  await patchSeoSlug(businessName, draftId, slug)

  // 3. SEO data patch (media ile ayrı!)
  await delay(600)
  await patchSeoData(businessName, draftId, {
    seoTitle: payload.seoTitle,
    description: payload.description,
    imageUrl: payload.imageUrl,
  })

  // 4. Image import + media patch (varsa)
  if (payload.imageUrl) {
    try {
      const fileId = await importImage(businessName, payload.imageUrl, slug)
      await delay(600)
      await patchMedia(businessName, draftId, {
        fileId,
        altText: payload.imageAlt || payload.title,
      })
    } catch {
      // Görsel hata oluşursa devam et
    }
  }

  return { draftId, slug }
}

export { parseFrontmatter }
