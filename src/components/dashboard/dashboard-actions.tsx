'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useHasPermission } from '@/hooks/use-permissions'

export function DashboardActions() {
  const canManageBusinesses = useHasPermission('admin:businesses')

  if (!canManageBusinesses) return null

  return (
    <Link href="/settings">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Yeni İşletme
      </Button>
    </Link>
  )
}
