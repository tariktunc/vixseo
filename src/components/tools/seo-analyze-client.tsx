'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ArrowRight,
  Loader2,
  Globe,
  FileText,
  Image as ImageIcon,
  Link2,
  Heading1,
  ImageOff,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PageFaq } from '@/components/landing/page-faq'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SeoAnalysisResult = {
  url: string
  title: string | null
  titleLength: number
  description: string | null
  descriptionLength: number
  ogImage: string | null
  ogTitle: string | null
  ogDescription: string | null
  canonical: string | null
  h1: string | null
  h1Count: number
  imgWithoutAlt: number
  fetchedAt: string
}

type CheckStatus = 'good' | 'warning' | 'critical'

type CheckResult = {
  name: string
  icon: LucideIcon
  status: CheckStatus
  value: string
  recommendation: string
  points: number
}

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

const SEO_ANALYZE_FAQ = [
  {
    question: 'SEO analiz aracı ne işe yarar?',
    answer:
      'SEO analiz aracı, web sitenizin arama motorları tarafından nasıl görüldüğünü kontrol eder. Title etiketi, meta description, Open Graph etiketleri, canonical URL ve H1 başlık yapısı gibi temel SEO unsurlarını analiz ederek eksikleri tespit eder.',
  },
  {
    question: 'Analiz sonuçları ne kadar güvenilir?',
    answer:
      'Aracımız sayfanızın HTML kaynak kodunu doğrudan okuyarak analiz yapar. Sonuçlar, arama motorlarının sayfanızı gördüğü şekle dayanır. Ancak JavaScript ile dinamik olarak oluşturulan içerikler bu analizde görünmeyebilir.',
  },
  {
    question: 'Title etiketi neden önemli?',
    answer:
      'Title etiketi, arama sonuçlarında sayfanızın başlığı olarak görüntülenir. Google, 50-60 karakter arasındaki title etiketlerini en iyi şekilde gösterir. Çok kısa veya çok uzun title etiketleri sıralama performansınızı olumsuz etkileyebilir.',
  },
  {
    question: 'Meta description ne kadar uzun olmalı?',
    answer:
      'Google genellikle 150-160 karakter arasındaki meta description\'ları tam olarak gösterir. 120 karakterden kısa açıklamalar yeterli bilgi vermezken, 200 karakterden uzun olanlar kesilir ve eksik görünür.',
  },
  {
    question: 'Open Graph (OG) etiketleri nedir?',
    answer:
      'Open Graph etiketleri, sayfanız sosyal medyada paylaşıldığında nasıl görüneceğini belirler. og:image, og:title ve og:description etiketleri Facebook, Twitter, LinkedIn gibi platformlarda paylaşım önizlemesini kontrol eder.',
  },
  {
    question: 'Canonical URL ne işe yarar?',
    answer:
      'Canonical URL, arama motorlarına bir sayfanın "orijinal" versiyonunu gösterir. Aynı içerik birden fazla URL\'de erişilebilir olduğunda, canonical etiketi duplicate content sorununu önler ve sıralama gücünü tek bir URL\'de toplar.',
  },
  {
    question: 'Neden sadece bir tane H1 etiketi olmalı?',
    answer:
      'H1 etiketi sayfanın ana başlığıdır ve arama motorlarına sayfanın konusunu bildirir. Birden fazla H1 kullanmak, arama motorlarının sayfanın ana konusunu belirlemesini zorlaştırır. Her sayfada tek bir H1 etiketi kullanılması en iyi uygulamadır.',
  },
  {
    question: 'Görsellerde alt etiketi neden gerekli?',
    answer:
      'Alt etiketi, görselin ne hakkında olduğunu arama motorlarına ve görme engelli kullanıcılara bildirir. Alt etiketi olmayan görseller hem erişilebilirlik hem de SEO açısından sorun yaratır. Google Görsel aramada sıralama almak için alt etiketleri kritik öneme sahiptir.',
  },
]

// ---------------------------------------------------------------------------
// Check evaluation
// ---------------------------------------------------------------------------

