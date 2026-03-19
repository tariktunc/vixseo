import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { KeywordResult } from '@/types/keyword'

export function useKeywords(business: string | undefined) {
  return useQuery<KeywordResult[]>({
    queryKey: ['keywords', business],
    queryFn: async () => {
      const res = await fetch(`/api/${business}/keywords`)
      if (!res.ok) throw new Error('Anahtar kelimeler yüklenemedi')
      const data = await res.json()
      return data.keywords
    },
    enabled: !!business,
    staleTime: 5 * 60 * 1000,
  })
}

export function useSearchKeyword(business: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (keyword: string) => {
      const res = await fetch(`/api/${business}/keywords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Arama başarısız')
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords', business] })
    },
  })
}
