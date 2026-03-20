'use client'

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

import { TableHead } from '@/components/ui/table'

type SortableHeaderProps = {
  label: string
  sortKey: string
  currentKey: string
  direction: 'asc' | 'desc'
  onSort: (key: string) => void
  className?: string
}

export function SortableHeader({
  label,
  sortKey,
  currentKey,
  direction,
  onSort,
  className = '',
}: SortableHeaderProps) {
  const isActive = currentKey === sortKey

  return (
    <TableHead
      className={`cursor-pointer select-none hover:text-foreground ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive ? (
          direction === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </span>
    </TableHead>
  )
}
