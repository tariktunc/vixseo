'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { Plus, AlertTriangle, Pencil, Trash2, FileJson } from 'lucide-react'

import type { PostMeta } from '@/types/post'
import { usePosts, useDeleteCollectionItem } from '@/hooks/use-posts'
import { useHasPermission } from '@/hooks/use-permissions'
import { PostsTable } from './posts-table'
import { PostFormDialog } from './post-form-dialog'
import { BulkPostDialog } from './bulk-post-dialog'
import { BulkCollectionDialog } from './bulk-collection-dialog'
import { CollectionItemDialog } from './collection-item-dialog'
import { DeleteConfirmDialog } from './delete-confirm-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type WixCollection = {
  id: string
  displayName: string
  collectionType: string
}

type WixDataItem = {
  id: string
  data: Record<string, unknown>
}

function useCollections(business: string) {
  return useQuery<{ collections: WixCollection[] }>({
    queryKey: ['collections', business],
    queryFn: async () => {
      const res = await fetch(`/api/${business}/collections`)
      if (!res.ok) throw new Error('Koleksiyonlar yüklenemedi')
      return res.json()
    },
    staleTime: 10 * 60 * 1000,
  })
}

function useCollectionItems(business: string, collectionId: string | null) {
  return useQuery<{ items: WixDataItem[]; total: number }>({
    queryKey: ['collection-items', business, collectionId],
    queryFn: async () => {
      const res = await fetch(
        `/api/${business}/collections?collectionId=${encodeURIComponent(collectionId!)}`
      )
      if (!res.ok) throw new Error('Öğeler yüklenemedi')
      return res.json()
    },
    enabled: !!collectionId,
    staleTime: 5 * 60 * 1000,
  })
}

function formatCellValue(value: unknown): string {
  if (value == null) return '-'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (typeof value === 'object') return JSON.stringify(value).slice(0, 100)
  return String(value)
}

function CollectionItemsTable({
  business,
  collectionId,
  collectionName,
}: {
  business: string
  collectionId: string
  collectionName: string
}) {
  const { data, isLoading } = useCollectionItems(business, collectionId)
  const canWrite = useHasPermission('write:publish')
  const deleteMutation = useDeleteCollectionItem(business, collectionId)

  const [editItem, setEditItem] = useState<WixDataItem | null>(null)
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<WixDataItem | null>(null)

  if (isLoading) {
    return <Skeleton className="h-64 rounded-xl" />
  }

  if (!data?.items.length) {
    return (
      <div className="space-y-3">
        {canWrite && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setBulkDialogOpen(true)}>
              <FileJson className="mr-1.5 h-4 w-4" />
              Toplu Ekle
            </Button>
            <Button size="sm" onClick={() => setNewDialogOpen(true)}>
              <Plus className="mr-1.5 h-4 w-4" />
              Yeni Öğe Ekle
            </Button>
          </div>
        )}
        <p className="py-8 text-center text-sm text-muted-foreground">
          Bu koleksiyonda öğe bulunamadı
        </p>
        {canWrite && (
          <>
            <CollectionItemDialog
              business={business}
              collectionId={collectionId}
              collectionName={collectionName}
              open={newDialogOpen}
              onOpenChange={setNewDialogOpen}
              columns={[]}
            />
            <BulkCollectionDialog
              business={business}
              collectionId={collectionId}
              collectionName={collectionName}
              columns={[]}
              open={bulkDialogOpen}
              onOpenChange={setBulkDialogOpen}
            />
          </>
        )}
      </div>
    )
  }

  // İlk öğeden kolon isimlerini al (sistem alanları hariç)
  const allKeys = new Set<string>()
  data.items.forEach((item) => {
    Object.keys(item.data).forEach((key) => {
      if (!key.startsWith('_')) allKeys.add(key)
    })
  })
  const columns = Array.from(allKeys).slice(0, 5)

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      await deleteMutation.mutateAsync(deleteTarget.id)
      toast.success('Öğe silindi')
      setDeleteTarget(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Öğe silinemedi'
      toast.error(message)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data.total} öğe</p>
        {canWrite && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setBulkDialogOpen(true)}>
              <FileJson className="mr-1.5 h-4 w-4" />
              Toplu Ekle
            </Button>
            <Button size="sm" onClick={() => setNewDialogOpen(true)}>
              <Plus className="mr-1.5 h-4 w-4" />
              Yeni Öğe Ekle
            </Button>
          </div>
        )}
      </div>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col} className="capitalize">
                  {col}
                </TableHead>
              ))}
              {canWrite && <TableHead>İşlemler</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.slice(0, 50).map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={col} className="max-w-[250px] truncate text-xs">
                    {formatCellValue(item.data[col])}
                  </TableCell>
                ))}
                {canWrite && (
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger>
                          <span tabIndex={0} className="inline-flex">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => setEditItem(item)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Düzenle</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <span tabIndex={0} className="inline-flex">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => setDeleteTarget(item)}
                            >
                              <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Sil</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Yeni öğe dialog */}
      {canWrite && (
        <CollectionItemDialog
          business={business}
          collectionId={collectionId}
          collectionName={collectionName}
          open={newDialogOpen}
          onOpenChange={setNewDialogOpen}
          columns={columns}
        />
      )}

      {/* Düzenleme dialog */}
      {canWrite && editItem && (
        <CollectionItemDialog
          business={business}
          collectionId={collectionId}
          collectionName={collectionName}
          open={!!editItem}
          onOpenChange={(open) => !open && setEditItem(null)}
          editItem={editItem}
          columns={columns}
        />
      )}

      {/* Toplu öğe ekleme dialog */}
      {canWrite && (
        <BulkCollectionDialog
          business={business}
          collectionId={collectionId}
          collectionName={collectionName}
          columns={columns}
          open={bulkDialogOpen}
          onOpenChange={setBulkDialogOpen}
        />
      )}

      {/* Silme onay dialog */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Öğeyi Sil"
        description="Bu öğe kalıcı olarak silinecek. Bu işlem geri alınamaz."
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  )
}

