'use client'

import { useState, useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import { Copy, CheckCircle2, XCircle, Loader2, FileJson } from 'lucide-react'

import type { BulkCollectionResult } from '@/types/post'
import { useBulkCreateCollectionItems } from '@/hooks/use-posts'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type BulkCollectionDialogProps = {
  business: string
  collectionId: string
  collectionName: string
  columns: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BulkCollectionDialog({
  business,
  collectionId,
  collectionName,
  columns,
  open,
  onOpenChange,
}: BulkCollectionDialogProps) {
  const bulkMutation = useBulkCreateCollectionItems(business, collectionId)

  const [jsonInput, setJsonInput] = useState('')
  const [validationResult, setValidationResult] = useState<{
    valid: boolean
    message: string
    items?: Record<string, unknown>[]
  } | null>(null)
  const [results, setResults] = useState<BulkCollectionResult[] | null>(null)
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null)

  // Dinamik şablon oluştur
  const templateJson = useMemo(() => {
    const sampleItem: Record<string, string> = {}
    if (columns.length > 0) {
      columns.forEach((col) => {
        sampleItem[col] = `${col} değeri`
      })
    } else {
      sampleItem['alan1'] = 'değer1'
      sampleItem['alan2'] = 'değer2'
    }
    return JSON.stringify([sampleItem], null, 2)
  }, [columns])

  const resetState = useCallback(() => {
    setJsonInput('')
    setValidationResult(null)
    setResults(null)
    setProgress(null)
  }, [])

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) resetState()
    onOpenChange(nextOpen)
  }

  function handleCopyTemplate() {
    navigator.clipboard.writeText(templateJson)
    toast.success('Şablon panoya kopyalandı')
  }

  function handleValidate() {
    if (!jsonInput.trim()) {
      setValidationResult({ valid: false, message: 'JSON girişi boş' })
      return
    }

    try {
      const parsed = JSON.parse(jsonInput)

      if (!Array.isArray(parsed)) {
        setValidationResult({ valid: false, message: 'JSON bir dizi (array) olmalıdır' })
        return
      }

      if (parsed.length === 0) {
        setValidationResult({ valid: false, message: 'Dizi boş olamaz' })
        return
      }

      if (parsed.length > 50) {
        setValidationResult({ valid: false, message: 'Tek seferde en fazla 50 öğe gönderilebilir' })
        return
      }

      // Her öğenin obje olduğunu kontrol et
      for (let i = 0; i < parsed.length; i++) {
        if (typeof parsed[i] !== 'object' || parsed[i] === null || Array.isArray(parsed[i])) {
          setValidationResult({
            valid: false,
            message: `${i + 1}. öğe geçerli bir obje değil`,
          })
          return
        }
      }

      setValidationResult({
        valid: true,
        message: `${parsed.length} öğe bulundu`,
        items: parsed as Record<string, unknown>[],
      })
    } catch {
      setValidationResult({ valid: false, message: 'Geçersiz JSON formatı' })
    }
  }

  async function handleSubmit() {
    if (!validationResult?.items) return

    setProgress({ current: 0, total: validationResult.items.length })
    setResults(null)

    try {
      const response = await bulkMutation.mutateAsync({
        collectionId,
        items: validationResult.items,
      })
      setResults(response.results)
      setProgress({ current: response.total, total: response.total })

      if (response.failed === 0) {
        toast.success(`${response.success} öğe başarıyla eklendi`)
      } else {
        toast.warning(`${response.success} başarılı, ${response.failed} başarısız`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Toplu gönderim başarısız'
      toast.error(message)
      setProgress(null)
    }
  }

  const isPending = bulkMutation.isPending
  const hasValidItems = validationResult?.valid && validationResult.items

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Toplu Öğe Ekle — {collectionName}
          </DialogTitle>
          <DialogDescription>
            JSON formatında birden fazla öğeyi tek seferde ekleyin. En fazla 50 öğe.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Sol taraf: JSON Şablon */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">JSON Şablon</p>
              <Button variant="ghost" size="sm" onClick={handleCopyTemplate}>
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Kopyala
              </Button>
            </div>
            <pre className="rounded-lg border bg-muted/50 p-3 text-xs overflow-auto max-h-[350px] leading-relaxed">
              {templateJson}
            </pre>
            {columns.length > 0 && (
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-medium">Algılanan alanlar:</p>
                <div className="flex flex-wrap gap-1">
                  {columns.map((col) => (
                    <Badge key={col} variant="secondary" className="text-xs">
                      {col}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ taraf: JSON Editor */}
          <div className="space-y-2">
            <p className="text-sm font-medium">JSON Giriş</p>
            <textarea
              className="w-full rounded-lg border bg-background p-3 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={20}
              placeholder={`[\n  {\n    "alan1": "değer1",\n    "alan2": "değer2"\n  }\n]`}
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value)
                setValidationResult(null)
                setResults(null)
              }}
              disabled={isPending}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleValidate}
              disabled={isPending || !jsonInput.trim()}
              className="w-full"
            >
              JSON Doğrula
            </Button>

            {/* Doğrulama sonucu */}
            {validationResult && (
              <div className={`rounded-lg border p-2.5 text-sm ${
                validationResult.valid
                  ? 'border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400'
                  : 'border-destructive/30 bg-destructive/5 text-destructive'
              }`}>
                {validationResult.valid ? (
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    {validationResult.message}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <XCircle className="h-4 w-4" />
                    {validationResult.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* İlerleme çubuğu */}
        {progress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                {isPending ? 'Gönderiliyor...' : 'Tamamlandı'}
              </span>
              <span className="font-medium">
                {progress.current}/{progress.total}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${Math.round((progress.current / progress.total) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Sonuç listesi */}
        {results && results.length > 0 && (
          <div className="max-h-[200px] space-y-1 overflow-y-auto rounded-lg border p-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded px-2 py-1 text-xs">
                <span className="truncate">Öğe #{i + 1}</span>
                {r.status === 'success' ? (
                  <Badge variant="secondary" className="shrink-0 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Başarılı
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="shrink-0">
                    <XCircle className="mr-1 h-3 w-3" />
                    {r.error || 'Hata'}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          {results ? (
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Kapat
            </Button>
          ) : (
            <Button
              disabled={!hasValidItems || isPending}
              onClick={handleSubmit}
            >
              {isPending ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Tümünü Gönder
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
