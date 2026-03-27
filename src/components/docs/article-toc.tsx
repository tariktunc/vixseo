'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

export type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

type ArticleTocProps = {
  items: TocItem[]
}

export function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting heading
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    headingElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-28">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <List className="w-3.5 h-3.5" />
          İçerik
        </h4>
        <ul className="space-y-1.5 border-l border-border/50">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(item.id)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    setActiveId(item.id)
                  }
                }}
                className={`block text-xs leading-relaxed transition-colors ${
                  item.level === 3 ? 'pl-6' : 'pl-3'
                } py-0.5 border-l -ml-px ${
                  activeId === item.id
                    ? 'border-emerald-500 text-emerald-500 font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
