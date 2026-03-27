'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Type,
  Hash,
  AlignLeft,
  Pilcrow,
  Clock,
  LetterText,
  Trash2,
  Copy,
  ArrowRight,
  Sparkles,
  FileText,
  ShoppingBag,
  FileSearch,
  Heading,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { PageFaq } from '@/components/landing/page-faq'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CounterMetric = {
  label: string
  value: number | string
  icon: LucideIcon
}

type SeoGuideCard = {
  title: string
  range: string
  unit: string
  min: number
  max: number
  total: number
  icon: LucideIcon
}

type FaqItem = {
  question: string
  answer: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WORDS_PER_MINUTE = 200

const SEO_GUIDES: SeoGuideCard[] = [
  {
    title: 'Blog Yazısı',
    range: '1.500 - 2.500',
    unit: 'kelime',
    min: 1500,
    max: 2500,
    total: 3000,
    icon: FileText,
  },
  {
    title: 'Ürün Açıklaması',
    range: '300 - 500',
    unit: 'kelime',
    min: 300,
    max: 500,
    total: 600,
    icon: ShoppingBag,
  },
  {
    title: 'Meta Description',
    range: '150 - 160',
    unit: 'karakter',
    min: 150,
    max: 160,
    total: 200,
    icon: FileSearch,
  },
  {
    title: 'Sayfa Başlığı (Title)',
    range: '50 - 60',
    unit: 'karakter',
    min: 50,
    max: 60,
    total: 80,
    icon: Heading,
  },
]

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Kelime sayacı nasıl çalışır?',
    answer:
      'Kelime sayacımız, metin kutusuna yazdığınız veya yapıştırdığınız metni gerçek zamanlı olarak analiz eder. Boşluk karakterlerine göre kelimeleri ayırır, noktalama işaretleriyle cümleleri tespit eder ve çift satırbaşlarını paragraf ayırıcı olarak kullanır.',
  },
  {
    question: 'Karakter sayısı boşlukları dahil eder mi?',
    answer:
      'Evet, "Karakter Sayısı" metriği boşluklar dahil tüm karakterleri sayar. Boşluksuz karakter sayısını görmek için "Karakter (Boşluksuz)" metriğini kullanabilirsiniz. Her iki değer de gerçek zamanlı olarak güncellenir.',
  },
  {
    question: 'Okuma süresi nasıl hesaplanır?',
    answer:
      'Tahmini okuma süresi, ortalama bir yetişkinin dakikada 200 kelime okuduğu varsayımıyla hesaplanır. Bu, genel kabul gören bir standarttır ve metin zorluğuna göre farklılık gösterebilir.',
  },
  {
    question: 'Hangi dilleri destekliyor?',
    answer:
      'Kelime sayacımız Unicode desteği sayesinde Türkçe, İngilizce, Almanca, Fransızca ve diğer Latin alfabesi kullanan dillerin yanı sıra Arapça, Kirilce ve Asya dilleriyle de çalışır. Kelime ayırma boşluk karakterine dayanır.',
  },
  {
    question: 'Verilerim kaydediliyor mu?',
    answer:
      'Hayır, metniniz tamamen tarayıcınızda işlenir ve hiçbir sunucuya gönderilmez. Sayfayı kapattığınızda veya yenilediğinizde metin otomatik olarak silinir. Gizliliğiniz tamamen korunur.',
  },
  {
    question: 'SEO için ideal kelime sayısı nedir?',
    answer:
      'İdeal kelime sayısı içerik türüne göre değişir. Blog yazıları için 1.500-2.500 kelime, ürün açıklamaları için 300-500 kelime önerilir. Önemli olan, konuyu kapsamlı şekilde ele almak ve gereksiz tekrardan kaçınmaktır.',
  },
  {
    question: 'Meta description kaç karakter olmalı?',
    answer:
      "Google, arama sonuçlarında genellikle 150-160 karakter arasındaki meta açıklamaları gösterir. Bu sınırın üzerindeki metinler kesilir. Meta description'ınızı bu aralık içinde tutmanız tıklama oranını artırabilir.",
  },
  {
    question: 'Ücretsiz mi?',
    answer:
      'Evet, kelime sayacı aracımız tamamen ücretsizdir. Hesap oluşturmanıza veya herhangi bir ödeme yapmanıza gerek yoktur. Sınırsız kullanım ile dilediğiniz kadar metin analiz edebilirsiniz.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Yapıştırın',
    description: 'Metninizi metin kutusuna yapıştırın veya doğrudan yazmaya başlayın.',
  },
  {
    step: '2',
    title: 'Analiz Edin',
    description: 'Kelime, karakter, cümle ve paragraf sayıları anında hesaplanır.',
  },
  {
    step: '3',
    title: 'Optimize Edin',
    description: 'SEO rehberimize bakarak içerik uzunluğunuzu optimize edin.',
  },
]

