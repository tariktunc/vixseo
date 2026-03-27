'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Clock, ArrowDownAZ, ArrowUpDown, ListOrdered } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type ArticleItem = {
  id: string
  categoryId: string
  title: string
  description: string
  readTime: string
  excerpt: string
  level: 'beginner' | 'intermediate' | 'advanced'
  readTimeMinutes: number
  originalIndex: number
}

type SortOption = 'default' | 'readTime' | 'alphabetical'

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'default', label: 'Varsayılan', icon: <ListOrdered className="w-4 h-4" /> },
  { value: 'readTime', label: 'Okuma Süresi', icon: <Clock className="w-4 h-4" /> },
  { value: 'alphabetical', label: 'Alfabetik', icon: <ArrowDownAZ className="w-4 h-4" /> },
]

const LEVEL_CONFIG = {
  beginner: { label: 'Başlangıç', className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  intermediate: { label: 'Orta', className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
  advanced: { label: 'İleri', className: 'bg-red-500/15 text-red-400 border-red-500/30' },
} as const

function sortArticles(articles: ArticleItem[], sortBy: SortOption): ArticleItem[] {
  const sorted = [...articles]
  switch (sortBy) {
    case 'readTime':
      return sorted.sort((a, b) => a.readTimeMinutes - b.readTimeMinutes)
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'tr'))
    default:
      return sorted.sort((a, b) => a.originalIndex - b.originalIndex)
  }
}

export function CategoryArticleList({
  articles,
  categorySlug,
  isKnowledgeBase,
}: {
  articles: ArticleItem[]
  categorySlug: string
  isKnowledgeBase: boolean
}) {
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const sorted = sortArticles(articles, sortBy)

  return (
    <div>
      {/* Sorting controls */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-1">Sırala:</span>
        {SORT_OPTIONS.map(option => (
          <button
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-all ${
              sortBy === option.value
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-card border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>

      {/* Article cards */}
      <div className="grid grid-cols-1 gap-4">
        {sorted.map(article => {
          const levelConfig = LEVEL_CONFIG[article.level]
          return (
            <Link
              key={article.id}
              href={`/docs/${categorySlug}/${article.id}`}
              className="block p-6 bg-card border border-border rounded-xl hover:bg-muted/50 hover:border-emerald-500/20 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-xl font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                  {article.title}
                </h2>
                {isKnowledgeBase && (
                  <Badge
                    className={`shrink-0 text-xs border ${levelConfig.className}`}
                  >
                    {levelConfig.label}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                {article.description}
              </p>
              {article.excerpt && (
                <p className="text-muted-foreground/70 text-xs mb-4 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              <div className="flex items-center text-xs text-slate-500 gap-4">
                <span className="inline-flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-md border border-border">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span className="flex items-center text-emerald-500 font-medium">
                  Bu rehberi oku
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
