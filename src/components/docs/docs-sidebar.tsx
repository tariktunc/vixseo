'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sparkles,
  BookOpen,
  Star,
  CreditCard,
  Wrench,
  Rocket,
  Search,
  Globe,
  MessageCircle,
  Menu,
} from 'lucide-react'

import type { DocCategory } from '@/lib/docs-data'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

type IconComponent = typeof BookOpen

const iconMap: Record<string, IconComponent> = {
  'rocket': Rocket,
  'star': Star,
  'credit-card': CreditCard,
  'wrench': Wrench,
  'search': Search,
  'globe': Globe,
  'message-circle': MessageCircle,
  'sparkles': Sparkles,
  'BookOpen': BookOpen,
}

const PLATFORM_CATEGORY_IDS = ['getting-started', 'features', 'billing', 'troubleshooting']
const SEO_CATEGORY_IDS = ['seo-temelleri', 'sem-reklam', 'ai-seo', 'geo', 'aeo']

// Only sidebar-relevant fields to avoid serializing full article HTML content
type SidebarArticle = {
  id: string
  categoryId: string
  title: string
}

type DocsSidebarProps = {
  categories: DocCategory[]
  articles: SidebarArticle[]
}

function SidebarContent({
  categories,
  articles,
  pathname,
  onLinkClick,
}: DocsSidebarProps & { pathname: string; onLinkClick?: () => void }) {
  const platformCategories = categories.filter(c => PLATFORM_CATEGORY_IDS.includes(c.id))
  const seoCategories = categories.filter(c => SEO_CATEGORY_IDS.includes(c.id))

  const renderCategory = (category: DocCategory) => {
    const Icon = iconMap[category.icon] || BookOpen
    const categoryArticles = articles.filter(a => a.categoryId === category.id)
    const count = categoryArticles.length

    return (
      <div key={category.id} className="space-y-2">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="truncate">{category.title}</span>
          {count > 0 && (
            <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 h-4">
              {count}
            </Badge>
          )}
        </h4>
        <ul className="space-y-1 border-l border-border/50 ml-2 pl-4">
          {categoryArticles.map(article => {
            const href = `/docs/${category.id}/${article.id}`
            const isActive = pathname === href

            return (
              <li key={article.id}>
                <Link
                  href={href}
                  onClick={onLinkClick}
                  className={`text-sm block py-0.5 transition-colors ${
                    isActive
                      ? 'text-emerald-500 font-medium'
                      : 'text-muted-foreground hover:text-emerald-500'
                  }`}
                >
                  {article.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        href="/docs"
        onClick={onLinkClick}
        className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-emerald-500 transition-colors"
      >
        <Sparkles className="w-5 h-5 text-emerald-500" />
        Bilgi Bankasi
      </Link>

      {/* Platform Rehberi */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Platform Rehberi
        </p>
        {platformCategories.map(renderCategory)}
      </div>

      <Separator className="my-2" />

      {/* SEO Bilgi Bankasi */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          SEO Bilgi Bankasi
        </p>
        {seoCategories.map(renderCategory)}
      </div>
    </div>
  )
}

export function DocsSidebar({ categories, articles }: DocsSidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden sticky top-16 z-30 bg-background/80 backdrop-blur-sm border-b border-border/50 p-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="outline" size="sm" className="gap-2" />}
          >
            <Menu className="w-4 h-4" />
            Dokumantasyon Menusu
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Dokumantasyon</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <SidebarContent
                categories={categories}
                articles={articles}
                pathname={pathname}
                onLinkClick={() => setOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:block w-64 lg:w-72 shrink-0 border-r border-border/50"
        style={{ height: 'calc(100vh - 6rem)' }}
      >
        <div className="sticky top-24 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-6rem)]">
          <SidebarContent
            categories={categories}
            articles={articles}
            pathname={pathname}
          />
        </div>
      </aside>
    </>
  )
}
