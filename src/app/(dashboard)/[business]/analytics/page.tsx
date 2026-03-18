'use client'

import { useParams } from 'next/navigation'
import { useAnalytics, useRefreshAnalytics } from '@/hooks/use-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RefreshCw, MousePointerClick, Eye, TrendingUp, Target } from 'lucide-react'
import { toast } from 'sonner'

export default function AnalyticsPage() {
  const params = useParams()
  const business = params.business as string
  const { data, isLoading } = useAnalytics(business)
  const refreshMutation = useRefreshAnalytics(business)

  const handleRefresh = async () => {
    try {
      await refreshMutation.mutateAsync()
      toast.success('Analytics güncellendi')
    } catch {
      toast.error('Analytics güncellenemedi')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="mb-4 text-muted-foreground">Analytics verisi bulunamadı</p>
        <Button onClick={handleRefresh} disabled={refreshMutation.isPending}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Veri Çek
        </Button>
      </div>
    )
  }

  const metrics = [
    { label: 'Tıklama', value: data.totals.clicks.toLocaleString('tr-TR'), icon: MousePointerClick },
    { label: 'Gösterim', value: data.totals.impressions.toLocaleString('tr-TR'), icon: Eye },
    { label: 'CTR', value: `%${data.totals.ctr.toFixed(1)}`, icon: TrendingUp },
    { label: 'Ort. Pozisyon', value: data.totals.position.toFixed(1), icon: Target },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Search Console Analitik</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {data.period.start} — {data.period.end}
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshMutation.isPending}>
            <RefreshCw className={`mr-1 h-3 w-3 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <m.icon className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Sayfalar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">En Çok Trafik Alan Sayfalar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sayfa</TableHead>
                <TableHead className="text-right">Tıklama</TableHead>
                <TableHead className="text-right">Gösterim</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">Pozisyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.pages.slice(0, 20).map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="max-w-[300px] truncate text-xs">{p.url}</TableCell>
                  <TableCell className="text-right">{p.clicks}</TableCell>
                  <TableCell className="text-right">{p.impressions}</TableCell>
                  <TableCell className="text-right">%{p.ctr}</TableCell>
                  <TableCell className="text-right">{p.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Sorgular */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">En Çok Trafik Getiren Sorgular</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sorgu</TableHead>
                <TableHead className="text-right">Tıklama</TableHead>
                <TableHead className="text-right">Gösterim</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">Pozisyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.queries.slice(0, 20).map((q, i) => (
                <TableRow key={i}>
                  <TableCell className="max-w-[300px] truncate text-xs">{q.query}</TableCell>
                  <TableCell className="text-right">{q.clicks}</TableCell>
                  <TableCell className="text-right">{q.impressions}</TableCell>
                  <TableCell className="text-right">%{q.ctr}</TableCell>
                  <TableCell className="text-right">{q.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
