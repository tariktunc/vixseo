import { useUser } from '@clerk/nextjs'
import { type Role, type Permission, ROLE_PERMISSIONS, ROLE_HIERARCHY } from '@/types/auth'

interface UserMetadata {
  role?: Role
  businessIds?: string[]
}

export function useRole(): Role {
  const { user } = useUser()
  return (user?.publicMetadata as UserMetadata)?.role || 'viewer'
}

export function useHasPermission(permission: Permission): boolean {
  const role = useRole()
  return ROLE_PERMISSIONS[role].includes(permission)
}

export function useHasMinRole(minRole: Role): boolean {
  const role = useRole()
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minRole]
}

export function useCanAccessBusiness(businessName: string): boolean {
  const { user } = useUser()
  const metadata = user?.publicMetadata as UserMetadata | undefined
  const role = metadata?.role || 'viewer'
  if (role !== 'viewer') return true
  return metadata?.businessIds?.includes(businessName) ?? false
}

export function useUserMetadata(): UserMetadata {
  const { user } = useUser()
  return (user?.publicMetadata as UserMetadata) || {}
}
