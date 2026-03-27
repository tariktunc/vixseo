'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  ChevronRight,
  BookOpen,
  Rocket,
  Star,
  CreditCard,
  Wrench,
  Globe,
  MessageCircle,
  Sparkles,
  GraduationCap,
  FileText,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { docCategories, docArticles } from '@/lib/docs-data'

// Platform rehberi kategorileri (ilk 4)
const PLATFORM_CATEGORY_IDS = ['getting-started', 'features', 'billing', 'troubleshooting']
// SEO bilgi bankasi kategorileri (son 5)
const KNOWLEDGE_BASE_CATEGORY_IDS = ['seo-temelleri', 'sem-reklam', 'ai-seo', 'geo', 'aeo']
// Web optimizasyon programi
const OPTIMIZATION_PROGRAM_ID = 'web-optimizasyon'

// One cikan makaleler — bilgi bankasindan secilmis
const FEATURED_ARTICLE_IDS = [
  'on-page-seo-nedir',
  'geo-nedir',
  'yapay-zeka-ile-seo',
  'aeo-nedir',
]

const categoryIconMap: Record<string, React.ReactNode> = {
  'getting-started': <Rocket className="w-5 h-5" />,
  'features': <Star className="w-5 h-5" />,
  'billing': <CreditCard className="w-5 h-5" />,
  'troubleshooting': <Wrench className="w-5 h-5" />,
  'seo-temelleri': <Search className="w-5 h-5" />,
  'sem-reklam': <CreditCard className="w-5 h-5" />,
  'ai-seo': <Sparkles className="w-5 h-5" />,
  'geo': <Globe className="w-5 h-5" />,
  'aeo': <MessageCircle className="w-5 h-5" />,
  'web-optimizasyon': <Layers className="w-5 h-5" />,
}

const knowledgeBaseGradients: Record<string, string> = {
  'seo-temelleri': 'from-emerald-500/20 to-teal-500/20',
  'sem-reklam': 'from-blue-500/20 to-indigo-500/20',
  'ai-seo': 'from-violet-500/20 to-purple-500/20',
  'geo': 'from-orange-500/20 to-amber-500/20',
  'aeo': 'from-pink-500/20 to-rose-500/20',
  'web-optimizasyon': 'from-cyan-500/20 to-teal-500/20',
}

const knowledgeBaseBorderHover: Record<string, string> = {
  'seo-temelleri': 'hover:border-emerald-500/40',
  'sem-reklam': 'hover:border-blue-500/40',
  'ai-seo': 'hover:border-violet-500/40',
  'geo': 'hover:border-orange-500/40',
  'aeo': 'hover:border-pink-500/40',
  'web-optimizasyon': 'hover:border-cyan-500/40',
}

const knowledgeBaseIconBg: Record<string, string> = {
  'seo-temelleri': 'bg-emerald-500/10 text-emerald-500',
  'sem-reklam': 'bg-blue-500/10 text-blue-500',
  'ai-seo': 'bg-violet-500/10 text-violet-500',
  'geo': 'bg-orange-500/10 text-orange-500',
  'aeo': 'bg-pink-500/10 text-pink-500',
  'web-optimizasyon': 'bg-cyan-500/10 text-cyan-500',
}

