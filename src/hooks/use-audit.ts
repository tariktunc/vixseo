'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface AuditIssue {
  id: string
  postSlug: string | null
  wixId: string | null
  field: string | null
  severity: string | null
  detail: string | null
  auditedAt: string | null
}

interface AuditResult {
  auditedAt: string | null
  totalIssues: number
  issues: AuditIssue[]
  summary: { kritik: number; orta: number; dusuk: number }
}

interface RunAuditResult {
  totalPosts: number
  postsWithIssues: number
  issues: Array<{
    postSlug: string
    wixId: string
    field: string
    severity: string
    detail: string
  }>
  summary: { kritik: number; orta: number; dusuk: number }
}

export function useAudit(businessName: string | undefined) {
  return useQuery<AuditResult | null>({
    queryKey: ['audit', businessName],
    queryFn: async () => {
      const res = await fetch(`/api/${businessName}/audit`)
      if (!res.ok) throw new Error('Audit verileri yüklenemedi')
      return res.json()
    },
    enabled: !!businessName,
  })
}

export function useRunAudit(businessName: string) {
  const queryClient = useQueryClient()

  return useMutation<RunAuditResult>({
    mutationFn: async () => {
      const res = await fetch(`/api/${businessName}/audit/run`, { method: 'POST' })
      if (!res.ok) throw new Error('Audit çalıştırılamadı')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audit', businessName] })
    },
  })
}
