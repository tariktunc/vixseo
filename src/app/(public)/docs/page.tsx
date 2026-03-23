'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { docCategories, docArticles } from '@/lib/docs-data'

export default function DocsHomePage() {
  const [query, setQuery] = useState('')

  const searchResults = query ? docArticles.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.description.toLowerCase().includes(query.toLowerCase()) ||
    a.content.toLowerCase().includes(query.toLowerCase())
  ) : []

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">Dökümantasyon</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">VixSEO'yu kullanırken ihtiyacınız olan tüm yönlendirmeleri ve teknik rehberleri burada bulabilirsiniz.</p>
        
        {/* Search Bar */}
        <div className="relative mb-12 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input 
              className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-white/10 text-lg rounded-xl shadow-sm focus-visible:ring-emerald-500/50"
              placeholder="Makalelerde ara... (Örn: Wix)"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <div className="absolute top-16 inset-x-0 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-xl p-2 z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? searchResults.map(article => (
                  <Link key={article.id} href={`/docs/${article.categoryId}/${article.id}`} className="block p-4 hover:bg-muted rounded-lg transition-colors">
                    <div className="font-semibold text-foreground text-emerald-500 mb-1">{article.title}</div>
                    <div className="text-sm text-muted-foreground truncate">{article.description}</div>
                  </Link>
                )) : (
                  <div className="p-4 text-center text-muted-foreground py-8">Aday sözcük ile uyuşan bir rehber bulunamadı.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      {!query && (
        <div className="grid sm:grid-cols-2 gap-6">
          {docCategories.map((category, i) => (
            <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <Link href={`/docs/${category.id}`} className="block h-full p-6 bg-card border border-border rounded-2xl hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group">
                <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2 group-hover:text-emerald-500 transition-colors">
                  {category.title}
                </h2>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{category.description}</p>
                <div className="mt-auto text-emerald-500 text-sm font-medium flex items-center">
                  Rehberleri İncele <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