function evaluateChecks(data: SeoAnalysisResult): CheckResult[] {
  const checks: CheckResult[] = []

  // 1. Title length
  const tl = data.titleLength
  let titleStatus: CheckStatus = 'critical'
  let titleRec = 'Title etiketi eksik. Arama sonuçlarında görünmek için 50-60 karakter arasında bir title ekleyin.'
  let titlePts = 0
  if (tl >= 50 && tl <= 60) {
    titleStatus = 'good'
    titleRec = 'Title uzunluğu ideal aralıkta.'
    titlePts = 2
  } else if ((tl >= 30 && tl < 50) || (tl > 60 && tl <= 70)) {
    titleStatus = 'warning'
    titleRec = 'Title uzunluğu kabul edilebilir ancak 50-60 karakter arasında olması önerilir.'
    titlePts = 1
  } else if (tl > 0) {
    titleStatus = 'critical'
    titleRec = tl < 30
      ? 'Title çok kısa. 50-60 karakter arasında olmalı.'
      : 'Title çok uzun. Google arama sonuçlarında kesilecektir. 50-60 karakter arasına indirin.'
    titlePts = 0
  }
  checks.push({
    name: 'Title Uzunluğu',
    icon: FileText,
    status: titleStatus,
    value: data.title ? `${tl} karakter` : 'Bulunamadı',
    recommendation: titleRec,
    points: titlePts,
  })

  // 2. Description length
  const dl = data.descriptionLength
  let descStatus: CheckStatus = 'critical'
  let descRec = 'Meta description eksik. 150-160 karakter arasında bir açıklama ekleyin.'
  let descPts = 0
  if (dl >= 150 && dl <= 160) {
    descStatus = 'good'
    descRec = 'Meta description uzunluğu ideal aralıkta.'
    descPts = 2
  } else if ((dl >= 120 && dl < 150) || (dl > 160 && dl <= 200)) {
    descStatus = 'warning'
    descRec = 'Meta description kabul edilebilir ancak 150-160 karakter önerilir.'
    descPts = 1
  } else if (dl > 0) {
    descStatus = 'critical'
    descRec = dl < 120
      ? 'Meta description çok kısa. En az 150 karakter önerilir.'
      : 'Meta description çok uzun. Arama sonuçlarında kesilecektir.'
    descPts = 0
  }
  checks.push({
    name: 'Description Uzunluğu',
    icon: FileText,
    status: descStatus,
    value: data.description ? `${dl} karakter` : 'Bulunamadı',
    recommendation: descRec,
    points: descPts,
  })

  // 3. OG Image
  checks.push({
    name: 'OG Image',
    icon: ImageIcon,
    status: data.ogImage ? 'good' : 'critical',
    value: data.ogImage ? 'Mevcut' : 'Bulunamadı',
    recommendation: data.ogImage
      ? 'Open Graph görseli tanımlı. Sosyal medya paylaşımlarında görsel görünecek.'
      : 'og:image etiketi eksik. Sosyal medya paylaşımlarında görsel görünmeyecek.',
    points: data.ogImage ? 2 : 0,
  })

  // 4. Canonical URL
  checks.push({
    name: 'Canonical URL',
    icon: Link2,
    status: data.canonical ? 'good' : 'critical',
    value: data.canonical ? 'Mevcut' : 'Bulunamadı',
    recommendation: data.canonical
      ? 'Canonical URL tanımlı. Duplicate content riski azaltılmış.'
      : 'Canonical URL eksik. Duplicate content sorunlarını önlemek için canonical etiketi ekleyin.',
    points: data.canonical ? 2 : 0,
  })

  // 5. H1 tag
  const h1c = data.h1Count
  let h1Status: CheckStatus = 'critical'
  let h1Rec = 'H1 etiketi bulunamadı. Her sayfada bir adet H1 etiketi olmalıdır.'
  let h1Pts = 0
  if (h1c === 1) {
    h1Status = 'good'
    h1Rec = 'Tek bir H1 etiketi mevcut. Bu en iyi uygulamadır.'
    h1Pts = 2
  } else if (h1c > 1) {
    h1Status = 'warning'
    h1Rec = `${h1c} adet H1 etiketi bulundu. Sayfa başına tek H1 kullanılması önerilir.`
    h1Pts = 1
  }
  checks.push({
    name: 'H1 Etiketi',
    icon: Heading1,
    status: h1Status,
    value: h1c === 0 ? 'Bulunamadı' : `${h1c} adet`,
    recommendation: h1Rec,
    points: h1Pts,
  })

  // 6. Images without alt
  const ia = data.imgWithoutAlt
  let imgStatus: CheckStatus = 'good'
  let imgRec = 'Tüm görsellerde alt etiketi tanımlı.'
  let imgPts = 2
  if (ia > 3) {
    imgStatus = 'critical'
    imgRec = `${ia} görsel alt etiketi olmadan kullanılmış. Erişilebilirlik ve SEO için alt etiketleri ekleyin.`
    imgPts = 0
  } else if (ia >= 1) {
    imgStatus = 'warning'
    imgRec = `${ia} görsel alt etiketi olmadan kullanılmış. Alt etiketleri eklemeniz önerilir.`
    imgPts = 1
  }
  checks.push({
    name: 'Alt Eksik Görseller',
    icon: ImageOff,
    status: imgStatus,
    value: ia === 0 ? 'Yok (Harika!)' : `${ia} adet`,
    recommendation: imgRec,
    points: imgPts,
  })

  return checks
}

function calculateScore(checks: CheckResult[]): number {
  const total = checks.reduce((sum, c) => sum + c.points, 0)
  const max = checks.length * 2
  return Math.round((total / max) * 100)
}

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const statusColors: Record<CheckStatus, string> = {
  good: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  warning: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  critical: 'text-red-400 border-red-500/30 bg-red-500/10',
}

