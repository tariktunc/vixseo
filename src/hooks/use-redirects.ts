'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Redirect {
  id: string
  oldUrl: string
  newUrl: string
  type: string | null
  status: string | null
  note: string | null
  createdAt: string | null
}

export function useRedirects(businessName: string | undefined) {
  return useQuery<{ redirects: Redirect[] }>({
    queryKey: ['redirects', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/redirects`)
      if (!res.ok) throw new Error('Redirect listesi yüklenemedi')
      return res.json()
    },
    enabled: !!businessName,
  })
}

export function useAddRedirect(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { oldUrl: string; newUrl: string; note?: string }) => {
      const res = await fetch(`/api/${businessName}/redirects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Redirect eklenemedi')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['redirects', businessName] })
    },
  })
}

export function useDeleteRedirect(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/${businessName}/redirects/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Redirect silinemedi')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['redirects', businessName] })
    },
  })
}

export function useValidateRedirects(businessName: string) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/${businessName}/redirects/validate`, { method: 'POST' })
      if (!res.ok) throw new Error('Doğrulama başarısız')
      return res.json()
    },
  })
}
