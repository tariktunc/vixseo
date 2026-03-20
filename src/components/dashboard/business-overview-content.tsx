'use client'

import Link from 'next/link'
import { usePosts } from '@/hooks/use-posts'
import { useAnalytics } from '@/hooks/use-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { MousePointerClick, Eye, TrendingUp, Target, FileText, Globe, Search } from 'lucide-react'

function MetricCard({
  label,
  value,
  icon: Icon,
  color,
  loading,
  subtitle,
}: {
  label: string
  value: string
  icon: React.ElementType
  color: string
  loading: boolean
  subtitle?: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className={`rounded-lg bg-secondary p-2 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          {loading ? (
            <Skeleton className="h-7 w-16 mb-1" />
          ) : (
            <p className="text-2xl font-bold">{value}</p>
          )}
          <p className="text-xs text-muted-foreground">{label}</p>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function BusinessOverviewContent({ business }: { business: string }) {
  const { data: posts, isLoading: postsLoading } = usePosts(business)
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics(business)

  const langMap: Record<string, number> = {}
  posts?.forEach((p) => {
    const lang = p.language || 'tr'
    langMap[lang] = (langMap[lang] || 0) + 1
  })

  const noCat = posts?.filter((p) => p.categoryIds.length === 0).length || 0
  const noSeo = posts?.filter((p) => !p.seoTitle || !p.description).length || 0

  // Son güncelleme tarihi
  const scLastUpdated = analytics?.period?.end
    ? new Date(analytics.period.end).toLocaleDateString('tr-TR')
    : undefined

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          label="Tıklama"
          value={analytics?.totals?.clicks?.toLocaleString('tr-TR') || '--'}
          icon={MousePointerClick}
          color="text-accent"
          loading={analyticsLoading}
          subtitle={scLastUpdated ? `Son: ${scLastUpdated}` : undefined}
        />
        <MetricCard
          label="Gösterim"
          value={analytics?.totals?.impressions?.toLocaleString('tr-TR') || '--'}
          icon={Eye}
          color="text-chart-3"
          loading={analyticsLoading}
          subtitle={scLastUpdated ? `Son: ${scLastUpdated}` : undefined}
        />
        <MetricCard
          label="CTR"
          value={analytics?.totals?.ctr ? `%${(analytics.totals.ctr * 100).toFixed(1)}` : '--'}
          icon={TrendingUp}
          color="text-chart-4"
          loading={analyticsLoading}
        />
        <MetricCard
          label="Ort. Pozisyon"
          value={analytics?.totals?.position?.toFixed(1) || '--'}
          icon={Target}
          color="text-chart-5"
          loading={analyticsLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Yazı</CardTitle>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <Skeleton className="h-9 w-16" />
            ) : (
              <>
                <p className="text-3xl font-bold">{posts?.length || 0}</p>
                <div className="mt-2 flex gap-2">
                  {Object.entries(langMap).map(([lang, count]) => (
                    <Badge key={lang} variant="secondary">
                      {lang.toUpperCase()}: {count}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Kategorisiz Yazılar</CardTitle>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <Skeleton className="h-9 w-12" />
            ) : (
              <>
                <p className={`text-3xl font-bold ${noCat > 0 ? 'text-destructive' : 'text-accent'}`}>{noCat}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {noCat > 0 ? 'Kategori ataması gerekli' : 'Tüm yazılar kategorili'}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">SEO Eksik</CardTitle>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <Skeleton className="h-9 w-12" />
            ) : (
              <>
                <p className={`text-3xl font-bold ${noSeo > 0 ? 'text-chart-4' : 'text-accent'}`}>{noSeo}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {noSeo > 0 ? 'seoTitle veya description eksik' : 'SEO tamam'}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hızlı Erişim Bağlantıları */}
      <div className="flex flex-wrap gap-2">
        <Link href={`/${business}/posts`}>
          <Button variant="outline" size="sm">
            <FileText className="mr-1 h-4 w-4" />
            Yazıları Gör
          </Button>
        </Link>
        <Link href={`/${business}/analytics`}>
          <Button variant="outline" size="sm">
            <Globe className="mr-1 h-4 w-4" />
            Search Console
          </Button>
        </Link>
        <Link href={`/${business}/keywords`}>
          <Button variant="outline" size="sm">
            <Search className="mr-1 h-4 w-4" />
            Anahtar Kelimeler
          </Button>
        </Link>
      </div>
    </>
  )
}
