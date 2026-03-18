'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { PostMeta } from '@/types/post'
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

interface CreatePostPayload {
  title: string
  slug: string
  seoTitle?: string
  description?: string
  markdown: string
  excerpt?: string
  categorySlugs?: string[]
  tagSlugs?: string[]
  imageUrl?: string
  imageAlt?: string
  language?: string
}

export function useCreatePost(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePostPayload) => {
      const res = await fetch(`/api/${businessName}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Post oluşturulamadı')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', businessName] })
    },
  })
}

export function usePublishPost(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, ...data }: CreatePostPayload & { postId: string }) => {
      const res = await fetch(`/api/${businessName}/posts/${postId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Wix\'e gönderilemedi')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', businessName] })
    },
  })
}

export function useDeletePost(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch(`/api/${businessName}/posts/${postId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Post silinemedi')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', businessName] })
    },
  })
}
