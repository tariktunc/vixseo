'use client'

import { useState, useCallback } from 'react'

import type { SCPage, GSCUrlInspection } from '@/types/analytics'
import { useUrlInspection } from '@/hooks/use-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, CheckCircle, XCircle, Clock, Bot, Shield, ExternalLink } from 'lucide-react'
import { SortableHeader } from '@/components/analytics/sortable-header'
import { useSortableTable } from '@/components/analytics/use-sortable-table'

type AnalyticsPagesProps = {
  pages: SCPage[]
  business: string
}

type PageSortKey = 'url' | 'clicks' | 'impressions' | 'ctr' | 'position'

function pageAccessor(item: SCPage, key: PageSortKey): number | string {
  switch (key) {
    case 'url':
      return item.url
    case 'clicks':
      return item.clicks
    case 'impressions':
      return item.impressions
    case 'ctr':
      return item.ctr
    case 'position':
      return item.position
  }
}

function InspectionResult({ data }: { data: GSCUrlInspection }) {
  const index = data.inspectionResult?.indexStatusResult
  const mobile = data.inspectionResult?.mobileUsabilityResult

  if (!data.inspectionResult) {
    return <p className="text-sm text-muted-foreground">Inceleme sonucu alinamadi.</p>
  }

  const isIndexed = index?.verdict === 'PASS'
  const robotsOk = index?.robotsTxtState === 'ALLOWED'
  const mobileOk = mobile?.verdict === 'PASS'

  return (
    <div className="space-y-4">
      {/* Indeks Durumu */}
      <div className="flex items-start gap-3">
        {isIndexed ? (
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
        ) : (
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
        )}
        <div>
          <p className="text-sm font-medium">
            {isIndexed ? 'Indekslendi' : 'Indekslenmedi'}
          </p>
          {index?.coverageState && (
            <p className="text-xs text-muted-foreground">{index.coverageState}</p>
          )}
        </div>
      </div>

      {/* Son Taranma */}
      {index?.lastCrawlTime && (
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Son Taranma</p>
            <p className="text-xs text-muted-foreground">
              {new Date(index.lastCrawlTime).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      )}

      {/* Tarayici */}
      {index?.crawledAs && (
        <div className="flex items-start gap-3">
          <Bot className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Tarayici</p>
            <p className="text-xs text-muted-foreground">{index.crawledAs}</p>
          </div>
        </div>
      )}

      {/* Robots.txt */}
      <div className="flex items-start gap-3">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Robots.txt</p>
          <Badge variant={robotsOk ? 'default' : 'destructive'}>
            {robotsOk ? 'Izin verildi' : (index?.robotsTxtState || 'Bilinmiyor')}
          </Badge>
        </div>
      </div>

      {/* Mobil Uyumluluk */}
      <div className="flex items-start gap-3">
        {mobileOk ? (
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
        ) : (
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
        )}
        <div>
          <p className="text-sm font-medium">Mobil Uyumluluk</p>
          <p className="text-xs text-muted-foreground">
            {mobileOk ? 'Sorun yok' : (mobile?.verdict || 'Degerlendirilmedi')}
          </p>
          {mobile?.issues && mobile.issues.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {mobile.issues.map((issue, idx) => (
                <li key={idx} className="text-xs text-destructive">
                  {issue.message || issue.issueType}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Canonical */}
      {(index?.googleCanonical || index?.userCanonical) && (
        <div className="space-y-1 border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground">Canonical URL'ler</p>
          {index.googleCanonical && (
            <p className="truncate text-xs">
              <span className="text-muted-foreground">Google: </span>
              {index.googleCanonical}
            </p>
          )}
          {index.userCanonical && (
            <p className="truncate text-xs">
              <span className="text-muted-foreground">Kullanici: </span>
              {index.userCanonical}
            </p>
          )}
        </div>
      )}

      {/* Sayfa Getirme Durumu */}
      {index?.pageFetchState && (
        <div className="border-t pt-3">
          <p className="text-xs text-muted-foreground">
            Sayfa Getirme: <span className="font-medium text-foreground">{index.pageFetchState}</span>
          </p>
        </div>
      )}

      {/* Indexing State */}
      {index?.indexingState && (
        <div>
          <p className="text-xs text-muted-foreground">
            Indeksleme Durumu: <span className="font-medium text-foreground">{index.indexingState}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export function AnalyticsPages({ pages, business }: AnalyticsPagesProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)
  const inspectionMutation = useUrlInspection(business)

  const accessor = useCallback(pageAccessor, [])
  const { sorted, sort, toggleSort } = useSortableTable<SCPage, PageSortKey>(
    pages,
    'clicks',
    'desc',
    accessor
  )

  const handleInspect = (url: string) => {
    setSelectedUrl(url)
    setSheetOpen(true)
    inspectionMutation.mutate(url)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tum Sayfalar ({pages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sayfa</TableHead>
                  <SortableHeader
                    label="Tiklama"
                    sortKey="clicks"
                    currentKey={sort.key}
                    direction={sort.direction}
                    onSort={(k) => toggleSort(k as PageSortKey)}
                    className="text-right"
                  />
                  <SortableHeader
                    label="Gosterim"
                    sortKey="impressions"
                    currentKey={sort.key}
                    direction={sort.direction}
                    onSort={(k) => toggleSort(k as PageSortKey)}
                    className="text-right"
                  />
                  <SortableHeader
                    label="CTR"
                    sortKey="ctr"
                    currentKey={sort.key}
                    direction={sort.direction}
                    onSort={(k) => toggleSort(k as PageSortKey)}
                    className="text-right"
                  />
                  <SortableHeader
                    label="Pozisyon"
                    sortKey="position"
                    currentKey={sort.key}
                    direction={sort.direction}
                    onSort={(k) => toggleSort(k as PageSortKey)}
                    className="text-right"
                  />
                  <TableHead className="w-[70px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell className="max-w-[300px]">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 truncate text-xs hover:underline"
                        title={p.url}
                      >
                        {p.url.replace(/^https?:\/\/[^/]+/, '')}
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-40" />
                      </a>
                    </TableCell>
                    <TableCell className="text-right">{p.clicks.toLocaleString('tr-TR')}</TableCell>
                    <TableCell className="text-right">{p.impressions.toLocaleString('tr-TR')}</TableCell>
                    <TableCell className="text-right">%{(p.ctr * 100).toFixed(1)}</TableCell>
                    <TableCell className="text-right">{p.position.toFixed(1)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleInspect(p.url)}
                        title="URL Incele"
                      >
                        <Search className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>URL Inceleme</SheetTitle>
            <SheetDescription className="truncate text-xs">
              {selectedUrl}
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            {inspectionMutation.isPending && (
              <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            )}
            {inspectionMutation.isError && (
              <p className="text-sm text-destructive">
                URL inceleme islemi basarisiz oldu. Tekrar deneyin.
              </p>
            )}
            {inspectionMutation.isSuccess && inspectionMutation.data && (
              <InspectionResult data={inspectionMutation.data} />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
