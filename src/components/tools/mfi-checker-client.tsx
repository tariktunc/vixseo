'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone,
  Monitor,
  Search,
  CheckCircle,
  XCircle,
  ArrowRight,
  Loader2,
  AlertTriangle,
  FileText,
  Link2,
  Eye,
  Gauge,
  Info,
  Shield,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PageFaq } from '@/components/landing/page-faq'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PageData = {
  title: string | null
  description: string | null
  viewport: boolean
  canonical: string | null
  statusCode: number
  contentLength: number
}

type MfiCheckResult = {
  url: string
  mobile: PageData
  desktop: PageData
  matches: {
    title: boolean
    description: boolean
    canonical: boolean
    viewport: boolean
  }
  score: number
  fetchedAt: string
}

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

const MFI_FAQ = [
  {
    question: 'Mobile-First Indexing (MFI) nedir?',
    answer:
      'Mobile-First Indexing, Google\'un web sayfalarini indekslerken ve siralarken oncelikle sayfanin mobil versiyonunu kullanmasi anlamina gelir. 2019\'dan itibaren yeni siteler icin varsayilan indeksleme yontemi budur ve 2023 itibarıyla tum siteler icin gecerlidir.',
  },
  {
    question: 'MFI kontrolu neden onemli?',
    answer:
      'Eger mobil sayfaniz masaustu versiyonunuzdan farkli icerik, baslik veya meta etiketleri iceriyorsa, Google siralamaniz olumsuz etkilenebilir. MFI kontrolu, bu farkliliklari tespit ederek duzeltmenize yardimci olur.',
  },
  {
    question: 'Viewport etiketi neden gerekli?',
    answer:
      'Viewport meta etiketi, tarayiciya sayfanin mobil cihazlarda nasil olceklenmesi gerektigini bildirir. Bu etiket olmadan sayfaniz mobil cihazlarda masaustu boyutunda gorunur ve kullanici deneyimi kotu olur.',
  },
  {
    question: 'Title ve description farkliligi sorun yaratir mi?',
    answer:
      'Evet. Google mobil versiyonu indekslediginden, mobil sayfanizdaki title ve description arama sonuclarinda goruntulenir. Masaustu ile farkli olmalari karisikliga yol acar ve tiklama oranini dusurebilir.',
  },
  {
    question: 'Canonical URL uyumsuzlugu ne anlama gelir?',
    answer:
      'Canonical URL, arama motorlarina sayfanin orijinal versiyonunu gosterir. Mobil ve masaustu versiyonlarinda farkli canonical URL\'ler tanimlanmissa, Google hangi sayfayi indeksleyecegi konusunda kararsiz kalabilir.',
  },
  {
    question: 'Icerik boyutu farki onemli mi?',
    answer:
      'Buyuk icerik boyutu farklari, mobil sayfanizda bazi iceriklerin eksik olduguna isaret edebilir. Google, mobil versiyonda bulunmayan icerigi indekslemez, bu da siralamanizi dusurur.',
  },
  {
    question: 'MFI puani nasil hesaplaniyor?',
    answer:
      'MFI puani, mobil ve masaustu versiyonlari arasindaki title, description, canonical URL eslesmeleri ve viewport etiketinin varligina gore hesaplanir. Her kriter esit agirlikla degerlendirilir.',
  },
  {
    question: 'MFI sorunlarini nasil duzeltirim?',
    answer:
      'Responsive tasarim kullanin, mobil ve masaustu icin ayni icerik, title, description ve canonical URL\'leri saglayin. Viewport meta etiketini eklemeyi unutmayin. Mobil sayfanizin masaustu ile ayni yapilandirilmis verileri icerdiginden emin olun.',
  },
]

// ---------------------------------------------------------------------------
// Score helpers
// ---------------------------------------------------------------------------

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 50) return 'text-amber-400'
  return 'text-red-400'
}

function getScoreTrackColor(score: number): string {
  if (score >= 80) return 'stroke-emerald-500'
  if (score >= 50) return 'stroke-amber-500'
  return 'stroke-red-500'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'MFI Uyumlu'
  if (score >= 50) return 'Iyilestirme Gerekli'
  return 'Kritik Sorunlar'
}

// ---------------------------------------------------------------------------
// Score Circle
// ---------------------------------------------------------------------------

