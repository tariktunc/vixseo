'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, Variants, useInView } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
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
  BarChart3,
  Users,
  Zap,
  HeadphonesIcon,
  Quote,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageFaq } from '@/components/landing/page-faq'
import { getAllServices, SERVICES_FAQ, SERVICES_STATS } from '@/lib/services-data'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Testimonial = {
  company: string
  quote: string
  name: string
  role: string
}

type Advantage = {
  icon: LucideIcon
  title: string
  description: string
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const iconMap: Record<string, LucideIcon> = {
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

const testimonials: Testimonial[] = [
  {
    company: 'TechNova Digital',
    quote:
      'VixSEO ile çalışmaya başladıktan sonra organik trafiğimiz 3 ayda %120 arttı. 12 fazlı program her detayı düşünmüş.',
    name: 'Ahmet Yılmaz',
    role: 'Kurucu & CEO',
  },
  {
    company: 'Modavista E-Ticaret',
    quote:
      'Sayfa hızımız 6 saniyeden 1.8 saniyeye düştü. Google sıralamalarımız ilk sayfaya yükseldi. Mükemmel bir ekip.',
    name: 'Elif Kaya',
    role: 'Dijital Pazarlama Müdürü',
  },
  {
    company: 'SağlıkPlus Klinikleri',
    quote:
      'KVKK ve erişilebilirlik konusundaki uzmanlıkları bizi çok rahatlattı. Yasal uyumluluk fazını herkese öneriyoruz.',
    name: 'Dr. Mehmet Demir',
    role: 'Genel Müdür',
  },
]

const advantages: Advantage[] = [
  {
    icon: BarChart3,
    title: 'Veri Odaklı Yaklaşım',
    description: 'Her kararı veriye dayandırıyoruz. Öncesi-sonrası metrikleri ile somut sonuçlar.',
  },
  {
    icon: Users,
    title: 'Uzman Ekip',
    description: 'SEO, geliştirme ve tasarım uzmanlarından oluşan multidisipliner kadro.',
  },
  {
    icon: Zap,
    title: 'Ölçülebilir Sonuçlar',
    description: "Net KPI'lar ve düzenli raporlama ile yatırımınızın geri dönüşünü görün.",
  },
  {
    icon: HeadphonesIcon,
    title: 'Sürekli Destek',
    description: '3 ay ücretsiz destek ve danışmanlık. Her zaman yanınızda.',
  },
]

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

// ---------------------------------------------------------------------------
// Animated Counter
// ---------------------------------------------------------------------------

function AnimatedCounter({ value, suffix }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const numericValue = parseInt(value, 10)

  useEffect(() => {
    if (!isInView || isNaN(numericValue)) return

    let start = 0
    const end = numericValue
    const duration = 2000
    const stepTime = Math.max(Math.floor(duration / end), 16)
    const increment = Math.max(1, Math.floor(end / (duration / stepTime)))

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, numericValue])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-white tracking-tight">
      {count}
      {suffix && <span className="text-emerald-400">{suffix}</span>}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Timeline Item
// ---------------------------------------------------------------------------

function TimelineItem({
  phase,
  title,
  description,
  index,
}: {
  phase: number
  title: string
  description: string
  index: number
}) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex items-start gap-6 md:gap-0"
    >
      {/* Desktop: alternating layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] w-full items-start gap-8">
        {/* Left content */}
        <div className={`${isLeft ? 'text-right' : ''}`}>
          {isLeft ? (
            <div className="bg-[#0B1528] border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-white font-bold text-base mb-1">
                Faz {phase}: {title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* Center line + circle */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
            {phase}
          </div>
          {index < 11 && <div className="w-0.5 h-16 bg-gradient-to-b from-emerald-500/40 to-transparent" />}
        </div>

        {/* Right content */}
        <div>
          {!isLeft ? (
            <div className="bg-[#0B1528] border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-white font-bold text-base mb-1">
                Faz {phase}: {title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="flex md:hidden gap-4 w-full">
        <div className="flex flex-col items-center shrink-0">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-xs">
            {phase}
          </div>
          {index < 11 && <div className="w-0.5 flex-1 bg-gradient-to-b from-emerald-500/40 to-transparent" />}
        </div>
        <div className="bg-[#0B1528] border border-white/10 rounded-xl p-4 flex-1 mb-4 hover:border-emerald-500/30 transition-colors">
          <h4 className="text-white font-bold text-sm mb-1">
            Faz {phase}: {title}
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function HizmetlerPage() {
  const services = getAllServices()

  return (
    <div className="pt-24 pb-0 min-h-screen bg-[#0F2447] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/15 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}
      <section className="text-center py-16 md:py-24 px-4 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <Sparkles className="w-4 h-4 mr-2" /> 12 Fazlı Profesyonel Program
          </motion.div>

          <motion.h1
            variants={cardVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto"
          >
            Web Sitenizi 12 Adımda{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Mükemmelleştiriyoruz
            </span>
          </motion.h1>

          <motion.p
            variants={cardVariants}
            className="text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Temel kimlikten güvenliğe, SEO&apos;dan erişilebilirliğe kadar web sitenizin tüm
            optimizasyon ihtiyaçlarını karşılıyoruz.
          </motion.p>

          <motion.div variants={cardVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Ücretsiz Danışmanlık Alın
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 font-bold text-lg rounded-xl px-8"
              >
                Fiyat Teklifi İsteyin
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* STATS BAR                                                          */}
      {/* ================================================================== */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 mb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {SERVICES_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-slate-400 text-sm font-medium mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* 12 PHASE CARDS                                                     */}
      {/* ================================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            12 Fazlı Optimizasyon Programı
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Her fazda uzman ekibimiz web sitenizi bir adım daha ileriye taşır.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="block h-full bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ml-auto">
                      <span className="text-xs font-bold text-slate-400">{service.phaseNumber}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{service.shortTitle}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{service.shortDescription}</p>

                  <span className="text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
                    Detaylı Bilgi
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* TIMELINE                                                           */}
      {/* ================================================================== */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Süreç
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Nasıl Çalışıyoruz?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            12 fazlı programımız adım adım web sitenizi dönüştürür.
          </p>
        </motion.div>

        <div className="space-y-2 md:space-y-0">
          {services.map((service, index) => (
            <TimelineItem
              key={service.id}
              phase={service.phaseNumber}
              title={service.shortTitle}
              description={service.shortDescription}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEDEN BIZ                                                          */}
      {/* ================================================================== */}
      <section className="relative z-10 bg-[#0B1528] py-20 md:py-28 px-4 lg:px-8 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              Avantajlarımız
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Neden VixSEO?</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {advantages.map((adv) => (
              <motion.div
                key={adv.title}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#0F2447] border border-white/10 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <adv.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{adv.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TESTIMONIALS                                                       */}
      {/* ================================================================== */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Referanslar
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Müşterilerimiz Ne Diyor?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors relative"
            >
              <Quote className="w-8 h-8 text-emerald-500/20 absolute top-4 right-4" />
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-slate-400 text-xs">
                  {t.role} — {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* FAQ                                                                */}
      {/* ================================================================== */}
      <PageFaq
        items={SERVICES_FAQ}
        title="Hizmetlerimiz Hakkında Sık Sorulan Sorular"
        subtitle="Optimizasyon programımız hakkında merak ettiğiniz her şey."
      />

      {/* ================================================================== */}
      {/* FINAL CTA                                                          */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 md:py-28 px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-[#0B1528] to-[#112240] border border-emerald-500/20 rounded-3xl p-10 md:p-16 shadow-[0_0_60px_rgba(16,185,129,0.08)]">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ücretsiz Analiz Raporunuzu Alın
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
              Web sitenizin mevcut durumunu analiz edelim ve size özel optimizasyon planı oluşturalım.
            </p>
            <Link href="/support">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl px-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Hemen Başlayın
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