export default function DocsHomePage() {
  const [query, setQuery] = useState('')

  const searchResults = query ? docArticles.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.description.toLowerCase().includes(query.toLowerCase()) ||
    a.content.toLowerCase().includes(query.toLowerCase())
  ) : []

  const articleCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const article of docArticles) {
      counts[article.categoryId] = (counts[article.categoryId] || 0) + 1
    }
    return counts
  }, [])

  const platformCategories = docCategories.filter(c => PLATFORM_CATEGORY_IDS.includes(c.id))
  const knowledgeCategories = docCategories.filter(c => KNOWLEDGE_BASE_CATEGORY_IDS.includes(c.id))

  const featuredArticles = useMemo(() => {
    return FEATURED_ARTICLE_IDS
      .map(id => docArticles.find(a => a.id === id))
      .filter((a): a is NonNullable<typeof a> => a !== undefined)
  }, [])

  const totalKnowledgeArticles = useMemo(() => {
    return docArticles.filter(a => KNOWLEDGE_BASE_CATEGORY_IDS.includes(a.categoryId)).length
  }, [])

  const optimizationArticles = useMemo(() => {
    return docArticles.filter(a => a.categoryId === OPTIMIZATION_PROGRAM_ID)
  }, [])

  return (
    <div className="max-w-5xl">
      {/* Hero / Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#0F2447]/80 via-[#0B1528]/60 to-emerald-900/30 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10">
                <GraduationCap className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-sm font-medium text-emerald-400 tracking-wide uppercase">Bilgi Bankası</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              VixSEO Bilgi Bankası
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Web sitesi optimizasyonundan SEO, SEM, AI, GEO ve AEO&apos;ya kadar kapsamlı eğitim içerikleri.
              12 fazlı optimizasyon programı, platform rehberleri ve ileri düzey stratejiler —
              ihtiyacınız olan her şey burada.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {docArticles.length} makale
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                {docCategories.length} kategori
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mb-12 group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-white/10 text-lg rounded-xl shadow-sm focus-visible:ring-emerald-500/50"
            placeholder="Makalelerde ara... (Örn: Wix, SEO, AI)"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <div className="absolute top-16 inset-x-0 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-xl p-2 z-50 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? searchResults.map(article => (
                <Link key={article.id} href={`/docs/${article.categoryId}/${article.id}`} className="block p-4 hover:bg-muted rounded-lg transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground text-emerald-500">{article.title}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{article.readTime}</span>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">{article.description}</div>
                </Link>
              )) : (
                <div className="p-4 text-center text-muted-foreground py-8">Aramanızla eşleşen bir makale bulunamadı.</div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Content sections - only show when not searching */}
      {!query && (
        <>
          {/* Web Sitesi Optimizasyon Programi */}
          {optimizationArticles.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-16"
            >
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-teal-950/30 to-background p-8 md:p-10">
                <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-teal-500/5 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/10">
                      <Layers className="w-6 h-6 text-cyan-500" />
                    </div>
                    <span className="text-sm font-medium text-cyan-400 tracking-wide uppercase">12 Fazlı Program</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-3">
                    Web Sitesi Optimizasyon Programı
                  </h2>
                  <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
                    12 fazlı profesyonel optimizasyon rehberi — temel kimlikten güvenliğe, SEO&apos;dan erişilebilirliğe kadar web sitenizi en üst seviyeye taşıyın.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {optimizationArticles.map((article, i) => {
                      const phaseNumber = i + 1
                      // Title'dan faz basligini ayikla (": " sonrasi)
                      const shortTitle = article.title.includes('—')
                        ? article.title.split('—')[1]?.trim() || article.title
                        : article.title.replace(/^Faz \d+:\s*/, '')

                      return (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.04 }}
                        >
                          <Link
                            href={`/docs/web-optimizasyon/${article.id}`}
                            className="flex items-start gap-4 h-full p-4 bg-card/60 backdrop-blur-sm border border-border rounded-xl hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all group"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-500 font-bold text-sm shrink-0">
                              {phaseNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm text-foreground group-hover:text-cyan-500 transition-colors mb-1">
                                {shortTitle}
                              </h3>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                {article.description}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-500 group-hover:translate-x-1 transition-all mt-2 shrink-0" />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Link
                      href="/docs/web-optimizasyon"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 text-cyan-500 font-semibold rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    >
                      Programa Başlayın
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Platform Rehberi */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-foreground">Platform Rehberi</h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {platformCategories.reduce((sum, c) => sum + (articleCountByCategory[c.id] || 0), 0)} makale
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {platformCategories.map((category, i) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                >
                  <Link
                    href={`/docs/${category.id}`}
                    className="flex items-start gap-4 h-full p-5 bg-card border border-border rounded-xl hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-muted-foreground group-hover:text-emerald-500 transition-colors shrink-0">
                      {categoryIconMap[category.id]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                          {category.title}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                          {articleCountByCategory[category.id] || 0}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all mt-3 shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* SEO Bilgi Bankasi */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">SEO Bilgi Bankası</h2>
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                {totalKnowledgeArticles} makale
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              SEO dünyasının temellerinden yapay zeka destekli optimizasyona kadar derinlemesine rehberler.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {knowledgeCategories.map((category, i) => {
                const gradient = knowledgeBaseGradients[category.id] || 'from-emerald-500/20 to-teal-500/20'
                const borderHover = knowledgeBaseBorderHover[category.id] || 'hover:border-emerald-500/40'
                const iconBg = knowledgeBaseIconBg[category.id] || 'bg-emerald-500/10 text-emerald-500'

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.08 }}
                  >
                    <Link
                      href={`/docs/${category.id}`}
                      className={`block h-full p-6 bg-card border border-border rounded-2xl ${borderHover} hover:shadow-xl transition-all group relative overflow-hidden`}
                    >
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${iconBg}`}>
                            {categoryIconMap[category.id]}
                          </div>
                          <span className="text-xs font-medium text-muted-foreground bg-muted/80 px-2.5 py-1 rounded-full">
                            {articleCountByCategory[category.id] || 0} makale
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-emerald-500 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {category.description}
                        </p>
                        <div className="text-emerald-500 text-sm font-medium flex items-center">
                          Rehberleri İncele
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>

          {/* Öne Çıkan Makaleler */}
          {featuredArticles.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-foreground">Öne Çıkan Makaleler</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {featuredArticles.map((article, i) => {
                  const category = docCategories.find(c => c.id === article.categoryId)
                  const iconBg = knowledgeBaseIconBg[article.categoryId] || 'bg-emerald-500/10 text-emerald-500'

                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 + i * 0.08 }}
                    >
                      <Link
                        href={`/docs/${article.categoryId}/${article.id}`}
                        className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-emerald-500/30 hover:shadow-lg transition-all group"
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBg} shrink-0`}>
                          {categoryIconMap[article.categoryId]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                              {article.title}
                            </h3>
                            <span className="text-xs text-muted-foreground">{article.readTime}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {article.description}
                          </p>
                          {category && (
                            <span className="inline-block mt-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              {category.title}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all mt-3 shrink-0" />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>
          )}
        </>
      )}
    </div>
  )
}