// ---------------------------------------------------------------------------
// Helper: Compute metrics
// ---------------------------------------------------------------------------

function computeMetrics(text: string) {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0)
  const wordCount = text.trim() === '' ? 0 : words.length

  const charCount = text.length
  const charNoSpaceCount = text.replace(/\s/g, '').length

  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const sentenceCount = text.trim() === '' ? 0 : sentences.length

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
  const paragraphCount = text.trim() === '' ? 0 : paragraphs.length

  const totalSeconds = Math.ceil((wordCount / WORDS_PER_MINUTE) * 60)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const readingTime = wordCount === 0 ? '0 dk' : `${minutes} dk ${seconds} sn`

  return { wordCount, charCount, charNoSpaceCount, sentenceCount, paragraphCount, readingTime }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="text-3xl md:text-4xl font-extrabold text-emerald-400 tabular-nums"
    >
      {value.toLocaleString('tr-TR')}
    </motion.span>
  )
}

function MetricCard({ metric }: { metric: CounterMetric }) {
  const Icon = metric.icon
  const isString = typeof metric.value === 'string'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0B1528] border border-white/10 rounded-xl p-4 md:p-5 text-center hover:border-emerald-500/30 transition-colors"
    >
      <Icon className="w-5 h-5 text-emerald-400/60 mx-auto mb-2" />
      {isString ? (
        <motion.span
          key={metric.value as string}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="block text-2xl md:text-3xl font-extrabold text-emerald-400"
        >
          {metric.value}
        </motion.span>
      ) : (
        <AnimatedNumber value={metric.value as number} />
      )}
      <span className="text-xs md:text-sm text-slate-400 mt-1 block">{metric.label}</span>
    </motion.div>
  )
}

function SeoGuideCardComponent({ card }: { card: SeoGuideCard }) {
  const Icon = card.icon
  const filledPercent = ((card.min + card.max) / 2 / card.total) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-[#0B1528] border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-emerald-400" />
        </div>
        <h3 className="font-semibold text-white text-sm">{card.title}</h3>
      </div>
      <p className="text-2xl font-extrabold text-emerald-400 mb-1">{card.range}</p>
      <p className="text-xs text-slate-400 mb-3">{card.unit}</p>
      {/* Indicator bar */}
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${filledPercent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
        />
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Client Component
// ---------------------------------------------------------------------------

export function KelimeSayaciClient() {
  const [text, setText] = useState('')

  const metrics = useMemo(() => computeMetrics(text), [text])

  const counterCards: CounterMetric[] = useMemo(
    () => [
      { label: 'Kelime Sayısı', value: metrics.wordCount, icon: Type },
      { label: 'Karakter Sayısı', value: metrics.charCount, icon: Hash },
      { label: 'Karakter (Boşluksuz)', value: metrics.charNoSpaceCount, icon: LetterText },
      { label: 'Cümle Sayısı', value: metrics.sentenceCount, icon: AlignLeft },
      { label: 'Paragraf Sayısı', value: metrics.paragraphCount, icon: Pilcrow },
      { label: 'Tahmini Okuma Süresi', value: metrics.readingTime, icon: Clock },
    ],
    [metrics],
  )

  const handleClear = useCallback(() => {
    setText('')
  }, [])

  const handleCopy = useCallback(async () => {
    if (!text.trim()) {
      toast.error('Kopyalanacak metin bulunamadı')
      return
    }
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Metin kopyalandı')
    } catch {
      toast.error('Kopyalama başarısız oldu')
    }
  }, [text])

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
            Kelime Sayacı
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Metninizi yapıştırın, kelime, karakter, cümle ve paragraf sayısını anında öğrenin.
          </p>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* TEXTAREA + COUNTERS                                              */}
      {/* ================================================================ */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Metninizi buraya yapıştırın veya yazmaya başlayın..."
            className="w-full min-h-[200px] bg-[#0B1528] border border-white/10 rounded-xl p-5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 resize-y text-base leading-relaxed transition-colors"
          />

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Temizle
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              Metni Kopyala
            </Button>
          </div>
        </motion.div>

        {/* Counter grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
          {counterCards.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* SEO CONTENT GUIDE                                                */}
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
            Rehber
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            SEO İçin İdeal Kelime Sayıları
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEO_GUIDES.map((card) => (
            <SeoGuideCardComponent key={card.title} card={card} />
          ))}
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
        items={FAQ_ITEMS}
        title="Kelime Sayacı Hakkında Sıkça Sorulan Sorular"
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
              Kelime sayacının yanında birçok ücretsiz SEO aracı sizi bekliyor.
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
