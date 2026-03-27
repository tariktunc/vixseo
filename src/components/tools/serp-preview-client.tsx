'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Eye,
  Sparkles,
  ArrowRight,
  Monitor,
  Smartphone,
  Lightbulb,
  Target,
  Link2,
  Type,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageFaq } from '@/components/landing/page-faq'
import { SERP_PREVIEW_FAQ } from '@/lib/tools-data'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PreviewMode = 'desktop' | 'mobile'

type CharStatus = 'green' | 'yellow' | 'red'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TITLE_IDEAL_MIN = 50
const TITLE_IDEAL_MAX = 60
const TITLE_WARN_MIN = 30
const DESC_IDEAL_MIN = 150
const DESC_IDEAL_MAX = 160
const DESC_WARN_MIN = 120

const TITLE_TIPS = [
  { text: '50-60 karakter arasında tutun', icon: Target },
  { text: 'Anahtar kelimeyi başa yerleştirin', icon: Type },
  { text: 'Marka adını sona "|" ile ekleyin', icon: Lightbulb },
  { text: 'Her sayfa için benzersiz title yazın', icon: Eye },
]

const DESC_TIPS = [
  { text: '150-160 karakter arasında tutun', icon: Target },
  { text: 'Harekete geçirici ifade (CTA) ekleyin', icon: Lightbulb },
  { text: 'Her sayfa için benzersiz description yazın', icon: Type },
  { text: 'Anahtar kelimeyi doğal şekilde kullanın', icon: Eye },
]

const URL_TIPS = [
  { text: 'Kısa ve anlaşılır tutun', icon: Link2 },
  { text: 'Anahtar kelime içersin', icon: Target },
  { text: 'Kelime ayırıcı olarak tire (-) kullanın', icon: Type },
  { text: 'Alt çizgi (_) ve özel karakter kullanmayın', icon: Lightbulb },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Bilgileri Girin',
    description: 'Title, description ve URL alanlarını doldurun.',
  },
  {
    step: '2',
    title: 'Önizlemeyi Kontrol Edin',
    description: 'Google arama sonucunda nasıl görüneceğinizi gerçek zamanlı izleyin.',
  },
  {
    step: '3',
    title: 'Optimize Edin',
    description: 'Karakter sayaçları ve ipuçlarıyla içeriğinizi mükemmelleştirin.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getCharStatus(len: number, idealMin: number, idealMax: number, warnMin: number): CharStatus {
  if (len >= idealMin && len <= idealMax) return 'green'
  if (len > idealMax || (len >= warnMin && len < idealMin)) return 'yellow'
  return 'red'
}

function getStatusColor(status: CharStatus): string {
  if (status === 'green') return 'text-emerald-400'
  if (status === 'yellow') return 'text-yellow-400'
  return 'text-red-400'
}

function getStatusBg(status: CharStatus): string {
  if (status === 'green') return 'bg-emerald-400'
  if (status === 'yellow') return 'bg-yellow-400'
  return 'bg-red-400'
}

function truncateText(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen) + '...'
}

function formatUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const path = parsed.pathname === '/' ? '' : parsed.pathname
    return `${parsed.hostname}${path}`
  } catch {
    return url || 'ornek.com'
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CharCounter({
  current,
  idealMin,
  idealMax,
  warnMin,
  label,
}: {
  current: number
  idealMin: number
  idealMax: number
  warnMin: number
  label: string
}) {
  const status = getCharStatus(current, idealMin, idealMax, warnMin)
  const color = getStatusColor(status)
  const barBg = getStatusBg(status)
  const percentage = Math.min((current / idealMax) * 100, 100)

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-400 min-w-[70px]">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barBg}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className={`text-xs font-mono font-semibold min-w-[60px] text-right ${color}`}>
        {current}/{idealMax}
      </span>
    </div>
  )
}

