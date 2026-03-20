import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { requirePermission } from '@/lib/auth'

export async function GET() {
  const guard = await requirePermission('admin:users')
  if (guard) return guard

  try {
    const client = await clerkClient()
    const { data: users } = await client.users.getUserList({ limit: 100 })

    const mapped = users.map((u) => ({
      id: u.id,
      email: u.emailAddresses[0]?.emailAddress || '',
      firstName: u.firstName,
      lastName: u.lastName,
      imageUrl: u.imageUrl,
      role: (u.publicMetadata as Record<string, unknown>)?.role || 'viewer',
      businessIds: (u.publicMetadata as Record<string, unknown>)?.businessIds || [],
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
    }))

    return NextResponse.json(mapped)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Kullanıcılar yüklenemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
