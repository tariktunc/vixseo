'use client'

import { useQuery } from '@tanstack/react-query'
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
