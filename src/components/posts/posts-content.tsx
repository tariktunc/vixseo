'use client'

import { usePosts } from '@/hooks/use-posts'
import { PostsTable } from './posts-table'
import { Skeleton } from '@/components/ui/skeleton'

export function PostsContent({ business }: { business: string }) {
  const { data: posts, isLoading } = usePosts(business)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-64 rounded-md" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  return (
    <>
      <p className="text-sm text-muted-foreground">{posts?.length || 0} yazı</p>
      <PostsTable posts={posts || []} />
    </>
  )
}
