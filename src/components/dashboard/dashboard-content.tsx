'use client'

import { useBusinesses } from '@/hooks/use-businesses'
import { BusinessCard } from './business-card'
import { StatsOverview } from './stats-overview'
import { Skeleton } from '@/components/ui/skeleton'
import { Building2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function DashboardContent() {
  const { data: businesses, isLoading } = useBusinesses()

  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-4 flex items-center gap-4">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div>
                <Skeleton className="h-7 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">İşletmeler</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-xl" />
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <StatsOverview businesses={businesses || []} />

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">İşletmeler</h2>
        {businesses && businesses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
            <Building2 className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">Henüz işletme eklenmemiş</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Wix sitenizi ekleyerek başlayın
            </p>
            <Link href="/settings" className="mt-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                İlk İşletmeyi Ekle
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