export function PostsContent({ business }: { business: string }) {
  const { data: posts, isLoading: postsLoading } = usePosts(business)
  const { data: collectionsData, isLoading: collectionsLoading } = useCollections(business)
  const canWrite = useHasPermission('write:publish')

  const [postFormOpen, setPostFormOpen] = useState(false)
  const [bulkPostOpen, setBulkPostOpen] = useState(false)
  const [editPost, setEditPost] = useState<PostMeta | null>(null)

  const handleEdit = useCallback((post: PostMeta) => {
    setEditPost(post)
    setPostFormOpen(true)
  }, [])

  function handleNewPost() {
    setEditPost(null)
    setPostFormOpen(true)
  }

  if (postsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-64 rounded-md" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    )
  }

  const collections = collectionsData?.collections || []
  const hasCms = collections.length > 0

  return (
    <>
      <Tabs defaultValue="blog">
        <div className="flex items-center justify-between gap-4">
          <TabsList variant="line">
            <TabsTrigger value="blog">
              Blog Yazıları
              <Badge variant="secondary" className="ml-1 text-xs">
                {posts?.length || 0}
              </Badge>
            </TabsTrigger>
            {collectionsLoading ? (
              <Skeleton className="h-7 w-24 rounded-md" />
            ) : hasCms ? (
              collections.map((col) => (
                <TabsTrigger key={col.id} value={col.id}>
                  {col.displayName}
                </TabsTrigger>
              ))
            ) : (
              <div className="flex items-center gap-1 px-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-3 w-3" />
                CMS erişimi yok
              </div>
            )}
          </TabsList>

          {canWrite && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setBulkPostOpen(true)}>
                <FileJson className="mr-1.5 h-4 w-4" />
                Toplu Ekle
              </Button>
              <Button size="sm" onClick={handleNewPost}>
                <Plus className="mr-1.5 h-4 w-4" />
                Yeni Yazı
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="blog" className="mt-4">
          <p className="mb-2 text-sm text-muted-foreground">{posts?.length || 0} yazı</p>
          <PostsTable
            posts={posts || []}
            business={business}
            onEdit={handleEdit}
          />
        </TabsContent>

        {collections.map((col) => (
          <TabsContent key={col.id} value={col.id} className="mt-4">
            <CollectionItemsTable
              business={business}
              collectionId={col.id}
              collectionName={col.displayName}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Yazı oluşturma/düzenleme dialog */}
      {canWrite && (
        <PostFormDialog
          business={business}
          open={postFormOpen}
          onOpenChange={setPostFormOpen}
          editPost={editPost}
        />
      )}

      {/* Toplu yazı gönderim dialog */}
      {canWrite && (
        <BulkPostDialog
          business={business}
          open={bulkPostOpen}
          onOpenChange={setBulkPostOpen}
        />
      )}
    </>
  )
}
