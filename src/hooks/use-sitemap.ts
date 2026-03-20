import { useQuery } from '@tanstack/react-query'

import type { GSCSitemapInfo, SitemapHealthReport } from '@/types/sitemap'
import { SITEMAP_CACHE_HOURS } from '@/lib/constants'

type SitemapUrl = {
  loc: string
  lastmod: string | null
  changefreq: string | null
  priority: string | null
  section: string
}

type SitemapResponse = {
  urls: SitemapUrl[]
  total: number
  sections: Record<string, number>
  sitemapUrl: string
  fetchedAt: string
}

export function useSitemap(business: string | undefined) {
  return useQuery<SitemapResponse>({
    queryKey: ['sitemap', business],
    queryFn: async () => {
      const res = await fetch(`/api/${business}/sitemap`)
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Sitemap yüklenemedi')
      }
      return res.json()
    },
    enabled: !!business,
    staleTime: SITEMAP_CACHE_HOURS * 60 * 60 * 1000,
  })
}

export function useGscSitemapStatus(business: string | undefined) {
  return useQuery<GSCSitemapInfo[]>({
    queryKey: ['gsc-sitemap-status', business],
    queryFn: async () => {
      const res = await fetch(`/api/${business}/sitemap/gsc`)
      if (!res.ok) throw new Error('GSC sitemap durumu yüklenemedi')
      return res.json()
    },
    enabled: !!business,
    staleTime: SITEMAP_CACHE_HOURS * 60 * 60 * 1000,
  })
}

export function useSitemapHealth(business: string | undefined) {
  return useQuery<SitemapHealthReport>({
    queryKey: ['sitemap-health', business],
    queryFn: async () => {
      const res = await fetch(`/api/${business}/sitemap/health`)
      if (!res.ok) throw new Error('Sağlık raporu yüklenemedi')
      return res.json()
    },
    enabled: !!business,
    staleTime: SITEMAP_CACHE_HOURS * 60 * 60 * 1000,
  })
}
