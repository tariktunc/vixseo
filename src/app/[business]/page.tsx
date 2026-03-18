import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MousePointerClick, Eye, TrendingUp, Target } from 'lucide-react'
import { BusinessOverviewContent } from '@/components/dashboard/business-overview-content'

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Tıklama', icon: MousePointerClick, color: 'text-accent' },
          { label: 'Gösterim', icon: Eye, color: 'text-chart-3' },
          { label: 'CTR', icon: TrendingUp, color: 'text-chart-4' },
          { label: 'Ort. Pozisyon', icon: Target, color: 'text-chart-5' },
        ].map((m) => (
          <Card key={m.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`rounded-lg bg-secondary p-2 ${m.color}`}>
                <m.icon className="h-5 w-5" />
              </div>
              <div>
                <Skeleton className="h-7 w-16 mb-1" />
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {['Toplam Yazı', 'Kategorisiz Yazılar', 'SEO Eksik'].map((title) => (
          <Card key={title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-12" />
              <Skeleton className="mt-2 h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default async function BusinessOverviewPage({
  params,
}: {
  params: Promise<{ business: string }>
}) {
  const { business } = await params

  return (
    <div className="space-y-6">
      {/* Static — anında */}
      <h2 className="text-xl font-bold capitalize">{business}</h2>

      {/* Dynamic — Suspense */}
      <Suspense fallback={<OverviewSkeleton />}>
        <BusinessOverviewContent business={business} />
      </Suspense>
    </div>
  )
}
