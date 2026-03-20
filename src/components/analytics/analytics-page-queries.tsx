'use client'

import { useCallback } from 'react'

import type { SCPageQuery } from '@/types/analytics'
import { usePageQueries } from '@/hooks/use-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink } from 'lucide-react'
import { SortableHeader } from '@/components/analytics/sortable-header'
import { useSortableTable } from '@/components/analytics/use-sortable-table'

type AnalyticsPageQueriesProps = {
  business: string
}

type PageQuerySortKey = 'page' | 'query' | 'clicks' | 'impressions' | 'ctr' | 'position'

function pageQueryAccessor(item: SCPageQuery, key: PageQuerySortKey): number | string {
  switch (key) {
    case 'page':
      return item.page
    case 'query':
      return item.query
    case 'clicks':
      return item.clicks
    case 'impressions':
      return item.impressions
    case 'ctr':
      return item.ctr
    case 'position':
      return item.position
  }
}

function PageQueriesTable({ rows }: { rows: SCPageQuery[] }) {
  const accessor = useCallback(pageQueryAccessor, [])
  const { sorted, sort, toggleSort } = useSortableTable<SCPageQuery, PageQuerySortKey>(
    rows,
    'clicks',
    'desc',
    accessor
  )

  return (
    <div className="max-h-[600px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sayfa</TableHead>
            <TableHead>Sorgu</TableHead>
            <SortableHeader
              label="Tiklama"
              sortKey="clicks"
              currentKey={sort.key}
              direction={sort.direction}
              onSort={(k) => toggleSort(k as PageQuerySortKey)}
              className="text-right"
            />
            <SortableHeader
              label="Gosterim"
              sortKey="impressions"
              currentKey={sort.key}
              direction={sort.direction}
              onSort={(k) => toggleSort(k as PageQuerySortKey)}
              className="text-right"
            />
            <SortableHeader
              label="CTR"
              sortKey="ctr"
              currentKey={sort.key}
              direction={sort.direction}
              onSort={(k) => toggleSort(k as PageQuerySortKey)}
              className="text-right"
            />
            <SortableHeader
              label="Pozisyon"
              sortKey="position"
              currentKey={sort.key}
              direction={sort.direction}
              onSort={(k) => toggleSort(k as PageQuerySortKey)}
              className="text-right"
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((r, i) => (
            <TableRow key={i}>
              <TableCell className="max-w-[200px]">
                <a
                  href={r.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 truncate text-xs hover:underline"
                  title={r.page}
                >
                  {r.page.replace(/^https?:\/\/[^/]+/, '')}
                  <ExternalLink className="h-3 w-3 shrink-0 opacity-40" />
                </a>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-xs">{r.query}</TableCell>
              <TableCell className="text-right">{r.clicks.toLocaleString('tr-TR')}</TableCell>
              <TableCell className="text-right">{r.impressions.toLocaleString('tr-TR')}</TableCell>
              <TableCell className="text-right">%{(r.ctr * 100).toFixed(1)}</TableCell>
              <TableCell className="text-right">{r.position.toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function AnalyticsPageQueries({ business }: AnalyticsPageQueriesProps) {
  const { data, isLoading, isError } = usePageQueries(business)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sayfa & Sorgu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sayfa & Sorgu</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Sayfa-sorgu verileri yuklenemedi. Veriler dogrudan GSC API'den canli cekilir, bu islem biraz zaman alabilir.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            Sayfa & Sorgu ({data.rows.length})
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {data.period.start} - {data.period.end}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {data.rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">Veri bulunamadi.</p>
        ) : (
          <PageQueriesTable rows={data.rows} />
        )}
      </CardContent>
    </Card>
  )
}
