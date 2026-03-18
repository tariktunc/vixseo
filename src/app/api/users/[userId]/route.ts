import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { requirePermission } from '@/lib/auth'
import type { Role } from '@/types/auth'

const VALID_ROLES: Role[] = ['admin', 'manager', 'editor', 'viewer']

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const guard = await requirePermission('admin:users')
  if (guard) return guard

  try {
    const { userId } = await params
    const body = await request.json()
    const { role, businessIds } = body as { role?: Role; businessIds?: string[] }

    if (role && !VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: 'Geçersiz rol' }, { status: 400 })
    }

    const client = await clerkClient()

    // Mevcut metadata'yı al
    const user = await client.users.getUser(userId)
    const currentMetadata = (user.publicMetadata as any) || {}

    const newMetadata = {
      ...currentMetadata,
      ...(role !== undefined && { role }),
      ...(businessIds !== undefined && { businessIds }),
    }

    await client.users.updateUserMetadata(userId, {
      publicMetadata: newMetadata,
    })

    return NextResponse.json({ ok: true, metadata: newMetadata })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Kullanıcı güncellenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
