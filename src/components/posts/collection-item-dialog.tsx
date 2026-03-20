'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import {
  useCreateCollectionItem,
  useUpdateCollectionItem,
} from '@/hooks/use-posts'
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
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

type WixDataItem = {
  id: string
  data: Record<string, unknown>
}

type CollectionItemDialogProps = {
  business: string
  collectionId: string
  collectionName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  editItem?: WixDataItem | null
  columns: string[]
}

function inferFieldType(value: unknown): 'string' | 'number' | 'boolean' {
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'boolean'
  return 'string'
}

export function CollectionItemDialog({
  business,
  collectionId,
  collectionName,
  open,
  onOpenChange,
  editItem,
  columns,
}: CollectionItemDialogProps) {
  const isEdit = !!editItem
  const createMutation = useCreateCollectionItem(business, collectionId)
  const updateMutation = useUpdateCollectionItem(business, collectionId)

  const [formData, setFormData] = useState<Record<string, unknown>>({})

  useEffect(() => {
    if (editItem) {
      const filtered: Record<string, unknown> = {}
      columns.forEach((col) => {
        filtered[col] = editItem.data[col] ?? ''
      })
      setFormData(filtered)
    } else {
      const empty: Record<string, unknown> = {}
      columns.forEach((col) => {
        empty[col] = ''
      })
      setFormData(empty)
    }
  }, [editItem, columns])

  function updateField(key: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    try {
      if (isEdit && editItem) {
        await updateMutation.mutateAsync({ itemId: editItem.id, data: formData })
        toast.success('Öğe güncellendi')
      } else {
        await createMutation.mutateAsync(formData)
        toast.success('Öğe oluşturuldu')
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
          <DialogTitle>
            {isEdit ? 'Öğeyi Düzenle' : 'Yeni Öğe'}
          </DialogTitle>
          <DialogDescription>
            {collectionName} koleksiyonu
            {isEdit ? ' — mevcut öğeyi güncelleyin.' : ' — yeni bir öğe ekleyin.'}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
          {columns.map((col) => {
            const currentValue = formData[col]
            const fieldType = editItem
              ? inferFieldType(editItem.data[col])
              : 'string'

            if (fieldType === 'boolean') {
              return (
                <div key={col} className="flex items-center gap-2">
                  <Checkbox
                    checked={!!currentValue}
                    onCheckedChange={(val) => updateField(col, val)}
                  />
                  <Label className="capitalize">{col}</Label>
                </div>
              )
            }

            return (
              <div key={col} className="space-y-1.5">
                <Label className="capitalize">{col}</Label>
                <Input
                  type={fieldType === 'number' ? 'number' : 'text'}
                  value={String(currentValue ?? '')}
                  onChange={(e) =>
                    updateField(
                      col,
                      fieldType === 'number'
                        ? Number(e.target.value)
                        : e.target.value
                    )
                  }
                  placeholder={col}
                />
              </div>
            )
          })}
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : null}
            {isEdit ? 'Güncelle' : 'Kaydet'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
