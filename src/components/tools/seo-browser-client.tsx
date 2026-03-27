'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Globe,
  Search,
  ArrowRight,
  Code2,
  Tags,
  Braces,
  FileCode,
  Server,
  Bot,
  CheckCircle2,
  XCircle,
  ImageIcon,
  Link2,
  Eye,
  FileText,
  Loader2,
  AlertTriangle,
  Copy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { PageFaq } from '@/components/landing/page-faq'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MetaTag = {
  name: string | null
  content: string | null
  property: string | null
}

type HeadingInfo = {
  tag: string
  text: string
}

type SeoBrowserResult = {
  url: string
  statusCode: number
  responseHeaders: Record<string, string>
  title: string | null
  metaTags: MetaTag[]
  scripts: { count: number; external: string[] }
  stylesheets: { count: number; hrefs: string[] }
  images: { total: number; withoutAlt: number; first10: string[] }
  links: { total: number; internal: number; external: number; first20: string[] }
  headings: {
    counts: Record<string, number>
    items: HeadingInfo[]
  }
  structuredData: unknown[]
  robots: string | null
  canonical: string | null
  viewport: string | null
  contentLength: number
  wordCount: number
  fetchedAt: string
}

type FeatureCard = {
  icon: LucideIcon
  title: string
  description: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FEATURES: FeatureCard[] = [
  {
    icon: Code2,
    title: 'HTML Analizi',
    description:
      'Sayfanizin HTML yapisini inceleyin. Baslik hiyerarsisini, icerik uzunlugunu ve teknik detaylari gorun.',
  },
  {
    icon: Tags,
    title: 'Meta Tag Analizi',
    description:
      'Tum meta taglari ve Open Graph verilerini listeleyin. Title, description ve sosyal medya onizlemelerini kontrol edin.',
  },
  {
    icon: Braces,
    title: 'Yapisal Veri Kontrolu',
    description:
      'JSON-LD markup\'ini dogrulayin. Schema hatalarini tespit edin ve zengin sonuc uyumlulugunuzu olcun.',
  },
  {
    icon: FileCode,
    title: 'Kaynak Analizi',
    description:
      'Script ve CSS dosyalarini listeleyin. Harici kaynaklari ve yukleme performansini degerlendirin.',
  },
  {
    icon: Server,
    title: 'Header Analizi',
    description:
      'HTTP response headerlarini kontrol edin. Cache politikasi, guvenlik headerlari ve yonlendirmeleri inceleyin.',
  },
  {
    icon: Bot,
    title: 'Robot Direktifleri',
    description:
      'Meta robots taglari ve canonical URL\'yi analiz edin. Arama motorlarinin sayfanizi nasil taradigini anlayin.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'SEO Browser ne ise yarar?',
    answer:
      'SEO Browser, web sayfalarini arama motorlarinin gordugu sekilde goruntulemenizi saglar. Meta taglar, basliklar, yapisal veri, gorseller, baglanti yapisi ve diger teknik SEO ogelerini tek bir arayuzden inceleyebilirsiniz.',
  },
  {
    question: 'Rendered HTML neden onemli?',
    answer:
      'Modern web siteleri JavaScript ile icerik olusturur. Arama motorlari sayfanizi render ettikten sonra indeksler. SEO Browser ile sayfanizin teknik yapisini analiz ederek arama motorlarinin iceriginizi dogru sekilde gorup gormedegini kontrol edebilirsiniz.',
  },
  {
    question: 'Yapisal veri (Schema) kontrolu ne saglar?',
    answer:
      'Yapisal veri, arama motorlarina iceeriginizin ne hakkinda oldugunu anlatir. Dogru schema markupi kullanmak, arama sonuclarinda zengin snippetlar (yildiz, fiyat, tarih vb.) gosterilmesini saglar ve tiklama oranini artirabilir.',
  },
  {
    question: 'Bu arac ucretsiz mi?',
    answer:
      'Evet, SEO Browser araci tamamen ucretsizdir. Herhangi bir hesap olusturmaniza gerek yoktur. URL girerek hemen analiz etmeye baslayabilirsiniz.',
  },
  {
    question: 'Header analizi neden onemli?',
    answer:
      'HTTP headerlari sayfanizin nasil sunuldugunu belirler. Cache politikasi, guvenlik onlemleri, icerik turu ve yonlendirmeler gibi kritik bilgiler headerlarda yer alir. Yanlis yapilandirilmis headerlar indeksleme sorunlarina yol acabilir.',
  },
  {
    question: 'robots.txt kontrolu ne ise yarar?',
    answer:
      'Meta robots etiketi arama motorlarina sayfanizin indekslenip indekslenmeyecegini soyler. Yanlis yapilandirilmis bir robots direktifi onemli sayfalarin indekslenmesini engelleyebilir. SEO Browser ile bu direktifleri kolayca kontrol edebilirsiniz.',
  },
]

// ---------------------------------------------------------------------------
// SEO Score Calculation
// ---------------------------------------------------------------------------

function calculateSeoScore(data: SeoBrowserResult): number {
  let score = 0
  let total = 0

  // Title varsa (15 puan)
  total += 15
  if (data.title) {
    score += 15
    if (data.title.length >= 30 && data.title.length <= 60) score += 5
    total += 5
  }

  // Meta description varsa (15 puan)
  total += 15
  const desc = data.metaTags.find(
    (t) => t.name?.toLowerCase() === 'description',
  )
  if (desc?.content) {
    score += 15
    if (desc.content.length >= 120 && desc.content.length <= 160) score += 5
    total += 5
  }

  // H1 varsa (10 puan)
  total += 10
  if (data.headings.counts.h1 >= 1) score += 10
  // Birden fazla H1 ceza
  if (data.headings.counts.h1 > 1) score -= 3

  // Canonical (10 puan)
  total += 10
  if (data.canonical) score += 10

  // Viewport (5 puan)
  total += 5
  if (data.viewport) score += 5

  // Robots (5 puan - noindex yoksa)
  total += 5
  if (!data.robots || !data.robots.includes('noindex')) score += 5

  // Gorseller alt tag (10 puan)
  total += 10
  if (data.images.total > 0) {
    const ratio = (data.images.total - data.images.withoutAlt) / data.images.total
    score += Math.round(ratio * 10)
  } else {
    score += 10
  }

  // Yapisal veri (10 puan)
  total += 10
  if (data.structuredData.length > 0) score += 10

  // Status code (10 puan)
  total += 10
  if (data.statusCode === 200) score += 10

  // Baslik hiyerarsisi (5 puan)
  total += 5
  if (data.headings.counts.h2 > 0) score += 3
  if (data.headings.counts.h3 > 0) score += 2

  return Math.min(100, Math.round((score / total) * 100))
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-red-400'
}

function getScoreBorderColor(score: number): string {
  if (score >= 80) return 'border-emerald-500'
  if (score >= 60) return 'border-amber-500'
  return 'border-red-500'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Iyi'
  if (score >= 60) return 'Orta'
  return 'Dusuk'
}

// ---------------------------------------------------------------------------
// Status Indicator
// ---------------------------------------------------------------------------

function StatusIndicator({ ok }: { ok: boolean }) {
  if (ok) {
    return <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
  }
  return <XCircle className="h-4 w-4 text-red-400 shrink-0" />
}

// ---------------------------------------------------------------------------
// Loading Skeleton
// ---------------------------------------------------------------------------

function ResultsSkeleton() {
  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center gap-4">
        <Skeleton className="w-24 h-24 rounded-full bg-white/5" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48 bg-white/5" />
          <Skeleton className="h-4 w-32 bg-white/5" />
        </div>
      </div>
      <Skeleton className="h-10 w-full bg-white/5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 bg-white/5" />
        ))}
      </div>
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
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]"
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
          <Globe className="inline-block h-10 w-10 md:h-12 md:w-12 text-emerald-400 mr-3 -mt-2" />
          SEO Browser
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
        >
          Web sayfalarini arama motoru gozuyle goruntuleyin. Meta taglar, baslik
          hiyerarsisi, yapisal veri, HTTP headerlari ve daha fazlasi.
        </motion.p>
      </div>
    </section>
  )
}

