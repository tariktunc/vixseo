'use client'

import { useCallback } from 'react'

import type { SCCountryBreakdown } from '@/types/analytics'
import { COUNTRY_NAMES } from '@/lib/constants'
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

type AnalyticsCountriesProps = {
  countries: SCCountryBreakdown[]
}

type CountrySortKey = 'country' | 'clicks' | 'impressions' | 'ctr' | 'position'

function countryAccessor(item: SCCountryBreakdown, key: CountrySortKey): number | string {
  switch (key) {
    case 'country':
      return COUNTRY_NAMES[item.country] || item.country
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

export function AnalyticsCountries({ countries }: AnalyticsCountriesProps) {
  const accessor = useCallback(countryAccessor, [])
  const { sorted, sort, toggleSort } = useSortableTable<SCCountryBreakdown, CountrySortKey>(
    countries,
    'clicks',
    'desc',
    accessor
  )

  if (countries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ulkeler</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Ulke verisi bulunamadi.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Ulkeler ({countries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader
                  label="Ulke"
                  sortKey="country"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as CountrySortKey)}
                />
                <SortableHeader
                  label="Tiklama"
                  sortKey="clicks"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as CountrySortKey)}
                  className="text-right"
                />
                <SortableHeader
                  label="Gosterim"
                  sortKey="impressions"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as CountrySortKey)}
                  className="text-right"
                />
                <SortableHeader
                  label="CTR"
                  sortKey="ctr"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as CountrySortKey)}
                  className="text-right"
                />
                <SortableHeader
                  label="Pozisyon"
                  sortKey="position"
                  currentKey={sort.key}
                  direction={sort.direction}
                  onSort={(k) => toggleSort(k as CountrySortKey)}
                  className="text-right"
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((c, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm font-medium">
                    <span className="mr-2 uppercase text-muted-foreground">{c.country}</span>
                    {COUNTRY_NAMES[c.country] || c.country.toUpperCase()}
                  </TableCell>
                  <TableCell className="text-right">{c.clicks.toLocaleString('tr-TR')}</TableCell>
                  <TableCell className="text-right">{c.impressions.toLocaleString('tr-TR')}</TableCell>
                  <TableCell className="text-right">%{(c.ctr * 100).toFixed(1)}</TableCell>
                  <TableCell className="text-right">{c.position.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
