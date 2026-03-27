'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Trophy,
  Search,
  Monitor,
  Smartphone,
  ArrowRight,
  Globe,
  BarChart3,
  FileSearch,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Calendar,
  Clock,
  Layers,
  Loader2,
  AlertTriangle,
  Target,
  Type,
  FileText,
  Link2,
  Gauge,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { PageFaq } from '@/components/landing/page-faq'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DeviceType = 'desktop' | 'mobile'

type KeywordCheck = {
  inTitle: boolean
  inH1: boolean
  inDescription: boolean
  inUrl: boolean
  density: number
  titlePosition: 'beginning' | 'middle' | 'end' | 'not-found'
}

type SiraBulucuResult = {
  url: string
  keyword: string
  device: DeviceType
  checks: KeywordCheck
  relevanceScore: number
  suggestions: string[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FAQ_ITEMS = [
  {
    question: 'Sira Bulucu ne ise yarar?',
    answer:
      'Sira Bulucu araci, web sayfanizin belirli bir anahtar kelime icin ne kadar optimize edildigini analiz eder. Title, H1, meta description, URL ve icerik yogunlugu kontrolu yaparak bir uygunluk puani hesaplar.',
  },
  {
    question: 'Bu arac Google siralamamizi mi gosteriyor?',
    answer:
      'Hayir, bu arac Google siralama pozisyonunuzu gostermez. Bunun yerine, sayfanizin belirli bir anahtar kelime icin ne kadar iyi optimize edildigini analiz eder ve iyilestirme onerileri sunar.',
  },
  {
    question: 'Uygunluk puani nasil hesaplaniyor?',
    answer:
      'Uygunluk puani, anahtar kelimenin sayfa basliginda, H1 etiketinde, meta descriptionda, URL yapisinda bulunup bulunmadigina ve icerik yogunluguna gore hesaplanir. Her kriter farkli agirlikta puanlanir.',
  },
  {
    question: 'Ideal anahtar kelime yogunlugu nedir?',
    answer:
      'Ideal anahtar kelime yogunlugu %0.5 ile %2.5 arasindadir. Cok dusuk yogunluk arama motorlarina yeterli sinyal vermez, cok yuksek yogunluk ise keyword stuffing olarak degerlendirilir.',
  },
  {
    question: 'Mobil ve masaustu sonuclari farkli mi?',
    answer:
      'Evet, bazi siteler mobil ve masaustu kullanicilarina farkli icerik sunabilir. Aracimiz sectiginiz cihaz turune gore uygun User-Agent ile sayfa icerigini ceker ve analiz eder.',
  },
  {
    question: 'Bu arac ucretsiz mi?',
    answer:
      'Evet, Sira Bulucu araci tamamen ucretsizdir. Herhangi bir hesap olusturmaniza gerek yoktur.',
  },
  {
    question: 'Gercek Google siralama verilerimi nasil gorebilirim?',
    answer:
      'Gercek siralama verileriniz icin VixSEO\'nun Google Search Console entegrasyonunu kullanabilirsiniz. Ucretsiz hesap olusturup GSC baglantinizi yapmaniz yeterlidir.',
  },
]

const HOW_IT_WORKS_STEPS = [
  {
    icon: Globe,
    title: 'URL ve anahtar kelimenizi girin',
    description:
      'Analiz etmek istediginiz sayfa URL\'sini ve hedef anahtar kelimenizi yazin.',
  },
  {
    icon: Search,
    title: 'Sayfa icerigini analiz edin',
    description:
      'Aracimiz sayfanizi tarayarak anahtar kelimenin kritik alanlarda bulunup bulunmadigini kontrol eder.',
  },
  {
    icon: BarChart3,
    title: 'Optimizasyon onerilerini uygulayin',
    description:
      'Detayli analiz sonuclarina gore sayfanizi optimize edin ve arama motorlarindaki gorunurlugunuzu artirin.',
  },
]

const ALTERNATIVE_FEATURES = [
  { icon: TrendingUp, text: 'Tum anahtar kelimeler' },
  { icon: Calendar, text: '16 aylik veri' },
  { icon: Clock, text: 'Gunluk guncelleme' },
  { icon: Layers, text: 'Sayfa bazli analiz' },
]

// ---------------------------------------------------------------------------
// Score Helpers
// ---------------------------------------------------------------------------

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-red-400'
}

function getScoreGradient(score: number): string {
  if (score >= 80) return 'from-emerald-500 to-emerald-600'
  if (score >= 60) return 'from-amber-500 to-amber-600'
  return 'from-red-500 to-red-600'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Cok Iyi'
  if (score >= 60) return 'Orta'
  if (score >= 40) return 'Dusuk'
  return 'Cok Dusuk'
}

function getTitlePositionLabel(position: string): string {
  switch (position) {
    case 'beginning':
      return 'Baslangic (Ideal)'
    case 'middle':
      return 'Orta'
    case 'end':
      return 'Son'
    case 'not-found':
      return 'Bulunamadi'
    default:
      return '-'
  }
}

// ---------------------------------------------------------------------------
// Loading Skeleton
// ---------------------------------------------------------------------------

function ResultsSkeleton() {
  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center gap-4">
        <Skeleton className="w-28 h-28 rounded-full bg-white/5" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48 bg-white/5" />
          <Skeleton className="h-4 w-32 bg-white/5" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 bg-white/5" />
        ))}
      </div>
      <Skeleton className="h-32 bg-white/5" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F2447] via-[#132d54] to-[#0a1a35] pt-28 pb-16 md:pt-36 md:pb-24 px-4 lg:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8"
        >
          <CheckCircle2 className="h-4 w-4" />
          Aktif
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          <Trophy className="inline-block h-10 w-10 md:h-12 md:w-12 text-amber-400 mr-3 -mt-2" />
          Sira Bulucu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
        >
          Sayfanizin belirli bir anahtar kelime icin ne kadar optimize edildigini
          analiz edin. Eksikleri tespit edin ve iyilestirme onerileri alin.
        </motion.p>
      </div>
    </section>
  )
}

