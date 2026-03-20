'use client'

import type { GSCSitemapInfo } from '@/types/sitemap'
import { useGscSitemaps } from '@/hooks/use-analytics'
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
import { FileText, AlertTriangle, Info } from 'lucide-react'

type AnalyticsSitemapsProps = {
  business: string
}

function SitemapStatus({ sitemap }: { sitemap: GSCSitemapInfo }) {
  if (sitemap.isPending) {
    return <Badge variant="outline">Beklemede</Badge>
  }
  if (sitemap.errors > 0) {
    return <Badge variant="destructive">Hata ({sitemap.errors})</Badge>
  }
  if (sitemap.warnings > 0) {
    return <Badge variant="secondary">Uyari ({sitemap.warnings})</Badge>
  }
  return <Badge variant="default">Basarili</Badge>
}

function SitemapContents({ sitemap }: { sitemap: GSCSitemapInfo }) {
  if (!sitemap.contents || sitemap.contents.length === 0) {
    return <span className="text-xs text-muted-foreground">-</span>
  }

  return (
    <div className="space-y-1">
      {sitemap.contents.map((c, idx) => (
        <div key={idx} className="text-xs">
          <span className="font-medium">{c.type}: </span>
          <span className="text-muted-foreground">
            {c.indexed}/{c.submitted} indekslendi
          </span>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsSitemaps({ business }: AnalyticsSitemapsProps) {
  const { data, isLoading, isError } = useGscSitemaps(business)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">GSC Sitemap Durumu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">GSC Sitemap Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            Sitemap verileri yuklenemedi.
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">GSC Sitemap Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <Info className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Sitemap bulunamadi</p>
              <p className="text-xs text-muted-foreground">
                Google Search Console'a henuz sitemap gonderilmemis. Sitenizin sitemap.xml dosyasini
                GSC uzerinden gonderin.
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

  return (
    <div className="space-y-4">
      {/* Ozet Kartlari */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{data.length}</p>
              <p className="text-xs text-muted-foreground">Toplam Sitemap</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <FileText className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{totalSubmitted.toLocaleString('tr-TR')}</p>
              <p className="text-xs text-muted-foreground">Gonderilen URL</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <FileText className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{totalIndexed.toLocaleString('tr-TR')}</p>
              <p className="text-xs text-muted-foreground">Indekslenen URL</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sitemap Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">GSC Sitemap Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sitemap URL</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tur</TableHead>
                  <TableHead className="text-right">Icerik</TableHead>
                  <TableHead>Son Gonderim</TableHead>
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
                      <SitemapStatus sitemap={s} />
                    </TableCell>
                    <TableCell>
                      {s.isSitemapsIndex ? 'Sitemap Indeks' : 'Sitemap'}
                    </TableCell>
                    <TableCell className="text-right">
                      <SitemapContents sitemap={s} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {s.lastSubmitted
                        ? new Date(s.lastSubmitted).toLocaleDateString('tr-TR')
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
