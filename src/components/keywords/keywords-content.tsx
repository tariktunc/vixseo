'use client'

import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AlertTriangle, Search, ArrowUpDown } from 'lucide-react'
import { useKeywords } from '@/hooks/use-keywords'
import { Skeleton } from '@/components/ui/skeleton'
import type { KeywordResult } from '@/types/keyword'

function competitionBadge(competition: string | null) {
  if (!competition) return <span className="text-xs text-muted-foreground">-</span>
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    LOW: 'secondary',
    MEDIUM: 'default',
    HIGH: 'destructive',
  }
  const labels: Record<string, string> = {
    LOW: 'Düşük',
    MEDIUM: 'Orta',
    HIGH: 'Yüksek',
  }
  return (
    <Badge variant={variants[competition] || 'outline'} className="text-xs">
      {labels[competition] || competition}
    </Badge>
  )
}

export function KeywordsContent({ business }: { business: string }) {
  const { data: keywords, isLoading } = useKeywords(business)
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<KeywordResult>[]>(
    () => [
      {
        accessorKey: 'keyword',
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Anahtar Kelime
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <p className="font-medium text-sm">{row.original.keyword}</p>
        ),
      },
      {
        accessorKey: 'avgMonthly',
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Aylık Ort. Hacim
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <p className="text-sm">
            {row.original.avgMonthly != null
              ? row.original.avgMonthly.toLocaleString('tr-TR')
              : '-'}
          </p>
        ),
      },
      {
        accessorKey: 'competition',
        header: 'Rekabet',
        cell: ({ row }) => competitionBadge(row.original.competition),
      },
      {
        accessorKey: 'searchedAt',
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tarih
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => {
          const date = row.original.searchedAt
          if (!date) return <span className="text-xs text-muted-foreground">-</span>
          return (
            <p className="text-xs text-muted-foreground">
              {new Date(date).toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: keywords || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 25 } },
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-64 rounded-md" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* API Onay Uyarısı */}
      <div className="flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-200">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <p>Google Ads API onayı bekleniyor. Onay sonrası aktif olacak.</p>
      </div>

      {/* Arama Bölümü */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Anahtar kelime ara..."
          disabled
          className="max-w-sm opacity-50 cursor-not-allowed"
        />
        <Tooltip>
          <TooltipTrigger>
            <span tabIndex={0} className="inline-flex">
              <Button disabled className="pointer-events-none">
                <Search className="mr-1 h-4 w-4" />
                Ara
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>API onayı bekleniyor</TooltipContent>
        </Tooltip>
      </div>

      {/* Geçmiş Aramalar Tablosu */}
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Henüz arama yapılmadı
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {keywords?.length || 0} anahtar kelime
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Önceki
          </Button>
          <span className="text-sm text-muted-foreground">
            Sayfa {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  )
}
