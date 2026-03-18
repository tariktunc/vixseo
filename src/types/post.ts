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

export interface PostsResponse {
  posts: PostMeta[]
  total: number
}
