'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { SCOverview } from '@/types/analytics'

export function useAnalytics(businessName: string | undefined) {
  return useQuery<SCOverview>({
    queryKey: ['analytics', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/analytics/sc`)
      if (!res.ok) throw new Error('Analytics yüklenemedi')
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
