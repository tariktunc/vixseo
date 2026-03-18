'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Globe, FolderOpen, Clock } from 'lucide-react'

interface SitemapStatsProps {
  totalUrls: number
  fetchedAt: string | null
  groups: Record<string, number>
}

export function SitemapStats({ totalUrls, fetchedAt, groups }: SitemapStatsProps) {
  const topSections = Object.entries(groups)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <Globe className="h-5 w-5 text-accent" />
          <div>
            <p className="text-2xl font-bold">{totalUrls.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-muted-foreground">Toplam URL</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <FolderOpen className="h-5 w-5 text-accent" />
          <div>
            <p className="text-2xl font-bold">{Object.keys(groups).length}</p>
            <p className="text-xs text-muted-foreground">Bölüm</p>
          </div>
        </CardContent>
      </Card>

      {topSections.slice(0, 2).map(([section, count]) => (
        <Card key={section}>
          <CardContent className="flex items-center gap-3 p-4">
            <FolderOpen className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">/{section}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      {fetchedAt && (
        <Card className="col-span-full">
          <CardContent className="flex items-center gap-2 p-3 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Son güncelleme: {new Date(fetchedAt).toLocaleString('tr-TR')}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
