import { z } from 'zod/v4'

export const postMetaSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  seoTitle: z.string().nullable(),
  description: z.string().nullable(),
  categoryIds: z.array(z.string()),
  tagIds: z.array(z.string()),
  language: z.string(),
  publishedAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  imageUrl: z.string().nullable(),
})

export type PostMeta = z.infer<typeof postMetaSchema>

export type PostsResponse = {
  posts: PostMeta[]
  total: number
}

// ── CRUD Tipleri ──────────────────────────────────────────

export const createPostSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur'),
  seoTitle: z.string().max(60, 'SEO başlığı en fazla 60 karakter').optional(),
  description: z.string().max(160, 'Açıklama en fazla 160 karakter').optional(),
  richContent: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  language: z.string().optional(),
})

export type CreatePostData = z.infer<typeof createPostSchema>

// ── Toplu Gönderim Tipleri ───────────────────────────────

export const bulkPostItemSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur'),
  seoTitle: z.string().max(60, 'SEO başlığı en fazla 60 karakter').optional(),
  description: z.string().max(160, 'Açıklama en fazla 160 karakter').optional(),
  richContent: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  language: z.string().optional(),
  publish: z.boolean().optional(),
})

export type BulkPostItem = z.infer<typeof bulkPostItemSchema>

export const bulkPostsRequestSchema = z.object({
  posts: z.array(bulkPostItemSchema).min(1, 'En az bir yazı gereklidir').max(50, 'Tek seferde en fazla 50 yazı'),
})

export type BulkPostsRequest = z.infer<typeof bulkPostsRequestSchema>

export type BulkPostResult = {
  title: string
  status: 'success' | 'error'
  error?: string
  postId?: string
}

export type BulkPostsResponse = {
  total: number
  success: number
  failed: number
  results: BulkPostResult[]
}

export type BulkCollectionResult = {
  status: 'success' | 'error'
  error?: string
  itemId?: string
}

export type BulkCollectionResponse = {
  total: number
  success: number
  failed: number
  results: BulkCollectionResult[]
}

export const updatePostSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur').optional(),
  seoTitle: z.string().max(60, 'SEO başlığı en fazla 60 karakter').optional(),
  description: z.string().max(160, 'Açıklama en fazla 160 karakter').optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  language: z.string().optional(),
})

export type UpdatePostData = z.infer<typeof updatePostSchema>

export type BlogCategory = {
  id: string
  label: string
  slug: string
}
