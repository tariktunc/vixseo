import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import type { SCFullAnalytics, GSCUrlInspection, SCPageQuery } from '@/types/analytics'
import type { GSCSitemapInfo } from '@/types/sitemap'

export function useAnalytics(businessName: string | undefined) {
  return useQuery<SCFullAnalytics>({
    queryKey: ['analytics', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/analytics/sc`)
      if (!res.ok) throw new Error('Analytics yuklenemedi')
      return res.json()
    },
    enabled: !!businessName,
  })
}

export function useRefreshAnalytics(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/${businessName}/analytics/refresh`, { method: 'POST' })
      if (!res.ok) throw new Error('Analytics yenilenemedi')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics', businessName] })
    },
  })
}

// ── URL Inspection ──────────────────────────────────────────

export function useUrlInspection(businessName: string) {
  return useMutation<GSCUrlInspection, Error, string>({
    mutationFn: async (url: string) => {
      const res = await fetch(`/api/${businessName}/analytics/inspect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) throw new Error('URL inceleme basarisiz')
      return res.json()
    },
  })
}

// ── Page + Query Combined ───────────────────────────────────

type PageQueryResponse = {
  rows: SCPageQuery[]
  period: { start: string; end: string }
}

export function usePageQueries(businessName: string | undefined) {
  return useQuery<PageQueryResponse>({
    queryKey: ['page-queries', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/analytics/page-queries?rowLimit=500`)
      if (!res.ok) throw new Error('Sayfa-sorgu verileri yuklenemedi')
      return res.json()
    },
    enabled: !!businessName,
  })
}

// ── GSC Sitemaps ────────────────────────────────────────────

export function useGscSitemaps(businessName: string | undefined) {
  return useQuery<GSCSitemapInfo[]>({
    queryKey: ['gsc-sitemaps', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/sitemap/gsc`)
      if (!res.ok) throw new Error('GSC sitemap durumu yuklenemedi')
      return res.json()
    },
    enabled: !!businessName,
  })
}
