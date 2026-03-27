'use client'

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion'
import {
  Gauge,
  Zap,
  Activity,
  TrendingUp,
  BarChart3,
  Timer,
  Lock,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Bug,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Layout,
  Smartphone,
  Tablet,
  Monitor,
  MousePointer2,
  ArrowDown,
  Navigation,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Bell,
  MessageCircle,
  Heart,
  Users,
  Link2,
  Image,
  Globe,
  ArrowRight,
} from 'lucide-react'
import { useEffect, useRef, useState, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ServiceItemProps = {
  slug: string
  phaseNumber: number
  title: string
  shortTitle: string
  shortDescription: string
  features: string[]
  deliverables: string[]
  process: { step: number; title: string; description: string }[]
  metrics: { label: string; value: string; description: string }[]
  faq: { question: string; answer: string }[]
  relatedServices: { slug: string; phaseNumber: number; shortTitle: string; icon: string }[]
}

// ---------------------------------------------------------------------------
// Shared: Animated Counter
// ---------------------------------------------------------------------------

function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
}: {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => Math.round(v))

  useEffect(() => {
    if (inView) {
      animate(motionVal, target, { duration, ease: 'easeOut' })
    }
  }, [inView, target, duration, motionVal])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${v}${suffix}`
    })
    return unsubscribe
  }, [rounded, prefix, suffix])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Shared: Section Wrapper
// ---------------------------------------------------------------------------

function SectionBlock({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative z-10 py-20 px-4 ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  )
}

// ---------------------------------------------------------------------------
// Shared: Flow Diagram Step
// ---------------------------------------------------------------------------

function FlowStep({
  label,
  icon: Icon,
  index,
  total,
  accentColor,
  circular = false,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  index: number
  total: number
  accentColor: string
  circular?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="flex flex-col items-center gap-2 relative"
    >
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-sm ${accentColor}`}
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
      </div>
      <span className="text-xs md:text-sm font-semibold text-white text-center max-w-[80px]">
        {label}
      </span>
      {index < total - 1 && !circular && (
        <ArrowRight className="absolute -right-4 top-5 w-4 h-4 text-white/40 hidden md:block" />
      )}
    </motion.div>
  )
}

// =========================================================================
// FAZ 9 — Analitik & Performans
// =========================================================================

function SpeedometerGauge({
  value,
  label,
  color,
}: {
  value: number
  label: string
  color: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const rotation = useTransform(motionVal, [0, 100], [-135, 135])

  useEffect(() => {
    if (inView) {
      animate(motionVal, value, { duration: 2.5, ease: 'easeOut' })
    }
  }, [inView, value, motionVal])

  return (
    <div className="flex flex-col items-center gap-3">
      <svg ref={ref} viewBox="0 0 120 80" className="w-32 h-20 md:w-40 md:h-24">
        {/* Background arc */}
        <path
          d="M 15 70 A 50 50 0 0 1 105 70"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Colored arc */}
        <motion.path
          d="M 15 70 A 50 50 0 0 1 105 70"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: value / 100 } : { pathLength: 0 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />
        {/* Needle */}
        <motion.line
          x1="60"
          y1="70"
          x2="60"
          y2="28"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            originX: '60px',
            originY: '70px',
            rotate: rotation,
          }}
        />
        <circle cx="60" cy="70" r="4" fill="white" />
      </svg>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">
          <AnimatedCounter target={value} />
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  )
}

