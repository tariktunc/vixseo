'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { Copy, CheckCircle2, XCircle, Loader2, FileJson } from 'lucide-react'

import type { BulkPostItem, BulkPostResult } from '@/types/post'
import { bulkPostsRequestSchema } from '@/types/post'
import { useBulkCreatePosts } from '@/hooks/use-posts'
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

type BulkPostDialogProps = {
  business: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TEMPLATE_JSON = `[
  {
    "title": "Yazı Başlığı (zorunlu)",
    "seoTitle": "SEO Başlığı (max 60 karakter)",
    "description": "Meta açıklama (max 160 karakter)",
    "richContent": "<p>Yazı içeriği HTML formatında</p><h2>Alt başlık</h2><p>Devam...</p>",
    "categoryIds": [],
    "tagIds": [],
    "language": "tr",
    "publish": false
  }
]`

export function BulkPostDialog({
  business,
  open,
  onOpenChange,
}: BulkPostDialogProps) {
  const bulkMutation = useBulkCreatePosts(business)

  const [jsonInput, setJsonInput] = useState('')
  const [validationResult, setValidationResult] = useState<{
    valid: boolean
    message: string
    posts?: BulkPostItem[]
  } | null>(null)
  const [results, setResults] = useState<BulkPostResult[] | null>(null)
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null)

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
    navigator.clipboard.writeText(TEMPLATE_JSON)
    toast.success('Şablon panoya kopyalandı')
  }

  function handleValidate() {
    if (!jsonInput.trim()) {
      setValidationResult({ valid: false, message: 'JSON girişi boş' })
      return
    }

    try {
      const parsed = JSON.parse(jsonInput)

      // Array olmalı
      if (!Array.isArray(parsed)) {
        setValidationResult({ valid: false, message: 'JSON bir dizi (array) olmalıdır' })
        return
      }

      // Zod ile doğrula
      const result = bulkPostsRequestSchema.safeParse({ posts: parsed })
      if (!result.success) {
        const firstIssue = result.error.issues[0]
        setValidationResult({
          valid: false,
          message: `Doğrulama hatası: ${firstIssue?.message || 'Geçersiz veri'}`,
        })
        return
      }

      setValidationResult({
        valid: true,
        message: `${result.data.posts.length} yazı bulundu`,
        posts: result.data.posts,
      })
    } catch {
      setValidationResult({ valid: false, message: 'Geçersiz JSON formatı' })
    }
  }

  async function handleSubmit(publish: boolean) {
    if (!validationResult?.posts) return

    const postsToSend = validationResult.posts.map((p) => ({
      ...p,
      publish: publish ? true : p.publish,
    }))

    setProgress({ current: 0, total: postsToSend.length })
    setResults(null)

    try {
      const response = await bulkMutation.mutateAsync({ posts: postsToSend })
      setResults(response.results)
      setProgress({ current: response.total, total: response.total })

      if (response.failed === 0) {
        toast.success(`${response.success} yazı başarıyla ${publish ? 'yayınlandı' : 'kaydedildi'}`)
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
  const hasValidPosts = validationResult?.valid && validationResult.posts

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Toplu Yazı Gönderimi
          </DialogTitle>
          <DialogDescription>
            JSON formatında birden fazla yazıyı tek seferde gönderin. En fazla 50 yazı.
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
              {TEMPLATE_JSON}
            </pre>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><strong>title</strong> — Zorunlu. Yazı başlığı.</p>
              <p><strong>seoTitle</strong> — Opsiyonel. Maks 60 karakter.</p>
              <p><strong>description</strong> — Opsiyonel. Maks 160 karakter.</p>
              <p><strong>richContent</strong> — Opsiyonel. HTML formatında yazı gövdesi.</p>
              <p><strong>publish</strong> — false: taslak, true: yayınla.</p>
            </div>
          </div>

          {/* Sağ taraf: JSON Editor */}
          <div className="space-y-2">
            <p className="text-sm font-medium">JSON Giriş</p>
            <textarea
              className="w-full rounded-lg border bg-background p-3 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={20}
              placeholder={`[\n  {\n    "title": "İlk yazı başlığı",\n    "seoTitle": "SEO başlığı",\n    "description": "Meta açıklama",\n    "richContent": "<p>İçerik</p>",\n    "publish": false\n  }\n]`}
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
                <span className="truncate">{r.title}</span>
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

        <DialogFooter className="gap-2 sm:gap-0">
          {results ? (
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Kapat
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                disabled={!hasValidPosts || isPending}
                onClick={() => handleSubmit(false)}
              >
                {isPending ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
                Tümünü Taslak Kaydet
              </Button>
              <Button
                disabled={!hasValidPosts || isPending}
                onClick={() => handleSubmit(true)}
              >
                {isPending ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
                Tümünü Yayınla
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
