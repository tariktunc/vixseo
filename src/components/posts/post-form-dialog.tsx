'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import type { PostMeta, CreatePostData } from '@/types/post'
import { createPostSchema } from '@/types/post'
import { useCreatePost, useUpdatePost, useCategories } from '@/hooks/use-posts'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

type PostFormDialogProps = {
  business: string
  open: boolean
  onOpenChange: (open: boolean) => void
  editPost?: PostMeta | null
}

export function PostFormDialog({
  business,
  open,
  onOpenChange,
  editPost,
}: PostFormDialogProps) {
  const isEdit = !!editPost
  const createMutation = useCreatePost(business)
  const updateMutation = useUpdatePost(business)
  const { data: categories } = useCategories(business)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      seoTitle: '',
      description: '',
      language: 'tr',
    },
  })

  const seoTitleValue = watch('seoTitle')
  const descriptionValue = watch('description')

  // Düzenleme modunda mevcut verileri doldur
  useEffect(() => {
    if (editPost) {
      reset({
        title: editPost.title,
        seoTitle: editPost.seoTitle || '',
        description: editPost.description || '',
        language: editPost.language || 'tr',
      })
      setSelectedCategories(editPost.categoryIds || [])
    } else {
      reset({
        title: '',
        seoTitle: '',
        description: '',
        language: 'tr',
      })
      setSelectedCategories([])
    }
  }, [editPost, reset])

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  async function onSubmit(data: CreatePostData, publish: boolean) {
    try {
      if (isEdit && editPost) {
        await updateMutation.mutateAsync({
          postId: editPost.id,
          ...data,
          categoryIds: selectedCategories,
        })
        toast.success('Yazı güncellendi')
      } else {
        await createMutation.mutateAsync({
          ...data,
          categoryIds: selectedCategories,
          publish,
        })
        toast.success(publish ? 'Yazı yayınlandı' : 'Taslak kaydedildi')
      }
      onOpenChange(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bir hata oluştu'
      toast.error(message)
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Yazıyı Düzenle' : 'Yeni Yazı'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Yazının SEO alanlarını ve kategorilerini güncelleyin.'
              : 'Yeni bir blog yazısı oluşturun. Taslak olarak kaydedebilir veya doğrudan yayınlayabilirsiniz.'}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data, false))}
          className="space-y-4"
        >
          {/* Başlık */}
          <div className="space-y-1.5">
            <Label htmlFor="title">
              Başlık <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Yazı başlığı"
              {...register('title')}
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* SEO Başlığı */}
          <div className="space-y-1.5">
            <Label htmlFor="seoTitle">
              SEO Başlığı
              <span className="ml-1 text-xs text-muted-foreground">
                ({seoTitleValue?.length || 0}/60)
              </span>
            </Label>
            <Input
              id="seoTitle"
              placeholder="Arama sonuçlarında görünecek başlık"
              maxLength={60}
              {...register('seoTitle')}
              aria-invalid={!!errors.seoTitle}
            />
            {errors.seoTitle && (
              <p className="text-xs text-destructive">{errors.seoTitle.message}</p>
            )}
          </div>

          {/* Meta Açıklaması */}
          <div className="space-y-1.5">
            <Label htmlFor="description">
              Meta Açıklaması
              <span className="ml-1 text-xs text-muted-foreground">
                ({descriptionValue?.length || 0}/160)
              </span>
            </Label>
            <Textarea
              id="description"
              placeholder="Arama sonuçlarında görünecek açıklama"
              maxLength={160}
              {...register('description')}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* İçerik (HTML) */}
          <div className="space-y-1.5">
            <Label htmlFor="richContent">
              İçerik (HTML)
              <span className="ml-1 text-xs text-muted-foreground">(opsiyonel)</span>
            </Label>
            <Textarea
              id="richContent"
              placeholder="<p>Yazı içeriğini HTML formatında girin...</p>"
              rows={6}
              {...register('richContent')}
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Desteklenen etiketler: p, h1-h3, ul, ol, li, strong, em, a
            </p>
          </div>

          {/* Kategoriler */}
          {categories && categories.length > 0 && (
            <div className="space-y-1.5">
              <Label>Kategoriler</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors hover:bg-muted data-[selected=true]:border-primary data-[selected=true]:bg-primary/5"
                    data-selected={selectedCategories.includes(cat.id)}
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Dil */}
          <div className="space-y-1.5">
            <Label htmlFor="language">Dil</Label>
            <Input
              id="language"
              placeholder="tr"
              maxLength={5}
              {...register('language')}
            />
          </div>

          <DialogFooter>
            {!isEdit && (
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={handleSubmit((data) => onSubmit(data, true))}
              >
                {isPending ? (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                ) : null}
                Yayınla
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : null}
              {isEdit ? 'Güncelle' : 'Taslak Kaydet'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
