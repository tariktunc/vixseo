import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { type Role, type Permission, ROLE_PERMISSIONS } from '@/types/auth'

interface SessionMetadata {
  role?: Role
  businessIds?: string[]
}

export function getUserRole(sessionClaims: { metadata?: SessionMetadata } | null | undefined): Role {
  return sessionClaims?.metadata?.role || 'viewer'
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
 * Kullanım: const guard = await requirePermission(permission); if (guard) return guard;
 */
export async function requirePermission(permission: Permission): Promise<NextResponse | null> {
  const session = await auth()
  if (!session.userId) {
    return NextResponse.json({ error: 'Giriş yapılmamış' }, { status: 401 })
  }

  const role = getUserRole(session.sessionClaims as { metadata?: SessionMetadata })
  if (!hasPermission(role, permission)) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 })
  }

  return null
}

/**
 * API route guard — business erişim kontrolü.
 * viewer sadece kendi businessIds'indeki işletmelere erişebilir.
 */
export async function requireBusinessAccess(businessName: string): Promise<NextResponse | null> {
  const session = await auth()
  if (!session.userId) {
    return NextResponse.json({ error: 'Giriş yapılmamış' }, { status: 401 })
  }

  const metadata = (session.sessionClaims as { metadata?: SessionMetadata })?.metadata
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
  const metadata = (session.sessionClaims as { metadata?: SessionMetadata })?.metadata
  const role = getUserRole(session.sessionClaims as { metadata?: SessionMetadata })
  return { session, metadata, role }
}
