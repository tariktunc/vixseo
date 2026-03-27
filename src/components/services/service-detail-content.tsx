'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, Variants, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Fingerprint,
  ShieldCheck,
  Accessibility,
  Palette,
  Search,
  Target,
  Globe,
  Bot,
  Gauge,
  Lock,
  Layout,
  Share2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Sparkles,
  Users,
  BookOpen,
  Layers,
  Eye,
  EyeOff,
  Keyboard,
  Monitor,
  Sun,
  Moon,
  Paintbrush,
  Type,
  Shield,
  FileCheck,
  Cookie,
  Scale,
  AlertTriangle,
  Check,
  Ear,
  Hand,
  Brain,
  Contrast,
  Maximize2,
  SlidersHorizontal,
  TreePine,
  Smartphone,
} from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { PageFaq } from '@/components/landing/page-faq'
import { SeoLayout, SemLayout, GeoLayout, AioLlmoLayout } from './service-layouts-5-8'
import { AnalitikPerformansLayout, GuvenlikLayout, UxTemelleriLayout, SosyalIletisimLayout } from './service-layouts-9-12'

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

type ServiceItem = {
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

type ServiceDetailContentProps = {
  service: ServiceItem
  relatedServices: ServiceItem[]
  prevService: ServiceItem | null
  nextService: ServiceItem | null
}

type PhaseLayoutProps = {
  service: ServiceItem
}

// ---------------------------------------------------------------------------
// Icon Map
// ---------------------------------------------------------------------------

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  fingerprint: Fingerprint,
  'shield-check': ShieldCheck,
  accessibility: Accessibility,
  palette: Palette,
  search: Search,
  target: Target,
  globe: Globe,
  bot: Bot,
  gauge: Gauge,
  lock: Lock,
  layout: Layout,
  'share-2': Share2,
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
// Animated Counter Hook
// ---------------------------------------------------------------------------

function useAnimatedCounter(target: string, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const numericValue = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0

  useEffect(() => {
    if (!isInView || numericValue === 0) return
    let start = 0
    const increment = numericValue / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, numericValue, duration])

  return { ref, count }
}

// ---------------------------------------------------------------------------
// Phase gradient colors (updated for unique designs)
// ---------------------------------------------------------------------------

function getPhaseGradient(phase: number): string {
  const gradients: Record<number, string> = {
    1: 'from-indigo-500 to-purple-600',
    2: 'from-emerald-500 to-green-600',
    3: 'from-sky-400 to-cyan-600',
    4: 'from-amber-500 to-orange-600',
    5: 'from-rose-500 to-red-600',
    6: 'from-pink-500 to-fuchsia-600',
    7: 'from-cyan-500 to-teal-600',
    8: 'from-violet-500 to-purple-600',
    9: 'from-yellow-500 to-amber-600',
    10: 'from-slate-500 to-gray-600',
    11: 'from-lime-500 to-green-600',
    12: 'from-blue-500 to-indigo-600',
  }
  return gradients[phase] || 'from-emerald-500 to-cyan-600'
}

function getPhaseBorderColor(phase: number): string {
  const colors: Record<number, string> = {
    1: 'border-indigo-500/30',
    2: 'border-emerald-500/30',
    3: 'border-sky-500/30',
    4: 'border-amber-500/30',
    5: 'border-rose-500/30',
    6: 'border-pink-500/30',
    7: 'border-cyan-500/30',
    8: 'border-violet-500/30',
    9: 'border-yellow-500/30',
    10: 'border-slate-500/30',
    11: 'border-lime-500/30',
    12: 'border-blue-500/30',
  }
  return colors[phase] || 'border-emerald-500/30'
}

function getPhaseAccentText(phase: number): string {
  const colors: Record<number, string> = {
    1: 'text-indigo-400',
    2: 'text-emerald-400',
    3: 'text-sky-400',
    4: 'text-amber-400',
    5: 'text-rose-400',
    6: 'text-pink-400',
    7: 'text-cyan-400',
    8: 'text-violet-400',
    9: 'text-yellow-400',
    10: 'text-slate-400',
    11: 'text-lime-400',
    12: 'text-blue-400',
  }
  return colors[phase] || 'text-emerald-400'
}

function getPhaseGlowColor(phase: number): string {
  const colors: Record<number, string> = {
    1: 'rgba(99,102,241,0.3)',
    2: 'rgba(16,185,129,0.3)',
    3: 'rgba(56,189,248,0.3)',
    4: 'rgba(245,158,11,0.3)',
    5: 'rgba(244,63,94,0.3)',
    6: 'rgba(236,72,153,0.3)',
    7: 'rgba(34,211,238,0.3)',
    8: 'rgba(139,92,246,0.3)',
    9: 'rgba(234,179,8,0.3)',
    10: 'rgba(100,116,139,0.3)',
    11: 'rgba(132,204,22,0.3)',
    12: 'rgba(59,130,246,0.3)',
  }
  return colors[phase] || 'rgba(16,185,129,0.3)'
}

// ---------------------------------------------------------------------------
// ANIMATED METRIC CARD (shared)
// ---------------------------------------------------------------------------

function AnimatedMetricCard({
  metric,
  gradient,
  index,
}: {
  metric: ServiceMetric
  gradient: string
  index: number
}) {
  const { ref, count } = useAnimatedCounter(metric.value)
  const suffix = metric.value.replace(/[0-9]/g, '')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
          {count > 0 ? `${count}${suffix}` : metric.value}
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{metric.label}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{metric.description}</p>
      </div>
    </motion.div>
  )
}

