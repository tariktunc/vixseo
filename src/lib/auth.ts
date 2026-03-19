import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { type Role, type Permission, ROLE_PERMISSIONS } from '@/types/auth'

interface SessionMetadata {
  role?: Role
  businessIds?: string[]
}

async function getPublicMetadata(userId: string): Promise<SessionMetadata> {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    return (user.publicMetadata as SessionMetadata) || {}
  } catch {
    return {}
  }
}

export function getUserRole(metadata: SessionMetadata | undefined): Role {
  return metadata?.role || 'viewer'
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission)
}

export function canAccessBusiness(
  metadata: SessionMetadata | undefined,
  businessName: string
): boolean {
  const role = metadata?.role || 'viewer'
  if (role !== 'viewer') return true
  return metadata?.businessIds?.includes(businessName) ?? false
}

/**
 * API route guard — izin yoksa 403 döndürür.
 */
export async function requirePermission(permission: Permission): Promise<NextResponse | null> {
  const session = await auth()
  if (!session.userId) {
    return NextResponse.json({ error: 'Giriş yapılmamış' }, { status: 401 })
  }

  const metadata = await getPublicMetadata(session.userId)
  const role = getUserRole(metadata)
  if (!hasPermission(role, permission)) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 })
  }

  return null
}

/**
 * API route guard — business erişim kontrolü.
 */
export async function requireBusinessAccess(businessName: string): Promise<NextResponse | null> {
  const session = await auth()
  if (!session.userId) {
    return NextResponse.json({ error: 'Giriş yapılmamış' }, { status: 401 })
  }

  const metadata = await getPublicMetadata(session.userId)
  if (!canAccessBusiness(metadata, businessName)) {
    return NextResponse.json({ error: 'Bu işletmeye erişim yetkiniz yok' }, { status: 403 })
  }

  return null
}

/**
 * Mevcut oturumdaki rol ve metadata bilgisini döndürür.
 */
export async function getSessionAuth() {
  const session = await auth()
  const metadata = session.userId ? await getPublicMetadata(session.userId) : undefined
  const role = getUserRole(metadata)
  return { session, metadata, role }
}
