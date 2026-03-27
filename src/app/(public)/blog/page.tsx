'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Calendar, Clock, ArrowRight, TrendingUp, Rss } from 'lucide-react'
import Link from 'next/link'

import { blogPosts } from '@/lib/blog-data'

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9 // Show 9 posts per page
  
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  }

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  // The first post becomes the Featured post, rest becomes regular posts
  const featuredPost = blogPosts[0]
  const allPosts = blogPosts.slice(1)

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(allPosts.length / postsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0F2447] text-slate-100 overflow-hidden relative selection:bg-emerald-500/30">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <TrendingUp className="w-4 h-4" /> VixSEO İçgörüleri
            </div>
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-400 hover:bg-orange-500/20 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <Rss className="w-4 h-4" /> RSS Akışı
            </a>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Uzman SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Rehberleri</span>
          </h1>
          <p className="text-xl text-slate-300">
            Wix sitenizin organik trafiğini artırmak için araştırma, strateji ve teknik SEO vaka analizleri.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div variants={fadeUp} className="mb-20">
            <Link href={`/blog/${featuredPost.slug}`} className="group block relative rounded-3xl overflow-hidden border border-white/10 bg-[#162B4D]/50 hover:border-emerald-500/30 transition-all duration-500 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0 h-full">
                <div className="relative h-[300px] md:h-full overflow-hidden shrink-0">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:bg-gradient-to-r md:from-transparent md:via-black/20 md:to-[#162B4D]/50" />
                </div>
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-gradient-to-b from-transparent to-[#0A1628]/80 md:to-transparent">
                  <div className="flex items-center gap-4 text-emerald-400 text-sm font-bold mb-4">
                    <span className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">{featuredPost.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 group-hover:text-emerald-400 transition-colors leading-tight">{featuredPost.title}</h2>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-3 md:line-clamp-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                    <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-500" /> {featuredPost.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> {featuredPost.readTime}</span>
                    </div>
                    <div className="flex items-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 rounded-full px-4 py-2 shrink-0 hidden sm:flex transition-colors text-sm font-medium">
                      Hemen Oku <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <h2 className="text-3xl font-bold text-white mb-10 border-b border-white/10 pb-4 flex items-center gap-3">
          En Son Yazılar
        </h2>
        
        <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, i) => (
            <motion.div key={i} variants={fadeUp} className="h-full">
              <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-[#162B4D]/30 border border-white/10 rounded-2xl overflow-hidden hover:bg-[#162B4D]/60 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-400">
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162B4D]/80 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-emerald-400/30">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-slate-500 text-xs mt-auto pt-4 border-t border-white/5 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-500/70" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400/70" /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div variants={fadeUp} className="mt-16 mb-8 flex items-center justify-center gap-6 border-t border-white/10 pt-8">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-6 py-2.5 rounded-full border border-emerald-500/30 bg-[#162B4D]/50 text-emerald-400 font-semibold text-sm transition-all hover:bg-emerald-500/10 hover:border-emerald-500/60 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(16,185,129,0.1)]"
            >
              ← Önceki Sayfa
            </button>
            <div className="flex items-center gap-2 text-slate-400 font-medium">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">{currentPage}</span> 
              <span>/ {totalPages}</span>
            </div>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-6 py-2.5 rounded-full border border-emerald-500/30 bg-[#162B4D]/50 text-emerald-400 font-semibold text-sm transition-all hover:bg-emerald-500/10 hover:border-emerald-500/60 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(16,185,129,0.1)]"
            >
              Sonraki Sayfa →
            </button>
          </motion.div>
        )}

      </motion.div>
    </div>
  )
}
