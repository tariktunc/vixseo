'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface SitemapEntry {
  url: string
  slug: string | null
  lastmod: string | null
  priority: number | null
  section: string | null
}

export function SitemapTable({ entries }: { entries: SitemapEntry[] }) {
  const [filter, setFilter] = useState('')

  const filtered = filter
    ? entries.filter(
        (e) =>
          e.url.toLowerCase().includes(filter.toLowerCase()) ||
          e.slug?.toLowerCase().includes(filter.toLowerCase())
      )
    : entries

  return (
    <div className="space-y-3">
      <Input
        placeholder="URL veya slug ile filtrele..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="max-h-[500px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Bölüm</TableHead>
              <TableHead>Son Güncelleme</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(0, 100).map((e, i) => (
              <TableRow key={i}>
                <TableCell className="max-w-[400px] truncate text-xs">{e.url}</TableCell>
                <TableCell className="text-xs font-mono">{e.slug || '—'}</TableCell>
                <TableCell>
                  {e.section && (
                    <Badge variant="outline" className="text-xs">
                      {e.section}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {e.lastmod || '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filtered.length > 100 && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} sonuçtan ilk 100 gösteriliyor
        </p>
      )}
    </div>
  )
}
