'use client'

import { motion, Variants } from 'framer-motion'
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
} from 'lucide-react'
import React from 'react'
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
}

type ServiceDetailContentProps = {
  service: ServiceItem
  relatedServices: ServiceItem[]
  prevService: ServiceItem | null
  nextService: ServiceItem | null
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
// Animation Variants
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
// Phase gradient colors
// ---------------------------------------------------------------------------

function getPhaseGradient(phase: number): string {
  const gradients: Record<number, string> = {
    1: 'from-violet-500 to-purple-600',
    2: 'from-rose-500 to-red-600',
    3: 'from-sky-500 to-blue-600',
    4: 'from-pink-500 to-fuchsia-600',
    5: 'from-emerald-500 to-green-600',
    6: 'from-amber-500 to-orange-600',
    7: 'from-cyan-500 to-teal-600',
    8: 'from-indigo-500 to-blue-600',
    9: 'from-yellow-500 to-amber-600',
    10: 'from-slate-500 to-gray-600',
    11: 'from-lime-500 to-green-600',
    12: 'from-blue-500 to-indigo-600',
  }
  return gradients[phase] || 'from-emerald-500 to-cyan-600'
}

function getPhaseBorderColor(phase: number): string {
  const colors: Record<number, string> = {
    1: 'border-violet-500/30',
    2: 'border-rose-500/30',
    3: 'border-sky-500/30',
    4: 'border-pink-500/30',
    5: 'border-emerald-500/30',
    6: 'border-amber-500/30',
    7: 'border-cyan-500/30',
    8: 'border-indigo-500/30',
    9: 'border-yellow-500/30',
    10: 'border-slate-500/30',
    11: 'border-lime-500/30',
    12: 'border-blue-500/30',
  }
  return colors[phase] || 'border-emerald-500/30'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ServiceDetailContent({
  service,
  relatedServices,
  prevService,
  nextService,
}: ServiceDetailContentProps) {
  const Icon = iconMap[service.icon]
  const gradient = getPhaseGradient(service.phaseNumber)
  const borderColor = getPhaseBorderColor(service.phaseNumber)

  return (
    <div className="min-h-screen bg-[#0F2447] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* ================================================================= */}
      {/* HERO SECTION                                                      */}
      {/* ================================================================= */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            {/* Back link */}
            <motion.div variants={itemVariants} className="mb-8">
              <Link
                href="/hizmetler"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30"
              >
                <ChevronLeft className="w-4 h-4" />
                Tum Hizmetler
              </Link>
            </motion.div>

            {/* Phase badge + icon */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
              >
                <span className="text-3xl font-black text-white">{service.phaseNumber}</span>
              </div>
              {Icon && (
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-20 flex items-center justify-center border ${borderColor}`}
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
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
      {/* NE YAPIYORUZ                                                      */}
      {/* ================================================================= */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              Detaylar
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ne Yapiyoruz?</h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-4xl">{service.longDescription}</p>
          </motion.div>

          {/* Features grid */}
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
                className={`flex items-start gap-4 p-5 rounded-2xl border bg-[#0B1528] ${borderColor}`}
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200 font-medium leading-snug">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CALISMA SURECIMIZ (Timeline)                                      */}
      {/* ================================================================= */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              Surec
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Calisma Surecimiz</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-blue-500/50 to-transparent" />

            {service.process.map((step, i) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="relative flex items-start gap-6 md:gap-8 mb-12 last:mb-0"
              >
                {/* Step number badge */}
                <div
                  className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}
                >
                  <span className="text-lg md:text-xl font-black text-white">{step.step}</span>
                </div>

                {/* Step content */}
                <div className="flex-1 pt-1 md:pt-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* NELER DAHIL                                                       */}
      {/* ================================================================= */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              Teslimatlar
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Neler Dahil?</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {service.deliverables.map((deliverable, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/20 bg-[#0B1528]"
              >
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-semibold">{deliverable}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* BEKLENEN SONUCLAR                                                 */}
      {/* ================================================================= */}
      <section className="relative z-10 py-20 px-4 bg-[#0B1528]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              Sonuclar
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Beklenen Sonuclar</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {service.metrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border bg-[#0B1528] ${borderColor}`}
              >
                <div className={`text-4xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                  {metric.value}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{metric.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{metric.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* ILISKILI HIZMETLER                                                */}
      {/* ================================================================= */}
      {relatedServices.length > 0 && (
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
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
      {/* PREV / NEXT NAVIGATION                                            */}
      {/* ================================================================= */}
      <section className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch gap-4">
          {prevService ? (
            <Link href={`/hizmetler/${prevService.slug}`} className="flex-1">
              <motion.div
                whileHover={{ x: -4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-[#0B1528] hover:border-emerald-500/30 transition-all h-full"
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
                className="flex items-center justify-end gap-4 p-5 rounded-2xl border border-white/10 bg-[#0B1528] hover:border-emerald-500/30 transition-all text-right h-full"
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
      {/* CTA SECTION                                                       */}
      {/* ================================================================= */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Bu Hizmeti Satin Alin</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10">
              <span className="font-semibold text-white">Faz {service.phaseNumber}: {service.shortTitle}</span> ile
              web sitenizi bir ust seviyeye tasiyin. Ucretsiz danismanlik gorusmesi icin hemen bize ulasin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="mailto:info@vixseo.com">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
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
