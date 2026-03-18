'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Settings, Menu, X } from 'lucide-react'
import { Show, UserButton, SignInButton } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import { BusinessSwitcher } from './business-switcher'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useHasPermission } from '@/hooks/use-permissions'

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const canSettings = useHasPermission('admin:settings')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="VixSEO"
              width={140}
              height={32}
              className="dark:hidden"
              priority
            />
            <Image
              src="/logo-dark.svg"
              alt="VixSEO"
              width={140}
              height={32}
              className="hidden dark:block"
              priority
            />
          </Link>

          <Show when="signed-in">
            <BusinessSwitcher />
          </Show>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                pathname === '/dashboard'
                  ? 'bg-secondary text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Dashboard
            </Link>
            {canSettings && (
              <Link
                href="/settings"
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  pathname.startsWith('/settings')
                    ? 'bg-secondary text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Settings className="h-4 w-4" />
              </Link>
            )}
          </Show>
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </Show>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
          >
            Dashboard
          </Link>
          {canSettings && (
            <Link
              href="/settings"
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
            >
              Ayarlar
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
