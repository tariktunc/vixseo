'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SignUpButton, SignInButton } from '@clerk/nextjs'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const dashboardY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F2447] via-[#132d54] to-[#0a1a35] dark:from-[#0B1120] dark:via-[#0e1726] dark:to-[#080d18]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-400/5 blur-[80px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Wix SEO Yönetiminde Yeni Dönem
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Wix Sitelerinizin
            <br />
            SEO&apos;sunu{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                Tek Panelden
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>{' '}
            Yönetin
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 md:mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Blog yönetimi, Google Search Console analizi, anahtar kelime araştırma, sitemap takibi
            ve SEO denetimi — tüm araçlar tek bir profesyonel panelde.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <SignInButton mode="modal">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 group"
                >
                  Ücretsiz Başlayın
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </SignInButton>
            <SignInButton mode="modal">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 px-8 h-12 text-base backdrop-blur-sm"
                >
                  Giriş Yap
                </Button>
              </motion.div>
            </SignInButton>
          </motion.div>

          {/* Trust Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 text-sm text-slate-500"
          >
            Kredi kartı gerekmez • 30 saniyede kurulum • Sınırsız analiz
          </motion.p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          style={{ y: dashboardY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-16 md:mt-20 relative max-w-5xl mx-auto"
        >
          {/* Inner continuous float */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            {/* Browser Chrome */}
            <div className="bg-[#1a2744] dark:bg-[#111827] px-4 py-3 flex items-center gap-2 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/10 rounded-md px-3 py-1 text-xs text-slate-400 max-w-md mx-auto text-center">
                  app.vixseo.com/dashboard
                </div>
              </div>
            </div>
            {/* Dashboard Content Mock */}
            <div className="bg-gradient-to-br from-[#0f1b30] to-[#162240] dark:from-[#0B1120] dark:to-[#111827] p-6 md:p-8">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="h-4 w-32 bg-white/20 rounded" />
                  <div className="h-3 w-48 bg-white/10 rounded mt-2" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="flex gap-2"
                >
                  <div className="h-8 w-24 bg-emerald-500/30 rounded-md" />
                  <div className="h-8 w-20 bg-white/10 rounded-md" />
                </motion.div>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Tıklamalar', value: '12.4K', color: 'emerald' },
                  { label: 'Gösterimler', value: '284K', color: 'blue' },
                  { label: 'CTR', value: '%4.3', color: 'purple' },
                  { label: 'Ortalama Sıra', value: '14.2', color: 'amber' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/5 cursor-default hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/5 h-32 md:h-40 flex items-end gap-1">
                {[68, 75, 62, 58, 72, 55, 48, 42, 35, 38, 30, 34, 52, 55, 65, 60, 82, 76, 58, 50, 42, 32, 28, 25].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-emerald-500/10 to-emerald-500/50 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1.6 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        {/* Glow effect behind card */}
        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-blue-500/10 to-emerald-500/20 rounded-2xl blur-2xl -z-10" />
      </motion.div>
    </div>
  </section>
)
}
