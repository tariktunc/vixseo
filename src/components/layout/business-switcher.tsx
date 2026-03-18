'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ChevronsUpDown, Building2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useBusinesses } from '@/hooks/use-businesses'
import { useHasPermission } from '@/hooks/use-permissions'

export function BusinessSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: businesses, isLoading } = useBusinesses()
  const canManageBusinesses = useHasPermission('admin:businesses')

  // Aktif işletmeyi path'ten çıkar
  const segments = pathname.split('/')
  const activeBusiness = businesses?.find((b) => b.name === segments[1])

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled className="w-40">
        <Building2 className="mr-2 h-4 w-4" />
        Yükleniyor...
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-9 w-40 items-center justify-between rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent/10">
        <div className="flex items-center gap-2 truncate">
          <Building2 className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {activeBusiness ? activeBusiness.domain : 'Tüm İşletmeler'}
          </span>
        </div>
        <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem onClick={() => router.push('/dashboard')}>
          <Building2 className="mr-2 h-4 w-4" />
          Tüm İşletmeler
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {businesses?.map((b) => (
          <DropdownMenuItem key={b.id} onClick={() => router.push(`/${b.name}`)}>
            <span
              className={`mr-2 h-2 w-2 rounded-full ${b.wixKeyConfigured ? 'bg-accent' : 'bg-destructive'}`}
            />
            {b.domain}
          </DropdownMenuItem>
        ))}
        {canManageBusinesses && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni İşletme Ekle
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
