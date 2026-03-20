'use client'

import { useCallback } from 'react'

import type { SCQuery } from '@/types/analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SortableHeader } from '@/components/analytics/sortable-header'
import { useSortableTable } from '@/components/analytics/use-sortable-table'

type AnalyticsQueriesProps = {
  queries: SCQuery[]
}

type QuerySortKey = 'query' | 'clicks' | 'impressions' | 'ctr' | 'position'

function queryAccessor(item: SCQuery, key: QuerySortKey): number | string {
  switch (key) {
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

export function AnalyticsQueries({ queries }: AnalyticsQueriesProps) {
  const accessor = useCallback(queryAccessor, [])
  const { sorted, sort, toggleSort } = useSortableTable<SCQuery, QuerySortKey>(
    queries,
    'clicks',
    'desc',
    accessor
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tum Sorgular ({queries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sorgu</TableHead>
                <SortableHeader
                  label="Tiklama"
                  sortKey="clicks"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as QuerySortKey)}
                  className="text-right"
                />
                <SortableHeader
                  label="Gosterim"
                  sortKey="impressions"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as QuerySortKey)}
                  className="text-right"
                />
                <SortableHeader
                  label="CTR"
                  sortKey="ctr"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as QuerySortKey)}
                  className="text-right"
                />
                <SortableHeader
                  label="Pozisyon"
                  sortKey="position"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as QuerySortKey)}
                  className="text-right"
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((q, i) => (
                <TableRow key={i}>
                  <TableCell className="max-w-[300px] truncate text-xs">{q.query}</TableCell>
                  <TableCell className="text-right">{q.clicks.toLocaleString('tr-TR')}</TableCell>
                  <TableCell className="text-right">{q.impressions.toLocaleString('tr-TR')}</TableCell>
                  <TableCell className="text-right">%{(q.ctr * 100).toFixed(1)}</TableCell>
                  <TableCell className="text-right">{q.position.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