// ===========================================================================
// FAZ 1 — TEMEL KIMLIK (Indigo/Purple)
// ===========================================================================

function TemelKimlikLayout({ service }: PhaseLayoutProps) {
  const [flipped, setFlipped] = useState(false)
  const pipelineRef = useRef<HTMLDivElement>(null)
  const isPipelineInView = useInView(pipelineRef, { once: true })

  const pipelineSteps = [
    { icon: Search, label: 'Kesif' },
    { icon: Users, label: 'Persona' },
    { icon: BookOpen, label: 'Marka Rehberi' },
    { icon: Layers, label: 'Strateji' },
  ]

  const brandColors = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#e879f9']

  return (
    <>
      {/* Hero: Brand Identity Mockup */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Brand Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* CSS-only Logo Placeholder */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 backdrop-blur-sm"
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Logo Circle */}
                  <div className="absolute top-8 left-8 right-8 flex items-center gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Fingerprint className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <div className="h-3 w-28 bg-white/30 rounded-full" />
                      <div className="h-2 w-20 bg-white/15 rounded-full mt-2" />
                    </div>
                  </div>

                  {/* Color Palette Circles */}
                  <div className="absolute top-32 left-8 flex gap-3">
                    {brandColors.map((color, i) => (
                      <motion.div
                        key={color}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                        className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Typography Preview */}
                  <div className="absolute top-48 left-8 right-8 space-y-2">
                    <div className="text-2xl font-black text-white/80">Aa</div>
                    <div className="text-lg font-bold text-white/60">Inter — Bold</div>
                    <div className="text-sm text-white/40">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                    <div className="text-sm text-white/40">abcdefghijklmnopqrstuvwxyz</div>
                    <div className="text-sm text-white/30">0123456789</div>
                  </div>

                  {/* Mockup lines */}
                  <div className="absolute bottom-12 left-8 right-8 space-y-2">
                    <div className="h-2 bg-indigo-500/20 rounded-full w-full" />
                    <div className="h-2 bg-indigo-500/15 rounded-full w-3/4" />
                    <div className="h-2 bg-indigo-500/10 rounded-full w-1/2" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.span variants={itemVariants} className="inline-block text-sm font-semibold text-indigo-400 tracking-wider uppercase">
                Neler Yapiyoruz
              </motion.span>
              {service.features.slice(0, 6).map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Pipeline Flow Diagram */}
      <section ref={pipelineRef} className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/60">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-3">
              Surec
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Calisma Akisimiz</h2>
          </motion.div>

          {/* Horizontal Pipeline */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {pipelineSteps.map((step, i) => {
              const StepIcon = step.icon
              return (
                <React.Fragment key={step.label}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isPipelineInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.3, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="relative flex flex-col items-center gap-3"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <StepIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">{step.label}</span>
                  </motion.div>
                  {i < pipelineSteps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isPipelineInView ? { scaleX: 1 } : {}}
                      transition={{ delay: i * 0.3 + 0.2, duration: 0.4 }}
                      className="hidden md:block w-16 lg:w-24 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 origin-left"
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </section>

      {/* Before / After Card Flip */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-3">
              Donusum
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Marka Kimliginizin Donusumu
            </h2>
            <p className="text-slate-400">Kartin uzerine tiklayin</p>
          </motion.div>

          <div className="flex justify-center">
            <div
              className="relative w-full max-w-lg cursor-pointer"
              style={{ perspective: '1200px' }}
              onClick={() => setFlipped(!flipped)}
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full aspect-[4/3]"
              >
                {/* Front — Before */}
                <div
                  className="absolute inset-0 rounded-2xl border border-red-500/30 bg-[#0B1528] p-8 flex flex-col justify-center items-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-red-400 text-xs uppercase tracking-widest font-bold mb-4">Oncesi</div>
                  <div className="space-y-3 w-full max-w-xs">
                    <div className="h-12 bg-gray-700/50 rounded-lg flex items-center px-4">
                      <div className="w-6 h-6 rounded bg-gray-500" />
                      <div className="ml-3 h-2 w-20 bg-gray-500 rounded" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-gray-600" />
                      <div className="w-8 h-8 rounded bg-gray-500" />
                      <div className="w-8 h-8 rounded bg-gray-400" />
                    </div>
                    <div className="h-3 w-full bg-gray-600 rounded" />
                    <div className="h-3 w-3/4 bg-gray-600 rounded" />
                    <div className="h-3 w-1/2 bg-gray-600 rounded" />
                  </div>
                  <p className="text-slate-500 text-sm mt-6">Tutarsiz renkler, belirsiz tipografi, kimliksiz marka</p>
                </div>

                {/* Back — After */}
                <div
                  className="absolute inset-0 rounded-2xl border border-indigo-500/30 bg-[#0B1528] p-8 flex flex-col justify-center items-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="text-indigo-400 text-xs uppercase tracking-widest font-bold mb-4">Sonrasi</div>
                  <div className="space-y-3 w-full max-w-xs">
                    <div className="h-12 bg-indigo-500/10 rounded-lg border border-indigo-500/20 flex items-center px-4">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                      <div className="ml-3 h-2.5 w-24 bg-indigo-400/40 rounded-full" />
                    </div>
                    <div className="flex gap-2">
                      {brandColors.slice(0, 3).map((c) => (
                        <div key={c} className="w-8 h-8 rounded-full shadow-md" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="h-3 w-full bg-indigo-400/20 rounded-full" />
                    <div className="h-3 w-3/4 bg-indigo-400/15 rounded-full" />
                    <div className="h-3 w-1/2 bg-indigo-400/10 rounded-full" />
                  </div>
                  <p className="text-indigo-300 text-sm mt-6">Tutarli kimlik, profesyonel palet, guclu marka dili</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics with Counters */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/60">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-3">Sonuclar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Beklenen Sonuclar</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.metrics.map((m, i) => (
              <AnimatedMetricCard key={i} metric={m} gradient="from-indigo-500 to-purple-600" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-3">Teslimatlar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Neler Dahil?</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((d, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-medium text-sm">{d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// FAZ 2 — YASAL UYUMLULUK (Emerald/Green)
// ===========================================================================

function YasalUyumlulukLayout({ service }: PhaseLayoutProps) {
  const [complianceLevel, setComplianceLevel] = useState(0)
  const meterRef = useRef<HTMLDivElement>(null)
  const isMeterInView = useInView(meterRef, { once: true })
  const checklistRef = useRef<HTMLDivElement>(null)
  const isChecklistInView = useInView(checklistRef, { once: true })

  useEffect(() => {
    if (!isMeterInView) return
    const timer = setTimeout(() => setComplianceLevel(100), 400)
    return () => clearTimeout(timer)
  }, [isMeterInView])

  const regulations = [
    { abbr: 'GDPR', label: 'Avrupa Birligi', color: 'from-blue-500 to-blue-600' },
    { abbr: 'KVKK', label: 'Turkiye', color: 'from-red-500 to-red-600' },
    { abbr: 'CCPA', label: 'Kaliforniya', color: 'from-amber-500 to-amber-600' },
  ]

  const checklistItems = [
    { icon: Cookie, label: 'Cookie Envanteri', done: true },
    { icon: FileCheck, label: 'Consent Banner', done: true },
    { icon: Shield, label: 'Consent Mode v2', done: true },
    { icon: Scale, label: 'Yasal Sayfalar', done: true },
    { icon: Lock, label: 'Veri Isleme Kaydi', done: true },
    { icon: AlertTriangle, label: 'Risk Degerlendirme', done: true },
  ]

  return (
    <>
      {/* Shield-Centered Design */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Column: Regulation Badges */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-4"
            >
              {regulations.map((reg, i) => (
                <motion.div
                  key={reg.abbr}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm"
                >
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${reg.color} text-white text-xs font-bold mb-2`}>
                    {reg.abbr}
                  </div>
                  <p className="text-white font-semibold">{reg.label}</p>
                  <p className="text-slate-400 text-sm">Tam Uyumluluk</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Center: Animated Shield */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Pulsing Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                  <ShieldCheck className="w-20 h-20 md:w-28 md:h-28 text-white" />
                </div>
                {/* Floating badges around shield */}
                <motion.div
                  className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  EU
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  animate={{ y: [2, -2, 2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  TR
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -right-4 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                >
                  US
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-3"
            >
              {service.features.slice(0, 6).map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-3 rounded-xl"
                >
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{f}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Compliance Checklist */}
      <section ref={checklistRef} className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/60">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">Surec</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Uyumluluk Kontrol Listesi</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.map((item, i) => {
              const ItemIcon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isChecklistInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.2, duration: 0.4 }}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/20 bg-[#0B1528]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isChecklistInView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.2 + 0.3, type: 'spring' }}
                    className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"
                  >
                    <ItemIcon className="w-5 h-5 text-emerald-400" />
                  </motion.div>
                  <span className="text-white font-semibold">{item.label}</span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isChecklistInView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.2 + 0.5, type: 'spring' }}
                    className="ml-auto"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cookie Consent Banner Preview */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">Onizleme</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Cookie Consent Banner</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-emerald-500/20 bg-[#0B1528] p-6 md:p-8 shadow-2xl shadow-emerald-500/10"
          >
            <div className="flex items-start gap-4 mb-6">
              <Cookie className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Cerez Tercihleriniz</h3>
                <p className="text-slate-400 text-sm">
                  Web sitemizde en iyi deneyimi sunabilmek icin cerezleri kullaniyoruz. Tercihlerinizi asagidan yonetebilirsiniz.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {['Zorunlu', 'Analitik', 'Islevsel', 'Pazarlama'].map((cat, i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/[0.02]"
                >
                  <span className="text-sm text-white font-medium">{cat}</span>
                  <div className={`w-10 h-5 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-emerald-500/80'} relative`}>
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                Tumu Kabul Et
              </div>
              <div className="flex-1 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white font-medium text-sm">
                Tercihleri Kaydet
              </div>
              <div className="flex-1 h-10 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 text-sm">
                Tumu Reddet
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Meter */}
      <section ref={meterRef} className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/60">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">Sonuclar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Beklenen Sonuclar</h2>
          </motion.div>

          {/* Compliance Meter Bar */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-400 font-medium">Uyumluluk Seviyesi</span>
              <span className="text-sm text-emerald-400 font-bold">{complianceLevel}%</span>
            </div>
            <div className="h-4 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${complianceLevel}%` }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 shadow-lg shadow-emerald-500/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.metrics.map((m, i) => (
              <AnimatedMetricCard key={i} metric={m} gradient="from-emerald-500 to-green-600" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">Teslimatlar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Neler Dahil?</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((d, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-medium text-sm">{d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// FAZ 3 — ERISILEBILIRLIK (Sky/Cyan)
// ===========================================================================

function ErisilebilirlikLayout({ service }: PhaseLayoutProps) {
  const [contrastA, setContrastA] = useState('#1e293b')
  const [contrastB, setContrastB] = useState('#f8fafc')
  const [fontSize, setFontSize] = useState(16)

  const a11yCategories = [
    { icon: Eye, label: 'Gorme', color: 'from-sky-400 to-blue-500', desc: 'Renk kontrasti, alt metin, buyukluk' },
    { icon: Ear, label: 'Isitme', color: 'from-cyan-400 to-teal-500', desc: 'Altyazi, gorsel bilgi, isaret dili' },
    { icon: Hand, label: 'Motor', color: 'from-blue-400 to-indigo-500', desc: 'Klavye navigasyonu, buyuk tiklanabilir alan' },
    { icon: Brain, label: 'Bilissel', color: 'from-violet-400 to-purple-500', desc: 'Basit dil, net yonlendirme, tahmin edilebilirlik' },
  ]

  // Simple contrast ratio approximation
  function getLuminance(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const adjust = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b)
  }

  function getContrastRatio(): string {
    try {
      const l1 = getLuminance(contrastA)
      const l2 = getLuminance(contrastB)
      const lighter = Math.max(l1, l2)
      const darker = Math.min(l1, l2)
      return ((lighter + 0.05) / (darker + 0.05)).toFixed(1)
    } catch {
      return '—'
    }
  }

  const ratio = getContrastRatio()
  const ratioNum = parseFloat(ratio) || 0
  const passesAA = ratioNum >= 4.5

  return (
    <>
      {/* Split Screen: Inaccessible vs Accessible */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-sky-400 tracking-wider uppercase mb-3">Karsilastirma</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Farki Gorun</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inaccessible side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-red-500/20 bg-[#0B1528] p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 backdrop-blur-[1px]" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <EyeOff className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm font-bold uppercase tracking-wider">Erisilemez</span>
                </div>
                <div className="space-y-3 opacity-60">
                  <div className="h-4 bg-gray-600/40 rounded w-full" />
                  <div className="text-[10px] text-gray-600">Bu metin okunamaz</div>
                  <div className="flex gap-1">
                    <div className="w-12 h-8 rounded bg-gray-700 text-gray-600 flex items-center justify-center text-[8px]">Gonder</div>
                    <div className="w-12 h-8 rounded bg-gray-600 text-gray-500 flex items-center justify-center text-[8px]">Iptal</div>
                  </div>
                  <div className="w-full h-24 bg-gray-800/50 rounded flex items-center justify-center">
                    <div className="text-gray-700 text-xs">Alt metin yok</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-800" />
                    <span className="text-gray-600 text-xs">Renk = tek bilgi tasiyici</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Accessible side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-sky-500/20 bg-[#0B1528] p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-sky-400" />
                <span className="text-sky-400 text-sm font-bold uppercase tracking-wider">Erisilebilir</span>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-sky-400/20 rounded w-full" />
                <div className="text-sm text-white font-medium">Bu metin net ve okunabilir</div>
                <div className="flex gap-2">
                  <div className="px-4 h-9 rounded-lg bg-sky-500 text-white flex items-center justify-center text-sm font-semibold">Gonder</div>
                  <div className="px-4 h-9 rounded-lg border border-white/30 text-white flex items-center justify-center text-sm">Iptal</div>
                </div>
                <div className="w-full h-24 bg-sky-500/10 border border-sky-500/20 rounded flex items-center justify-center">
                  <div className="text-sky-300 text-xs">Aciklayici alt metin: &quot;Marka logosunun goruntulenmesi&quot;</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  <span className="text-white text-xs">Hata: Zorunlu alan bos birakildi</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* A11y Category Wheel */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/60">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-sky-400 tracking-wider uppercase mb-3">Kategoriler</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Erisilebilirlik Alanlari</h2>
          </motion.div>

          {/* Center hub + radiating categories */}
          <div className="relative max-w-2xl mx-auto">
            {/* Center */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-cyan-600 flex items-center justify-center mx-auto shadow-xl shadow-sky-500/30 relative z-10"
            >
              <Accessibility className="w-12 h-12 text-white" />
            </motion.div>

            {/* Category cards */}
            <div className="grid grid-cols-2 gap-6 mt-8 md:mt-12">
              {a11yCategories.map((cat, i) => {
                const CatIcon = cat.icon
                return (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="p-5 rounded-2xl border border-sky-500/20 bg-[#0B1528] text-center"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                      <CatIcon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white font-bold mb-1">{cat.label}</h3>
                    <p className="text-slate-400 text-xs">{cat.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Contrast Checker */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-sky-400 tracking-wider uppercase mb-3">Demo</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Kontrast Kontrol Araci</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-sky-500/20 bg-[#0B1528] p-6 md:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm text-slate-400 font-medium mb-2 block">Arka Plan Rengi</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={contrastA}
                    onChange={(e) => setContrastA(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-white font-mono text-sm">{contrastA}</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 font-medium mb-2 block">Metin Rengi</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={contrastB}
                    onChange={(e) => setContrastB(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-white font-mono text-sm">{contrastB}</span>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div
              className="rounded-xl p-6 mb-6 text-center"
              style={{ backgroundColor: contrastA, color: contrastB }}
            >
              <p className="text-2xl font-bold">Ornek Metin</p>
              <p className="text-sm mt-1">Bu metin sectiginiz renklerle goruntulenyor</p>
            </div>

            {/* Ratio */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03]">
              <div>
                <span className="text-slate-400 text-sm">Kontrast Orani</span>
                <div className="text-2xl font-black text-white">{ratio}:1</div>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold text-sm ${passesAA ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                WCAG AA {passesAA ? 'Gecti' : 'Basarisiz'}
              </div>
            </div>

            {/* Font size slider */}
            <div className="mt-6">
              <label className="text-sm text-slate-400 font-medium mb-2 flex items-center justify-between">
                <span>Font Boyutu Demonu</span>
                <span className="text-white font-mono">{fontSize}px</span>
              </label>
              <input
                type="range"
                min={10}
                max={32}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <p className="text-white mt-3 transition-all" style={{ fontSize: `${fontSize}px` }}>
                Bu metin {fontSize}px boyutunda goruntulenyor
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WCAG Level Badges + Metrics */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/60">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-sky-400 tracking-wider uppercase mb-3">Sonuclar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Beklenen Sonuclar</h2>
          </motion.div>

          {/* WCAG Level Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['A', 'AA', 'AAA'].map((level, i) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 ${
                  i <= 1 ? 'border-sky-500 bg-sky-500/20 text-sky-400' : 'border-white/10 bg-white/[0.02] text-slate-500'
                }`}
              >
                <span className="text-lg font-black">{level}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.metrics.map((m, i) => (
              <AnimatedMetricCard key={i} metric={m} gradient="from-sky-400 to-cyan-600" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-sky-400 tracking-wider uppercase mb-3">Teslimatlar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Neler Dahil?</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((d, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-sky-500/20 bg-sky-500/5"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-medium text-sm">{d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// FAZ 4 — TEMA & GORSEL (Amber/Orange)
// ===========================================================================

function TemaGorselLayout({ service }: PhaseLayoutProps) {
  const [isDarkDemo, setIsDarkDemo] = useState(true)
  const [activeToken, setActiveToken] = useState(0)

  const tokenLayers = [
    {
      label: 'Global Tokens',
      icon: TreePine,
      items: ['--color-slate-50: #f8fafc', '--color-slate-900: #0f172a', '--font-sans: Inter'],
    },
    {
      label: 'Alias Tokens',
      icon: Layers,
      items: ['--color-primary: var(--color-emerald-500)', '--color-bg: var(--color-slate-900)'],
    },
    {
      label: 'Component Tokens',
      icon: Layout,
      items: ['--button-bg: var(--color-primary)', '--card-border: var(--color-slate-700)'],
    },
  ]

  const demoColors = [
    { name: 'Primary', light: '#10b981', dark: '#34d399' },
    { name: 'Background', light: '#ffffff', dark: '#0f172a' },
    { name: 'Text', light: '#0f172a', dark: '#f8fafc' },
    { name: 'Accent', light: '#f59e0b', dark: '#fbbf24' },
  ]

  return (
    <>
      {/* Design System Showcase */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Token Tree Structure */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.span variants={itemVariants} className="inline-block text-sm font-semibold text-amber-400 tracking-wider uppercase mb-6">
                Token Mimarisi
              </motion.span>

              <div className="space-y-4">
                {tokenLayers.map((layer, i) => {
                  const LayerIcon = layer.icon
                  const isActive = activeToken === i
                  return (
                    <motion.div
                      key={layer.label}
                      variants={itemVariants}
                      onClick={() => setActiveToken(i)}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? 'border-amber-500/40 bg-amber-500/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-amber-500/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-white/5'
                        }`}>
                          <LayerIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        </div>
                        <h3 className={`font-bold ${isActive ? 'text-amber-400' : 'text-white'}`}>{layer.label}</h3>
                      </div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1.5 mt-2">
                              {layer.items.map((item) => (
                                <div key={item} className="text-xs font-mono text-slate-400 bg-black/20 rounded px-3 py-1.5">
                                  {item}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>

              {/* Animated tree lines connecting layers */}
              <div className="hidden lg:flex flex-col items-center gap-0 -mt-2 ml-10">
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.3 }}
                    className="w-0.5 h-4 bg-amber-500/30 origin-top"
                  />
                ))}
              </div>
            </motion.div>

            {/* Right: Live Theme Toggle Demo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-semibold text-amber-400 tracking-wider uppercase mb-6">
                Canli Demo
              </span>

              {/* Theme Toggle */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setIsDarkDemo(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    !isDarkDemo ? 'bg-amber-500 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => setIsDarkDemo(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDarkDemo ? 'bg-amber-500 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
              </div>

              {/* Demo Preview Card */}
              <motion.div
                layout
                className={`rounded-2xl border p-6 transition-colors duration-500 ${
                  isDarkDemo
                    ? 'bg-[#0f172a] border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${isDarkDemo ? 'bg-emerald-500' : 'bg-emerald-600'} flex items-center justify-center`}>
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Ornek Baslik</div>
                    <div className={`text-xs ${isDarkDemo ? 'text-slate-400' : 'text-slate-500'}`}>Alt aciklama metni</div>
                  </div>
                </div>
                <div className={`p-4 rounded-xl mb-4 ${isDarkDemo ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div className={`text-sm ${isDarkDemo ? 'text-slate-300' : 'text-slate-700'}`}>
                    Bu onizleme, tema degistiginde tum bilesenin nasil aninda uyumlsudigunu gosteriyor.
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${isDarkDemo ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white'}`}>
                    Buton
                  </div>
                  <div className={`px-4 py-2 rounded-lg text-sm border ${isDarkDemo ? 'border-slate-600 text-slate-300' : 'border-slate-300 text-slate-700'}`}>
                    Ikincil
                  </div>
                </div>
              </motion.div>

              {/* Color Swatches */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {demoColors.map((c) => (
                  <motion.div
                    key={c.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02]"
                  >
                    <motion.div
                      layout
                      className="w-8 h-8 rounded-lg shadow-md"
                      style={{ backgroundColor: isDarkDemo ? c.dark : c.light }}
                      transition={{ duration: 0.5 }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">{c.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{isDarkDemo ? c.dark : c.light}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Responsive Breakpoint Visualization */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/60">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-amber-400 tracking-wider uppercase mb-3">Responsive</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Breakpoint Sistemi</h2>
          </motion.div>

          <div className="flex flex-col items-center gap-4">
            {[
              { label: 'Mobile', width: 'w-1/4', px: '320px', icon: Smartphone },
              { label: 'Tablet', width: 'w-1/2', px: '768px', icon: Monitor },
              { label: 'Desktop', width: 'w-3/4', px: '1024px', icon: Monitor },
              { label: 'Genis', width: 'w-full', px: '1280px', icon: Maximize2 },
            ].map((bp, i) => {
              const BpIcon = bp.icon
              return (
                <motion.div
                  key={bp.label}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={`${bp.width} h-14 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center gap-3 origin-center`}
                >
                  <BpIcon className="w-4 h-4 text-amber-400" />
                  <span className="text-white font-semibold text-sm">{bp.label}</span>
                  <span className="text-amber-400/60 text-xs font-mono">{bp.px}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-amber-400 tracking-wider uppercase mb-3">Sonuclar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Beklenen Sonuclar</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.metrics.map((m, i) => (
              <AnimatedMetricCard key={i} metric={m} gradient="from-amber-500 to-orange-600" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/60">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-amber-400 tracking-wider uppercase mb-3">Teslimatlar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Neler Dahil?</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((d, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-medium text-sm">{d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// DEFAULT LAYOUT (for phases 5-12)
// ===========================================================================

function DefaultLayout({ service }: PhaseLayoutProps) {
  const gradient = getPhaseGradient(service.phaseNumber)
  const borderColor = getPhaseBorderColor(service.phaseNumber)
  const accentText = getPhaseAccentText(service.phaseNumber)

  return (
    <>
      {/* Features Grid */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12">
            <span className={`inline-block text-sm font-semibold ${accentText} tracking-wider uppercase mb-3`}>Detaylar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ne Yapiyoruz?</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className={`flex items-start gap-4 p-5 rounded-2xl border bg-[#0B1528] ${borderColor}`}
              >
                <CheckCircle className={`w-5 h-5 ${accentText} shrink-0 mt-0.5`} />
                <span className="text-slate-200 font-medium leading-snug">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <span className={`inline-block text-sm font-semibold ${accentText} tracking-wider uppercase mb-3`}>Surec</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Calisma Surecimiz</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="relative">
            <div className={`absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b ${gradient.replace('from-', 'from-').replace('to-', 'to-')}/50`} />

            {service.process.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="relative flex items-start gap-6 md:gap-8 mb-12 last:mb-0"
              >
                <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                  <span className="text-lg md:text-xl font-black text-white">{step.step}</span>
                </div>
                <div className="flex-1 pt-1 md:pt-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className={`inline-block text-sm font-semibold ${accentText} tracking-wider uppercase mb-3`}>Teslimatlar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Neler Dahil?</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.deliverables.map((deliverable, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`flex items-center gap-4 p-5 rounded-2xl border ${borderColor} bg-[#0B1528]`}
              >
                <CheckCircle className={`w-6 h-6 ${accentText} shrink-0`} />
                <span className="text-slate-200 font-semibold">{deliverable}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
            <span className={`inline-block text-sm font-semibold ${accentText} tracking-wider uppercase mb-3`}>Sonuclar</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Beklenen Sonuclar</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.metrics.map((metric, i) => (
              <AnimatedMetricCard key={i} metric={metric} gradient={gradient} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ===========================================================================
// Service Layout Router
// ===========================================================================

function getServiceLayout(service: ServiceItem): React.ReactNode {
  switch (service.slug) {
    case 'temel-kimlik':
      return <TemelKimlikLayout service={service} />
    case 'yasal-uyumluluk':
      return <YasalUyumlulukLayout service={service} />
    case 'erisilebilirlik':
      return <ErisilebilirlikLayout service={service} />
    case 'tema-gorsel':
      return <TemaGorselLayout service={service} />
    case 'seo':
      return <SeoLayout service={service} />
    case 'sem':
      return <SemLayout service={service} />
    case 'geo':
      return <GeoLayout service={service} />
    case 'aio-llmo':
      return <AioLlmoLayout service={service} />
    case 'analitik-performans':
      return <AnalitikPerformansLayout service={service as never} />
    case 'guvenlik':
      return <GuvenlikLayout service={service as never} />
    case 'ux-temelleri':
      return <UxTemelleriLayout service={service as never} />
    case 'sosyal-iletisim':
      return <SosyalIletisimLayout service={service as never} />
    default:
      return <DefaultLayout service={service} />
  }
}

// ===========================================================================
// MAIN COMPONENT
// ===========================================================================

export function ServiceDetailContent({
  service,
  relatedServices,
  prevService,
  nextService,
}: ServiceDetailContentProps) {
  const Icon = iconMap[service.icon]
  const gradient = getPhaseGradient(service.phaseNumber)
  const borderColor = getPhaseBorderColor(service.phaseNumber)
  const accentText = getPhaseAccentText(service.phaseNumber)
  const glowColor = getPhaseGlowColor(service.phaseNumber)

  return (
    <div className="min-h-screen bg-[#0F2447] overflow-hidden">
      {/* Background decoration — phase-specific gradient */}
      <div
        className="absolute top-0 inset-x-0 h-[600px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${glowColor} 0%, #0F2447 60%, #0F2447 100%)`,
        }}
      />

      {/* ================================================================= */}
      {/* HERO SECTION — shared but phase-colored                           */}
      {/* ================================================================= */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            {/* Back link */}
            <motion.div variants={itemVariants} className="mb-8">
              <Link
                href="/hizmetler"
                className={`inline-flex items-center gap-2 text-sm font-medium ${accentText} hover:opacity-80 transition-opacity uppercase tracking-wider bg-white/5 px-4 py-1.5 rounded-full border border-white/10`}
              >
                <ChevronLeft className="w-4 h-4" />
                Tum Hizmetler
              </Link>
            </motion.div>

            {/* Phase badge + icon */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
              <motion.div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}
                style={{ boxShadow: `0 0 40px ${glowColor}` }}
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <span className="text-3xl font-black text-white">{service.phaseNumber}</span>
              </motion.div>
              {Icon && (
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border ${borderColor}`}
                  whileHover={{ scale: 1.05, rotate: -3 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight"
            >
              {service.title}
            </motion.h1>

            {/* Short description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              {service.shortDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PHASE-SPECIFIC LAYOUT                                             */}
      {/* ================================================================= */}
      {getServiceLayout(service)}

      {/* ================================================================= */}
      {/* RELATED SERVICES                                                  */}
      {/* ================================================================= */}
      {relatedServices.length > 0 && (
        <section className="relative z-10 py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <span className={`inline-block text-sm font-semibold ${accentText} tracking-wider uppercase mb-3`}>
                Kesfet
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Iliskili Hizmetler</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {relatedServices.map((related) => {
                const RelatedIcon = iconMap[related.icon]
                const relGradient = getPhaseGradient(related.phaseNumber)
                const relBorder = getPhaseBorderColor(related.phaseNumber)
                return (
                  <motion.div key={related.slug} variants={itemVariants}>
                    <Link href={`/hizmetler/${related.slug}`}>
                      <div
                        className={`group p-6 rounded-2xl border bg-[#0B1528] ${relBorder} hover:border-white/20 transition-all duration-300 h-full`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${relGradient} flex items-center justify-center`}
                          >
                            <span className="text-sm font-black text-white">{related.phaseNumber}</span>
                          </div>
                          {RelatedIcon && <RelatedIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {related.shortTitle}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                          {related.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* FAQ SECTION                                                        */}
      {/* ================================================================= */}
      {service.faq && service.faq.length > 0 && (
        <PageFaq
          items={service.faq}
          title={`${service.shortTitle} — Sikca Sorulan Sorular`}
          subtitle={`Faz ${service.phaseNumber}: ${service.shortTitle} hizmeti hakkinda en cok merak edilen sorular ve yanitlari.`}
        />
      )}

      {/* ================================================================= */}
      {/* PREV / NEXT NAVIGATION                                            */}
      {/* ================================================================= */}
      <section className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch gap-4">
          {prevService ? (
            <Link href={`/hizmetler/${prevService.slug}`} className="flex-1">
              <motion.div
                whileHover={{ x: -4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-[#0B1528] hover:border-white/20 transition-all h-full"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Onceki</span>
                  <p className="text-white font-bold text-sm mt-0.5">
                    Faz {prevService.phaseNumber}: {prevService.shortTitle}
                  </p>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextService ? (
            <Link href={`/hizmetler/${nextService.slug}`} className="flex-1">
              <motion.div
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center justify-end gap-4 p-5 rounded-2xl border border-white/10 bg-[#0B1528] hover:border-white/20 transition-all text-right h-full"
              >
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sonraki</span>
                  <p className="text-white font-bold text-sm mt-0.5">
                    Faz {nextService.phaseNumber}: {nextService.shortTitle}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
              </motion.div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA SECTION — phase-colored                                       */}
      {/* ================================================================= */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-6"
            >
              <Sparkles className={`w-8 h-8 ${accentText}`} />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Bu Hizmeti Satin Alin</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10">
              <span className="font-semibold text-white">Faz {service.phaseNumber}: {service.shortTitle}</span> ile
              web sitenizi bir ust seviyeye tasiyin. Ucretsiz danismanlik gorusmesi icin hemen bize ulasin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="mailto:info@vixseo.com">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${gradient} hover:opacity-90 text-white font-bold text-lg rounded-xl px-8`}
                  style={{ boxShadow: `0 0 20px ${glowColor}` }}
                >
                  Teklif Isteyin <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/hizmetler">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-bold text-lg rounded-xl px-8"
                >
                  Tum Hizmetleri Gorun
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
