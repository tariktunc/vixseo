'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Chrome,
  Search,
  ArrowRight,
  Star,
  ExternalLink,
  BarChart3,
  Gauge,
  Activity,
  ArrowRightLeft,
  FileText,
  Layers,
  Code2,
  Globe,
  Cpu,
  LinkIcon,
  Puzzle,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageFaq } from '@/components/landing/page-faq'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Extension = {
  name: string
  description: string
  icon: LucideIcon
  rating: number
  storeUrl: string
}

type ExtensionCategory = {
  title: string
  description: string
  extensions: Extension[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EXTENSION_CATEGORIES: ExtensionCategory[] = [
  {
    title: 'SEO Analiz',
    description: 'Sayfa metriklerini ve backlink profilini hızlıca inceleyin.',
    extensions: [
      {
        name: 'SEOquake',
        description:
          'Sayfa SEO metriklerini anında goruntuleyin. Domain Authority, Page Authority, backlink sayisi ve daha fazlasi.',
        icon: Search,
        rating: 4.5,
        storeUrl:
          'https://chrome.google.com/webstore/search/SEOquake',
      },
      {
        name: 'MozBar',
        description:
          'Domain Authority ve Page Authority kontrolu yapin. Sayfa bazli SEO metriklerini tek tikla goruntuleyin.',
        icon: BarChart3,
        rating: 4.3,
        storeUrl:
          'https://chrome.google.com/webstore/search/MozBar',
      },
      {
        name: 'Ahrefs SEO Toolbar',
        description:
          'Backlink profili ve keyword data. Herhangi bir sayfanin SEO metriklerini aninda inceleyin.',
        icon: Layers,
        rating: 4.6,
        storeUrl:
          'https://chrome.google.com/webstore/search/Ahrefs%20SEO%20Toolbar',
      },
    ],
  },
  {
    title: 'Teknik SEO',
    description:
      'Sayfa performansi, Core Web Vitals ve yonlendirme zincirlerini kontrol edin.',
    extensions: [
      {
        name: 'Lighthouse',
        description:
          "Google'in performans ve SEO denetim araci. Sayfa hizi, erisebilirlik ve SEO skorunuzu olcun.",
        icon: Gauge,
        rating: 4.7,
        storeUrl:
          'https://chrome.google.com/webstore/search/Lighthouse',
      },
      {
        name: 'Web Vitals',
        description:
          'Core Web Vitals metriklerini gercek zamanli izleyin. LCP, FID ve CLS degerlerinizi aninda gorun.',
        icon: Activity,
        rating: 4.4,
        storeUrl:
          'https://chrome.google.com/webstore/search/Web%20Vitals',
      },
      {
        name: 'Redirect Path',
        description:
          'HTTP yonlendirme zincirlerini goruntuleyin. 301, 302 ve diger yonlendirmeleri kolayca tespit edin.',
        icon: ArrowRightLeft,
        rating: 4.3,
        storeUrl:
          'https://chrome.google.com/webstore/search/Redirect%20Path',
      },
    ],
  },
  {
    title: 'Icerik & Anahtar Kelime',
    description:
      'Arama hacmi, icerik optimizasyonu ve on-page SEO kontrolu yapin.',
    extensions: [
      {
        name: 'Keywords Everywhere',
        description:
          "Arama hacmi ve CPC verilerini dogrudan SERP'te gorun. Iliskili anahtar kelimeleri kesfettirir.",
        icon: FileText,
        rating: 4.5,
        storeUrl:
          'https://chrome.google.com/webstore/search/Keywords%20Everywhere',
      },
      {
        name: 'Surfer SEO',
        description:
          'Icerik optimizasyonu ve SERP analizi. Rakip icerikleriyle karsilastirmali oneriler alin.',
        icon: Zap,
        rating: 4.6,
        storeUrl:
          'https://chrome.google.com/webstore/search/Surfer%20SEO',
      },
      {
        name: 'SEO Minion',
        description:
          'On-page SEO kontrolu, SERP preview ve hreflang checker. Tek eklentiyle birden fazla kontrol.',
        icon: Puzzle,
        rating: 4.4,
        storeUrl:
          'https://chrome.google.com/webstore/search/SEO%20Minion',
      },
    ],
  },
  {
    title: 'Yapisal Veri & Schema',
    description: 'Schema markup dogrulama ve JSON-LD olusturma araclari.',
    extensions: [
      {
        name: 'Structured Data Testing Tool',
        description:
          'Schema markup dogrulama. Sayfanizdaki yapisal verilerin dogru formatta oldugunu kontrol edin.',
        icon: Code2,
        rating: 4.2,
        storeUrl:
          'https://chrome.google.com/webstore/search/Structured%20Data%20Testing',
      },
      {
        name: 'Schema Builder',
        description:
          'JSON-LD schema olusturucu. Gorsel arayuz ile kolayca yapisal veri olusturun ve sayfaniza ekleyin.',
        icon: Layers,
        rating: 4.3,
        storeUrl:
          'https://chrome.google.com/webstore/search/Schema%20Builder',
      },
    ],
  },
  {
    title: 'Genel Araclar',
    description:
      'Rakip analizi, teknoloji tespiti ve kirik link kontrolu yapin.',
    extensions: [
      {
        name: 'SimilarWeb',
        description:
          'Rakip trafik analizi. Herhangi bir web sitesinin tahmini trafik, kaynak ve kitle verilerini gorun.',
        icon: Globe,
        rating: 4.5,
        storeUrl:
          'https://chrome.google.com/webstore/search/SimilarWeb',
      },
      {
        name: 'Wappalyzer',
        description:
          'Web sitesi teknoloji tespiti. Ziyaret ettiginiz sitelerin hangi teknolojileri kullandigini ogrenin.',
        icon: Cpu,
        rating: 4.7,
        storeUrl:
          'https://chrome.google.com/webstore/search/Wappalyzer',
      },
      {
        name: 'Check My Links',
        description:
          'Kirik link bulucu. Sayfadaki tum baglantilari tarayarak calisan ve kirik linkleri tespit edin.',
        icon: LinkIcon,
        rating: 4.3,
        storeUrl:
          'https://chrome.google.com/webstore/search/Check%20My%20Links',
      },
    ],
  },
]

const FAQ_ITEMS = [
  {
    question: 'SEO icin Chrome eklentisi kullanmak gerekli mi?',
    answer:
      'Zorunlu degil ancak ciddi sekilde tavsiye edilir. Chrome eklentileri, herhangi bir web sayfasini ziyaret ederken aninda SEO verilerini gormenizi saglar. Bu sayede rakip analizi, teknik SEO kontrolu ve icerik optimizasyonu gibi islemleri cok daha hizli yapabilirsiniz.',
  },
  {
    question: 'Bu eklentiler ucretsiz mi?',
    answer:
      'Listeledigimiz eklentilerin cogu ucretsiz versiyona sahiptir. Bazi eklentiler (Keywords Everywhere, Ahrefs Toolbar gibi) premium ozellikler icin ucretli abonelik gerektirebilir. Ancak temel ozellikler genellikle ucretsiz kullanilabilir.',
  },
  {
    question: 'Birden fazla SEO eklentisi kullanmak tarayiciyi yavaslatir mi?',
    answer:
      'Cok sayida eklenti tarayici performansini etkileyebilir. Onerilen yaklasim, en cok kullandiginiz 3-4 eklentiyi aktif tutmak ve digerlerini ihtiyac durumunda etkinlestirmektir. Chrome, eklentileri yonetme menusu uzerinden kolayca acip kapatmaniza olanak tanir.',
  },
  {
    question: 'Eklentiler verilerimi topluyor mu?',
    answer:
      'Her eklentinin gizlilik politikasi farklidir. Yukleme oncesinde Chrome Web Store sayfasindaki gizlilik politikasini incelemenizi oneririz. Genel olarak buyuk ve guvenilir SEO araclarina ait eklentiler veri guvenligi konusunda seffaf politikalara sahiptir.',
  },
  {
    question: 'Hangi eklenti ile baslamaliyim?',
    answer:
      'Yeni basliyorsaniz SEOquake veya MozBar ile baslayabilirsiniz. Bu eklentiler sayfa bazli SEO metriklerini hizlica gormenizi saglar. Teknik SEO ile ilgileniyorsaniz Lighthouse ve Web Vitals eklentilerini de eklemenizi oneririz.',
  },
  {
    question: 'Eklentiler mobil Chrome ile uyumlu mu?',
    answer:
      'Hayir, Chrome eklentileri yalnizca masaustu Chrome tarayicida calisir. Mobil cihazlarda benzer islevleri web tabanli araclar uzerinden kullanabilirsiniz. VixSEO gibi platformlar mobil uyumlu web arayuzu sunarak bu acigi kapatir.',
  },
  {
    question: 'VixSEO ile bu eklentileri birlikte kullanabilir miyim?',
    answer:
      'Elbette. VixSEO, Google Search Console entegrasyonu uzerinden kapsamli SEO verileri sunarken, Chrome eklentileri sayfa bazli anlik analizler icin idealdir. Ikisini birlikte kullanarak SEO sureclrinizi en verimli sekilde yonetebilirsiniz.',
  },
  {
    question: 'Eklentilerin guncelligini nasil kontrol edebilirim?',
    answer:
      'Chrome Web Store eklenti sayfasinda son guncelleme tarihini gorebilirsiniz. Duzenli olarak guncellenen eklentiler tercih edilmelidir. Uzun suredir guncellenmeyen eklentiler guvenlik riski olusturabilir ve modern web standartlariyla uyumsuz olabilir.',
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F2447] via-[#132d54] to-[#0a1a35] pt-28 pb-16 md:pt-36 md:pb-24 px-4 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px]"
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8"
        >
          <Chrome className="h-4 w-4" />
          Kuratorlu Kaynak
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          SEO Chrome Eklentileri
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
        >
          SEO calismalrinizi hizlandiacak en iyi Chrome uzantilarinin
          ozzenle secilmis listesi. Kategori bazli kesffedin, hemen yukleyin.
        </motion.p>
      </div>
    </section>
  )
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.3

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < fullStars
              ? 'text-amber-400 fill-amber-400'
              : i === fullStars && hasHalf
                ? 'text-amber-400 fill-amber-400/50'
                : 'text-slate-600'
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-slate-400">{rating.toFixed(1)}</span>
    </div>
  )
}

function ExtensionCard({ ext, index }: { ext: Extension; index: number }) {
  const Icon = ext.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-emerald-500/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Icon className="h-6 w-6 text-emerald-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-semibold text-white">{ext.name}</h3>
          </div>

          <RatingStars rating={ext.rating} />

          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            {ext.description}
          </p>

          <a
            href={ext.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors group/link"
          >
            Chrome Web Store&apos;da Ac
            <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function CategoriesSection() {
  return (
    <section className="bg-[#0F2447] py-16 md:py-24 px-4 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-20">
        {EXTENSION_CATEGORIES.map((category, catIndex) => (
          <div key={category.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-2">
                Kategori {catIndex + 1}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {category.title}
              </h2>
              <p className="text-slate-400">{category.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.extensions.map((ext, extIndex) => (
                <ExtensionCard key={ext.name} ext={ext} index={extIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function VixSeoIntegrationSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a35] via-[#0F2447] to-[#132d54] py-20 md:py-28 px-4 lg:px-8 border-y border-white/5">
      {/* Background decoration */}
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
            <Zap className="h-4 w-4" />
            Hepsi Tek Panelde
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Tum Verileri{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Tek Panelden
            </span>{' '}
            Yonetin
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
            VixSEO ile bu araclarin sagladigi tum verileri tek panelden
            yonetin. Google Search Console entegrasyonu, anahtar kelime takibi
            ve detayli SEO analizi bir arada.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 group">
                  Ucretsiz Hesap Olustur
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/araclar">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base font-semibold"
                >
                  Tum Araclari Gor
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
// Main Component
// ---------------------------------------------------------------------------

export function ChromeExtensionsClient() {
  return (
    <main className="min-h-screen bg-[#0F2447]">
      <HeroSection />
      <CategoriesSection />
      <VixSeoIntegrationSection />
      <PageFaq
        items={FAQ_ITEMS}
        title="Sikca Sorulan Sorular"
        subtitle="SEO Chrome eklentileri hakkinda merak edilenler"
      />
    </main>
  )
}
