'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Loader2 } from 'lucide-react'

interface AddRedirectDialogProps {
  onAdd: (data: { oldUrl: string; newUrl: string; note?: string }) => Promise<void>
  isPending: boolean
}

export function AddRedirectDialog({ onAdd, isPending }: AddRedirectDialogProps) {
  const [open, setOpen] = useState(false)
  const [oldUrl, setOldUrl] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onAdd({ oldUrl, newUrl, note: note || undefined })
    setOldUrl('')
    setNewUrl('')
    setNote('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>
        <Plus className="mr-1 h-3 w-3" />
        Redirect Ekle
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Redirect</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="oldUrl">Eski URL</Label>
            <Input
              id="oldUrl"
              value={oldUrl}
              onChange={(e) => setOldUrl(e.target.value)}
              placeholder="/eski-sayfa"
              required
            />
          </div>
          <div>
            <Label htmlFor="newUrl">Yeni URL</Label>
            <Input
              id="newUrl"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="/yeni-sayfa"
              required
            />
          </div>
          <div>
            <Label htmlFor="note">Not (opsiyonel)</Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Neden yönlendirme yapıldı?"
            />
          </div>
          <Button type="submit" disabled={isPending || !oldUrl || !newUrl} className="w-full">
            {isPending ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
            Ekle
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
