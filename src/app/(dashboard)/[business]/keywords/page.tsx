import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { KeywordsContent } from '@/components/keywords/keywords-content'

function KeywordsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Uyarı banner skeleton */}
      <Skeleton className="h-10 w-full rounded-lg" />
      {/* Arama bölümü skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-64 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
      {/* Tablo skeleton */}
      <div className="rounded-xl border border-border">
        <div className="p-3 border-b border-border flex gap-8">
          {['Anahtar Kelime', 'Aylık Hacim', 'Rekabet', 'Tarih'].map((h) => (
            <Skeleton key={h} className="h-4 w-24" />
          ))}
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-3 border-b border-border flex gap-8">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function KeywordsPage({
  params,
}: {
  params: Promise<{ business: string }>
}) {
  const { business } = await params

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Anahtar Kelime Araştırma</h2>
      </div>

      <Suspense fallback={<KeywordsSkeleton />}>
        <KeywordsContent business={business} />
      </Suspense>
    </div>
  )
}
