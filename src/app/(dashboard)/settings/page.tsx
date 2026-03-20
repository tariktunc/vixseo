'use client'

import { useBusinesses, useCreateBusiness, useDeleteBusiness } from '@/hooks/use-businesses'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Trash2, Globe, AlertCircle, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBusinessSchema, type CreateBusiness } from '@/types/business'
import { toast } from 'sonner'
import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const { data: businesses, isLoading } = useBusinesses()
  const createMutation = useCreateBusiness()
  const deleteMutation = useDeleteBusiness()
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(createBusinessSchema) as any,
    defaultValues: { name: '', domain: '', siteId: '', memberId: '', language: 'tr', searchConsoleUrl: '' },
  })

  const onSubmit = async (data: CreateBusiness) => {
    try {
      await createMutation.mutateAsync(data)
      toast.success('İşletme eklendi')
      form.reset()
      setOpen(false)
    } catch {
      toast.error('İşletme eklenemedi')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" işletmesini silmek istediğinize emin misiniz?`)) return
    try {
      await deleteMutation.mutateAsync(id)
      toast.success('İşletme silindi')
    } catch {
      toast.error('İşletme silinemedi')
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ayarlar</h1>
          <p className="text-sm text-muted-foreground">İşletme yönetimi ve API durumu</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/settings/users">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Kullanıcılar
            </Button>
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni İşletme Ekle
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni İşletme Ekle</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">İşletme Adı (slug)</Label>
                  <Input id="name" placeholder="blakfy" {...form.register('name')} />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input id="domain" placeholder="blakfy.com" {...form.register('domain')} />
                </div>
                <div>
                  <Label htmlFor="siteId">Wix Site ID</Label>
                  <Input id="siteId" placeholder="xxx-xxx-xxx" {...form.register('siteId')} />
                </div>
                <div>
                  <Label htmlFor="memberId">Member ID (opsiyonel)</Label>
                  <Input id="memberId" {...form.register('memberId')} />
                </div>
                <div>
                  <Label htmlFor="searchConsoleUrl">Search Console URL (opsiyonel)</Label>
                  <Input
                    id="searchConsoleUrl"
                    placeholder="https://www.blakfy.com/"
                    {...form.register('searchConsoleUrl')}
                  />
                </div>

                <div className="flex items-start gap-2 rounded-lg bg-muted p-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-chart-4" />
                  <p className="text-xs text-muted-foreground">
                    API key&apos;leri Vercel Dashboard &rarr; Settings &rarr; Environment Variables
                    bölümünden ekleyin. Format: <code>WIX_SITE_ID_ISLETME_ADI</code>
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Ekleniyor...' : 'Ekle'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* İşletme Listesi */}
      <div className="space-y-4">
        {businesses?.map((b) => (
          <Card key={b.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Globe className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">{b.domain}</p>
                  <p className="text-xs text-muted-foreground">
                    {b.name} &middot; {b.siteId.slice(0, 8)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <Tooltip>
                    <TooltipTrigger>
                      <span tabIndex={0} className="inline-flex">
                        <Badge variant={b.wixKeyConfigured ? 'default' : 'destructive'} className="text-xs">
                          Wix {b.wixKeyConfigured ? '✓' : '✗'}
                        </Badge>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {b.wixKeyConfigured
                        ? 'Bağlı'
                        : `WIX_SITE_ID_${b.name.toUpperCase()} env'e ekleyin`}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <span tabIndex={0} className="inline-flex">
                        <Badge variant={b.scKeyConfigured ? 'secondary' : 'outline'} className="text-xs">
                          SC {b.scKeyConfigured ? '✓' : '✗'}
                        </Badge>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {b.scKeyConfigured ? 'Bağlı' : 'GOOGLE_SERVICE_ACCOUNT_JSON eksik'}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <span tabIndex={0} className="inline-flex">
                        <Badge variant={b.adsKeyConfigured ? 'secondary' : 'outline'} className="text-xs">
                          Ads {b.adsKeyConfigured ? '✓' : '✗'}
                        </Badge>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {b.adsKeyConfigured ? 'Bağlı' : 'GOOGLE_ADS_DEVELOPER_TOKEN eksik'}
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(b.id, b.domain)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {businesses?.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Globe className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">Henüz işletme eklenmemiş</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
