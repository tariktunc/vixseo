'use client'

import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { toast } from 'sonner'
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
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ArrowUpDown, AlertTriangle, CheckCircle, Pencil, Trash2 } from 'lucide-react'
import type { PostMeta } from '@/types/post'
import { useDeletePost } from '@/hooks/use-posts'
import { useHasPermission } from '@/hooks/use-permissions'
import { DeleteConfirmDialog } from './delete-confirm-dialog'

type PostsTableProps = {
  posts: PostMeta[]
  business: string
  onEdit: (post: PostMeta) => void
}

function SeoScoreBadge({ post }: { post: PostMeta }) {
  const issues: string[] = []
  if (!post.seoTitle) issues.push('seoTitle eksik')
  if (!post.description) issues.push('description eksik')
  if (post.description && post.description.length < 120) issues.push('description kısa')
  if (post.categoryIds.length === 0) issues.push('kategorisiz')

  if (issues.length === 0) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <span tabIndex={0} className="inline-flex">
            <CheckCircle className="h-4 w-4 text-accent" />
          </span>
        </TooltipTrigger>
        <TooltipContent>SEO tamam</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <span tabIndex={0} className="inline-flex">
          <AlertTriangle className="h-4 w-4 text-chart-4" />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <ul className="list-disc pl-3 text-xs">
          {issues.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  )
}

export function PostsTable({ posts, business, onEdit }: PostsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<PostMeta | null>(null)

  const deleteMutation = useDeletePost(business)
  const canWrite = useHasPermission('write:publish')

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      await deleteMutation.mutateAsync(deleteTarget.id)
      toast.success('Yazı silindi')
      setDeleteTarget(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Yazı silinemedi'
      toast.error(message)
    }
  }

  const columns = useMemo<ColumnDef<PostMeta>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Başlık
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="max-w-[300px]">
            <p className="truncate font-medium text-sm">{row.original.title}</p>
            <p className="truncate text-xs text-muted-foreground">/{row.original.slug}</p>
          </div>
        ),
      },
      {
        accessorKey: 'seoTitle',
        header: 'SEO Başlığı',
        cell: ({ row }) => (
          <p className="max-w-[200px] truncate text-xs">
            {row.original.seoTitle || <span className="text-destructive">Eksik</span>}
          </p>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Açıklama',
        cell: ({ row }) => {
          const desc = row.original.description
          if (!desc) return <span className="text-xs text-destructive">Eksik</span>
          return (
            <Tooltip>
              <TooltipTrigger>
                <span tabIndex={0} className="inline-flex max-w-[180px]">
                  <p className="truncate text-xs">{desc}</p>
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="text-xs">{desc}</p>
                <p className="mt-1 text-xs text-muted-foreground">{desc.length} karakter</p>
              </TooltipContent>
            </Tooltip>
          )
        },
      },
      {
        accessorKey: 'language',
        header: 'Dil',
        cell: ({ row }) => (
          <Badge variant="outline" className="text-xs">
            {row.original.language.toUpperCase()}
          </Badge>
        ),
      },
      {
        id: 'seo',
        header: 'SEO',
        cell: ({ row }) => <SeoScoreBadge post={row.original} />,
      },
      ...(canWrite
        ? [
            {
              id: 'actions',
              header: 'İşlemler',
              cell: ({ row }: { row: { original: PostMeta } }) => (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit(row.original)}
                    title="Düzenle"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setDeleteTarget(row.original)}
                    title="Sil"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              ),
            } satisfies ColumnDef<PostMeta>,
          ]
        : []),
    ],
    [canWrite, onEdit]
  )

  const table = useReactTable({
    data: posts,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 25 } },
  })

  return (
    <>
      <div className="space-y-4">
        <Input
          placeholder="Yazı ara..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

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

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} / {posts.length} yazı
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Önceki
            </Button>
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

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Yazıyı Sil"
        description={`"${deleteTarget?.title}" yazısı kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  )
}
