'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { FileText, BarChart3, Search, Map, ArrowLeftRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useHasPermission } from '@/hooks/use-permissions'
import type { Permission } from '@/types/auth'

interface NavItem {
  label: string
  href: string
  icon: typeof BarChart3
  permission?: Permission
}

const navItems: NavItem[] = [
  { label: 'Özet', href: '', icon: BarChart3 },
  { label: 'Yazılar', href: '/posts', icon: FileText },
  { label: 'Analitik', href: '/analytics', icon: BarChart3 },
  { label: 'Anahtar Kelimeler', href: '/keywords', icon: Search, permission: 'read:keywords' },
  { label: 'Sitemap', href: '/sitemap', icon: Map, permission: 'read:sitemap' },
  { label: 'Redirects', href: '/redirects', icon: ArrowLeftRight, permission: 'read:redirects' },
]

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const params = useParams()
  const business = params.business as string

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Sub Navigation */}
      <div className="mb-6 flex items-center gap-1 overflow-x-auto border-b border-border pb-px">
        {navItems.map((item) => (
          <NavTab key={item.href} item={item} business={business} pathname={pathname} />
        ))}
      </div>

      {children}
    </div>
  )
}

function NavTab({
  item,
  business,
  pathname,
}: {
  item: NavItem
  business: string
  pathname: string
}) {
  const hasAccess = useHasPermission(item.permission || 'read:own_business')

  if (item.permission && !hasAccess) return null

  const href = `/${business}${item.href}`
  const isActive =
    item.href === ''
      ? pathname === `/${business}`
      : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2 text-sm transition-colors',
        isActive
          ? 'border-accent text-foreground font-medium'
          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  )
}
