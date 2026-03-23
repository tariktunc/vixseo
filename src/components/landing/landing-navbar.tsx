'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/nextjs'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Özellikler', href: '/features' },
  { label: 'Nasıl Çalışır', href: '/how-it-works' },
  { label: 'Fiyatlar', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'SSS', href: '/faq' },
]

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pathname = usePathname()
  const forceDarkBg = pathname.startsWith('/docs') || pathname.startsWith('/privacy-policy') || pathname.startsWith('/terms-of-use') || pathname.startsWith('/kvkk')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || forceDarkBg
          ? 'bg-[#0F2447]/90 dark:bg-[#0B1120]/90 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo-dark.svg" alt="VixSEO" width={130} height={30} priority className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle className="text-slate-300 hover:text-white hover:bg-white/10" />
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Panele Git
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-8 w-8',
                  },
                }}
              />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Giriş Yap
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                >
                  Ücretsiz Başla
                </Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0F2447]/95 dark:bg-[#0B1120]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                {isSignedIn ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-white bg-emerald-500 hover:bg-emerald-600 rounded-md px-4 py-2 font-medium text-sm transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Panele Git
                  </Link>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white hover:bg-white/10 justify-start"
                      >
                        Giriş Yap
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        Ücretsiz Başla
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
