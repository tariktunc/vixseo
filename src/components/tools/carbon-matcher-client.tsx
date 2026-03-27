'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GitCompare,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Search,
  AlertTriangle,
  CheckCircle2,
  Info,
  Link2,
  Smartphone,
  Globe,
  ShieldCheck,
  BookOpen,
  Lightbulb,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { PageFaq } from '@/components/landing/page-faq'
import { CARBON_MATCHER_FAQ } from '@/lib/tools-data'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MatchStatus = 'idle' | 'checking' | 'done'

type MatchResult = {
  originalUrl: string
  cacheUrl: string
  canonicalCheck: 'match' | 'mismatch' | 'unknown'
  mobileCheck: 'match' | 'mismatch' | 'unknown'
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GOOGLE_CACHE_BASE = 'https://webcache.googleusercontent.com/search?q=cache:'

const EDUCATION_CARDS = [
  {
    title: 'Carbon Eşleştirme Nedir?',
    icon: BookOpen,
    content:
      'Carbon eşleştirme, Google\'ın indekslediği (cache\'lediği) sayfa sürümü ile sitenizde yayınlanan güncel sürüm arasındaki tutarlılığı kontrol etme işlemidir. Google bir sayfayı taradığında, o sayfanın bir kopyasını (cache) saklar. Bu kopya ile canlı sayfa arasındaki farklılıklar, indeksleme sorunlarına işaret edebilir.',
  },
  {
    title: 'Neden Önemli?',
    icon: Lightbulb,
    content:
      'Google\'ın cache\'lediği sayfa ile canlı sayfanız arasındaki uyumsuzluklar, arama sonuçlarındaki sıralamanızı olumsuz etkileyebilir. Özellikle canonical URL hataları, yanlış yönlendirmeler ve mobil-masaüstü içerik farklılıkları gibi sorunlar sık karşılaşılan problemlerdir. Düzenli kontrol ile bu sorunları erken tespit edebilirsiniz.',
  },
  {
    title: 'Yaygın Sorunlar ve Çözümleri',
    icon: ShieldCheck,
    content:
      'En sık karşılaşılan sorunlar: (1) Canonical URL uyumsuzluğu - doğru canonical etiketi ekleyin, (2) Mobil ve masaüstü farklı içerik - responsive tasarım kullanın, (3) JavaScript render sorunları - önemli içeriği HTML\'de sunun, (4) Cache\'de eski içerik - Search Console\'dan yeniden tarama talep edin.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'URL Girin',
    description: 'Kontrol etmek istediğiniz sayfanın URL\'sini girin.',
  },
  {
    step: '2',
    title: 'Kontrol Edin',
    description: 'Google cache linkini oluşturun ve sayfa durumunu inceleyin.',
  },
  {
    step: '3',
    title: 'Sorunlari Tespit Edin',
    description: 'Eşleştirme sorunlarını belirleyip çözüm adımlarını uygulayın.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeUrl(input: string): string {
  let cleaned = input.trim()
  if (!cleaned) return ''
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned
  }
  return cleaned
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: 'match' | 'mismatch' | 'unknown' }) {
  if (status === 'match') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-1">
        <CheckCircle2 className="w-3 h-3" />
        Eşleşme
      </span>
    )
  }
  if (status === 'mismatch') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/30 rounded-full px-2.5 py-1">
        <AlertTriangle className="w-3 h-3" />
        Uyumsuzluk
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
      <Info className="w-3 h-3" />
      Kontrol Edilmedi
    </span>
  )
}