function CWVGauge({
  label,
  value,
  unit,
  threshold,
  color,
}: {
  label: string
  value: number
  unit: string
  threshold: string
  color: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={264}
            initial={{ strokeDashoffset: 264 }}
            animate={inView ? { strokeDashoffset: 264 * (1 - 0.9) } : { strokeDashoffset: 264 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <CheckCircle className="w-8 h-8" style={{ color }} />
        </div>
      </div>
      <span className="text-lg font-bold text-white">{label}</span>
      <span className="text-sm text-slate-400">{threshold}</span>
      <motion.div
        className="text-xs font-semibold px-3 py-1 rounded-full"
        style={{ background: `${color}20`, color }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
      >
        {value}{unit} — Iyi
      </motion.div>
    </div>
  )
}

function WaterfallItem({
  label,
  width,
  color,
  delay,
}: {
  label: string
  width: number
  color: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-xs text-slate-400 w-16 text-right shrink-0">{label}</span>
      <motion.div
        className="h-5 rounded-r-md"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${width}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
      />
    </div>
  )
}

export function AnalitikPerformansLayout({ service }: { service: ServiceItemProps }) {
  return (
    <>
      {/* Hero — Green/Lime gradient */}
      <section className="relative z-10 pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-600/20 via-green-900/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime-500/30 bg-lime-500/10 text-lime-400 text-sm font-semibold uppercase tracking-wider mb-8">
              <Gauge className="w-4 h-4" />
              Faz {service.phaseNumber}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Speedometer Demo — 30 to 95 */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-lime-400 uppercase tracking-wider">Hiz Testi</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            Siteniz Ne Kadar Hizli?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Before / After Speedometers */}
          <div className="flex flex-col items-center gap-6">
            <span className="text-sm text-red-400 font-semibold uppercase tracking-wider">Oncesi</span>
            <SpeedometerGauge value={30} label="Performans Skoru" color="#ef4444" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <span className="text-sm text-lime-400 font-semibold uppercase tracking-wider">Sonrasi</span>
            <SpeedometerGauge value={95} label="Performans Skoru" color="#84cc16" />
          </div>
        </div>

        {/* Waterfall Chart */}
        <div className="mt-16 p-6 rounded-2xl border border-white/10 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-lime-400" />
            Yukleme Sirasi (Waterfall)
          </h3>
          <div className="space-y-3">
            <WaterfallItem label="HTML" width={15} color="#84cc16" delay={0} />
            <WaterfallItem label="CSS" width={25} color="#22c55e" delay={0.15} />
            <WaterfallItem label="Font" width={20} color="#16a34a" delay={0.3} />
            <WaterfallItem label="JS" width={40} color="#65a30d" delay={0.45} />
            <WaterfallItem label="Gorsel" width={60} color="#4ade80" delay={0.6} />
            <WaterfallItem label="LCP" width={35} color="#a3e635" delay={0.75} />
          </div>
        </div>
      </SectionBlock>

      {/* Core Web Vitals */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-lime-400 uppercase tracking-wider">Metrikler</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Core Web Vitals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CWVGauge label="LCP" value={2.1} unit="sn" threshold="< 2.5 saniye" color="#84cc16" />
          <CWVGauge label="INP" value={120} unit="ms" threshold="< 200ms" color="#22c55e" />
          <CWVGauge label="CLS" value={0.05} unit="" threshold="< 0.1" color="#4ade80" />
        </div>
      </SectionBlock>

      {/* Flow Diagram — DevOps-style circular loop */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-lime-400 uppercase tracking-wider">Surecimiz</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            Surekli Optimizasyon Dongusu
          </h2>
        </div>
        <div className="relative">
          {/* Circular connection line (visual only on desktop) */}
          <div className="hidden md:block absolute inset-0">
            <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <motion.ellipse
                cx="400"
                cy="100"
                rx="320"
                ry="60"
                fill="none"
                stroke="rgba(132,204,22,0.15)"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 relative z-10">
            {[
              { label: 'Olc', icon: Activity },
              { label: 'Analiz Et', icon: BarChart3 },
              { label: 'Optimize Et', icon: Zap },
              { label: 'Yayinla', icon: TrendingUp },
              { label: 'Izle', icon: Timer },
            ].map((step, i) => (
              <FlowStep
                key={step.label}
                label={step.label}
                icon={step.icon}
                index={i}
                total={5}
                accentColor="border-lime-500/50"
                circular
              />
            ))}
          </div>
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <span className="text-xs text-lime-400/60 uppercase tracking-wider">Dongu surekli tekrarlar</span>
          </motion.div>
        </div>
      </SectionBlock>

      {/* Metrics with animated counters */}
      <SectionBlock>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {service.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 rounded-xl border border-lime-500/20 backdrop-blur-sm"
              style={{ background: 'rgba(132,204,22,0.05)' }}
            >
              <div className="text-2xl md:text-3xl font-black text-lime-400">{m.value}</div>
              <div className="text-xs text-slate-400 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* CTA */}
      <SectionBlock>
        <motion.div
          className="text-center p-10 rounded-3xl border border-lime-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(132,204,22,0.08), rgba(34,197,94,0.05))' }}
          whileHover={{ scale: 1.01 }}
        >
          <Zap className="w-10 h-10 text-lime-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Performansinizi Zirveye Tasiyin</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Core Web Vitals optimizasyonu ve sayfa hizi artisi ile hem siralamada hem donusumde fark yaratin.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-lime-500/20 transition-all"
          >
            Ucretsiz Hiz Analizi
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </SectionBlock>
    </>
  )
}

// =========================================================================
// FAZ 10 — Guvenlik
// =========================================================================

function SecurityGrade({
  grade,
  color,
}: {
  grade: string
  color: string
}) {
  const grades = ['F', 'D', 'C', 'B', 'A', 'A+']
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [currentGrade, setCurrentGrade] = useState(0)

  useEffect(() => {
    if (!inView) return
    const targetIdx = grades.indexOf(grade)
    let i = 0
    const interval = setInterval(() => {
      if (i >= targetIdx) {
        clearInterval(interval)
        return
      }
      i++
      setCurrentGrade(i)
    }, 400)
    return () => clearInterval(interval)
  }, [inView, grade])

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {grades.map((g, i) => (
          <motion.div
            key={g}
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center text-sm font-black border"
            animate={{
              borderColor: i <= currentGrade ? color : 'rgba(255,255,255,0.1)',
              background: i <= currentGrade ? `${color}20` : 'rgba(255,255,255,0.02)',
              color: i <= currentGrade ? color : 'rgba(255,255,255,0.3)',
              scale: i === currentGrade ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {g}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ShieldLayer({
  label,
  icon: Icon,
  delay,
  color,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  delay: number
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-4 p-4 rounded-xl border backdrop-blur-sm"
      style={{ borderColor: `${color}40`, background: `${color}08` }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}20` }}
      >
        <div style={{ color }}><Icon className="w-5 h-5" /></div>
      </div>
      <span className="text-sm font-semibold text-white">{label}</span>
    </motion.div>
  )
}

function ThreatCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(47)
  const display = useTransform(motionVal, (v) => Math.round(v))
  const [val, setVal] = useState(47)

  useEffect(() => {
    if (inView) {
      animate(motionVal, 0, { duration: 3, ease: 'easeOut' })
    }
  }, [inView, motionVal])

  useEffect(() => {
    const unsub = display.on('change', (v) => setVal(v))
    return unsub
  }, [display])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-red-500/20 backdrop-blur-sm"
      style={{ background: 'rgba(239,68,68,0.05)' }}
    >
      <AlertTriangle className="w-8 h-8 text-red-400 mb-2" />
      <div className="text-4xl font-black text-red-400">
        {val}
      </div>
      <span className="text-xs text-slate-400 uppercase tracking-wider">Acik Tehdit</span>
      {val === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-1 text-xs text-green-400 font-semibold mt-1"
        >
          <CheckCircle className="w-3 h-3" />
          Tumu Kapatildi
        </motion.div>
      )}
    </div>
  )
}

function SecurityScanBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="p-6 rounded-2xl border border-red-500/20 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-red-400" />
        <span className="text-sm font-bold text-white">Guvenlik Taramasi</span>
      </div>
      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500"
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </div>
      <motion.div
        className="flex items-center gap-1 mt-3 text-xs text-green-400 font-semibold"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 3.2 }}
      >
        <CheckCircle className="w-3 h-3" />
        Tarama Tamamlandi — A+ Guvenlik Notu
      </motion.div>
    </div>
  )
}

function AnimatedLock() {
  return (
    <motion.div
      className="relative w-20 h-20 mx-auto"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-red-500/30"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-red-500/20"
        animate={{
          scale: [1, 1.7, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.3 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Lock className="w-10 h-10 text-red-400" />
      </div>
    </motion.div>
  )
}

export function GuvenlikLayout({ service }: { service: ServiceItemProps }) {
  return (
    <>
      {/* Hero — Red/Dark gradient */}
      <section className="relative z-10 pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-800/20 via-red-950/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <AnimatedLock />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-semibold uppercase tracking-wider mt-6 mb-8">
              <Shield className="w-4 h-4" />
              Faz {service.phaseNumber}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Layers */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Savunma</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Guvenlik Katmanlari</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Content Security Policy (CSP)', icon: ShieldCheck, color: '#ef4444' },
            { label: 'HSTS & Preload', icon: Lock, color: '#f97316' },
            { label: 'XSS / CSRF Korumasi', icon: ShieldAlert, color: '#eab308' },
            { label: 'Rate Limiting', icon: Shield, color: '#22c55e' },
            { label: 'Input Sanitization', icon: Bug, color: '#06b6d4' },
            { label: 'Sizma Testi', icon: Eye, color: '#8b5cf6' },
          ].map((layer, i) => (
            <ShieldLayer
              key={layer.label}
              label={layer.label}
              icon={layer.icon}
              delay={i * 0.15}
              color={layer.color}
            />
          ))}
        </div>
      </SectionBlock>

      {/* Threat Map / Scan */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Tarama</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Tehdit Haritasi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ThreatCounter />
          <SecurityScanBar />
        </div>
      </SectionBlock>

      {/* Security Grade */}
      <SectionBlock>
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Hedef</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Guvenlik Notu</h2>
        </div>
        <SecurityGrade grade="A+" color="#22c55e" />
      </SectionBlock>

      {/* Flow Diagram */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Surecimiz</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Koruma Akisi</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { label: 'Tehdit', icon: AlertTriangle },
            { label: 'Firewall', icon: Shield },
            { label: 'Basliklar', icon: Lock },
            { label: 'Auth', icon: ShieldCheck },
            { label: 'Izleme', icon: Eye },
          ].map((step, i) => (
            <FlowStep
              key={step.label}
              label={step.label}
              icon={step.icon}
              index={i}
              total={5}
              accentColor="border-red-500/50"
            />
          ))}
        </div>
      </SectionBlock>

      {/* Metrics */}
      <SectionBlock>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {service.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 rounded-xl border border-red-500/20 backdrop-blur-sm"
              style={{ background: 'rgba(239,68,68,0.05)' }}
            >
              <div className="text-2xl md:text-3xl font-black text-red-400">{m.value}</div>
              <div className="text-xs text-slate-400 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* CTA */}
      <SectionBlock>
        <motion.div
          className="text-center p-10 rounded-3xl border border-red-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(185,28,28,0.05))' }}
          whileHover={{ scale: 1.01 }}
        >
          <ShieldCheck className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Sitenizi Siber Tehditlere Karsi Koruyun</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            A+ guvenlik notu ve sizma testi ile siteniz tam koruma altinda.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg hover:shadow-red-500/20 transition-all"
          >
            Ucretsiz Guvenlik Taramasi
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </SectionBlock>
    </>
  )
}

// =========================================================================
// FAZ 11 — UX Temelleri
// =========================================================================

function DeviceSwitcher() {
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>('phone')
  const devices = [
    { key: 'phone' as const, icon: Smartphone, width: 'w-44', height: 'h-72' },
    { key: 'tablet' as const, icon: Tablet, width: 'w-64', height: 'h-72' },
    { key: 'desktop' as const, icon: Monitor, width: 'w-80', height: 'h-56' },
  ]
  const current = devices.find((d) => d.key === device) ?? devices[0]

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        {devices.map((d) => (
          <button
            key={d.key}
            onClick={() => setDevice(d.key)}
            className={`p-2 rounded-lg border transition-all ${
              device === d.key
                ? 'border-pink-500/50 bg-pink-500/10 text-pink-400'
                : 'border-white/10 text-slate-500 hover:text-white'
            }`}
          >
            <d.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
      <motion.div
        className={`${current.width} ${current.height} rounded-xl border-2 border-pink-500/30 overflow-hidden relative`}
        style={{ background: 'rgba(255,255,255,0.03)' }}
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Mock content */}
        <div className="p-3 space-y-2">
          <div className="h-2 w-3/4 rounded bg-pink-500/20" />
          <div className="h-2 w-1/2 rounded bg-white/10" />
          <div className="h-16 w-full rounded bg-pink-500/10 mt-3" />
          <div className="h-2 w-full rounded bg-white/10 mt-2" />
          <div className="h-2 w-5/6 rounded bg-white/10" />
          <div className="h-8 w-24 rounded bg-pink-500/20 mt-3" />
        </div>
      </motion.div>
    </div>
  )
}

function ErrorPageToggle() {
  const [isGood, setIsGood] = useState(false)

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={() => setIsGood(!isGood)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-sm font-semibold hover:bg-pink-500/20 transition-all"
      >
        {isGood ? 'Iyi 404' : 'Kotu 404'}
        <span className="text-xs text-slate-400">— Degistir</span>
      </button>

      <motion.div
        className="w-72 h-48 rounded-xl border border-white/10 overflow-hidden p-6 flex flex-col items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.03)' }}
        key={isGood ? 'good' : 'bad'}
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.4 }}
      >
        {isGood ? (
          <>
            <XCircle className="w-8 h-8 text-pink-400 mb-2" />
            <span className="text-lg font-bold text-white">404</span>
            <span className="text-xs text-slate-400 mt-1 text-center">
              Sayfa bulunamadi. Ana sayfaya donun veya arayin.
            </span>
            <div className="flex gap-2 mt-3">
              <div className="px-3 py-1 rounded bg-pink-500/20 text-xs text-pink-400 font-semibold">
                Ana Sayfa
              </div>
              <div className="px-3 py-1 rounded bg-white/10 text-xs text-slate-400">
                Ara
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="text-4xl font-black text-slate-600">404</span>
            <span className="text-xs text-slate-600 mt-1">Not Found</span>
          </>
        )}
      </motion.div>
    </div>
  )
}

function AnimatedCursorPath() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative w-full h-48 rounded-xl border border-white/10 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Waypoints */}
      {[
        { x: '10%', y: '20%', label: 'Landing' },
        { x: '35%', y: '50%', label: 'Navigate' },
        { x: '60%', y: '30%', label: 'Convert' },
        { x: '85%', y: '60%', label: 'Return' },
      ].map((wp, i) => (
        <motion.div
          key={wp.label}
          className="absolute flex flex-col items-center gap-1"
          style={{ left: wp.x, top: wp.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.3 + 0.5 }}
        >
          <div className="w-3 h-3 rounded-full bg-pink-400" />
          <span className="text-[10px] text-slate-400">{wp.label}</span>
        </motion.div>
      ))}

      {/* Animated cursor */}
      {inView && (
        <motion.div
          className="absolute z-10"
          initial={{ left: '10%', top: '20%' }}
          animate={{
            left: ['10%', '35%', '60%', '85%'],
            top: ['20%', '50%', '30%', '60%'],
          }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
        >
          <MousePointer2 className="w-5 h-5 text-pink-400" />
        </motion.div>
      )}

      {/* Path line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        <motion.path
          d="M 40 40 Q 100 100 140 100 Q 180 100 240 60 Q 300 20 340 120"
          fill="none"
          stroke="rgba(236,72,153,0.3)"
          strokeWidth="2"
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2 }}
        />
      </svg>
    </div>
  )
}

function BounceRateMeter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(72)
  const display = useTransform(motionVal, (v) => Math.round(v))
  const [val, setVal] = useState(72)

  useEffect(() => {
    if (inView) {
      animate(motionVal, 35, { duration: 2.5, ease: 'easeOut' })
    }
  }, [inView, motionVal])

  useEffect(() => {
    const unsub = display.on('change', (v) => setVal(v))
    return unsub
  }, [display])

  const color = val > 55 ? '#ef4444' : val > 40 ? '#eab308' : '#22c55e'

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-pink-500/20 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <ArrowDown className="w-6 h-6 text-pink-400" />
      <div className="text-4xl font-black" style={{ color }}>
        %{val}
      </div>
      <span className="text-xs text-slate-400 uppercase tracking-wider">Bounce Rate</span>
    </div>
  )
}

export function UxTemelleriLayout({ service }: { service: ServiceItemProps }) {
  return (
    <>
      {/* Hero — Pink/Magenta gradient */}
      <section className="relative z-10 pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-700/20 via-fuchsia-900/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-sm font-semibold uppercase tracking-wider mb-8">
              <Layout className="w-4 h-4" />
              Faz {service.phaseNumber}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* User Journey Path */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">Yolculuk</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Kullanici Yolculugu</h2>
        </div>
        <AnimatedCursorPath />
        <div className="mt-6 text-center">
          <BounceRateMeter />
        </div>
      </SectionBlock>

      {/* Before/After — 404 Page */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">Karsilastirma</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Oncesi / Sonrasi</h2>
        </div>
        <ErrorPageToggle />
      </SectionBlock>

      {/* Device Switcher */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">Responsive</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Her Cihazda Mukemmel</h2>
        </div>
        <DeviceSwitcher />
      </SectionBlock>

      {/* Flow Diagram */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">Surecimiz</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">UX Akisi</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { label: 'Yolculuk', icon: Navigation },
            { label: 'Landing', icon: Layout },
            { label: 'Gezinti', icon: MousePointer2 },
            { label: 'Donusum', icon: TrendingUp },
            { label: 'Geri Donus', icon: Users },
          ].map((step, i) => (
            <FlowStep
              key={step.label}
              label={step.label}
              icon={step.icon}
              index={i}
              total={5}
              accentColor="border-pink-500/50"
            />
          ))}
        </div>
      </SectionBlock>

      {/* Metrics */}
      <SectionBlock>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {service.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 rounded-xl border border-pink-500/20 backdrop-blur-sm"
              style={{ background: 'rgba(236,72,153,0.05)' }}
            >
              <div className="text-2xl md:text-3xl font-black text-pink-400">{m.value}</div>
              <div className="text-xs text-slate-400 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* CTA */}
      <SectionBlock>
        <motion.div
          className="text-center p-10 rounded-3xl border border-pink-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(168,85,247,0.05))' }}
          whileHover={{ scale: 1.01 }}
        >
          <Layout className="w-10 h-10 text-pink-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Kullanici Deneyimini Donusturun</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Profesyonel UX bilesenleri ile bounce rate dusurun, session suresini artirin.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/20 transition-all"
          >
            Ucretsiz UX Audit
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </SectionBlock>
    </>
  )
}

// =========================================================================
// FAZ 12 — Sosyal & Iletisim
// =========================================================================

function OGPreviewCard({
  platform,
  color,
}: {
  platform: 'Facebook' | 'Twitter' | 'LinkedIn'
  color: string
}) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Facebook,
    Twitter,
    LinkedIn: Linkedin,
  }
  const PlatformIcon = icons[platform]
  const widths: Record<string, string> = {
    Facebook: 'w-72',
    Twitter: 'w-64',
    LinkedIn: 'w-68',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-3"
    >
      <div className="flex items-center gap-2" style={{ color }}>
        {PlatformIcon && <PlatformIcon className="w-4 h-4" />}
        <span className="text-xs font-semibold uppercase tracking-wider">{platform}</span>
      </div>
      <div
        className={`${widths[platform] ?? 'w-64'} rounded-xl border overflow-hidden`}
        style={{ borderColor: `${color}30`, background: 'rgba(255,255,255,0.03)' }}
      >
        {/* OG Image preview */}
        <div
          className="h-32 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)` }}
        >
          <div className="text-center">
            <Image className="w-8 h-8 mx-auto mb-1" style={{ color }} />
            <span className="text-[10px] text-slate-500">1200 x 630</span>
          </div>
        </div>
        {/* Card content */}
        <div className="p-3 space-y-1.5">
          <div className="h-2 w-3/4 rounded bg-white/15" />
          <div className="h-1.5 w-full rounded bg-white/8" />
          <div className="h-1.5 w-2/3 rounded bg-white/8" />
          <div className="flex items-center gap-1 mt-2">
            <Globe className="w-2.5 h-2.5 text-slate-500" />
            <div className="h-1.5 w-16 rounded bg-white/8" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SocialRipple() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative w-full h-56 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Center share icon */}
      <motion.div
        className="relative z-10 w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center"
        animate={inView ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Share2 className="w-6 h-6 text-blue-400" />
      </motion.div>

      {/* Ripple circles */}
      {[1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-blue-500/10"
          style={{ width: ring * 100, height: ring * 100 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? {
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 1.2],
          } : {}}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: ring * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Floating social icons */}
      {inView && (
        <>
          {[
            { Icon: Facebook, x: -80, y: -40, delay: 0.5 },
            { Icon: Twitter, x: 90, y: -30, delay: 0.8 },
            { Icon: Linkedin, x: -60, y: 50, delay: 1.1 },
            { Icon: Heart, x: 70, y: 40, delay: 1.4 },
            { Icon: MessageCircle, x: 0, y: -60, delay: 1.7 },
          ].map(({ Icon, x, y, delay }, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              transition={{ delay, duration: 0.5, type: 'spring' }}
            >
              <Icon className="w-4 h-4 text-blue-400/60" />
            </motion.div>
          ))}
        </>
      )}
    </div>
  )
}

function NotificationBell() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const display = useTransform(motionVal, (v) => Math.round(v))
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (inView) {
      animate(motionVal, 128, { duration: 2, ease: 'easeOut' })
    }
  }, [inView, motionVal])

  useEffect(() => {
    const unsub = display.on('change', (v) => setCount(v))
    return unsub
  }, [display])

  return (
    <div ref={ref} className="relative inline-flex">
      <motion.div
        animate={inView ? { rotate: [0, 15, -15, 10, -10, 0] } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Bell className="w-10 h-10 text-blue-400" />
      </motion.div>
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <span className="text-[10px] font-bold text-white">{count > 99 ? '99+' : count}</span>
      </motion.div>
    </div>
  )
}

function ShareCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [clicks, setClicks] = useState(0)

  const handleClick = useCallback(() => {
    setClicks((prev) => prev + 1)
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <span className="text-sm font-bold text-white">Paylasim Butonu Demo</span>
      <div className="flex gap-2">
        {[
          { Icon: Facebook, color: '#1877F2' },
          { Icon: Twitter, color: '#1DA1F2' },
          { Icon: Linkedin, color: '#0A66C2' },
          { Icon: Link2, color: '#22c55e' },
        ].map(({ Icon, color }, i) => (
          <motion.button
            key={i}
            onClick={handleClick}
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
            style={{ background: `${color}15` }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </motion.button>
        ))}
      </div>
      <motion.div
        className="text-xs text-slate-400"
        key={clicks}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
      >
        {clicks > 0 ? `${clicks} paylasim` : 'Tikla ve dene'}
      </motion.div>
    </div>
  )
}

export function SosyalIletisimLayout({ service }: { service: ServiceItemProps }) {
  return (
    <>
      {/* Hero — Blue/Social gradient */}
      <section className="relative z-10 pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-indigo-900/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-center mb-6">
              <NotificationBell />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold uppercase tracking-wider mb-8">
              <Share2 className="w-4 h-4" />
              Faz {service.phaseNumber}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* OG Preview Cards */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Onizleme</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
            Sosyal Medyada Nasil Gorunuyorsunuz?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <OGPreviewCard platform="Facebook" color="#1877F2" />
          <OGPreviewCard platform="Twitter" color="#1DA1F2" />
          <OGPreviewCard platform="LinkedIn" color="#0A66C2" />
        </div>
      </SectionBlock>

      {/* Sharing Ripple Effect */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Etki</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Paylasim Etkisi</h2>
        </div>
        <SocialRipple />
      </SectionBlock>

      {/* Interactive Share Buttons + Counter */}
      <SectionBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ShareCounter />
          <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <span className="text-sm font-bold text-white">Sosyal Ag Grafi</span>
            {/* CSS-only social network nodes */}
            <div className="relative w-48 h-48">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
                const x = 50 + 35 * Math.cos(angle)
                const y = 50 + 35 * Math.sin(angle)
                return (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 rounded-full bg-blue-400"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  />
                )
              })}
              {/* Center node */}
              <motion.div
                className="absolute w-6 h-6 rounded-full bg-blue-500 border-2 border-blue-300"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
                  const x = 50 + 35 * Math.cos(angle)
                  const y = 50 + 35 * Math.sin(angle)
                  return (
                    <motion.line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke="rgba(96,165,250,0.2)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  )
                })}
              </svg>
            </div>
          </div>
        </div>
      </SectionBlock>

      {/* Flow Diagram */}
      <SectionBlock>
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Surecimiz</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Sosyal Iletisim Akisi</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { label: 'Olustur', icon: Image },
            { label: 'Paylas', icon: Share2 },
            { label: 'Etkilesim', icon: Heart },
            { label: 'Analiz', icon: BarChart3 },
            { label: 'Tekrarla', icon: TrendingUp },
          ].map((step, i) => (
            <FlowStep
              key={step.label}
              label={step.label}
              icon={step.icon}
              index={i}
              total={5}
              accentColor="border-blue-500/50"
            />
          ))}
        </div>
      </SectionBlock>

      {/* Metrics */}
      <SectionBlock>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {service.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 rounded-xl border border-blue-500/20 backdrop-blur-sm"
              style={{ background: 'rgba(59,130,246,0.05)' }}
            >
              <div className="text-2xl md:text-3xl font-black text-blue-400">{m.value}</div>
              <div className="text-xs text-slate-400 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* CTA */}
      <SectionBlock>
        <motion.div
          className="text-center p-10 rounded-3xl border border-blue-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.05))' }}
          whileHover={{ scale: 1.01 }}
        >
          <Share2 className="w-10 h-10 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Sosyal Varliginizi Guclendirin</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            OG image, social cards ve paylasim optimizasyonu ile etkilesimi %45 artirin.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            Sosyal Medya Analizi
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </SectionBlock>
    </>
  )
}
