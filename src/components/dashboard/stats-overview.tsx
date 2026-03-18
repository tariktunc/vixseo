'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Building2, FileText, BarChart3, Globe } from 'lucide-react'
import type { Business } from '@/types/business'

interface StatsOverviewProps {
  businesses: Business[]
}

export function StatsOverview({ businesses }: StatsOverviewProps) {
  const stats = [
    {
      label: 'İşletmeler',
      value: businesses.length,
      icon: Building2,
      color: 'text-accent',
    },
    {
      label: 'Bağlı Siteler',
      value: businesses.filter((b) => b.wixKeyConfigured).length,
      icon: Globe,
      color: 'text-accent',
    },
    {
      label: 'SC Bağlı',
      value: businesses.filter((b) => b.scKeyConfigured).length,
      icon: BarChart3,
      color: 'text-chart-3',
    },
    {
      label: 'Ads Bağlı',
      value: businesses.filter((b) => b.adsKeyConfigured).length,
      icon: FileText,
      color: 'text-chart-4',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`rounded-lg bg-secondary p-2 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
