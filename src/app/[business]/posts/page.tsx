import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { PostsContent } from '@/components/posts/posts-content'

function PostsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-9 w-64 rounded-md" />
      </div>
      <div className="rounded-xl border border-border">
        <div className="p-3 border-b border-border flex gap-8">
          {['Başlık', 'SEO Title', 'Description', 'Dil', 'SEO'].map((h) => (
            <Skeleton key={h} className="h-4 w-20" />
          ))}
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-3 border-b border-border flex gap-8">
            <div className="w-[300px]">
              <Skeleton className="h-4 w-48 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-5 w-8 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ business: string }>
}) {
  const { business } = await params

  return (
    <div className="space-y-4">
      {/* Static — anında */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Yazılar</h2>
      </div>

      {/* Dynamic — Suspense */}
      <Suspense fallback={<PostsSkeleton />}>
        <PostsContent business={business} />
      </Suspense>
    </div>
  )
}
