import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Business, CreateBusiness } from '@/types/business'

export function useBusinesses() {
  return useQuery<Business[]>({
    queryKey: ['businesses'],
    queryFn: async () => {
      const res = await fetch('/api/businesses')
      if (!res.ok) throw new Error('İşletmeler yüklenemedi')
      return res.json()
    },
  })
}

export function useCreateBusiness() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateBusiness) => {
      const res = await fetch('/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('İşletme eklenemedi')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] })
    },
  })
}

export function useDeleteBusiness() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/businesses?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('İşletme silinemedi')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] })
    },
  })
}
