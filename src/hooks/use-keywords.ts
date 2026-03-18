'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { KeywordIdea } from '@/lib/keywords'

interface CachedKeyword {
  id: string
  keyword: string
  avgMonthly: number | null
  competition: string | null
  searchedAt: string
}

export function useKeywords(businessName: string | undefined) {
  return useQuery<{ keywords: CachedKeyword[] }>({
    queryKey: ['keywords', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/keywords`)
      if (!res.ok) throw new Error('Keyword verileri yüklenemedi')
      return res.json()
    },
    enabled: !!businessName,
  })
}

export function useKeywordSearch(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation<{ results: KeywordIdea[] }, Error, string[]>({
    mutationFn: async (keywords: string[]) => {
      const res = await fetch(`/api/${businessName}/keywords/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords }),
      })
      if (!res.ok) throw new Error('Keyword araması başarısız')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords', businessName] })
    },
  })
}
