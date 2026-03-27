'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion'
import Link from 'next/link'
import {
  Search,
  Target,
  Globe,
  Bot,
  ChevronLeft,
  ArrowUp,
  TrendingUp,
  MousePointerClick,
  DollarSign,
  Brain,
  Cpu,
  Network,
  Shield,
  FileCode,
  BarChart3,
  Zap,
  Eye,
  Link2,
  Filter,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Calculator,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ServiceProcess = {
  step: number
  title: string
  description: string
}

type ServiceMetric = {
  label: string
  value: string
  description: string
}

type ServiceFaqItem = {
  question: string
  answer: string
}

type ServiceItemProps = {
  id: string
  slug: string
  phaseNumber: number
  title: string
  shortTitle: string
  shortDescription: string
  longDescription: string
  icon: string
  features: string[]
  deliverables: string[]
  process: ServiceProcess[]
  metrics: ServiceMetric[]
  relatedServices: string[]
  faq: ServiceFaqItem[]
}

// ---------------------------------------------------------------------------
// Shared Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// ---------------------------------------------------------------------------
// Shared Animated Counter Hook
// ---------------------------------------------------------------------------

function useAnimatedCounter(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  useEffect(() => {
    if (!startOnView || !isInView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration, startOnView])

  return { count, ref }
}

// ---------------------------------------------------------------------------
// Shared Section Wrapper
// ---------------------------------------------------------------------------

function SectionHeading({
  label,
  title,
  accentColor,
}: {
  label: string
  title: string
  accentColor: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="mb-12"
    >
      <span className={`inline-block text-sm font-semibold ${accentColor} tracking-wider uppercase mb-3`}>
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white">{title}</h2>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Shared Process Timeline
// ---------------------------------------------------------------------------

function ProcessTimeline({
  steps,
  accentColor,
  borderColor,
  gradientFrom,
}: {
  steps: ServiceProcess[]
  accentColor: string
  borderColor: string
  gradientFrom: string
}) {
  return (
    <div className="relative">
      <div className={`absolute left-6 top-0 bottom-0 w-px ${borderColor}`} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="space-y-8"
      >
        {steps.map((step) => (
          <motion.div key={step.step} variants={itemVariants} className="relative pl-16">
            <div
              className={`absolute left-3.5 top-1 w-5 h-5 rounded-full bg-gradient-to-br ${gradientFrom} border-2 border-[#0F2447] z-10`}
            />
            <h3 className="text-lg font-bold text-white mb-1">
              {step.step}. {step.title}
            </h3>
            <p className="text-slate-400 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared Metrics Grid
// ---------------------------------------------------------------------------

function MetricsGrid({
  metrics,
  borderColor,
  accentColor,
}: {
  metrics: ServiceMetric[]
  borderColor: string
  accentColor: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className={`p-6 rounded-2xl bg-white/5 backdrop-blur-sm border ${borderColor} text-center`}
        >
          <div className={`text-3xl font-black ${accentColor} mb-2`}>{metric.value}</div>
          <div className="text-white font-semibold mb-1">{metric.label}</div>
          <div className="text-slate-400 text-sm">{metric.description}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Shared Features Grid
// ---------------------------------------------------------------------------

function FeaturesGrid({
  features,
  borderColor,
  accentColor,
}: {
  features: string[]
  borderColor: string
  accentColor: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {features.map((feature, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className={`flex items-start gap-4 p-5 rounded-2xl border bg-[#0B1528] ${borderColor}`}
        >
          <CheckCircle className={`w-5 h-5 ${accentColor} shrink-0 mt-0.5`} />
          <span className="text-slate-200 font-medium leading-snug">{feature}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Shared CTA Section
// ---------------------------------------------------------------------------

function CtaSection({ gradientFrom, label }: { gradientFrom: string; label: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-center"
    >
      <div
        className={`inline-flex flex-col items-center gap-6 p-10 rounded-3xl bg-gradient-to-br ${gradientFrom} bg-opacity-10 border border-white/10 backdrop-blur-sm`}
      >
        <Sparkles className="w-10 h-10 text-white/80" />
        <h3 className="text-2xl md:text-3xl font-extrabold text-white">
          Hemen Baslayalim
        </h3>
        <p className="text-slate-300 max-w-lg">
          {label} hizmetimiz hakkinda detayli bilgi almak ve projenizi baslatmak icin bizimle iletisime gecin.
        </p>
        <Link href="/iletisim">
          <Button className="bg-white text-[#0F2447] hover:bg-white/90 font-bold px-8 py-3 text-lg rounded-full">
            Ucretsiz Danismanlik
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Shared Back Link
// ---------------------------------------------------------------------------

function BackLink() {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <Link
        href="/hizmetler"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30"
      >
        <ChevronLeft className="w-4 h-4" />
        Tum Hizmetler
      </Link>
    </motion.div>
  )
}

// ===========================================================================
// FAZ 5 — SEO LAYOUT
// ===========================================================================

// SERP Mockup with animated ranking
function SerpMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  const [rankPosition, setRankPosition] = useState(50)

  useEffect(() => {
    if (!isInView) return
    let pos = 50
    const timer = setInterval(() => {
      pos -= 1
      if (pos <= 1) {
        setRankPosition(1)
        clearInterval(timer)
      } else {
        setRankPosition(pos)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      {/* Google search bar mockup */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="mx-auto max-w-xl rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <TypingEffect
            text="en iyi SEO hizmeti istanbul"
            isInView={isInView}
            className="text-slate-300 text-sm md:text-base"
          />
        </div>
      </motion.div>

      {/* SERP results */}
      <div className="space-y-4 max-w-xl mx-auto">
        {[1, 2, 3].map((pos) => (
          <motion.div
            key={pos}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2 + pos * 0.2, duration: 0.5 }}
            className={`p-4 rounded-xl border ${
              pos === 1
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-white/10 bg-white/5'
            } backdrop-blur-sm`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-mono ${pos === 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                #{pos}
              </span>
              <span className="text-xs text-emerald-400/60">vixseo.com</span>
            </div>
            <div className={`text-sm font-semibold ${pos === 1 ? 'text-emerald-300' : 'text-blue-300'}`}>
              {pos === 1 ? 'VixSEO — Profesyonel SEO Hizmeti' : `Ornek Sonuc ${pos}`}
            </div>
            <div className="text-xs text-slate-400 mt-1 line-clamp-2">
              {pos === 1
                ? 'Teknik SEO, meta etiketler ve Core Web Vitals optimizasyonu ile organik trafiginizi artirin.'
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.'}
            </div>
            {pos === 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 2, type: 'spring' }}
                className="mt-2 flex items-center gap-1"
              >
                <ArrowUp className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-bold">+49 sira yukseldi</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Rank counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, type: 'spring' }}
        className="absolute -right-4 top-20 md:right-0 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-4 text-center"
      >
        <div className="text-xs text-emerald-400 font-semibold mb-1">Siralama</div>
        <div className="text-3xl font-black text-emerald-400">#{rankPosition}</div>
      </motion.div>
    </div>
  )
}

// Typing effect component
function TypingEffect({
  text,
  isInView,
  className,
}: {
  text: string
  isInView: boolean
  className?: string
}) {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    if (!isInView) return
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [isInView, text])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// SEO Funnel Waterfall
function SeoFunnel() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const steps = [
    { label: 'Tarama', icon: Search, width: '100%' },
    { label: 'Indeksleme', icon: FileCode, width: '85%' },
    { label: 'Siralama', icon: TrendingUp, width: '70%' },
    { label: 'Trafik', icon: Eye, width: '55%' },
    { label: 'Donusum', icon: Target, width: '40%' },
  ]

  return (
    <div ref={ref} className="space-y-3">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: i * 0.2, duration: 0.6, ease: 'easeOut' }}
          style={{ width: step.width, transformOrigin: 'left' }}
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/20">
            <step.icon className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold text-emerald-300">{step.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Meta tag length checker (interactive)
function MetaTagChecker() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const titleMax = 60
  const descMax = 160

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-emerald-400 mb-2 block">
          Title Tag ({title.length}/{titleMax})
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sayfa basliginizi yazin..."
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
            title.length > titleMax ? 'border-red-500/50' : 'border-emerald-500/30'
          } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400`}
        />
        <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              title.length > titleMax ? 'bg-red-500' : 'bg-emerald-500'
            }`}
            animate={{ width: `${Math.min((title.length / titleMax) * 100, 100)}%` }}
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-emerald-400 mb-2 block">
          Meta Description ({desc.length}/{descMax})
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Sayfa aciklamanizi yazin..."
          rows={3}
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
            desc.length > descMax ? 'border-red-500/50' : 'border-emerald-500/30'
          } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 resize-none`}
        />
        <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              desc.length > descMax ? 'bg-red-500' : 'bg-emerald-500'
            }`}
            animate={{ width: `${Math.min((desc.length / descMax) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Live preview */}
      {(title || desc) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
        >
          <div className="text-xs text-slate-500 mb-2">Onizleme</div>
          <div className="text-blue-400 text-sm font-medium truncate">
            {title || 'Sayfa Basligi'}
          </div>
          <div className="text-emerald-400/60 text-xs mt-0.5">vixseo.com/sayfa</div>
          <div className="text-slate-400 text-xs mt-1 line-clamp-2">
            {desc || 'Sayfa aciklamasi burada gorunecek...'}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Crawler visualization
function CrawlerVisualization() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const pages = [
    { label: '/', x: 50, y: 10 },
    { label: '/hakkimizda', x: 20, y: 40 },
    { label: '/hizmetler', x: 50, y: 40 },
    { label: '/blog', x: 80, y: 40 },
    { label: '/iletisim', x: 35, y: 70 },
    { label: '/seo', x: 65, y: 70 },
  ]

  return (
    <div ref={ref} className="relative h-64 md:h-80">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80">
        {/* Connection lines */}
        {[
          [50, 15, 20, 38],
          [50, 15, 50, 38],
          [50, 15, 80, 38],
          [50, 42, 35, 68],
          [50, 42, 65, 68],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(16, 185, 129, 0.2)"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          />
        ))}
      </svg>

      {pages.map((page, i) => (
        <motion.div
          key={page.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200 }}
          className="absolute"
          style={{
            left: `${page.x}%`,
            top: `${page.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono whitespace-nowrap">
            {page.label}
          </div>
        </motion.div>
      ))}

      {/* Animated crawler dot */}
      {isInView && (
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
          animate={{
            left: ['50%', '20%', '50%', '80%', '50%', '35%', '65%'],
            top: ['10%', '40%', '40%', '40%', '40%', '70%', '70%'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      )}
    </div>
  )
}

// Ranking factors bar chart
function RankingFactors() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const factors = [
    { label: 'Icerik Kalitesi', weight: 95 },
    { label: 'Backlink Profili', weight: 88 },
    { label: 'Teknik SEO', weight: 82 },
    { label: 'Kullanici Deneyimi', weight: 78 },
    { label: 'Core Web Vitals', weight: 72 },
    { label: 'Mobile Uyumluluk', weight: 70 },
  ]

  return (
    <div ref={ref} className="space-y-4">
      {factors.map((factor, i) => (
        <div key={factor.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300 font-medium">{factor.label}</span>
            <span className="text-emerald-400 font-bold">{factor.weight}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${factor.weight}%` } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SeoLayout({ service }: { service: ServiceItemProps }) {
  return (
    <div className="min-h-screen bg-[#0F2447] overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* HERO */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <BackLink />
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-3xl font-black text-white">{service.phaseNumber}</span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-emerald-500/30">
                <Search className="w-8 h-8 text-emerald-400" />
              </div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            >
              {service.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.shortDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SERP Mockup */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Canli Onizleme" title="Google'da Nasil Gorunursunuz?" accentColor="text-emerald-400" />
          <SerpMockup />
        </div>
      </section>

      {/* Crawler Visualization */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            label="Tarama"
            title="Arama Motorlari Sizi Nasil Goruyor?"
            accentColor="text-emerald-400"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CrawlerVisualization />
            <SeoFunnel />
          </div>
        </div>
      </section>

      {/* Ranking Factors */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            label="Analiz"
            title="Siralama Faktorleri"
            accentColor="text-emerald-400"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RankingFactors />
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-emerald-500/20">
              <h3 className="text-lg font-bold text-white mb-4">Meta Tag Kontrol Araci</h3>
              <MetaTagChecker />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Detaylar" title="Ne Yapiyoruz?" accentColor="text-emerald-400" />
          <FeaturesGrid
            features={service.features}
            borderColor="border-emerald-500/20"
            accentColor="text-emerald-400"
          />
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Surecimiz" title="Nasil Calisiyoruz?" accentColor="text-emerald-400" />
          <ProcessTimeline
            steps={service.process}
            accentColor="text-emerald-400"
            borderColor="bg-emerald-500/20"
            gradientFrom="from-emerald-500 to-teal-500"
          />
        </div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Sonuclar" title="Beklenen Metrikler" accentColor="text-emerald-400" />
          <MetricsGrid
            metrics={service.metrics}
            borderColor="border-emerald-500/20"
            accentColor="text-emerald-400"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <CtaSection gradientFrom="from-emerald-500/10 to-teal-500/10" label="SEO" />
        </div>
      </section>
    </div>
  )
}

// ===========================================================================
// FAZ 6 — SEM LAYOUT
// ===========================================================================

// Ad Performance Dashboard Mockup
function AdDashboardMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const dashMetrics = [
    { label: 'Gosterim', value: '125.4K', change: '+12%', up: true },
    { label: 'Tiklama', value: '8.2K', change: '+18%', up: true },
    { label: 'CTR', value: '6.5%', change: '+0.8%', up: true },
    { label: 'CPC', value: '2.45 TL', change: '-15%', up: false },
  ]

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-rose-500/20 bg-white/5 backdrop-blur-sm p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider">Canli Kampanya</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dashMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
              className="text-center p-3 rounded-xl bg-white/5"
            >
              <div className="text-xs text-slate-400 mb-1">{m.label}</div>
              <div className="text-xl font-black text-white">{m.value}</div>
              <div className={`text-xs font-semibold mt-1 ${m.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {m.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div className="mt-6 flex items-end gap-1.5 h-20">
          {Array.from({ length: 14 }).map((_, i) => {
            const height = 20 + Math.random() * 60
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${height}%` } : {}}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                className="flex-1 rounded-t bg-gradient-to-t from-rose-500/60 to-rose-400/30"
              />
            )
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>1 Oca</span>
          <span>14 Oca</span>
        </div>
      </motion.div>
    </div>
  )
}

// Campaign circular flow
function CampaignFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const steps = [
    { label: 'Hedefleme', icon: Target, angle: 0 },
    { label: 'Teklif', icon: DollarSign, angle: 60 },
    { label: 'Reklam', icon: Eye, angle: 120 },
    { label: 'Donusum', icon: MousePointerClick, angle: 180 },
    { label: 'ROI', icon: TrendingUp, angle: 240 },
    { label: 'Analiz', icon: BarChart3, angle: 300 },
  ]

  const radius = 120

  return (
    <div ref={ref} className="relative h-80 flex items-center justify-center">
      {/* Center circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 150 }}
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center z-10 shadow-lg shadow-rose-500/30"
      >
        <span className="text-xs font-bold text-white text-center">SEM Dongusu</span>
      </motion.div>

      {/* Rotating ring */}
      {isInView && (
        <motion.div
          className="absolute w-64 h-64 rounded-full border border-dashed border-rose-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Step nodes */}
      {steps.map((step, i) => {
        const rad = (step.angle * Math.PI) / 180
        const x = Math.cos(rad) * radius
        const y = Math.sin(rad) * radius
        const StepIcon = step.icon

        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
            className="absolute flex flex-col items-center gap-1"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <StepIcon className="w-4 h-4 text-rose-400" />
            </div>
            <span className="text-xs text-rose-300 font-semibold whitespace-nowrap">{step.label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

// ROI Calculator
function RoiCalculator() {
  const [budget, setBudget] = useState(5000)
  const [cpc, setCpc] = useState(2.5)
  const convRate = 0.035
  const avgOrderValue = 500

  const clicks = Math.floor(budget / cpc)
  const conversions = Math.floor(clicks * convRate)
  const revenue = conversions * avgOrderValue
  const roi = budget > 0 ? (((revenue - budget) / budget) * 100).toFixed(0) : '0'

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-rose-400 mb-2 block">
          Aylik Butce: {budget.toLocaleString('tr-TR')} TL
        </label>
        <input
          type="range"
          min={1000}
          max={50000}
          step={500}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-rose-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>1.000 TL</span>
          <span>50.000 TL</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-rose-400 mb-2 block">
          Ortalama CPC: {cpc.toFixed(2)} TL
        </label>
        <input
          type="range"
          min={0.5}
          max={15}
          step={0.25}
          value={cpc}
          onChange={(e) => setCpc(Number(e.target.value))}
          className="w-full accent-rose-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0.50 TL</span>
          <span>15.00 TL</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Tahmini Tiklama', value: clicks.toLocaleString('tr-TR') },
          { label: 'Tahmini Donusum', value: conversions.toLocaleString('tr-TR') },
          { label: 'Tahmini Gelir', value: `${revenue.toLocaleString('tr-TR')} TL` },
          { label: 'ROI', value: `%${roi}` },
        ].map((item) => (
          <div
            key={item.label}
            className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center"
          >
            <div className="text-xs text-slate-400 mb-1">{item.label}</div>
            <div className="text-lg font-bold text-white">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Conversion funnel
function ConversionFunnel() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const stages = [
    { label: 'Gosterim', value: '100.000', pct: 100 },
    { label: 'Tiklama', value: '6.500', pct: 65 },
    { label: 'Sayfa Goruntulenme', value: '5.200', pct: 52 },
    { label: 'Sepete Ekleme', value: '780', pct: 15 },
    { label: 'Satin Alma', value: '234', pct: 4.7 },
  ]

  return (
    <div ref={ref} className="space-y-2">
      {stages.map((stage, i) => (
        <motion.div
          key={stage.label}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          style={{ width: `${Math.max(stage.pct, 20)}%`, transformOrigin: 'center', margin: '0 auto' }}
        >
          <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500/30 to-red-500/10 border border-rose-500/20 text-center">
            <div className="text-xs text-rose-300 font-semibold">{stage.label}</div>
            <div className="text-sm font-bold text-white">{stage.value}</div>
            <div className="text-xs text-slate-500">%{stage.pct}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function SemLayout({ service }: { service: ServiceItemProps }) {
  return (
    <div className="min-h-screen bg-[#0F2447] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-600/20 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* HERO */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <BackLink />
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <span className="text-3xl font-black text-white">{service.phaseNumber}</span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-rose-500/30">
                <Target className="w-8 h-8 text-rose-400" />
              </div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            >
              {service.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.shortDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Ad Dashboard */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Canli Panel" title="Reklam Performans Paneli" accentColor="text-rose-400" />
          <AdDashboardMockup />
        </div>
      </section>

      {/* Campaign Flow + Funnel */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Akis"
            title="Reklam Butceniz Nereye Gidiyor?"
            accentColor="text-rose-400"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CampaignFlow />
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Donusum Hunisi</h3>
              <ConversionFunnel />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Hesaplayici" title="ROI Hesaplayici" accentColor="text-rose-400" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-rose-500/20">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-rose-400" />
                <h3 className="text-lg font-bold text-white">Butce Simulasyonu</h3>
              </div>
              <RoiCalculator />
            </div>
            <div className="flex items-center">
              <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Reklam butcenizin ne kadar donusum getirecegini simule edin. Gercek verilerinizle bu
                  hesaplamayi daha da netlestirebiliriz.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Google Ads', 'Meta Ads', 'GA4', 'GTM', 'Hotjar'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Detaylar" title="Ne Yapiyoruz?" accentColor="text-rose-400" />
          <FeaturesGrid
            features={service.features}
            borderColor="border-rose-500/20"
            accentColor="text-rose-400"
          />
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Surecimiz" title="Nasil Calisiyoruz?" accentColor="text-rose-400" />
          <ProcessTimeline
            steps={service.process}
            accentColor="text-rose-400"
            borderColor="bg-rose-500/20"
            gradientFrom="from-rose-500 to-red-500"
          />
        </div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Sonuclar" title="Beklenen Metrikler" accentColor="text-rose-400" />
          <MetricsGrid
            metrics={service.metrics}
            borderColor="border-rose-500/20"
            accentColor="text-rose-400"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <CtaSection gradientFrom="from-rose-500/10 to-red-500/10" label="SEM" />
        </div>
      </section>
    </div>
  )
}

// ===========================================================================
// FAZ 7 — GEO LAYOUT
// ===========================================================================

// AI Chatbot interface mockup
function AiChatMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  const [typedText, setTypedText] = useState('')
  const fullText =
    'VixSEO, Turkiye\'nin oncu SEO platformudur. Yapay zeka destekli arama optimizasyonu konusunda uzmandir. Kaynak: vixseo.com'

  useEffect(() => {
    if (!isInView) return
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-violet-500/20 bg-white/5 backdrop-blur-sm overflow-hidden"
      >
        {/* Chat header */}
        <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
          <Brain className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-semibold text-violet-300">AI Arama Motoru</span>
          <div className="ml-auto w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
        </div>

        {/* Chat body */}
        <div className="p-4 space-y-4">
          {/* User message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <div className="max-w-xs px-4 py-2 rounded-2xl rounded-br-sm bg-violet-500/20 border border-violet-500/30 text-sm text-slate-200">
              En iyi SEO ajansi hangisi?
            </div>
          </motion.div>

          {/* AI response */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1 }}
            className="flex"
          >
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-violet-400 font-medium">AI Yanit</span>
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/5 border border-white/10 text-sm text-slate-300 leading-relaxed">
                {typedText}
                {typedText.length < fullText.length && (
                  <span className="animate-pulse text-violet-400">|</span>
                )}
              </div>
              {/* Citation highlight */}
              {typedText.includes('vixseo.com') && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30 inline-flex items-center gap-2"
                >
                  <Link2 className="w-3 h-3 text-violet-400" />
                  <span className="text-xs text-violet-300 font-medium">vixseo.com referans gosterildi</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// Neural network animation
function NeuralNetwork() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const flowSteps = [
    { label: 'Icerik', color: 'from-violet-500/30' },
    { label: 'AI Isleme', color: 'from-purple-500/30' },
    { label: 'Alintilanma', color: 'from-fuchsia-500/30' },
    { label: 'Gorunurluk', color: 'from-pink-500/30' },
  ]

  // Neural nodes
  const nodes = Array.from({ length: 12 }).map((_, i) => ({
    x: 15 + (i % 4) * 25,
    y: 20 + Math.floor(i / 4) * 30,
  }))

  return (
    <div ref={ref} className="relative">
      {/* Flow steps */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {flowSteps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.2 }}
            className="flex items-center gap-2"
          >
            <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${step.color} to-transparent border border-violet-500/20 text-sm font-semibold text-violet-300`}>
              {step.label}
            </div>
            {i < flowSteps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-violet-500/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Neural network visualization */}
      <div className="relative h-48">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80">
          {/* Connection lines */}
          {nodes.map((node, i) =>
            nodes.slice(i + 1).map((target, j) => {
              const dist = Math.sqrt(
                Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2)
              )
              if (dist > 35) return null
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="rgba(139, 92, 246, 0.15)"
                  strokeWidth="0.3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + (i + j) * 0.05 }}
                />
              )
            })
          )}
        </svg>

        {/* Node dots */}
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-violet-500/40 border border-violet-400/30"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}
          />
        ))}

        {/* Animated pulse through network */}
        {isInView && (
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50"
            animate={{
              left: nodes.map((n) => `${n.x}%`),
              top: nodes.map((n) => `${n.y}%`),
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        )}
      </div>
    </div>
  )
}

// llms.txt editor demo
function LlmsTxtEditor() {
  const [content, setContent] = useState(`# VixSEO
## Hakkinda
Turkiye'nin oncu SEO platformu.
## Onemli Sayfalar
- /hizmetler: Tum SEO hizmetlerimiz
- /blog: SEO icgoruleri ve rehberler
## Iletisim
info@vixseo.com`)

  return (
    <div className="rounded-xl border border-violet-500/20 bg-white/5 overflow-hidden">
      <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2">
        <FileCode className="w-4 h-4 text-violet-400" />
        <span className="text-xs font-mono text-violet-300">llms.txt</span>
        <div className="ml-auto flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        className="w-full p-4 bg-transparent text-sm font-mono text-violet-200 placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
      />
    </div>
  )
}

// AI spider diagram
function AiSpiderDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const platforms = [
    { label: 'ChatGPT', angle: 0, reach: 85 },
    { label: 'Perplexity', angle: 72, reach: 70 },
    { label: 'Gemini', angle: 144, reach: 75 },
    { label: 'Copilot', angle: 216, reach: 60 },
    { label: 'AI Overviews', angle: 288, reach: 90 },
  ]

  const radius = 90

  return (
    <div ref={ref} className="relative h-72 flex items-center justify-center">
      {/* Background rings */}
      {[0.33, 0.66, 1].map((scale, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-violet-500/10"
          style={{
            width: `${radius * 2 * scale}px`,
            height: `${radius * 2 * scale}px`,
          }}
        />
      ))}

      {/* Center */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        className="absolute w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center z-10"
      >
        <Globe className="w-5 h-5 text-violet-400" />
      </motion.div>

      {/* Platform nodes */}
      {platforms.map((p, i) => {
        const rad = ((p.angle - 90) * Math.PI) / 180
        const r = (p.reach / 100) * radius
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r

        return (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
            className="absolute flex flex-col items-center"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <div className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30">
              <span className="text-xs text-violet-300 font-semibold">{p.label}</span>
            </div>
            <span className="text-xs text-violet-400/60 mt-1">%{p.reach}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

export function GeoLayout({ service }: { service: ServiceItemProps }) {
  return (
    <div className="min-h-screen bg-[#0F2447] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* HERO */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <BackLink />
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-3xl font-black text-white">{service.phaseNumber}</span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-violet-500/30">
                <Globe className="w-8 h-8 text-violet-400" />
              </div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            >
              {service.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.shortDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* AI Chat Mockup */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="AI Arama" title="AI Sizi Nasil Buluyor?" accentColor="text-violet-400" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AiChatMockup />
            <AiSpiderDiagram />
          </div>
        </div>
      </section>

      {/* Neural Network + Flow */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            label="AI Sureci"
            title="Referans Olma Stratejisi"
            accentColor="text-violet-400"
          />
          <NeuralNetwork />
        </div>
      </section>

      {/* llms.txt Editor */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Arac" title="llms.txt Duzenleyici" accentColor="text-violet-400" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <LlmsTxtEditor />
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                <code className="text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded text-sm">llms.txt</code>{' '}
                dosyasi, AI modellere siteniz hakkinda bilgi verir. Bu dosya sayesinde AI motorlari sizi
                dogru tanir ve referans gosterir.
              </p>
              <div className="space-y-3">
                {['ChatGPT Search', 'Google AI Overviews', 'Perplexity', 'Bing Copilot'].map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20"
                  >
                    <Brain className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-violet-300">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Detaylar" title="Ne Yapiyoruz?" accentColor="text-violet-400" />
          <FeaturesGrid
            features={service.features}
            borderColor="border-violet-500/20"
            accentColor="text-violet-400"
          />
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Surecimiz" title="Nasil Calisiyoruz?" accentColor="text-violet-400" />
          <ProcessTimeline
            steps={service.process}
            accentColor="text-violet-400"
            borderColor="bg-violet-500/20"
            gradientFrom="from-violet-500 to-purple-500"
          />
        </div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Sonuclar" title="Beklenen Metrikler" accentColor="text-violet-400" />
          <MetricsGrid
            metrics={service.metrics}
            borderColor="border-violet-500/20"
            accentColor="text-violet-400"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <CtaSection gradientFrom="from-violet-500/10 to-purple-500/10" label="GEO" />
        </div>
      </section>
    </div>
  )
}

// ===========================================================================
// FAZ 8 — AIO/LLMO LAYOUT
// ===========================================================================

// Bot dashboard mockup
function BotDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const bots = [
    { name: 'GPTBot', provider: 'OpenAI', visits: 1247, status: 'active' as const },
    { name: 'ClaudeBot', provider: 'Anthropic', visits: 892, status: 'active' as const },
    { name: 'Google-Extended', provider: 'Google', visits: 2134, status: 'active' as const },
    { name: 'PerplexityBot', provider: 'Perplexity', visits: 456, status: 'blocked' as const },
    { name: 'CCBot', provider: 'Common Crawl', visits: 3421, status: 'active' as const },
  ]

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-cyan-500/20 bg-white/5 backdrop-blur-sm overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-cyan-300">AI Bot Aktivite Logu</span>
          <div className="ml-auto text-xs text-slate-500">Son 24 saat</div>
        </div>

        <div className="divide-y divide-white/5">
          {bots.map((bot, i) => (
            <motion.div
              key={bot.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="px-4 py-3 flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                bot.status === 'active'
                  ? 'bg-cyan-500/10 border border-cyan-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                <Bot className={`w-4 h-4 ${bot.status === 'active' ? 'text-cyan-400' : 'text-red-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{bot.name}</div>
                <div className="text-xs text-slate-500">{bot.provider}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">{bot.visits.toLocaleString('tr-TR')}</div>
                <div className="text-xs text-slate-500">ziyaret</div>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                bot.status === 'active'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'bg-red-500/10 text-red-400 border border-red-500/30'
              }`}>
                {bot.status === 'active' ? 'Izinli' : 'Engelli'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// robots.txt rule builder
function RobotsTxtBuilder() {
  const [rules, setRules] = useState([
    { bot: 'GPTBot', allowed: true },
    { bot: 'ClaudeBot', allowed: true },
    { bot: 'Google-Extended', allowed: true },
    { bot: 'PerplexityBot', allowed: false },
    { bot: 'CCBot', allowed: true },
  ])

  const toggleRule = (index: number) => {
    setRules((prev) =>
      prev.map((r, i) => (i === index ? { ...r, allowed: !r.allowed } : r))
    )
  }

  const generatedTxt = rules
    .map(
      (r) =>
        `User-agent: ${r.bot}\n${r.allowed ? 'Allow: /' : 'Disallow: /'}`
    )
    .join('\n\n')

  return (
    <div className="space-y-6">
      {/* Toggle switches */}
      <div className="space-y-3">
        {rules.map((rule, i) => (
          <div
            key={rule.bot}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-cyan-500/10"
          >
            <div className="flex items-center gap-3">
              <Bot className={`w-4 h-4 ${rule.allowed ? 'text-cyan-400' : 'text-red-400'}`} />
              <span className="text-sm font-semibold text-white">{rule.bot}</span>
            </div>
            <button
              onClick={() => toggleRule(i)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                rule.allowed ? 'bg-cyan-500' : 'bg-red-500/50'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  rule.allowed ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Generated output */}
      <div className="rounded-xl border border-cyan-500/20 bg-white/5 overflow-hidden">
        <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-cyan-300">robots.txt</span>
        </div>
        <pre className="p-4 text-xs font-mono text-cyan-200 leading-relaxed overflow-x-auto">
          {generatedTxt}
        </pre>
      </div>
    </div>
  )
}

// Animated bot crawling
function BotCrawlAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const flowSteps = [
    { label: 'Botlar', icon: Bot },
    { label: 'robots.txt', icon: FileCode },
    { label: 'Izin/Engel', icon: Filter },
    { label: 'Indeks', icon: Cpu },
    { label: 'Referans', icon: Link2 },
  ]

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {flowSteps.map((step, i) => {
          const StepIcon = step.icon
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.2, type: 'spring' }}
              className="flex items-center gap-2 md:gap-4"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <StepIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-xs text-cyan-300 font-semibold">{step.label}</span>
              </div>
              {i < flowSteps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: i * 0.2 + 0.1 }}
                >
                  <ArrowRight className="w-4 h-4 text-cyan-500/40 mb-6" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Animated bot icons moving */}
      {isInView && (
        <div className="relative h-16 mt-8 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2"
              animate={{ x: ['-10%', '110%'] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'linear',
              }}
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            </motion.div>
          ))}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>
      )}
    </div>
  )
}

// Entity graph
function EntityGraph() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const entities = [
    { label: 'VixSEO', x: 50, y: 40, primary: true },
    { label: 'SEO', x: 20, y: 15, primary: false },
    { label: 'AI Optimizasyon', x: 80, y: 15, primary: false },
    { label: 'Dijital Pazarlama', x: 15, y: 60, primary: false },
    { label: 'Web Analitik', x: 85, y: 60, primary: false },
    { label: 'Icerik Stratejisi', x: 35, y: 75, primary: false },
    { label: 'Teknik SEO', x: 65, y: 75, primary: false },
  ]

  // All connections from VixSEO (index 0)
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 3], [2, 4], [5, 6],
  ]

  return (
    <div ref={ref} className="relative h-72 md:h-80">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 90">
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={entities[from].x}
            y1={entities[from].y}
            x2={entities[to].x}
            y2={entities[to].y}
            stroke="rgba(34, 211, 238, 0.15)"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          />
        ))}
      </svg>

      {entities.map((entity, i) => (
        <motion.div
          key={entity.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
          className="absolute"
          style={{
            left: `${entity.x}%`,
            top: `${entity.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold ${
              entity.primary
                ? 'bg-cyan-500/20 border-2 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 border border-cyan-500/20 text-slate-300'
            }`}
          >
            {entity.label}
          </div>
        </motion.div>
      ))}

      {/* Animated pulse on primary */}
      {isInView && (
        <motion.div
          className="absolute"
          style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-16 h-16 rounded-full border border-cyan-400/30" />
        </motion.div>
      )}
    </div>
  )
}

// Bot traffic meter
function BotTrafficMeter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })

  const bots = [
    { name: 'Google-Extended', pct: 35, color: 'bg-blue-500' },
    { name: 'GPTBot', pct: 25, color: 'bg-emerald-500' },
    { name: 'CCBot', pct: 20, color: 'bg-amber-500' },
    { name: 'ClaudeBot', pct: 12, color: 'bg-violet-500' },
    { name: 'Diger', pct: 8, color: 'bg-slate-500' },
  ]

  return (
    <div ref={ref} className="space-y-4">
      <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Bot Trafik Dagilimi</h4>
      {/* Stacked bar */}
      <div className="h-4 rounded-full overflow-hidden flex">
        {bots.map((bot, i) => (
          <motion.div
            key={bot.name}
            className={`${bot.color} h-full`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${bot.pct}%` } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {bots.map((bot) => (
          <div key={bot.name} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${bot.color}`} />
            <span className="text-xs text-slate-400">{bot.name}</span>
            <span className="text-xs text-white font-bold ml-auto">%{bot.pct}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AioLlmoLayout({ service }: { service: ServiceItemProps }) {
  return (
    <div className="min-h-screen bg-[#0F2447] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600/20 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* HERO */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <BackLink />
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-3xl font-black text-white">{service.phaseNumber}</span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-cyan-500/30">
                <Bot className="w-8 h-8 text-cyan-400" />
              </div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            >
              {service.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.shortDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Bot Dashboard */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Aktivite" title="AI Botlari Sitenizde" accentColor="text-cyan-400" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <BotDashboard />
            <BotTrafficMeter />
          </div>
        </div>
      </section>

      {/* Bot Crawl Flow */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Akis" title="Bot Erisim Kontrolu" accentColor="text-cyan-400" />
          <BotCrawlAnimation />
        </div>
      </section>

      {/* robots.txt Builder */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Arac" title="robots.txt Kural Olusturucu" accentColor="text-cyan-400" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RobotsTxtBuilder />
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                Hangi AI botlarina izin verip hangilerini engelleyeceginize siz karar verin. Her botun
                erisim kurallarini tek tikla degistirin.
              </p>
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-white">Neden Onemli?</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI botlari uzerinde kontrol, iceriklerinizin nasil kullanildigini belirlemenizi saglar.
                  Dogru yapilandirma ile hem gorunurlugu artirabilir hem de hassas iceriklerinizi
                  koruyabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entity Graph */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Graf" title="Entity Graph" accentColor="text-cyan-400" />
          <EntityGraph />
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Detaylar" title="Ne Yapiyoruz?" accentColor="text-cyan-400" />
          <FeaturesGrid
            features={service.features}
            borderColor="border-cyan-500/20"
            accentColor="text-cyan-400"
          />
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label="Surecimiz" title="Nasil Calisiyoruz?" accentColor="text-cyan-400" />
          <ProcessTimeline
            steps={service.process}
            accentColor="text-cyan-400"
            borderColor="bg-cyan-500/20"
            gradientFrom="from-cyan-500 to-blue-500"
          />
        </div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Sonuclar" title="Beklenen Metrikler" accentColor="text-cyan-400" />
          <MetricsGrid
            metrics={service.metrics}
            borderColor="border-cyan-500/20"
            accentColor="text-cyan-400"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-4xl mx-auto">
          <CtaSection gradientFrom="from-cyan-500/10 to-blue-500/10" label="AIO/LLMO" />
        </div>
      </section>
    </div>
  )
}