function ResultCard({ result }: { result: MatchResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0B1528] border border-white/10 rounded-xl p-6 space-y-5"
    >
      {/* Cache link */}
      <div>
        <h3 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-emerald-400" />
          Google Cache Linki
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-xs text-slate-400 break-all font-mono">{result.cacheUrl}</p>
        </div>
        <a
          href={result.cacheUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Yeni sekmede aç
        </a>
      </div>

      {/* Match checks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Original URL */}
        <div className="bg-white/[0.02] border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">Orijinal URL</span>
          </div>
          <p className="text-xs text-slate-400 break-all">{result.originalUrl}</p>
        </div>

        {/* Canonical check */}
        <div className="bg-white/[0.02] border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">Canonical URL</span>
            </div>
            <StatusBadge status={result.canonicalCheck} />
          </div>
          <p className="text-xs text-slate-400">
            {result.canonicalCheck === 'unknown'
              ? 'Cache sayfasını açarak canonical etiketini kontrol edin.'
              : result.canonicalCheck === 'match'
                ? 'Canonical URL ile sayfa URL\'si eşleşiyor.'
                : 'Canonical URL ile sayfa URL\'si eşleşmiyor!'}
          </p>
        </div>

        {/* Mobile check */}
        <div className="bg-white/[0.02] border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">Mobil Sürüm</span>
            </div>
            <StatusBadge status={result.mobileCheck} />
          </div>
          <p className="text-xs text-slate-400">
            {result.mobileCheck === 'unknown'
              ? 'Mobil ve masaüstü versiyonları karşılaştırın.'
              : result.mobileCheck === 'match'
                ? 'Mobil ve masaüstü içeriği tutarlı.'
                : 'Mobil ve masaüstü içerik farklılığı tespit edildi!'}
          </p>
        </div>
      </div>

      {/* Educational note */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed">
            Google cache linki açıldığında sayfanın Google tarafından en son taranan sürümünü görürsünüz.
            Canlı sayfanızla karşılaştırarak içerik farklılıklarını tespit edebilirsiniz. Cache&apos;de
            görünmeyen içerik, Google tarafından indekslenmemiş olabilir.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Client Component
// ---------------------------------------------------------------------------

export function CarbonMatcherClient() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<MatchStatus>('idle')
  const [result, setResult] = useState<MatchResult | null>(null)

  const handleCheck = useCallback(() => {
    const normalized = normalizeUrl(url)
    if (!normalized) {
      toast.error('Lütfen geçerli bir URL girin')
      return
    }

    setStatus('checking')

    // Simulate a brief check
    setTimeout(() => {
      const cacheUrl = `${GOOGLE_CACHE_BASE}${encodeURIComponent(normalized)}`
      setResult({
        originalUrl: normalized,
        cacheUrl,
        canonicalCheck: 'unknown',
        mobileCheck: 'unknown',
      })
      setStatus('done')
      toast.success('Cache linki oluşturuldu')
    }, 800)
  }, [url])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') handleCheck()
    },
    [handleCheck],
  )

  return (
    <div className="pt-24 pb-0 min-h-screen bg-[#0F2447] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/15 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="text-center pt-16 md:pt-24 pb-10 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-4 h-4 mr-2" /> Ücretsiz Araç
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 max-w-4xl mx-auto">
            Carbon Eşleştirici
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Google&apos;ın indekslediği sayfalarınızı cache üzerinden kontrol edin ve eşleştirme sorunlarını tespit edin.
          </p>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* TOOL INPUT                                                       */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0B1528] border border-white/10 rounded-xl p-6"
        >
          <label className="block text-sm font-semibold text-slate-200 mb-3">
            Kontrol Edilecek URL
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://ornek.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
            />
            <Button
              onClick={handleCheck}
              disabled={status === 'checking'}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0"
            >
              {status === 'checking' ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Search className="w-4 h-4" />
                  </motion.div>
                  Kontrol Ediliyor...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Kontrol Et
                </span>
              )}
            </Button>
          </div>
          {url && (
            <p className="text-xs text-slate-500 mt-2">
              {extractDomain(normalizeUrl(url))} için Google cache kontrolü yapılacak
            </p>
          )}
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* RESULTS                                                          */}
      {/* ================================================================ */}
      {result && status === 'done' && (
        <section className="relative z-10 max-w-3xl mx-auto px-4 lg:px-8 mb-16">
          <ResultCard result={result} />
        </section>
      )}

      {/* ================================================================ */}
      {/* EDUCATIONAL SECTION                                              */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Bilgi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Carbon Eşleştirme Rehberi
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#0B1528] border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{card.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{card.content}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW IT WORKS                                                     */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Adımlar
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Nasıl Kullanılır?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#0B1528] border border-white/10 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 font-bold text-lg">{item.step}</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* FAQ                                                              */}
      {/* ================================================================ */}
      <PageFaq
        items={CARBON_MATCHER_FAQ}
        title="Carbon Eşleştirici Hakkında Sıkça Sorulan Sorular"
        subtitle="Aracımız hakkında merak ettiğiniz her şey."
      />

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
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
              Daha Fazla SEO Aracı Keşfedin
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
              Carbon Eşleştirici aracının yanında birçok ücretsiz SEO aracı sizi bekliyor.
            </p>
            <Link href="/araclar">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl px-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Tüm Araçları Gör
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
