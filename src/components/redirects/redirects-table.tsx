'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2 } from 'lucide-react'

interface Redirect {
  id: string
  oldUrl: string
  newUrl: string
  type: string | null
  status: string | null
  note: string | null
  createdAt: string | null
}

interface RedirectsTableProps {
  redirects: Redirect[]
  onDelete: (id: string) => void
  isDeleting: boolean
}

export function RedirectsTable({ redirects, onDelete, isDeleting }: RedirectsTableProps) {
  if (redirects.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Redirect bulunamadı</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Eski URL</TableHead>
          <TableHead>Yeni URL</TableHead>
          <TableHead>Tür</TableHead>
          <TableHead>Durum</TableHead>
          <TableHead>Not</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {redirects.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="max-w-[200px] truncate text-xs font-mono">{r.oldUrl}</TableCell>
            <TableCell className="max-w-[200px] truncate text-xs font-mono">{r.newUrl}</TableCell>
            <TableCell>
              <Badge variant="outline" className="text-xs">
                {r.type || '301'}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={`text-xs ${r.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}`}
              >
                {r.status || 'active'}
              </Badge>
            </TableCell>
            <TableCell className="max-w-[150px] truncate text-xs text-muted-foreground">
              {r.note || '—'}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(r.id)}
                disabled={isDeleting}
              >
                <Trash2 className="h-3 w-3 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
