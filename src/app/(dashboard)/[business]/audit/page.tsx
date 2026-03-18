'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AuditSummary } from '@/components/audit/audit-summary'
import { AuditResultsTable } from '@/components/audit/audit-results'
import { useAudit, useRunAudit } from '@/hooks/use-audit'
import { RefreshCw, ClipboardCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function AuditPage() {
  const params = useParams()
  const business = params.business as string
  const { data, isLoading } = useAudit(business)
  const runMutation = useRunAudit(business)

  const handleRun = async () => {
    try {
      const result = await runMutation.mutateAsync()
      toast.success(
        `Audit tamamlandı: ${result.totalPosts} yazı kontrol edildi, ${result.issues.length} sorun bulundu`
      )
    } catch {
      toast.error('Audit çalıştırılamadı')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">SEO Audit</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRun}
          disabled={runMutation.isPending}
        >
          <RefreshCw
            className={`mr-1 h-3 w-3 ${runMutation.isPending ? 'animate-spin' : ''}`}
          />
          Audit Çalıştır
        </Button>
      </div>

      {data ? (
        <>
          <AuditSummary
            summary={data.summary}
            auditedAt={data.auditedAt}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Sorunlar ({data.totalIssues})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AuditResultsTable issues={data.issues} />
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ClipboardCheck className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="mb-4 text-muted-foreground">Henüz audit çalıştırılmadı</p>
            <Button onClick={handleRun} disabled={runMutation.isPending}>
              <RefreshCw
                className={`mr-1 h-4 w-4 ${runMutation.isPending ? 'animate-spin' : ''}`}
              />
              Audit Çalıştır
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
