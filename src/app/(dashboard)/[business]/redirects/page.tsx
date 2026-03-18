'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { RedirectsTable } from '@/components/redirects/redirects-table'
import { AddRedirectDialog } from '@/components/redirects/add-redirect-dialog'
import { ValidationReport } from '@/components/redirects/validation-report'
import {
  useRedirects,
  useAddRedirect,
  useDeleteRedirect,
  useValidateRedirects,
} from '@/hooks/use-redirects'
import { Download, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function RedirectsPage() {
  const params = useParams()
  const business = params.business as string
  const { data, isLoading } = useRedirects(business)
  const addMutation = useAddRedirect(business)
  const deleteMutation = useDeleteRedirect(business)
  const validateMutation = useValidateRedirects(business)
  const [validationResult, setValidationResult] = useState<{
    total: number
    issues: Array<{ id: string; type: 'KRITIK' | 'UYARI'; msg: string }>
  } | null>(null)

  const handleAdd = async (data: { oldUrl: string; newUrl: string; note?: string }) => {
    try {
      const result = await addMutation.mutateAsync(data)
      if (result.added) {
        toast.success('Redirect eklendi')
      } else if (result.updated) {
        toast.success('Redirect güncellendi')
      } else {
        toast.info(result.reason || 'Zaten mevcut')
      }
    } catch {
      toast.error('Redirect eklenemedi')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('Redirect silindi')
    } catch {
      toast.error('Redirect silinemedi')
    }
  }

  const handleValidate = async () => {
    try {
      const result = await validateMutation.mutateAsync()
      setValidationResult(result)
      if (result.issues.length === 0) {
        toast.success('Sorun bulunamadı')
      } else {
        toast.warning(`${result.issues.length} sorun bulundu`)
      }
    } catch {
      toast.error('Doğrulama başarısız')
    }
  }

  const handleExport = () => {
    window.open(`/api/${business}/redirects/export`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Redirect Yönetimi</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleValidate} disabled={validateMutation.isPending}>
            <ShieldCheck className="mr-1 h-3 w-3" />
            Doğrula
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-1 h-3 w-3" />
            CSV
          </Button>
          <AddRedirectDialog onAdd={handleAdd} isPending={addMutation.isPending} />
        </div>
      </div>

      {validationResult && (
        <ValidationReport total={validationResult.total} issues={validationResult.issues} />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Redirect Listesi ({data?.redirects?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RedirectsTable
            redirects={data?.redirects || []}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  )
}
