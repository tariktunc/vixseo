'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface KeywordRow {
  keyword: string
  avgMonthly: number | null
  competition: string | null
}

const competitionColor: Record<string, string> = {
  LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  HIGH: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  UNKNOWN: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
}

export function KeywordResultsTable({ results }: { results: KeywordRow[] }) {
  if (results.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Sonuç bulunamadı</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Anahtar Kelime</TableHead>
          <TableHead className="text-right">Aylık Hacim</TableHead>
          <TableHead className="text-right">Rekabet</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((r, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{r.keyword}</TableCell>
            <TableCell className="text-right">
              {r.avgMonthly != null ? r.avgMonthly.toLocaleString('tr-TR') : '—'}
            </TableCell>
            <TableCell className="text-right">
              {r.competition ? (
                <Badge variant="outline" className={competitionColor[r.competition] || ''}>
                  {r.competition === 'LOW'
                    ? 'Düşük'
                    : r.competition === 'MEDIUM'
                      ? 'Orta'
                      : r.competition === 'HIGH'
                        ? 'Yüksek'
                        : 'Bilinmiyor'}
                </Badge>
              ) : (
                '—'
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
