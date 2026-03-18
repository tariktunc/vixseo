import { queryPosts } from './blog'
import { db } from '@/lib/db'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function syncFromWix(businessName: string) {
  const posts = await queryPosts(businessName)

  const [biz] = await db
    .select()
    .from(businesses)
    .where(eq(businesses.name, businessName))
    .limit(1)

  if (!biz) throw new Error('İşletme bulunamadı')

  return {
    businessId: biz.id,
    totalPosts: posts.length,
    posts: posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      seoTitle: p.seoTitle,
      description: p.description,
      categoryIds: p.categoryIds,
      tagIds: p.tagIds,
      language: p.language,
      publishedAt: p.publishedAt,
      updatedAt: p.updatedAt,
      imageUrl: p.imageUrl,
    })),
    syncedAt: new Date().toISOString(),
  }
}
