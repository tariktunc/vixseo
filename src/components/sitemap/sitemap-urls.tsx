'use client'

import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, ExternalLink, Map } from 'lucide-react'
import { useSitemap } from '@/hooks/use-sitemap'

type SitemapUrlsProps = {
  business: string
}

const SECTION_LABELS: Record<string, string> = {
  anasayfa: 'Anasayfa',
  blog: 'Blog',
  urun: 'Ürün',
  kategori: 'Kategori',
  sayfa: 'Sayfa',
}

export function SitemapUrls({ business }: SitemapUrlsProps) {
  const { data, isLoading, isError } = useSitemap(business)
  const [filter, setFilter] = useState('')

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="mb-1 h-8 w-16" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Map className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">Sitemap verisi bulunamadı</p>
        </CardContent>
      </Card>
    )
  }

  const filteredUrls = filter
    ? data.urls.filter((u) => u.loc.toLowerCase().includes(filter.toLowerCase()))
    : data.urls

  return (
    <div className="space-y-4">
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{data.total}</p>
            <p className="text-xs text-muted-foreground">Toplam URL</p>
          </CardContent>
        </Card>
        {Object.entries(data.sections).map(([section, count]) => (
          <Card key={section}>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">
                {SECTION_LABELS[section] || section}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section Badge'leri */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(data.sections).map(([section, count]) => (
          <Badge key={section} variant="secondary">
            {SECTION_LABELS[section] || section}: {count}
          </Badge>
        ))}
      </div>

      {/* Filtre */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="URL filtrele..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* URL Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            URL Listesi ({filteredUrls.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Son Değişiklik</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead className="text-right">Öncelik</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUrls.length ? (
                  filteredUrls.slice(0, 100).map((url, i) => (
                    <TableRow key={i}>
                      <TableCell className="max-w-[400px]">
                        <a
                          href={url.loc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 truncate text-xs text-accent hover:underline"
                        >
                          {url.loc.replace(/https?:\/\/[^/]+/, '')}
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {url.lastmod
                          ? new Date(url.lastmod).toLocaleDateString('tr-TR')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {SECTION_LABELS[url.section] || url.section}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs">
                        {url.priority || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      URL bulunamadı
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {filteredUrls.length > 100 && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {filteredUrls.length - 100} URL daha var (ilk 100 gösteriliyor)
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
