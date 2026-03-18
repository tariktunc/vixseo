'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { SitemapStats } from '@/components/sitemap/sitemap-stats'
import { SitemapTable } from '@/components/sitemap/sitemap-table'
import { SlugChecker } from '@/components/sitemap/slug-checker'
import { useSitemap, useSitemapPull } from '@/hooks/use-sitemap'
import { RefreshCw, Map } from 'lucide-react'
import { toast } from 'sonner'

export default function SitemapPage() {
  const params = useParams()
  const business = params.business as string
  const { data, isLoading } = useSitemap(business)
  const pullMutation = useSitemapPull(business)

  const handlePull = async () => {
    try {
      const result = await pullMutation.mutateAsync()
      toast.success(`${result.totalUrls} URL çekildi`)
    } catch {
      toast.error('Sitemap çekilemedi')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
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
        <h2 className="text-xl font-bold">Sitemap Analiz</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePull}
          disabled={pullMutation.isPending}
        >
          <RefreshCw
            className={`mr-1 h-3 w-3 ${pullMutation.isPending ? 'animate-spin' : ''}`}
          />
          Sitemap Çek
        </Button>
      </div>

      {data?.stats ? (
        <>
          <SitemapStats
            totalUrls={data.stats.totalUrls}
            fetchedAt={data.stats.fetchedAt}
            groups={data.stats.groups}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Slug Kontrol</CardTitle>
            </CardHeader>
            <CardContent>
              <SlugChecker businessName={business} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">URL Listesi</CardTitle>
            </CardHeader>
            <CardContent>
              <SitemapTable entries={data.entries} />
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Map className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="mb-4 text-muted-foreground">Sitemap verisi bulunamadı</p>
            <Button onClick={handlePull} disabled={pullMutation.isPending}>
              <RefreshCw
                className={`mr-1 h-4 w-4 ${pullMutation.isPending ? 'animate-spin' : ''}`}
              />
              Sitemap Çek
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
