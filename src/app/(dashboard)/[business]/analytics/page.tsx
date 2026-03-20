'use client'

import { useParams } from 'next/navigation'

import { useAnalytics, useRefreshAnalytics } from '@/hooks/use-analytics'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  RefreshCw,
  BarChart3,
  FileText,
  Search,
  Link2,
  Globe,
  Map,
} from 'lucide-react'
import { toast } from 'sonner'
import { AnalyticsOverview } from '@/components/analytics/analytics-overview'
import { AnalyticsPages } from '@/components/analytics/analytics-pages'
import { AnalyticsQueries } from '@/components/analytics/analytics-queries'
import { AnalyticsPageQueries } from '@/components/analytics/analytics-page-queries'
import { AnalyticsCountries } from '@/components/analytics/analytics-countries'
import { AnalyticsSitemaps } from '@/components/analytics/analytics-sitemaps'

export default function AnalyticsPage() {
  const params = useParams()
  const business = params.business as string
  const { data, isLoading } = useAnalytics(business)
  const refreshMutation = useRefreshAnalytics(business)

  const handleRefresh = async () => {
    try {
      await refreshMutation.mutateAsync()
      toast.success('Analytics guncellendi')
    } catch {
      toast.error('Analytics guncellenemedi')
    }
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="mb-4 text-muted-foreground">
          {isLoading ? 'Yukleniyor...' : 'Analytics verisi bulunamadi'}
        </p>
        <Button onClick={handleRefresh} disabled={isLoading || refreshMutation.isPending}>
          <RefreshCw className={`mr-2 h-4 w-4 ${(isLoading || refreshMutation.isPending) ? 'animate-spin' : ''}`} />
          {refreshMutation.isPending ? 'Cekiliyor...' : 'Veri Cek'}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Baslik + Donem + Yenile */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Google Search Console</h2>
        <div className="flex items-center gap-2">
          {data.isStale && (
            <Badge variant="destructive" className="text-[10px]">
              Eski veri
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {data.period.start} — {data.period.end}
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshMutation.isPending}>
            <RefreshCw className={`mr-1 h-3 w-3 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full overflow-x-auto" variant="line">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Genel Bakis</span>
          </TabsTrigger>
          <TabsTrigger value="pages">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Sayfalar</span>
          </TabsTrigger>
          <TabsTrigger value="queries">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Sorgular</span>
          </TabsTrigger>
          <TabsTrigger value="page-queries">
            <Link2 className="h-4 w-4" />
            <span className="hidden sm:inline">Sayfa & Sorgu</span>
          </TabsTrigger>
          <TabsTrigger value="countries">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Ulkeler</span>
          </TabsTrigger>
          <TabsTrigger value="sitemaps">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Sitemaps</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <AnalyticsOverview data={data} />
        </TabsContent>

        <TabsContent value="pages" className="mt-6">
          <AnalyticsPages pages={data.pages} business={business} />
        </TabsContent>

        <TabsContent value="queries" className="mt-6">
          <AnalyticsQueries queries={data.queries} />
        </TabsContent>

        <TabsContent value="page-queries" className="mt-6">
          <AnalyticsPageQueries business={business} />
        </TabsContent>

        <TabsContent value="countries" className="mt-6">
          <AnalyticsCountries countries={data.countries} />
        </TabsContent>

        <TabsContent value="sitemaps" className="mt-6">
          <AnalyticsSitemaps business={business} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