function CheckCard({
  icon: Icon,
  label,
  passed,
  detail,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  passed: boolean
  detail?: string
}) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
        passed
          ? 'border-emerald-500/20 bg-emerald-500/5'
          : 'border-red-500/20 bg-red-500/5'
      }`}
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          passed ? 'bg-emerald-500/15' : 'bg-red-500/15'
        }`}
      >
        <Icon
          className={`h-4 w-4 ${passed ? 'text-emerald-400' : 'text-red-400'}`}
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">{label}</span>
          {passed ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <XCircle className="h-4 w-4 text-red-400" />
          )}
        </div>
        {detail && (
          <span className="text-xs text-slate-400 mt-0.5 block">{detail}</span>
        )}
      </div>
    </div>
  )
}

function ResultsSection({ result }: { result: SiraBulucuResult }) {
  const { checks, relevanceScore, suggestions } = result

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-6"
    >
      {/* Score */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="relative w-32 h-32 shrink-0">
          {/* Background circle */}
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              className={`${relevanceScore >= 80 ? 'stroke-emerald-500' : relevanceScore >= 60 ? 'stroke-amber-500' : 'stroke-red-500'}`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(relevanceScore / 100) * 327} 327`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(relevanceScore)}`}>
              {relevanceScore}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-white mb-1">
            Anahtar Kelime Uygunluk Puani:{' '}
            <span className={getScoreColor(relevanceScore)}>
              {getScoreLabel(relevanceScore)}
            </span>
          </h3>
          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-300">&quot;{result.keyword}&quot;</span>
            {' '}icin{' '}
            <span className="text-slate-300">{result.url}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Cihaz: {result.device === 'desktop' ? 'Masaustu' : 'Mobil'}
          </p>
        </div>
      </div>

      {/* Check Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CheckCard
          icon={Type}
          label="Title'da Anahtar Kelime"
          passed={checks.inTitle}
          detail={
            checks.inTitle
              ? `Pozisyon: ${getTitlePositionLabel(checks.titlePosition)}`
              : 'Anahtar kelime baslikta bulunamadi'
          }
        />
        <CheckCard
          icon={Target}
          label="H1'de Anahtar Kelime"
          passed={checks.inH1}
        />
        <CheckCard
          icon={FileText}
          label="Description'da Anahtar Kelime"
          passed={checks.inDescription}
        />
        <CheckCard
          icon={Link2}
          label="URL'de Anahtar Kelime"
          passed={checks.inUrl}
        />
        <CheckCard
          icon={Gauge}
          label="Anahtar Kelime Yogunlugu"
          passed={checks.density >= 0.5 && checks.density <= 2.5}
          detail={`%${checks.density} (ideal: %0.5 - %2.5)`}
        />
        <CheckCard
          icon={Trophy}
          label="Baslik Pozisyonu"
          passed={checks.titlePosition === 'beginning'}
          detail={getTitlePositionLabel(checks.titlePosition)}
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            Optimizasyon Onerileri
          </h4>
          <ul className="space-y-3">
            {suggestions.map((suggestion, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-slate-300"
              >
                <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-br ${getScoreGradient(relevanceScore)} text-white`}>
                  {i + 1}
                </span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
        <p className="text-sm text-slate-300 mb-4">
          Bu anahtar kelime icin sayfanizi optimize etmek ister misiniz?
          VixSEO paneli ile detayli analiz ve takip yapin.
        </p>
        <Link href="/sign-up">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
            Ucretsiz Hesap Olustur
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

function HowItWorksSection() {
  return (
    <section className="bg-[#0F2447] py-20 md:py-28 px-4 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Nasil Calisir
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            3 Adimda Analiz Edin
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <step.icon className="h-7 w-7 text-emerald-400" />
              </div>

              {i < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
              )}

              <h3 className="text-lg font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AlternativeCtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a35] via-[#0F2447] to-[#132d54] py-20 md:py-28 px-4 lg:px-8 border-y border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/8 blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            <CheckCircle2 className="h-4 w-4" />
            Su An Kullanilabilir
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Gercek Siralama Verilerinizi{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Gorun
            </span>
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
            VixSEO&apos;nun Google Search Console entegrasyonu ile tum anahtar
            kelimelerinizin siralamasini, tiklama ve gosterim verilerini detayli
            analiz edin.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
            {ALTERNATIVE_FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/5"
              >
                <feature.icon className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium text-white">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 group">
                  Ucretsiz Hesap Olustur
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/docs/features">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base font-semibold"
                >
                  <FileSearch className="mr-2 h-4 w-4" />
                  GSC Entegrasyonu Hakkinda
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function SiraBulucuClient() {
  const [urlInput, setUrlInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SiraBulucuResult | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedUrl = urlInput.trim()
    const trimmedKeyword = keyword.trim()

    if (!trimmedUrl) {
      toast.error('Lutfen bir URL girin.')
      return
    }

    if (!trimmedKeyword) {
      toast.error('Lutfen bir anahtar kelime girin.')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/tools/sira-bulucu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: trimmedUrl,
          keyword: trimmedKeyword,
          device,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Analiz sirasinda bir hata olustu.')
        return
      }

      setResult(data as SiraBulucuResult)
      toast.success('Analiz tamamlandi!')
    } catch {
      toast.error('Baglanti hatasi. Lutfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0F2447]">
      <HeroSection />

      {/* Form Section */}
      <section className="bg-[#0B1528] py-16 md:py-24 px-4 lg:px-8 border-y border-white/5">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Anahtar Kelime Analizi
            </h2>
            <p className="text-slate-400">
              URL ve anahtar kelimenizi girerek optimizasyon analizinizi yapin.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleAnalyze}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            {/* URL input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL
              </label>
              <Input
                placeholder="https://ornek.com/sayfa"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                disabled={loading}
              />
            </div>

            {/* Keyword input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Anahtar Kelime
              </label>
              <Input
                placeholder="ornek anahtar kelime"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                disabled={loading}
              />
            </div>

            {/* Device toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cihaz
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    device === 'desktop'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setDevice('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                  Masaustu
                </button>
                <button
                  type="button"
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    device === 'mobile'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setDevice('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                  Mobil
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analiz Ediliyor...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analiz Et
                </>
              )}
            </Button>
          </motion.form>

          {/* Results */}
          {loading && <ResultsSkeleton />}
          {result && !loading && <ResultsSection result={result} />}
        </div>
      </section>

      <HowItWorksSection />
      <AlternativeCtaSection />
      <PageFaq
        items={FAQ_ITEMS}
        title="Sikca Sorulan Sorular"
        subtitle="Sira Bulucu araci hakkinda merak edilenler"
      />
    </main>
  )
}