function OverviewTab({ data }: { data: SeoBrowserResult }) {
  const seoScore = calculateSeoScore(data)
  const description = data.metaTags.find(
    (t) => t.name?.toLowerCase() === 'description',
  )?.content

  return (
    <div className="space-y-6">
      {/* SEO Score */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div
          className={`relative w-28 h-28 rounded-full border-4 ${getScoreBorderColor(seoScore)} flex items-center justify-center shrink-0`}
        >
          <div className="text-center">
            <span className={`text-3xl font-bold ${getScoreColor(seoScore)}`}>
              {seoScore}
            </span>
            <span className="block text-xs text-slate-400">/ 100</span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-white mb-1">
            SEO Puani:{' '}
            <span className={getScoreColor(seoScore)}>
              {getScoreLabel(seoScore)}
            </span>
          </h3>
          <p className="text-sm text-slate-400">{data.url}</p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          label="Durum Kodu"
          value={String(data.statusCode)}
          ok={data.statusCode === 200}
        />
        <InfoCard
          label="Icerik Boyutu"
          value={formatBytes(data.contentLength)}
          ok={true}
        />
        <InfoCard
          label="Kelime Sayisi"
          value={String(data.wordCount)}
          ok={data.wordCount > 300}
        />
        <InfoCard
          label="Title"
          value={data.title ?? 'Bulunamadi'}
          ok={!!data.title}
        />
        <InfoCard
          label="Canonical"
          value={data.canonical ?? 'Bulunamadi'}
          ok={!!data.canonical}
          truncate
        />
        <InfoCard
          label="Viewport"
          value={data.viewport ?? 'Bulunamadi'}
          ok={!!data.viewport}
          truncate
        />
      </div>

      {/* Description */}
      {description && (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">
              Meta Description ({description.length} karakter)
            </span>
            <StatusIndicator ok={description.length >= 120 && description.length <= 160} />
          </div>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      )}
    </div>
  )
}

function InfoCard({
  label,
  value,
  ok,
  truncate = false,
}: {
  label: string
  value: string
  ok: boolean
  truncate?: boolean
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
      <StatusIndicator ok={ok} />
      <div className="min-w-0 flex-1">
        <span className="block text-xs text-slate-500 mb-1">{label}</span>
        <span
          className={`block text-sm font-medium text-white ${truncate ? 'truncate' : ''}`}
          title={value}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

function MetaTagsTab({ data }: { data: SeoBrowserResult }) {
  if (data.metaTags.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <Tags className="h-12 w-12 mx-auto mb-4 opacity-40" />
        <p>Bu sayfada meta tag bulunamadi.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-slate-400 font-medium">
              Name / Property
            </th>
            <th className="text-left py-3 px-4 text-slate-400 font-medium">
              Content
            </th>
          </tr>
        </thead>
        <tbody>
          {data.metaTags.map((tag, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="py-3 px-4 text-emerald-400 font-mono text-xs whitespace-nowrap">
                {tag.name || tag.property || '-'}
              </td>
              <td className="py-3 px-4 text-slate-300 break-all max-w-[400px]">
                {tag.content || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function HeadingsTab({ data }: { data: SeoBrowserResult }) {
  const { counts, items } = data.headings

  return (
    <div className="space-y-6">
      {/* Counts */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(counts).map(([tag, count]) => (
          <div
            key={tag}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02]"
          >
            <span className="text-xs font-bold text-emerald-400 uppercase">
              {tag}
            </span>
            <span className="text-sm font-medium text-white">{count}</span>
          </div>
        ))}
      </div>

      {/* H1 count warning */}
      {counts.h1 > 1 && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 text-amber-400 text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Sayfada birden fazla H1 etiketi bulundu ({counts.h1} adet). Ideal
          olarak her sayfada yalnizca bir H1 olmalidir.
        </div>
      )}

      {counts.h1 === 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 text-sm">
          <XCircle className="h-4 w-4 shrink-0" />
          Sayfada H1 etiketi bulunamadi. Her sayfada bir H1 etiketi bulunmalidir.
        </div>
      )}

      {/* Heading tree */}
      {items.length > 0 ? (
        <div className="space-y-1">
          {items.map((item, i) => {
            const level = parseInt(item.tag.replace('h', ''))
            return (
              <div
                key={i}
                className="flex items-start gap-2 py-1.5 hover:bg-white/[0.02] rounded px-2"
                style={{ paddingLeft: `${(level - 1) * 20 + 8}px` }}
              >
                <span className="text-xs font-bold text-emerald-400 uppercase shrink-0 mt-0.5">
                  {item.tag}
                </span>
                <span className="text-sm text-slate-300">{item.text || '(bos)'}</span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400">
          <p>Bu sayfada baslik etiketi bulunamadi.</p>
        </div>
      )}
    </div>
  )
}

function StructuredDataTab({ data }: { data: SeoBrowserResult }) {
  if (data.structuredData.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <Braces className="h-12 w-12 mx-auto mb-4 opacity-40" />
        <p>Bu sayfada yapisal veri (JSON-LD) bulunamadi.</p>
        <p className="text-xs mt-2 text-slate-500">
          Yapisal veri eklemek arama sonuclarinda zengin snippet gosterilmesini saglayabilir.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {data.structuredData.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="text-sm font-medium text-emerald-400">
              JSON-LD #{i + 1}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(item, null, 2))
                toast.success('JSON panoya kopyalandi')
              }}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Copy className="h-3 w-3" />
              Kopyala
            </button>
          </div>
          <pre className="p-4 text-xs text-slate-300 overflow-x-auto font-mono leading-relaxed">
            {JSON.stringify(item, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  )
}

function LinksTab({ data }: { data: SeoBrowserResult }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
          <span className="block text-2xl font-bold text-white">
            {data.links.total}
          </span>
          <span className="text-xs text-slate-400">Toplam</span>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
          <span className="block text-2xl font-bold text-emerald-400">
            {data.links.internal}
          </span>
          <span className="text-xs text-slate-400">Dahili</span>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
          <span className="block text-2xl font-bold text-cyan-400">
            {data.links.external}
          </span>
          <span className="text-xs text-slate-400">Harici</span>
        </div>
      </div>

      {/* First 20 links */}
      {data.links.first20.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">
            Ilk 20 Baglanti
          </h4>
          <div className="space-y-1">
            {data.links.first20.map((href, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.02] group"
              >
                <Link2 className="h-3 w-3 text-slate-500 shrink-0" />
                <span className="text-sm text-slate-400 truncate">{href}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ImagesTab({ data }: { data: SeoBrowserResult }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
          <span className="block text-2xl font-bold text-white">
            {data.images.total}
          </span>
          <span className="text-xs text-slate-400">Toplam Gorsel</span>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="block text-2xl font-bold text-red-400">
              {data.images.withoutAlt}
            </span>
          </div>
          <span className="text-xs text-slate-400">Alt Etiketi Eksik</span>
        </div>
      </div>

      {data.images.withoutAlt > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 text-amber-400 text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {data.images.withoutAlt} gorsel alt etiketi icermiyor. Erisebilirlik ve SEO icin tum gorsellere alt etiketi ekleyin.
        </div>
      )}

      {/* First 10 images */}
      {data.images.first10.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">
            Ilk 10 Gorsel
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {data.images.first10.map((src, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden aspect-square flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Gorsel ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML =
                        '<div class="flex flex-col items-center justify-center h-full text-slate-500 text-xs p-2 text-center"><span>Yuklenemedi</span></div>'
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {data.images.total === 0 && (
        <div className="text-center py-8 text-slate-400">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p>Bu sayfada gorsel bulunamadi.</p>
        </div>
      )}
    </div>
  )
}

function ScriptsTab({ data }: { data: SeoBrowserResult }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
          <span className="block text-2xl font-bold text-white">
            {data.scripts.count}
          </span>
          <span className="text-xs text-slate-400">Script</span>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
          <span className="block text-2xl font-bold text-white">
            {data.stylesheets.count}
          </span>
          <span className="text-xs text-slate-400">Stylesheet</span>
        </div>
      </div>

      {/* External scripts */}
      {data.scripts.external.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">
            Harici Scriptler ({data.scripts.external.length})
          </h4>
          <div className="space-y-1">
            {data.scripts.external.map((src, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.02] font-mono text-xs text-slate-400 break-all"
              >
                <FileCode className="h-3 w-3 text-slate-500 shrink-0" />
                {src}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stylesheets */}
      {data.stylesheets.hrefs.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">
            CSS Dosyalari ({data.stylesheets.hrefs.length})
          </h4>
          <div className="space-y-1">
            {data.stylesheets.hrefs.map((href, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.02] font-mono text-xs text-slate-400 break-all"
              >
                <Code2 className="h-3 w-3 text-slate-500 shrink-0" />
                {href}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function HeadersTab({ data }: { data: SeoBrowserResult }) {
  const entries = Object.entries(data.responseHeaders)

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <Server className="h-12 w-12 mx-auto mb-4 opacity-40" />
        <p>HTTP header bilgisi alinamadi.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-slate-400 font-medium">
              Header
            </th>
            <th className="text-left py-3 px-4 text-slate-400 font-medium">
              Deger
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="py-3 px-4 text-emerald-400 font-mono text-xs whitespace-nowrap">
                {key}
              </td>
              <td className="py-3 px-4 text-slate-300 break-all max-w-[400px] text-xs">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RobotsTab({ data }: { data: SeoBrowserResult }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <StatusIndicator ok={!data.robots?.includes('noindex')} />
        <div>
          <span className="block text-sm font-medium text-white mb-1">
            Meta Robots
          </span>
          <span className="block text-sm text-slate-400">
            {data.robots || 'Belirtilmemis (varsayilan: index, follow)'}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <StatusIndicator ok={!!data.canonical} />
        <div>
          <span className="block text-sm font-medium text-white mb-1">
            Canonical URL
          </span>
          <span className="block text-sm text-slate-400 break-all">
            {data.canonical || 'Belirtilmemis'}
          </span>
        </div>
      </div>

      {data.robots?.includes('noindex') && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 text-sm">
          <XCircle className="h-4 w-4 shrink-0" />
          Bu sayfa &quot;noindex&quot; etiketi tasiyor. Arama motorlari tarafindan indekslenmeyecektir.
        </div>
      )}

      {data.robots?.includes('nofollow') && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 text-amber-400 text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Bu sayfa &quot;nofollow&quot; etiketi tasiyor. Sayfadaki baglantilar arama motorlari tarafindan takip edilmeyecektir.
        </div>
      )}
    </div>
  )
}

function FeaturesSection() {
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
            Ozellikler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            SEO Browser Ne Yapar?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <feature.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Daha Detayli{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              SEO Analizi
            </span>{' '}
            mi Istiyorsunuz?
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
            SEO Analiz aracimiz ile web sitenizin title, meta description, Open
            Graph verileri ve daha fazlasini aninda kontrol edin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/araclar/seo-analiz">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 group">
                  <Eye className="mr-2 h-4 w-4" />
                  SEO Analiz Aracina Git
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/sign-up">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base font-semibold"
                >
                  Ucretsiz Hesap Olustur
                  <ArrowRight className="ml-2 h-4 w-4" />
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
// Utility
// ---------------------------------------------------------------------------

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function SeoBrowserClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SeoBrowserResult | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = url.trim()
    if (!trimmed) {
      toast.error('Lutfen bir URL girin.')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/tools/seo-browser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Analiz sirasinda bir hata olustu.')
        return
      }

      setResult(data as SeoBrowserResult)
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
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Sayfa Goruntule
            </h2>
            <p className="text-slate-400">
              Analiz etmek istediginiz sayfanin URL adresini girin.
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL
              </label>
              <Input
                placeholder="https://ornek.com/sayfa"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                disabled={loading}
              />
            </div>

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
                  Goruntule
                </>
              )}
            </Button>
          </motion.form>

          {/* Results */}
          {loading && <ResultsSkeleton />}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Tabs defaultValue="overview">
                <TabsList className="w-full flex-wrap gap-1 bg-white/5 rounded-xl p-1 h-auto">
                  <TabsTrigger value="overview" className="text-xs sm:text-sm">
                    Genel Bakis
                  </TabsTrigger>
                  <TabsTrigger value="meta" className="text-xs sm:text-sm">
                    Meta Tags
                  </TabsTrigger>
                  <TabsTrigger value="headings" className="text-xs sm:text-sm">
                    Basliklar
                  </TabsTrigger>
                  <TabsTrigger value="structured" className="text-xs sm:text-sm">
                    Yapisal Veri
                  </TabsTrigger>
                  <TabsTrigger value="links" className="text-xs sm:text-sm">
                    Baglantilar
                  </TabsTrigger>
                  <TabsTrigger value="images" className="text-xs sm:text-sm">
                    Gorseller
                  </TabsTrigger>
                  <TabsTrigger value="scripts" className="text-xs sm:text-sm">
                    Script & CSS
                  </TabsTrigger>
                  <TabsTrigger value="headers" className="text-xs sm:text-sm">
                    HTTP Headers
                  </TabsTrigger>
                  <TabsTrigger value="robots" className="text-xs sm:text-sm">
                    Robot
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 md:p-6">
                  <TabsContent value="overview">
                    <OverviewTab data={result} />
                  </TabsContent>
                  <TabsContent value="meta">
                    <MetaTagsTab data={result} />
                  </TabsContent>
                  <TabsContent value="headings">
                    <HeadingsTab data={result} />
                  </TabsContent>
                  <TabsContent value="structured">
                    <StructuredDataTab data={result} />
                  </TabsContent>
                  <TabsContent value="links">
                    <LinksTab data={result} />
                  </TabsContent>
                  <TabsContent value="images">
                    <ImagesTab data={result} />
                  </TabsContent>
                  <TabsContent value="scripts">
                    <ScriptsTab data={result} />
                  </TabsContent>
                  <TabsContent value="headers">
                    <HeadersTab data={result} />
                  </TabsContent>
                  <TabsContent value="robots">
                    <RobotsTab data={result} />
                  </TabsContent>
                </div>
              </Tabs>
            </motion.div>
          )}
        </div>
      </section>

      <FeaturesSection />
      <CtaSection />
      <PageFaq
        items={FAQ_ITEMS}
        title="Sikca Sorulan Sorular"
        subtitle="SEO Browser araci hakkinda merak edilenler"
      />
    </main>
  )
}
