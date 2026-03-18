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

interface AuditIssue {
  postSlug: string | null
  wixId?: string | null
  field: string | null
  severity: string | null
  detail: string | null
}

const severityColor: Record<string, string> = {
  kritik: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  orta: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  dusuk: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
}

export function AuditResultsTable({ issues }: { issues: AuditIssue[] }) {
  if (issues.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Sorun bulunamadı</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Post Slug</TableHead>
          <TableHead>Alan</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Detay</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue, i) => (
          <TableRow key={i}>
            <TableCell className="text-xs font-mono">{issue.postSlug || '—'}</TableCell>
            <TableCell className="text-xs">{issue.field || '—'}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={`text-xs ${severityColor[issue.severity || ''] || ''}`}
              >
                {issue.severity || '—'}
              </Badge>
            </TableCell>
            <TableCell className="max-w-[300px] truncate text-xs">{issue.detail || '—'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
