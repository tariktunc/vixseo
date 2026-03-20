import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { PostMeta, CreatePostData, UpdatePostData, BlogCategory, BulkPostsRequest, BulkPostsResponse, BulkCollectionResponse } from '@/types/post'
import { POSTS_STALE_MINUTES } from '@/lib/constants'

export function usePosts(businessName: string | undefined) {
  return useQuery<PostMeta[]>({
    queryKey: ['posts', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/posts`)
      if (!res.ok) throw new Error('Yazılar yüklenemedi')
      const data = await res.json()
      return data.posts
    },
    enabled: !!businessName,
    staleTime: POSTS_STALE_MINUTES * 60 * 1000,
  })
}

export function useCategories(businessName: string | undefined) {
  return useQuery<BlogCategory[]>({
    queryKey: ['categories', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/posts?type=categories`)
      if (!res.ok) throw new Error('Kategoriler yüklenemedi')
      const data = await res.json()
      return data.categories
    },
    enabled: !!businessName,
    staleTime: 30 * 60 * 1000,
  })
}

export function useCreatePost(businessName: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePostData & { publish?: boolean }) => {
      const res = await fetch(`/api/${businessName}/posts/manage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Yazı oluşturulamadı' }))
        throw new Error(err.error || 'Yazı oluşturulamadı')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts', businessName] })
    },
  })
}

export function useUpdatePost(businessName: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, ...data }: UpdatePostData & { postId: string }) => {
      const res = await fetch(`/api/${businessName}/posts/manage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, ...data }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Yazı güncellenemedi' }))
        throw new Error(err.error || 'Yazı güncellenemedi')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts', businessName] })
    },
  })
}

export function useDeletePost(businessName: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch(
        `/api/${businessName}/posts/manage?postId=${encodeURIComponent(postId)}`,
        { method: 'DELETE' }
      )
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Yazı silinemedi' }))
        throw new Error(err.error || 'Yazı silinemedi')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts', businessName] })
    },
  })
}

export function usePublishPost(businessName: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch(`/api/${businessName}/posts/manage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, publish: true }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Yazı yayınlanamadı' }))
        throw new Error(err.error || 'Yazı yayınlanamadı')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts', businessName] })
    },
  })
}

// ── CMS Mutation Hook'ları ────────────────────────────────

export function useCreateCollectionItem(businessName: string, collectionId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch(`/api/${businessName}/collections/manage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionId, data }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Öğe oluşturulamadı' }))
        throw new Error(err.error || 'Öğe oluşturulamadı')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['collection-items', businessName, collectionId] })
    },
  })
}

export function useUpdateCollectionItem(businessName: string, collectionId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string; data: Record<string, unknown> }) => {
      const res = await fetch(`/api/${businessName}/collections/manage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionId, itemId, data }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Öğe güncellenemedi' }))
        throw new Error(err.error || 'Öğe güncellenemedi')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['collection-items', businessName, collectionId] })
    },
  })
}

export function useDeleteCollectionItem(businessName: string, collectionId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (itemId: string) => {
      const res = await fetch(
        `/api/${businessName}/collections/manage?collectionId=${encodeURIComponent(collectionId)}&itemId=${encodeURIComponent(itemId)}`,
        { method: 'DELETE' }
      )
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Öğe silinemedi' }))
        throw new Error(err.error || 'Öğe silinemedi')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['collection-items', businessName, collectionId] })
    },
  })
}

// ── Toplu Gönderim Hook'ları ─────────────────────────────

export function useBulkCreatePosts(businessName: string) {
  const qc = useQueryClient()

  return useMutation<BulkPostsResponse, Error, BulkPostsRequest>({
    mutationFn: async (data) => {
      const res = await fetch(`/api/${businessName}/posts/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Toplu gönderim başarısız' }))
        throw new Error(err.error || 'Toplu gönderim başarısız')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts', businessName] })
    },
  })
}

export function useBulkCreateCollectionItems(businessName: string, collectionId: string) {
  const qc = useQueryClient()

  return useMutation<BulkCollectionResponse, Error, { collectionId: string; items: Record<string, unknown>[] }>({
    mutationFn: async (data) => {
      const res = await fetch(`/api/${businessName}/collections/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Toplu gönderim başarısız' }))
        throw new Error(err.error || 'Toplu gönderim başarısız')
      }
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['collection-items', businessName, collectionId] })
    },
  })
}
