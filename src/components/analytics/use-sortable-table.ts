import { useState, useMemo } from 'react'

type SortDirection = 'asc' | 'desc'

type SortState<K extends string> = {
  key: K
  direction: SortDirection
}

export function useSortableTable<T, K extends string>(
  data: T[],
  defaultSortKey: K,
  defaultDirection: SortDirection = 'desc',
  accessor: (item: T, key: K) => number | string
) {
  const [sort, setSort] = useState<SortState<K>>({
    key: defaultSortKey,
    direction: defaultDirection,
  })

  const sorted = useMemo(() => {
    const copy = [...data]
    copy.sort((a, b) => {
      const aVal = accessor(a, sort.key)
      const bVal = accessor(b, sort.key)
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sort.direction === 'asc' ? aVal - bVal : bVal - aVal
      }
      const aStr = String(aVal)
      const bStr = String(bVal)
      return sort.direction === 'asc'
        ? aStr.localeCompare(bStr, 'tr')
        : bStr.localeCompare(aStr, 'tr')
    })
    return copy
  }, [data, sort, accessor])

  const toggleSort = (key: K) => {
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }))
  }

  return { sorted, sort, toggleSort }
}