function ScoreCircle({ score }: { score: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-white/5"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={getScoreTrackColor(score)}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={`text-4xl font-extrabold ${getScoreColor(score)}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-slate-400 mt-1">{getScoreLabel(score)}</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Comparison Table
// ---------------------------------------------------------------------------

function ComparisonTable({ result }: { result: MfiCheckResult }) {
  const rows = [
    {
      label: 'Title',
      mobile: result.mobile.title ?? 'Bulunamadi',
      desktop: result.desktop.title ?? 'Bulunamadi',
      match: result.matches.title,
      icon: FileText,
    },
    {
      label: 'Meta Description',
      mobile: result.mobile.description ?? 'Bulunamadi',
      desktop: result.desktop.description ?? 'Bulunamadi',
      match: result.matches.description,
      icon: FileText,
    },
    {
      label: 'Canonical URL',
      mobile: result.mobile.canonical ?? 'Bulunamadi',
      desktop: result.desktop.canonical ?? 'Bulunamadi',
      match: result.matches.canonical,
      icon: Link2,
    },
    {
      label: 'Viewport Etiketi',
      mobile: result.mobile.viewport ? 'Mevcut' : 'Eksik',
      desktop: result.desktop.viewport ? 'Mevcut' : 'Eksik',
      match: result.matches.viewport,
      icon: Eye,
    },
    {
      label: 'HTTP Durum Kodu',
      mobile: String(result.mobile.statusCode),
      desktop: String(result.desktop.statusCode),
      match: result.mobile.statusCode === result.desktop.statusCode,
      icon: Gauge,
    },
    {
      label: 'Icerik Boyutu',
      mobile: `~${Math.round(result.mobile.contentLength / 1024)} KB`,
      desktop: `~${Math.round(result.desktop.contentLength / 1024)} KB`,
      match:
        Math.abs(result.mobile.contentLength - result.desktop.contentLength) /
          Math.max(result.desktop.contentLength, 1) <
        0.1,
      icon: Gauge,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="overflow-x-auto"
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400">
              Kontrol
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> Mobil
              </span>
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Monitor className="w-4 h-4" /> Masaustu
              </span>
            </th>
            <th className="text-center py-4 px-4 text-sm font-semibold text-slate-400">
              Durum
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const RowIcon = row.icon
            return (
              <motion.tr
                key={row.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                    <RowIcon className="w-4 h-4 text-slate-400" />
                    {row.label}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-slate-300 max-w-[200px] truncate">
                  {row.mobile}
                </td>
                <td className="py-4 px-4 text-sm text-slate-300 max-w-[200px] truncate">
                  {row.desktop}
                </td>
                <td className="py-4 px-4 text-center">
                  {row.match ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                  )}
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function ResultSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Skeleton className="w-40 h-40 rounded-full" />
      </div>
      <Skeleton className="h-64 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Educational Section
// ---------------------------------------------------------------------------

function EducationalSection() {
  const sections = [
    {
      icon: Info,
      title: 'Mobile-First Indexing Nedir?',
      content:
        'Mobile-First Indexing (MFI), Google\'un web sayfalarini tarayip indekslerken oncelikle mobil versiyonu kullanmasi anlamina gelir. Bu, Google\'un siralamalari belirlerken sayfanizin masaustu degil, mobil versiyonunu esas aldigi anlamina gelir. 2023 itibarıyla Google tum web siteleri icin Mobile-First Indexing\'e gecis yapmistir.',
    },
    {
      icon: Shield,
      title: 'MFI Kontrolu Neden Onemli?',
      content:
        'Mobil ve masaustu versiyonlariniz arasinda icerik, title veya meta etiket farkliliklari varsa, Google mobil versiyonu indeksleyecegi icin masaustunde gorunen icerikleriniz kaybolabilir. Bu durum siralamanizi, organik trafiginizi ve kullanici deneyiminizi dogrudan etkiler.',
    },
    {
      icon: AlertTriangle,
      title: 'Sik Karsilasilan MFI Sorunlari',
      content:
        'En yaygin sorunlar arasinda viewport meta etiketi eksikligi, mobil ve masaustu arasinda farkli title/description kullanimi, mobilde gizlenen icerikler, farkli canonical URL\'ler ve mobilde yavas yuklenen sayfalar yer alir. Bu sorunlarin hepsi arama motoru siralamalarinizi olumsuz etkiler.',
    },
  ]

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
          Bilgi
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Mobile-First Indexing Rehberi
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          MFI hakkinda bilmeniz gereken her sey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, i) => {
          const SectionIcon = section.icon
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                <SectionIcon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{section.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{section.content}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function MfiCheckerClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<MfiCheckResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleCheck() {
    if (!url.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/tools/mfi-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Bir hata olustu')
        return
      }

      setResult(data as MfiCheckResult)
    } catch {
      setError('Baglanti hatasi. Lutfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-0 min-h-screen bg-[#0F2447] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/15 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      {/* ================================================================ */}
      {/* HERO + INPUT                                                     */}
      {/* ================================================================ */}
      <section className="relative z-10 text-center py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Smartphone className="w-4 h-4 mr-2" /> MFI Denetleyici
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto">
            Mobile-First Indexing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Uyumlulugunu Denetleyin
            </span>
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Web sitenizin mobil ve masaustu versiyonlarini karsilastirin.
            Google&apos;in MFI gereksinimlerine uygunlugunuzu kontrol edin.
          </p>
        </motion.div>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleCheck()
            }}
            className="flex gap-3"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ornek.com"
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#0B1528] border border-white/10 text-white placeholder-slate-500 text-base focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !url.trim()}
              size="lg"
              className="h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Smartphone className="w-5 h-5 mr-2" />
                  Denetle
                </>
              )}
            </Button>
          </form>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              >
                <XCircle className="w-4 h-4 inline mr-2 mb-0.5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* RESULTS                                                          */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 mb-16">
        {loading && <ResultSkeleton />}

        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0B1528] border border-white/10 rounded-2xl p-8 mb-8 text-center"
              >
                <h2 className="text-lg font-bold text-white mb-6">MFI Uyumluluk Puani</h2>
                <ScoreCircle score={result.score} />
                <p className="text-sm text-slate-400 mt-4">
                  {result.score >= 80
                    ? 'Siteniz Mobile-First Indexing icin iyi durumda!'
                    : result.score >= 50
                      ? 'Bazi uyumsuzluklar tespit edildi. Asagidaki tabloyu inceleyin.'
                      : 'Kritik MFI sorunlari tespit edildi. Acil iyilestirme onerilir.'}
                </p>
              </motion.div>

              {/* Comparison Table */}
              <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  Mobil vs Masaustu Karsilastirma
                </h3>
                <ComparisonTable result={result} />
              </div>

              {/* Quick summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className={`rounded-xl border p-5 ${
                    result.matches.viewport
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-red-500/30 bg-red-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className={`w-5 h-5 ${result.matches.viewport ? 'text-emerald-400' : 'text-red-400'}`} />
                    <span className="font-semibold text-white text-sm">Viewport</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {result.matches.viewport
                      ? 'Viewport meta etiketi mobil sayfada mevcut.'
                      : 'Viewport meta etiketi mobil sayfada eksik! Bu kritik bir MFI sorunudur.'}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className={`rounded-xl border p-5 ${
                    result.matches.title
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-red-500/30 bg-red-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className={`w-5 h-5 ${result.matches.title ? 'text-emerald-400' : 'text-red-400'}`} />
                    <span className="font-semibold text-white text-sm">Icerik Eslesmesi</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {result.matches.title && result.matches.description
                      ? 'Title ve description her iki versiyonda da ayni.'
                      : 'Mobil ve masaustu arasinda icerik farkliliklari tespit edildi.'}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className={`rounded-xl border p-5 ${
                    Math.abs(result.mobile.contentLength - result.desktop.contentLength) /
                      Math.max(result.desktop.contentLength, 1) <
                    0.1
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-amber-500/30 bg-amber-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Gauge
                      className={`w-5 h-5 ${
                        Math.abs(result.mobile.contentLength - result.desktop.contentLength) /
                          Math.max(result.desktop.contentLength, 1) <
                        0.1
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    />
                    <span className="font-semibold text-white text-sm">Boyut Farki</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Mobil: ~{Math.round(result.mobile.contentLength / 1024)} KB | Masaustu: ~{Math.round(result.desktop.contentLength / 1024)} KB
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================================================================ */}
      {/* EDUCATIONAL                                                      */}
      {/* ================================================================ */}
      <EducationalSection />

      {/* ================================================================ */}
      {/* FAQ                                                              */}
      {/* ================================================================ */}
      <PageFaq
        items={MFI_FAQ}
        title="MFI Denetleyici Hakkinda"
        subtitle="Mobile-First Indexing ve aracimiz hakkinda sikca sorulan sorular."
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
              Profesyonel MFI Analizi mi Istiyorsunuz?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
              VixSEO ile tum sayfalarinizin Mobile-First Indexing uyumlulugunu
              otomatik olarak izleyin.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl px-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                VixSEO&apos;yu Deneyin
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
