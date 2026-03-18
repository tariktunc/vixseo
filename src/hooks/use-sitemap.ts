'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface SitemapEntry {
  url: string
  slug: string | null
  lastmod: string | null
  priority: number | null
  section: string | null
}

interface SitemapStats {
  totalUrls: number
  fetchedAt: string | null
  groups: Record<string, number>
}

interface SitemapData {
  stats: SitemapStats | null
  entries: SitemapEntry[]
}

export function useSitemap(businessName: string | undefined) {
  return useQuery<SitemapData>({
    queryKey: ['sitemap', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/sitemap`)
      if (!res.ok) throw new Error('Sitemap yüklenemedi')
      return res.json()
    },
    enabled: !!businessName,
  })
}

export function useSitemapPull(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/${businessName}/sitemap/pull`, { method: 'POST' })
      if (!res.ok) throw new Error('Sitemap çekilemedi')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sitemap', businessName] })
    },
  })
}

export function useSlugCheck(businessName: string) {
  return useMutation<{ exists: boolean; url: string | null }, Error, string>({
    mutationFn: async (slug: string) => {
      const res = await fetch(`/api/${businessName}/sitemap/check-slug`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      if (!res.ok) throw new Error('Slug kontrol hatası')
      return res.json()
    },
  })
}
