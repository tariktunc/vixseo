'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, Shield, Building2 } from 'lucide-react'
import { toast } from 'sonner'
import { useBusinesses } from '@/hooks/use-businesses'
import { type Role, ROLE_LABELS } from '@/types/auth'

interface UserItem {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  imageUrl: string
  role: Role
  businessIds: string[]
  createdAt: number
  lastSignInAt: number | null
}

const ROLE_COLORS: Record<Role, string> = {
  admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  manager: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  editor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  viewer: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editUser, setEditUser] = useState<UserItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [editRole, setEditRole] = useState<Role>('viewer')
  const [editBusinessIds, setEditBusinessIds] = useState<string[]>([])
  const { data: businesses } = useBusinesses()

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error()
      const data = await res.json()
      setUsers(data)
    } catch {
      toast.error('Kullanıcılar yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const openEdit = (user: UserItem) => {
    setEditUser(user)
    setEditRole(user.role)
    setEditBusinessIds(user.businessIds || [])
  }

  const handleSave = async () => {
    if (!editUser) return
    setSaving(true)
    try {
      const res = await fetch(`/api/users/${editUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editRole, businessIds: editBusinessIds }),
      })
      if (!res.ok) throw new Error()
      toast.success('Kullanıcı güncellendi')
      setEditUser(null)
      fetchUsers()
    } catch {
      toast.error('Güncelleme başarısız')
    } finally {
      setSaving(false)
    }
  }

  const toggleBusiness = (name: string) => {
    setEditBusinessIds((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
    )
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-5 w-5" />
          <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Kullanıcı rollerini ve işletme erişimlerini yönetin
        </p>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>
                    {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className={ROLE_COLORS[user.role]} variant="secondary">
                  <Shield className="mr-1 h-3 w-3" />
                  {ROLE_LABELS[user.role]}
                </Badge>
                {user.businessIds.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <Building2 className="mr-1 h-3 w-3" />
                    {user.businessIds.length} işletme
                  </Badge>
                )}
                <Button variant="outline" size="sm" onClick={() => openEdit(user)}>
                  Düzenle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {users.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center py-12">
              <Users className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">Henüz kullanıcı yok</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Düzenleme Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcıyı Düzenle</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-6">
              {/* Kullanıcı bilgisi */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={editUser.imageUrl} />
                  <AvatarFallback>
                    {(editUser.firstName?.[0] || editUser.email[0]).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {editUser.firstName} {editUser.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{editUser.email}</p>
                </div>
              </div>

              {/* Rol seçimi */}
              <div>
                <label className="mb-2 block text-sm font-medium">Rol</label>
                <Select value={editRole} onValueChange={(v) => setEditRole(v as Role)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin — Tam yetki</SelectItem>
                    <SelectItem value="manager">Manager — Okuma + Yazma</SelectItem>
                    <SelectItem value="editor">Editor — Okuma + Araştırma</SelectItem>
                    <SelectItem value="viewer">Viewer — Sadece okuma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* İşletme ataması (viewer için önemli) */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Erişilebilir İşletmeler
                  {editRole !== 'viewer' && (
                    <span className="ml-2 text-xs text-muted-foreground font-normal">
                      (Bu rol tüm işletmelere erişebilir)
                    </span>
                  )}
                </label>
                <div className="space-y-2 rounded-lg border border-border p-3">
                  {businesses?.map((b) => (
                    <label
                      key={b.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={editBusinessIds.includes(b.name)}
                        onCheckedChange={() => toggleBusiness(b.name)}
                        disabled={editRole !== 'viewer'}
                      />
                      <span className="text-sm">{b.domain}</span>
                      <span className="text-xs text-muted-foreground">({b.name})</span>
                    </label>
                  ))}
                  {(!businesses || businesses.length === 0) && (
                    <p className="text-sm text-muted-foreground">İşletme bulunamadı</p>
                  )}
                </div>
              </div>

              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
