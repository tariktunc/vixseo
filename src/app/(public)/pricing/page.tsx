'use client'

import { useState } from 'react'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Check,
  Minus,
  ChevronDown,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PricingTier = {
  name: string
  desc: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
  cta: string
  href: string
  popular: boolean
}

type ComparisonFeature = {
  label: string
  starter: boolean | string
  pro: boolean | string
  agency: boolean | string
}

type PricingFaq = {
  q: string
  a: string
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tiers: PricingTier[] = [
  {
    name: 'Başlangıç',
    desc: 'Küçük projeler ve bireysel bloglar için ideal çözüm.',
    monthlyPrice: 99,
    annualPrice: 79,
    features: [
      '1 web sitesi',
      'Temel GSC entegrasyonu',
      '50 sayfa analizi',
      'Haftalık raporlar',
      'E-posta desteği',
      'Temel SEO denetimi',
    ],
    cta: 'Ücretsiz Başla',
    href: '/sign-up',
    popular: false,
  },
  {
    name: 'Pro',
    desc: 'Büyüyen işletmeler ve profesyonel içerik üreticileri için.',
    monthlyPrice: 1000,
    annualPrice: 800,
    features: [
      '10 web sitesi',
      'Tam GSC entegrasyonu (16 ay veri)',
      'Sınırsız sayfa analizi',
      'Günlük raporlar',
      'Toplu blog düzenleyici',
      'Öncelikli destek',
      'Gelişmiş SEO denetimi',
      'Anahtar kelime takibi',
    ],
    cta: "Pro'ya Geç",
    href: '/sign-up',
    popular: true,
  },
  {
    name: 'Ajans',
    desc: 'Birden fazla müşteri yöneten SEO ajansları ve dev projeler.',
    monthlyPrice: 2500,
    annualPrice: 2000,
    features: [
      'Sınırsız web sitesi',
      'White-label raporlar',
      'API erişimi',
      'Takım üyeleri',
      'Özel GSC dışa aktarma',
      '7/24 telefon desteği',
      'Özel hesap yöneticisi',
      'SLA garantisi',
    ],
    cta: 'Bize Ulaşın',
    href: 'mailto:sales@vixseo.com',
    popular: false,
  },
]

const comparisonFeatures: ComparisonFeature[] = [
  { label: 'Web sitesi sayısı', starter: '1', pro: '10', agency: 'Sınırsız' },
  { label: 'GSC entegrasyonu', starter: 'Temel', pro: 'Tam (16 ay)', agency: 'Tam (16 ay)' },
  { label: 'Sayfa analizi', starter: '50', pro: 'Sınırsız', agency: 'Sınırsız' },
  { label: 'Raporlama sıklığı', starter: 'Haftalık', pro: 'Günlük', agency: 'Günlük' },
  { label: 'SEO denetimi', starter: 'Temel', pro: 'Gelişmiş', agency: 'Gelişmiş' },
  { label: 'E-posta desteği', starter: true, pro: true, agency: true },
  { label: 'Öncelikli destek', starter: false, pro: true, agency: true },
  { label: 'Toplu blog düzenleyici', starter: false, pro: true, agency: true },
  { label: 'Anahtar kelime takibi', starter: false, pro: true, agency: true },
  { label: 'White-label raporlar', starter: false, pro: false, agency: true },
  { label: 'API erişimi', starter: false, pro: false, agency: true },
  { label: 'Takım üyeleri', starter: false, pro: false, agency: true },
  { label: 'Özel GSC dışa aktarma', starter: false, pro: false, agency: true },
  { label: '7/24 telefon desteği', starter: false, pro: false, agency: true },
  { label: 'Özel hesap yöneticisi', starter: false, pro: false, agency: true },
  { label: 'SLA garantisi', starter: false, pro: false, agency: true },
]

const pricingFaqs: PricingFaq[] = [
  {
    q: 'Faturalama döngüsü nasıl çalışır?',
    a: 'Aylık planlarda her ay, yıllık planlarda yılın başında ödeme alınır. Yıllık planlarda %20 indirim uygulanır ve toplam tutar tek seferde faturalandırılır.',
  },
  {
    q: 'İade politikanız nedir?',
    a: 'Tüm planlarımız için 14 günlük para iade garantisi sunuyoruz. Bu süre içerisinde memnun kalmazsanız, herhangi bir neden belirtmeksizin tam iade alabilirsiniz.',
  },
  {
    q: 'Planımızı yükseltebilir veya düşürebilir miyiz?',
    a: 'Evet, istediğiniz zaman plan değişikliği yapabilirsiniz. Yükseltmelerde fark anında faturalandırılır. Düşürmelerde kalan süre bir sonraki dönem için kredi olarak kullanılır.',
  },
  {
    q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    a: 'Visa, Mastercard, American Express kredi/banka kartları ve banka havalesi ile ödeme kabul ediyoruz. Kurumsal müşteriler için fatura ile ödeme de mümkündür.',
  },
  {
    q: 'Fatura kesebilir misiniz?',
    a: 'Evet, tüm planlar için e-fatura kesiyoruz. Hesap ayarlarınızdan fatura bilgilerinizi girebilir ve geçmiş faturalarınızı indirebilirsiniz.',
  },
  {
    q: 'Sözleşme şartları nedir?',
    a: 'Aylık planlarda herhangi bir bağlanma süresi yoktur, istediğiniz zaman iptal edebilirsiniz. Yıllık planlarda 12 aylık bir taahhüt söz konusudur ancak 14 günlük iade süresi geçerlidir.',
  },
  {
    q: 'Ücretsiz deneme süresi var mı?',
    a: 'Başlangıç planı için 14 günlük ücretsiz deneme sunuyoruz. Deneme süresi boyunca tüm özelliklere erişebilirsiniz. Kredi kartı bilgisi gerekmez.',
  },
  {
    q: 'Takım fiyatlandırması nasıl çalışır?',
    a: 'Ajans planında sınırsız takım üyesi ekleyebilirsiniz. Pro planında ekstra takım üyesi başına aylık $50 ek ücret uygulanır. Başlangıç planı tek kullanıcı için tasarlanmıştır.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(price: number): string {
  return price.toLocaleString('tr-TR')
}

function renderCellValue(value: boolean | string) {
  if (typeof value === 'string') {
    return <span className="text-slate-200 text-sm font-medium">{value}</span>
  }
  return value ? (
    <Check className="w-5 h-5 text-emerald-400 mx-auto" />
  ) : (
    <Minus className="w-5 h-5 text-slate-600 mx-auto" />
  )
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

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#0F2447] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* ---- Hero + Toggle ---- */}
      <section className="text-center py-16 px-4 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-400 mb-8 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <Sparkles className="w-4 h-4 mr-2" /> Şeffaf Fiyatlandırma
          </motion.div>

          <motion.h1
            variants={cardVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
          >
            Yatırımınızın Geri Dönüşünü{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Görün
            </span>
          </motion.h1>

          <motion.p
            variants={cardVariants}
            className="text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Sürpriz ücret yok, gizli maliyetler yok. İhtiyacınıza en uygun paketi seçin ve SEO
            yönetiminizi hemen bugün profesyonelleştirin.
          </motion.p>

          {/* Toggle */}
          <motion.div
            variants={cardVariants}
            className="flex items-center justify-center gap-4 mb-20 bg-black/20 p-2 rounded-full border border-white/10 w-max mx-auto shadow-2xl backdrop-blur-md"
          >
            <span className={`text-sm font-bold px-4 ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Aylık
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="flex w-16 h-8 bg-slate-800 rounded-full items-center px-1 transition-colors relative"
              style={{ backgroundColor: isAnnual ? '#10B981' : '#1E293B' }}
            >
              <div
                className="w-6 h-6 bg-white rounded-full shadow-md transition-transform"
                style={{ transform: isAnnual ? 'translateX(32px)' : 'translateX(0)' }}
              />
            </button>
            <div className="flex items-center gap-2 pr-2">
              <span className={`text-sm font-bold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
                Yıllık
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-100 bg-emerald-500 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                %20 İndirim
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ---- Pricing Cards ---- */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {tiers.map((tier) => {
            const displayPrice = isAnnual ? tier.annualPrice : tier.monthlyPrice
            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                  tier.popular
                    ? 'bg-[#0B1528] border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.15)] scale-100 md:scale-105 z-10'
                    : 'bg-[#0B1528] border-white/10 shadow-2xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    En Çok Tercih Edilen
                  </div>
                )}

                <div className="mb-8 mt-2">
                  <h3 className="text-2xl font-extrabold text-white mb-3">{tier.name}</h3>
                  <p className="text-slate-300 text-sm h-12 leading-relaxed">{tier.desc}</p>
                </div>

                <div className="mb-8 flex items-end gap-1 pb-8 border-b border-white/10">
                  <span className="text-5xl font-black text-white tracking-tight">
                    ${formatPrice(displayPrice)}
                  </span>
                  <span className="text-slate-300 font-bold mb-2">/ay</span>
                </div>

                <ul className="flex-1 space-y-5 mb-10 text-left">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex gap-4 text-slate-200">
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          tier.popular ? 'text-emerald-400' : 'text-blue-400'
                        }`}
                      />
                      <span className="font-medium text-[1.05rem] leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={tier.href}>
                  <Button
                    size="lg"
                    className={`w-full font-bold text-lg rounded-xl transition-all duration-300 ${
                      tier.popular
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ---- Enterprise Banner ---- */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-[#0B1528] to-[#112240] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Building2 className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1">Kurumsal</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                Özel ihtiyaçlarınız mı var? Büyük ölçekli projeler, özel entegrasyonlar ve
                adanmış destek ekibi ile size özel bir plan oluşturalım.
              </p>
            </div>
          </div>
          <Link href="mailto:enterprise@vixseo.com" className="shrink-0">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-xl px-8 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Bize Ulaşın <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ---- Feature Comparison Table ---- */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Detaylı Karşılaştırma
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Özellik Karşılaştırma Tablosu
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="rounded-2xl border border-white/10 bg-[#0B1528] overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-0 border-b border-white/10">
            <div className="p-5 text-left">
              <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                Özellik
              </span>
            </div>
            {['Başlangıç', 'Pro', 'Ajans'].map((name) => (
              <div key={name} className="p-5 text-center border-l border-white/10">
                <span className="text-white font-bold text-base">{name}</span>
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {comparisonFeatures.map((feature, i) => (
            <motion.div
              key={feature.label}
              variants={rowVariants}
              className={`grid grid-cols-4 gap-0 border-b border-white/5 ${
                i % 2 === 0 ? 'bg-white/[0.02]' : ''
              }`}
            >
              <div className="p-4 pl-5 text-left">
                <span className="text-slate-300 text-sm">{feature.label}</span>
              </div>
              <div className="p-4 text-center border-l border-white/5">
                {renderCellValue(feature.starter)}
              </div>
              <div className="p-4 text-center border-l border-white/5">
                {renderCellValue(feature.pro)}
              </div>
              <div className="p-4 text-center border-l border-white/5">
                {renderCellValue(feature.agency)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- Pricing FAQ ---- */}
      <section className="max-w-3xl mx-auto px-4 lg:px-8 mt-24 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            SSS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Fiyatlandırma Hakkında Sıkça Sorulan Sorular
          </h2>
        </motion.div>

        <div className="space-y-3">
          {pricingFaqs.map((faq, i) => {
            const isOpen = openFaqIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className={`w-full text-left rounded-xl border p-5 transition-all duration-200 ${
                    isOpen
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-white/10 bg-[#0B1528] hover:border-emerald-500/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white text-sm md:text-base">{faq.q}</h3>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
