'use client'

import type { GSCSitemapInfo } from '@/types/sitemap'
import { useGscSitemapStatus } from '@/hooks/use-sitemap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, AlertTriangle, Info, CheckCircle, Clock, XCircle } from 'lucide-react'

type SitemapGscStatusProps = {
  business: string
}

function SitemapStatusBadge({ sitemap }: { sitemap: GSCSitemapInfo }) {
  if (sitemap.isPending) {
    return (
      <Badge variant="outline" className="gap-1">
        <Clock className="h-3 w-3" />
        Beklemede
      </Badge>
    )
  }
  if (sitemap.errors > 0) {
    return (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3 w-3" />
        Hata ({sitemap.errors})
      </Badge>
    )
  }
  if (sitemap.warnings > 0) {
    return (
      <Badge variant="secondary" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Uyarı ({sitemap.warnings})
      </Badge>
    )
  }
  return (
    <Badge variant="default" className="gap-1">
      <CheckCircle className="h-3 w-3" />
      Başarılı
    </Badge>
  )
}

function SitemapContentsDetail({ sitemap }: { sitemap: GSCSitemapInfo }) {
  if (!sitemap.contents || sitemap.contents.length === 0) {
    return <span className="text-xs text-muted-foreground">-</span>
  }

  return (
    <div className="space-y-1">
      {sitemap.contents.map((c, idx) => {
        const ratio = c.submitted > 0 ? Math.round((c.indexed / c.submitted) * 100) : 0
        return (
          <div key={idx} className="text-xs">
            <span className="font-medium">{c.type}: </span>
            <span className="text-muted-foreground">
              {c.indexed}/{c.submitted} indekslendi ({ratio}%)
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function SitemapGscStatus({ business }: SitemapGscStatusProps) {
  const { data, isLoading, isError } = useGscSitemapStatus(business)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="mb-1 h-8 w-16" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="space-y-3 pt-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center gap-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            GSC sitemap verileri yüklenemedi.
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <Info className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">GSC'de sitemap kaydı bulunamadı</p>
              <p className="text-xs text-muted-foreground">
                Google Search Console'a henüz sitemap gönderilmemiş. Sitenizin sitemap.xml
                dosyasını GSC üzerinden gönderin.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalSubmitted = data.reduce(
    (sum, s) => sum + s.contents.reduce((cs, c) => cs + c.submitted, 0),
    0
  )
  const totalIndexed = data.reduce(
    (sum, s) => sum + s.contents.reduce((cs, c) => cs + c.indexed, 0),
    0
  )
  const indexRatio = totalSubmitted > 0 ? Math.round((totalIndexed / totalSubmitted) * 100) : 0

  return (
    <div className="space-y-4">
      {/* Özet Kartları */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{totalSubmitted.toLocaleString('tr-TR')}</p>
              <p className="text-xs text-muted-foreground">Gönderilen URL</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{totalIndexed.toLocaleString('tr-TR')}</p>
              <p className="text-xs text-muted-foreground">İndekslenen URL</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <FileText className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">%{indexRatio}</p>
              <p className="text-xs text-muted-foreground">İndekslenme Oranı</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sitemap Detay Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Sitemap Listesi ({data.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sitemap URL</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>İçerik</TableHead>
                  <TableHead>Son Gönderim</TableHead>
                  <TableHead>Son İndirme</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell className="max-w-[300px]">
                      <span className="truncate text-xs" title={s.path}>
                        {s.path}
                      </span>
                      {s.isSitemapsIndex && (
                        <Badge variant="outline" className="ml-2 text-[10px]">
                          Index
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <SitemapStatusBadge sitemap={s} />
                    </TableCell>
                    <TableCell className="text-xs">
                      {s.isSitemapsIndex ? 'Sitemap İndeks' : 'Sitemap'}
                    </TableCell>
                    <TableCell>
                      <SitemapContentsDetail sitemap={s} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {s.lastSubmitted
                        ? new Date(s.lastSubmitted).toLocaleDateString('tr-TR')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {s.lastDownloaded
                        ? new Date(s.lastDownloaded).toLocaleDateString('tr-TR')
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
