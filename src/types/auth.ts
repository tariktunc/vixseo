export type Role = 'admin' | 'manager' | 'editor' | 'viewer'

export type Permission =
  // Read
  | 'read:own_business'
  | 'read:all_businesses'
  | 'read:posts'
  | 'read:analytics'
  // Editor
  | 'read:keywords'
  | 'read:sitemap'
  | 'read:redirects'
  // Manager (write)
  | 'write:publish'
  | 'write:sync'
  | 'write:categories'
  | 'write:redirects'
  | 'write:audit'
  // Admin
  | 'admin:businesses'
  | 'admin:users'
  | 'admin:settings'

export const ROLE_HIERARCHY: Record<Role, number> = {
  viewer: 1,
  editor: 2,
  manager: 3,
  admin: 4,
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  viewer: [
    'read:own_business',
    'read:posts',
    'read:analytics',
  ],
  editor: [
    'read:own_business',
    'read:all_businesses',
    'read:posts',
    'read:analytics',
    'read:keywords',
    'read:sitemap',
    'read:redirects',
  ],
  manager: [
    'read:own_business',
    'read:all_businesses',
    'read:posts',
    'read:analytics',
    'read:keywords',
    'read:sitemap',
    'read:redirects',
    'write:publish',
    'write:sync',
    'write:categories',
    'write:redirects',
    'write:audit',
  ],
  admin: [
    'read:own_business',
    'read:all_businesses',
    'read:posts',
    'read:analytics',
    'read:keywords',
    'read:sitemap',
    'read:redirects',
    'write:publish',
    'write:sync',
    'write:categories',
    'write:redirects',
    'write:audit',
    'admin:businesses',
    'admin:users',
    'admin:settings',
  ],
}

export const ROLE_LABELS: Record<Role, string> = {
  viewer: 'Viewer',
  editor: 'Editor',
  manager: 'Manager',
  admin: 'Admin',
}
