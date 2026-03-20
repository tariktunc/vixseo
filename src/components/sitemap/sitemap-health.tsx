'use client'

import type { SitemapEntry } from '@/types/sitemap'
import { useSitemapHealth } from '@/hooks/use-sitemap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertTriangle,
  FileText,
  Map,
  CheckCircle,
  XCircle,
  Ghost,
  Clock,
  ExternalLink,
} from 'lucide-react'

type SitemapHealthProps = {
  business: string
}

function IssueSection({
  title,
  icon,
  badgeVariant,
  badgeColor,
  count,
  children,
}: {
  title: string
  icon: React.ReactNode
  badgeVariant: 'destructive' | 'secondary' | 'outline'
  badgeColor: string
  count: number
  children: React.ReactNode
}) {
  if (count === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
          <Badge variant={badgeVariant} className={badgeColor}>
            {count}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function UrlList({ urls }: { urls: string[] }) {
  const displayUrls = urls.slice(0, 50)
  return (
    <div className="space-y-1">
      {displayUrls.map((url, i) => (
        <div key={i} className="flex items-center gap-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 truncate text-xs text-accent hover:underline"
          >
            {url.replace(/https?:\/\/[^/]+/, '')}
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        </div>
      ))}
      {urls.length > 50 && (
        <p className="mt-1 text-xs text-muted-foreground">
          +{urls.length - 50} URL daha
        </p>
      )}
    </div>
  )
}

function StaleUrlsTable({ entries }: { entries: SitemapEntry[] }) {
  const displayEntries = entries.slice(0, 50)
  return (
    <div className="overflow-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>URL</TableHead>
            <TableHead>Son Güncelleme</TableHead>
            <TableHead>Bölüm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayEntries.map((entry, i) => (
            <TableRow key={i}>
              <TableCell className="max-w-[400px]">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 truncate text-xs text-accent hover:underline"
                >
                  {entry.url.replace(/https?:\/\/[^/]+/, '')}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {entry.lastmod
                  ? new Date(entry.lastmod).toLocaleDateString('tr-TR')
                  : 'Belirtilmemiş'}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {entry.section || '-'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {entries.length > 50 && (
        <p className="p-3 text-center text-xs text-muted-foreground">
          +{entries.length - 50} URL daha
        </p>
      )}
    </div>
  )
}

export function SitemapHealth({ business }: SitemapHealthProps) {
  const { data, isLoading, isError } = useSitemapHealth(business)

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
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center gap-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            Sağlık raporu yüklenemedi.
          </div>
        </CardContent>
      </Card>
    )
  }

  const matchRatio =
    data.totalBlogPosts > 0
      ? Math.round(
          ((data.totalBlogPosts - data.missingInSitemap.length) / data.totalBlogPosts) * 100
        )
      : data.totalSitemapUrls > 0
        ? 100
        : 0

  const totalIssues =
    data.missingInSitemap.length + data.orphanUrls.length + data.staleUrls.length
  const isHealthy = totalIssues === 0

  return (
    <div className="space-y-4">
      {/* Özet Kartları */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{data.totalBlogPosts}</p>
              <p className="text-xs text-muted-foreground">Toplam Blog Yazısı</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Map className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{data.totalSitemapUrls}</p>
              <p className="text-xs text-muted-foreground">Toplam Sitemap URL</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            {matchRatio >= 90 ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : matchRatio >= 70 ? (
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <div>
              <p className="text-2xl font-bold">%{matchRatio}</p>
              <p className="text-xs text-muted-foreground">Eşleşme Oranı</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sağlık Durumu */}
      {isHealthy && (
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium">Sorun bulunamadı</p>
                <p className="text-xs text-muted-foreground">
                  Sitemap ve blog içerikleri uyumlu görünüyor.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sitemap'te Eksik */}
      <IssueSection
        title="Sitemap'te Eksik"
        icon={<XCircle className="h-4 w-4 text-red-500" />}
        badgeVariant="destructive"
        badgeColor=""
        count={data.missingInSitemap.length}
      >
        <p className="mb-3 text-xs text-muted-foreground">
          Blog'da yayınlanan ancak sitemap.xml'de bulunmayan URL'ler.
          Arama motorları bu sayfaları keşfedemeyebilir.
        </p>
        <UrlList urls={data.missingInSitemap} />
      </IssueSection>

      {/* Sahipsiz URL'ler */}
      <IssueSection
        title="Sahipsiz URL'ler"
        icon={<Ghost className="h-4 w-4 text-orange-500" />}
        badgeVariant="secondary"
        badgeColor=""
        count={data.orphanUrls.length}
      >
        <p className="mb-3 text-xs text-muted-foreground">
          Sitemap'te mevcut ancak blog'da karşılığı olmayan URL'ler. Silinmiş veya
          taşınmış içerikler olabilir.
        </p>
        <UrlList urls={data.orphanUrls} />
      </IssueSection>

      {/* Eski İçerik */}
      <IssueSection
        title="Eski İçerik"
        icon={<Clock className="h-4 w-4 text-yellow-500" />}
        badgeVariant="outline"
        badgeColor=""
        count={data.staleUrls.length}
      >
        <p className="mb-3 text-xs text-muted-foreground">
          Son değişiklik tarihi (lastmod) 6 aydan eski olan URL'ler. Bu içeriklerin
          güncellenmesi SEO performansını artırabilir.
        </p>
        <StaleUrlsTable entries={data.staleUrls} />
      </IssueSection>
    </div>
  )
}