function DesktopPreview({
  title,
  description,
  url,
  faviconUrl,
}: {
  title: string
  description: string
  url: string
  faviconUrl: string
}) {
  const displayTitle = truncateText(title || 'Sayfa Başlığı Buraya Gelecek', 60)
  const displayDesc = truncateText(description || 'Meta açıklamanız burada görünecek. Kullanıcıları çekmek için etkileyici bir açıklama yazın.', 160)
  const displayUrl = formatUrl(url)

  return (
    <div className="bg-white rounded-xl p-5 max-w-[600px] w-full shadow-lg">
      {/* URL line with favicon */}
      <div className="flex items-center gap-2 mb-1">
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt="favicon"
            className="w-7 h-7 rounded-full border border-gray-200 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-xs text-gray-400 font-bold">
              {displayUrl.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-sm text-[#202124] truncate">{displayUrl.split('/')[0]}</span>
          <span className="text-xs text-[#4d5156] truncate">{displayUrl}</span>
        </div>
      </div>
      {/* Title */}
      <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-snug mb-1 font-normal">
        {displayTitle}
      </h3>
      {/* Description */}
      <p className="text-sm text-[#4d5156] leading-relaxed">
        {displayDesc}
      </p>
    </div>
  )
}

function MobilePreview({
  title,
  description,
  url,
  faviconUrl,
}: {
  title: string
  description: string
  url: string
  faviconUrl: string
}) {
  const displayTitle = truncateText(title || 'Sayfa Başlığı Buraya Gelecek', 55)
  const displayDesc = truncateText(description || 'Meta açıklamanız burada görünecek. Kullanıcıları çekmek için etkileyici bir açıklama yazın.', 120)
  const displayUrl = formatUrl(url)

  return (
    <div className="bg-white rounded-xl p-4 max-w-[360px] w-full shadow-lg mx-auto">
      {/* URL line with favicon */}
      <div className="flex items-center gap-2 mb-1">
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt="favicon"
            className="w-6 h-6 rounded-full border border-gray-200 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 font-bold">
              {displayUrl.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-[#202124] truncate">{displayUrl.split('/')[0]}</span>
          <span className="text-[10px] text-[#4d5156] truncate">{displayUrl}</span>
        </div>
      </div>
      {/* Title */}
      <h3 className="text-base text-[#1a0dab] hover:underline cursor-pointer leading-snug mb-1 font-normal">
        {displayTitle}
      </h3>
      {/* Description */}
      <p className="text-xs text-[#4d5156] leading-relaxed">
        {displayDesc}
      </p>
    </div>
  )
}

function TipCard({ tip, index }: { tip: { text: string; icon: typeof Target }; index: number }) {
  const Icon = tip.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-start gap-3 bg-[#0B1528] border border-white/10 rounded-lg p-4 hover:border-emerald-500/30 transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-emerald-400" />
      </div>
      <span className="text-sm text-slate-300 leading-relaxed">{tip.text}</span>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Client Component
// ---------------------------------------------------------------------------

export function SerpPreviewClient() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [faviconUrl, setFaviconUrl] = useState('')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop')

  const titleStatus = useMemo(
    () => getCharStatus(title.length, TITLE_IDEAL_MIN, TITLE_IDEAL_MAX, TITLE_WARN_MIN),
    [title],
  )
  const descStatus = useMemo(
    () => getCharStatus(description.length, DESC_IDEAL_MIN, DESC_IDEAL_MAX, DESC_WARN_MIN),
    [description],
  )

  const titleStatusLabel = useMemo(() => {
    if (title.length === 0) return 'Başlık girin'
    if (titleStatus === 'green') return 'Mükemmel uzunluk'
    if (titleStatus === 'yellow') return title.length > TITLE_IDEAL_MAX ? 'Çok uzun, kesilebilir' : 'Biraz daha uzun olabilir'
    return 'Çok kısa'
  }, [title, titleStatus])

  const descStatusLabel = useMemo(() => {
    if (description.length === 0) return 'Açıklama girin'
    if (descStatus === 'green') return 'Mükemmel uzunluk'
    if (descStatus === 'yellow') return description.length > DESC_IDEAL_MAX ? 'Çok uzun, kesilebilir' : 'Biraz daha uzun olabilir'
    return 'Çok kısa'
  }, [description, descStatus])

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
            SERP Önizleme
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Google arama sonuçlarında nasıl görüneceğinizi gerçek zamanlı önizleyin ve optimize edin.
          </p>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* TOOL INPUT + PREVIEW                                             */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Title input */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Sayfa Başlığı (Title)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sayfa Başlığınızı Yazın"
                maxLength={100}
                className="w-full bg-[#0B1528] border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              />
              <div className="mt-2 space-y-1">
                <CharCounter
                  current={title.length}
                  idealMin={TITLE_IDEAL_MIN}
                  idealMax={TITLE_IDEAL_MAX}
                  warnMin={TITLE_WARN_MIN}
                  label="Karakter"
                />
                <p className={`text-xs ${getStatusColor(titleStatus)}`}>{titleStatusLabel}</p>
              </div>
            </div>

            {/* Description textarea */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Meta Açıklama (Description)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Meta Açıklamanızı Yazın"
                maxLength={300}
                rows={3}
                className="w-full bg-[#0B1528] border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 resize-y transition-colors"
              />
              <div className="mt-2 space-y-1">
                <CharCounter
                  current={description.length}
                  idealMin={DESC_IDEAL_MIN}
                  idealMax={DESC_IDEAL_MAX}
                  warnMin={DESC_WARN_MIN}
                  label="Karakter"
                />
                <p className={`text-xs ${getStatusColor(descStatus)}`}>{descStatusLabel}</p>
              </div>
            </div>

            {/* URL input */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Sayfa URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ornek.com/sayfa-adi"
                className="w-full bg-[#0B1528] border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              />
            </div>

            {/* Favicon URL input */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Favicon URL <span className="text-slate-500 font-normal">(isteğe bağlı)</span>
              </label>
              <input
                type="text"
                value={faviconUrl}
                onChange={(e) => setFaviconUrl(e.target.value)}
                placeholder="https://ornek.com/favicon.ico"
                className="w-full bg-[#0B1528] border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              />
            </div>
          </motion.div>

          {/* Right: Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Preview mode toggle */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-slate-200 mr-2">Önizleme:</span>
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  previewMode === 'desktop'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Masaüstü
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  previewMode === 'mobile'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Mobil
              </button>
            </div>

            {/* Preview card */}
            <div className="bg-[#0B1528] border border-white/10 rounded-xl p-6 min-h-[200px] flex items-center justify-center">
              <motion.div
                key={previewMode}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-center"
              >
                {previewMode === 'desktop' ? (
                  <DesktopPreview
                    title={title}
                    description={description}
                    url={url}
                    faviconUrl={faviconUrl}
                  />
                ) : (
                  <MobilePreview
                    title={title}
                    description={description}
                    url={url}
                    faviconUrl={faviconUrl}
                  />
                )}
              </motion.div>
            </div>

            {/* Quick status summary */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-[#0B1528] border border-white/10 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">Title Durumu</p>
                <p className={`text-sm font-semibold ${getStatusColor(titleStatus)}`}>
                  {title.length > 0 ? `${title.length} karakter` : '—'}
                </p>
              </div>
              <div className="bg-[#0B1528] border border-white/10 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">Description Durumu</p>
                <p className={`text-sm font-semibold ${getStatusColor(descStatus)}`}>
                  {description.length > 0 ? `${description.length} karakter` : '—'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* OPTIMIZATION TIPS                                                */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            İpuçları
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Optimizasyon Önerileri
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Title tips */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Type className="w-5 h-5 text-emerald-400" />
              Title Başlığı
            </h3>
            <div className="space-y-3">
              {TITLE_TIPS.map((tip, i) => (
                <TipCard key={tip.text} tip={tip} index={i} />
              ))}
            </div>
          </div>

          {/* Description tips */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-400" />
              Meta Açıklama
            </h3>
            <div className="space-y-3">
              {DESC_TIPS.map((tip, i) => (
                <TipCard key={tip.text} tip={tip} index={i} />
              ))}
            </div>
          </div>

          {/* URL tips */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-emerald-400" />
              URL Yapısı
            </h3>
            <div className="space-y-3">
              {URL_TIPS.map((tip, i) => (
                <TipCard key={tip.text} tip={tip} index={i} />
              ))}
            </div>
          </div>
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
        items={SERP_PREVIEW_FAQ}
        title="SERP Önizleme Hakkında Sıkça Sorulan Sorular"
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
              SERP Önizleme aracının yanında birçok ücretsiz SEO aracı sizi bekliyor.
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
