'use client'

import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
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
import { Search, ArrowUpDown, Info } from 'lucide-react'
import { useKeywords } from '@/hooks/use-keywords'
import { Skeleton } from '@/components/ui/skeleton'
import type { SCKeyword } from '@/types/keyword'

export function KeywordsContent({ business }: { business: string }) {
  const { data, isLoading } = useKeywords(business)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<SCKeyword>[]>(
    () => [
      {
        accessorKey: 'query',
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
          <p className="font-medium text-sm">{row.original.query}</p>
        ),
      },
      {
        accessorKey: 'clicks',
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tıklama
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <p className="text-sm text-right">
            {row.original.clicks?.toLocaleString('tr-TR') ?? '-'}
          </p>
        ),
      },
      {
        accessorKey: 'impressions',
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Gösterim
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <p className="text-sm text-right">
            {row.original.impressions?.toLocaleString('tr-TR') ?? '-'}
          </p>
        ),
      },
      {
        accessorKey: 'ctr',
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            CTR
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <p className="text-sm text-right">
            {row.original.ctr != null ? `%${(row.original.ctr * 100).toFixed(1)}` : '-'}
          </p>
        ),
      },
      {
        accessorKey: 'position',
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Pozisyon
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <p className="text-sm text-right">
            {row.original.position != null ? row.original.position.toFixed(1) : '-'}
          </p>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: data?.keywords || [],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

  if (!data?.hasScData) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Info className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">Henüz anahtar kelime verisi yok</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Önce Search Console sayfasından veri çekin
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Arama Bölümü */}
      <div className="flex items-center gap-2">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Anahtar kelime filtrele..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* GSC Sorgu Tablosu */}
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
                  Sonuç bulunamadı
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} / {data.total} anahtar kelime
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
