'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Type,
  ScanSearch,
  Trophy,
  Eye,
  GitCompare,
  Smartphone,
  Table,
  Puzzle,
  Globe,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageFaq } from '@/components/landing/page-faq'
import { getAllTools, TOOLS_GENERAL_FAQ } from '@/lib/tools-data'

// ---------------------------------------------------------------------------
// Icon Map
// ---------------------------------------------------------------------------

const iconMap: Record<string, LucideIcon> = {
  type: Type,
  'scan-search': ScanSearch,
  trophy: Trophy,
  eye: Eye,
  'git-compare': GitCompare,
  smartphone: Smartphone,
  table: Table,
  puzzle: Puzzle,
  globe: Globe,
}

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: 'active' | 'coming-soon' }) {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
        Aktif
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400">
      Yakında
    </span>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function AraclarPage() {
  const tools = getAllTools()

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
            <Sparkles className="w-4 h-4 mr-2" /> Ücretsiz SEO Araçları
          </motion.div>

          <motion.h1
            variants={cardVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto"
          >
            SEO Sürecinizi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Hızlandırın
            </span>
          </motion.h1>

          <motion.p
            variants={cardVariants}
            className="text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Kelime sayacından SEO analizine kadar ihtiyacınız olan tüm araçlar bir tık uzağınızda.
            Hesap açmadan, tamamen ücretsiz kullanın.
          </motion.p>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* TOOL CARDS                                                         */}
      {/* ================================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 mb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon] || Sparkles
            const isActive = tool.status === 'active'

            return (
              <motion.div
                key={tool.slug}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {isActive ? (
                  <Link
                    href={tool.href}
                    className="block h-full bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 group"
                  >
                    <ToolCardContent icon={Icon} tool={tool} />
                  </Link>
                ) : (
                  <div className="block h-full bg-[#0B1528] border border-white/10 rounded-2xl p-6 opacity-75 cursor-default">
                    <ToolCardContent icon={Icon} tool={tool} />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* FAQ                                                                */}
      {/* ================================================================== */}
      <PageFaq
        items={TOOLS_GENERAL_FAQ}
        title="Araçlar Hakkında Sık Sorulan Sorular"
        subtitle="Ücretsiz SEO araçlarımız hakkında merak ettiğiniz her şey."
      />

      {/* ================================================================== */}
      {/* CTA                                                                */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 md:py-28 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-[#0B1528] to-[#112240] border border-emerald-500/20 rounded-3xl p-10 md:p-16 shadow-[0_0_60px_rgba(16,185,129,0.08)]">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Daha Fazla SEO Desteği mi Gerekiyor?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
              Profesyonel SEO hizmetlerimizle web sitenizin potansiyelini keşfedin.
            </p>
            <Link href="/hizmetler">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl px-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Hizmetlerimizi Keşfedin
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tool Card Content (shared between Link and div wrappers)
// ---------------------------------------------------------------------------

function ToolCardContent({
  icon: Icon,
  tool,
}: {
  icon: LucideIcon
  tool: { title: string; shortDescription: string; longDescription: string; status: 'active' | 'coming-soon' }
}) {
  const isActive = tool.status === 'active'

  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-emerald-400" />
        </div>
        <StatusBadge status={tool.status} />
      </div>

      <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-3">{tool.shortDescription}</p>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">{tool.longDescription}</p>

      {isActive ? (
        <span className="text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
          Aracı Kullan
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      ) : (
        <span className="text-sm font-semibold text-amber-400/70 inline-flex items-center gap-1">
          Yakında Kullanıma Açılacak
        </span>
      )}
    </>
  )
}
