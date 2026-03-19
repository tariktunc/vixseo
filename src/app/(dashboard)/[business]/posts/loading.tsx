import { Skeleton } from '@/components/ui/skeleton'

export default function PostsLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-9 w-64 rounded-md" />
      <div className="rounded-xl border">
        <div className="p-3 border-b flex gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="p-3 border-b flex gap-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