const statusBgColors: Record<CheckStatus, string> = {
  good: 'bg-emerald-500/10',
  warning: 'bg-amber-500/10',
  critical: 'bg-red-500/10',
}

const statusIcons: Record<CheckStatus, LucideIcon> = {
  good: CheckCircle,
  warning: AlertTriangle,
  critical: XCircle,
}

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
  if (score >= 80) return 'İyi'
  if (score >= 50) return 'Geliştirilebilir'
  return 'Kritik'
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
// Check Card
// ---------------------------------------------------------------------------

function CheckCard({ check, index }: { check: CheckResult; index: number }) {
  const StatusIcon = statusIcons[check.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`rounded-xl border p-5 ${statusColors[check.status]}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${statusBgColors[check.status]}`}>
            <check.icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">{check.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{check.value}</p>
          </div>
        </div>
        <StatusIcon className="w-5 h-5 shrink-0 mt-1" />
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">{check.recommendation}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Result Details
// ---------------------------------------------------------------------------

function ResultDetails({ data }: { data: SeoAnalysisResult }) {
  const details = [
    { label: 'URL', value: data.url, isLink: true },
    { label: 'Title', value: data.title },
    { label: 'Meta Description', value: data.description },
    { label: 'OG Title', value: data.ogTitle },
    { label: 'OG Description', value: data.ogDescription },
    { label: 'Canonical URL', value: data.canonical, isLink: true },
    { label: 'H1 Başlık', value: data.h1 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-10"
    >
      <h3 className="text-lg font-bold text-white mb-4">Detaylı Sonuçlar</h3>
      <div className="space-y-3">
        {details.map((d) => (
          <div
            key={d.label}
            className="bg-[#0B1528] border border-white/10 rounded-xl p-4"
          >
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {d.label}
            </span>
            {d.value ? (
              d.isLink ? (
                <a
                  href={d.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-1 text-sm text-emerald-400 hover:text-emerald-300 break-all transition-colors"
                >
                  {d.value}
                  <ExternalLink className="w-3 h-3 inline ml-1 mb-0.5" />
                </a>
              ) : (
                <p className="mt-1 text-sm text-white break-all">{d.value}</p>
              )
            ) : (
              <p className="mt-1 text-sm text-slate-500 italic">Bulunamadı</p>
            )}
          </div>
        ))}

        {/* OG Image preview */}
        {data.ogImage && (
          <div className="bg-[#0B1528] border border-white/10 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              OG Image Önizleme
            </span>
            <div className="mt-2 rounded-lg overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.ogImage}
                alt="Open Graph görseli"
                className="w-full h-auto max-h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function SeoAnalyzeClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SeoAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze() {
    if (!url.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/tools/seo-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Bir hata oluştu')
        return
      }

      setResult(data as SeoAnalysisResult)
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const checks = result ? evaluateChecks(result) : []
  const score = checks.length > 0 ? calculateScore(checks) : 0

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
            <Globe className="w-4 h-4 mr-2" /> Ücretsiz SEO Analiz
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto">
            Web Sitenizin SEO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Durumunu Öğrenin
            </span>
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            URL adresini girin, title, meta description, Open Graph etiketleri ve daha fazlasını
            anında analiz edin.
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
              handleAnalyze()
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
                  <Search className="w-5 h-5 mr-2" />
                  Analiz Et
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
      <section className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 mb-16">
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
                <h2 className="text-lg font-bold text-white mb-6">SEO Puanı</h2>
                <ScoreCircle score={score} />
                <p className="text-sm text-slate-400 mt-4">
                  {score >= 80
                    ? 'Siteniz iyi durumda! Küçük iyileştirmelerle daha da iyi olabilir.'
                    : score >= 50
                      ? 'Bazı alanlar iyileştirme gerektiriyor. Aşağıdaki önerileri inceleyin.'
                      : 'Kritik SEO sorunları tespit edildi. Acil iyileştirme önerilir.'}
                </p>
              </motion.div>

              {/* Check cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checks.map((check, i) => (
                  <CheckCard key={check.name} check={check} index={i} />
                ))}
              </div>

              {/* Detailed results */}
              <ResultDetails data={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================================================================ */}
      {/* FAQ                                                              */}
      {/* ================================================================ */}
      <PageFaq
        items={SEO_ANALYZE_FAQ}
        title="SEO Analiz Hakkında"
        subtitle="SEO analiz aracımız ve sonuçlar hakkında sıkça sorulan sorular."
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
              Profesyonel SEO Analizi mi İstiyorsunuz?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
              Profesyonel SEO analizi için VixSEO&apos;yu deneyin. Detaylı raporlar, anahtar kelime
              takibi ve daha fazlası.
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
