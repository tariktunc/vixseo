'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import type { SCFullAnalytics } from '@/types/analytics'
import { DEVICE_LABELS, SEARCH_TYPE_LABELS } from '@/lib/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MousePointerClick,
  Eye,
  TrendingUp,
  Target,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  ImageIcon,
  Video,
  Newspaper,
} from 'lucide-react'

type AnalyticsOverviewProps = {
  data: SCFullAnalytics
}

const DEVICE_ICONS: Record<string, typeof Monitor> = {
  DESKTOP: Monitor,
  MOBILE: Smartphone,
  TABLET: Tablet,
}

const SEARCH_TYPE_ICONS: Record<string, typeof Globe> = {
  web: Globe,
  image: ImageIcon,
  video: Video,
  news: Newspaper,
}

function MetricCards({ data }: { data: SCFullAnalytics }) {
  const metrics = [
    {
      label: 'Tiklama',
      value: data.totals.clicks.toLocaleString('tr-TR'),
      icon: MousePointerClick,
      color: 'text-blue-500',
    },
    {
      label: 'Gosterim',
      value: data.totals.impressions.toLocaleString('tr-TR'),
      icon: Eye,
      color: 'text-purple-500',
    },
    {
      label: 'CTR',
      value: `%${(data.totals.ctr * 100).toFixed(1)}`,
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      label: 'Ort. Pozisyon',
      value: data.totals.position.toFixed(1),
      icon: Target,
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((m) => (
        <Card key={m.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <m.icon className={`h-5 w-5 ${m.color}`} />
            <div>
              <p className="text-2xl font-bold">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function DailyTrendChart({ data }: { data: SCFullAnalytics }) {
  if (!data.dailyTrend || data.dailyTrend.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gunluk Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Gunluk trend verisi bulunamadi.</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = data.dailyTrend.map((d) => ({
    date: d.date.slice(5), // MM-DD format
    fullDate: d.date,
    clicks: d.clicks,
    impressions: d.impressions,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Gunluk Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                className="fill-muted-foreground"
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11 }}
                className="fill-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11 }}
                className="fill-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelFormatter={(label: string, payload) => {
                  if (payload && payload.length > 0) {
                    const item = payload[0]?.payload as { fullDate?: string }
                    return item?.fullDate || label
                  }
                  return label
                }}
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = {
                    clicks: 'Tiklama',
                    impressions: 'Gosterim',
                  }
                  return [value.toLocaleString('tr-TR'), labels[name] || name]
                }}
              />
              <Legend
                formatter={(value: string) => {
                  const labels: Record<string, string> = {
                    clicks: 'Tiklama',
                    impressions: 'Gosterim',
                  }
                  return labels[value] || value
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="clicks"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="impressions"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function DeviceBreakdown({ data }: { data: SCFullAnalytics }) {
  if (!data.devices || data.devices.length === 0) return null

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Cihaz Kirilimi</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.devices.map((d) => {
          const Icon = DEVICE_ICONS[d.device] || Monitor
          const label = DEVICE_LABELS[d.device] || d.device
          return (
            <Card key={d.device}>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Tiklama</p>
                    <p className="text-lg font-bold">{d.clicks.toLocaleString('tr-TR')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Gosterim</p>
                    <p className="text-lg font-bold">{d.impressions.toLocaleString('tr-TR')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CTR</p>
                    <p className="font-semibold">%{(d.ctr * 100).toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pozisyon</p>
                    <p className="font-semibold">{d.position.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function SearchTypeBreakdown({ data }: { data: SCFullAnalytics }) {
  if (!data.searchTypes || data.searchTypes.length === 0) return null

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Arama Turleri</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.searchTypes.map((s) => {
          const Icon = SEARCH_TYPE_ICONS[s.searchType] || Globe
          const label = SEARCH_TYPE_LABELS[s.searchType] || s.searchType
          return (
            <Card key={s.searchType}>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Tiklama</p>
                    <p className="text-lg font-bold">{s.clicks.toLocaleString('tr-TR')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Gosterim</p>
                    <p className="text-lg font-bold">{s.impressions.toLocaleString('tr-TR')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CTR</p>
                    <p className="font-semibold">%{(s.ctr * 100).toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pozisyon</p>
                    <p className="font-semibold">{s.position.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  return (
    <div className="space-y-6">
      <MetricCards data={data} />
      <DailyTrendChart data={data} />
      <DeviceBreakdown data={data} />
      <SearchTypeBreakdown data={data} />
    </div>
  )
}
