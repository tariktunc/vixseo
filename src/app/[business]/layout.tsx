'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { FileText, BarChart3, Search, Map, ArrowLeftRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Özet', href: '', icon: BarChart3 },
  { label: 'Yazılar', href: '/posts', icon: FileText },
  { label: 'Analitik', href: '/analytics', icon: BarChart3 },
  { label: 'Anahtar Kelimeler', href: '/keywords', icon: Search },
  { label: 'Sitemap', href: '/sitemap', icon: Map },
  { label: 'Redirects', href: '/redirects', icon: ArrowLeftRight },
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
        {navItems.map((item) => {
          const href = `/${business}${item.href}`
          const isActive =
            item.href === ''
              ? pathname === `/${business}`
              : pathname.startsWith(href)

          return (
            <Link
              key={item.href}
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
        })}
      </div>

      {children}
    </div>
  )
}
