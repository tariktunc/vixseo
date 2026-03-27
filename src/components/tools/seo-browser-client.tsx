'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Globe,
  Clock,
  Search,
  ArrowRight,
  Bell,
  Code2,
  Tags,
  Braces,
  FileCode,
  Server,
  Bot,
  CheckCircle2,
  ScanSearch,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PageFaq } from '@/components/landing/page-faq'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
    title: 'Rendered HTML Goruntuleme',
    description:
      'Sayfanizin JavaScript render sonrasi halini gorun. Arama motorlarinin gercekte ne gordugunuzu anlayin.',
  },
  {
    icon: Tags,
    title: 'Meta Tag Analizi',
    description:
      'Tum meta tag\'lari ve Open Graph verilerini listeleyin. Title, description ve sosyal medya onizlemelerini kontrol edin.',
  },
  {
    icon: Braces,
    title: 'Yapisal Veri Kontrolu',
    description:
      'JSON-LD ve microdata markup\'ini dogrulayin. Schema hatalarini tespit edin ve zengin sonuc uyumlulugunuzu olcun.',
  },
  {
    icon: FileCode,
    title: 'Kaynak Kod Inceleme',
    description:
      'Sikistirilmamis kaynak kodu goruntuleyin. HTML yapisini ve icerik hiyerarsisini analiz edin.',
  },
  {
    icon: Server,
    title: 'Header Analizi',
    description:
      'HTTP response header\'larini kontrol edin. Cache politikasi, guvenlik header\'lari ve yonlendirmeleri inceleyin.',
  },
  {
    icon: Bot,
    title: 'Robot Direktifleri',
    description:
      'robots.txt ve meta robots tag\'larini analiz edin. Arama motorlarinin sayfanizi nasil taradigini anlayin.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'SEO Browser ne ise yarar?',
    answer:
      'SEO Browser, web sayfalarini arama motorlarinin gordugu sekilde goruntulemenizi saglar. JavaScript rendering sonrasi HTML, meta tag\'lar, yapisal veri ve diger teknik SEO ogelerini tek bir arayuzden inceleyebilirsiniz.',
  },
  {
    question: 'SEO Browser ne zaman aktif olacak?',
    answer:
      'SEO Browser araci su anda gelistirme asamasindadir. Yakin zamanda kullanima sunulacaktir. E-posta adresinizi birakarak aktif oldugunda bildirim alabilirsiniz.',
  },
  {
    question: 'Rendered HTML neden onemli?',
    answer:
      'Modern web siteleri JavaScript ile icerik olusturur. Arama motorlari sayfanizi render ettikten sonra indeksler. Rendered HTML\'i gorerek, arama motorlarinin iceriginizi dogru sekilde gorup gormedegini kontrol edebilirsiniz.',
  },
  {
    question: 'Yapisal veri (Schema) kontrolu ne saglar?',
    answer:
      'Yapisal veri, arama motorlarina iceeriginizin ne hakkinda oldugunu anlatir. Dogru schema markup\'i kullanmak, arama sonuclarinda zengin snippet\'lar (yildiz, fiyat, tarih vb.) gosterilmesini saglar ve tiklama oranini artirabilir.',
  },
  {
    question: 'Bu arac ucretsiz olacak mi?',
    answer:
      'Evet, SEO Browser araci da diger SEO araclarimiz gibi ucretsiz olarak sunulacaktir. Gunluk kullanim limiti olabilir ancak temel ozellikler tamamen ucretsiz olacaktir.',
  },
  {
    question: 'Header analizi neden onemli?',
    answer:
      'HTTP header\'lari sayfanizin nasil sunuldugunu belirler. Cache politikasi, guvenlik onlemleri, icerik turu ve yonlendirmeler gibi kritik bilgiler header\'larda yer alir. Yanlis yapilandirilmis header\'lar indeksleme sorunlarina yol acabilir.',
  },
  {
    question: 'Su an alternatif olarak ne kullanabilirim?',
    answer:
      'VixSEO\'nun SEO Analiz aracini kullanarak web sitenizin temel SEO metriklerini kontrol edebilirsiniz. Title, meta description, Open Graph verileri ve daha fazlasini aninda analiz edin.',
  },
  {
    question: 'robots.txt kontrolu ne ise yarar?',
    answer:
      'robots.txt dosyasi arama motorlarina sitenizin hangi bolumleerini tarayabileceklerini soyler. Yanlis yapilandirilmis bir robots.txt onemli sayfalarin indekslenmesini engelleyebilir. SEO Browser ile bu direktifleri kolayca kontrol edebileceksiniz.',
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-8"
        >
          <Clock className="h-4 w-4" />
          Yakinda
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          <Globe className="inline-block h-10 w-10 md:h-12 md:w-12 text-amber-400 mr-3 -mt-2" />
          SEO Browser
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
        >
          Web sayfalarini arama motoru gozuyle goruntuleyin. Rendered HTML, meta
          tag analizi, yapisal veri kontrolu ve daha fazlasi.
        </motion.p>
      </div>
    </section>
  )
}

function DemoFormSection() {
  const handleSubmitAttempt = () => {
    toast.info(
      'Bu ozellik yakinda aktif olacak. Su an SEO Analiz aracimizi kullanabilirsiniz.',
      { duration: 6000 }
    )
  }

  return (
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
            Sayfa Goruntule
          </h2>
          <p className="text-slate-400">
            Analiz etmek istediginiz sayfanin URL adresini girin.
          </p>
        </motion.div>

        {/* Demo Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Coming-soon overlay */}
          <div className="absolute inset-0 z-10 rounded-2xl bg-[#0B1528]/40 backdrop-blur-[1px] flex items-center justify-center cursor-not-allowed" />

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 opacity-60">
            {/* URL input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL
              </label>
              <Input
                placeholder="https://ornek.com/sayfa"
                disabled
                className="bg-white/5 border-white/10 text-slate-400 placeholder:text-slate-500"
              />
            </div>

            {/* Submit button with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span tabIndex={0} className="inline-flex w-full">
                    <Button
                      disabled
                      className="w-full bg-amber-500/50 text-white cursor-not-allowed"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Goruntule
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yakinda aktif olacak</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Click handler on overlay */}
          <button
            className="absolute inset-0 z-20 rounded-2xl cursor-pointer"
            onClick={handleSubmitAttempt}
            aria-label="Bu ozellik yakinda aktif olacak"
          />
        </motion.div>

        {/* Inline message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-center text-sm text-amber-400/80"
        >
          Bu arac gelistirme asamasindadir. Su an SEO Analiz aracimizi
          kullanabilirsiniz.
        </motion.p>
      </div>
    </section>
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
          <span className="inline-block text-sm font-semibold text-amber-400 tracking-wider uppercase mb-3">
            Ozellikler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            SEO Browser Ne Yapacak?
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
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
                <feature.icon className="h-6 w-6 text-amber-400" />
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

function AlternativeCtaSection() {
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
            <CheckCircle2 className="h-4 w-4" />
            Su An Kullanilabilir
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Su An{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              SEO Analiz
            </span>{' '}
            Aracimizi Kullanin
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
            SEO Analiz aracimiz ile web sitenizin title, meta description, Open
            Graph verileri ve daha fazlasini aninda kontrol edin.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/araclar/seo-analiz">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 group">
                  <ScanSearch className="mr-2 h-4 w-4" />
                  SEO Analiz Aracina Git
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/sign-up">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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

function NotifySection() {
  const [email, setEmail] = useState('')

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Lutfen gecerli bir e-posta adresi girin.')
      return
    }
    toast.success(
      'Tesekkurler! SEO Browser aktif oldugunda size bildirim gonderecegiz.',
      { duration: 5000 }
    )
    setEmail('')
  }

  return (
    <section className="bg-[#0F2447] py-16 md:py-20 px-4 lg:px-8">
      <motion.div
        className="mx-auto max-w-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
          <Bell className="h-6 w-6 text-amber-400" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Haberdar Olun
        </h2>
        <p className="text-slate-400 mb-8">
          SEO Browser araci aktif oldugunda size bildirim gondeelim.
        </p>

        <form
          onSubmit={handleNotify}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
          />
          <Button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 whitespace-nowrap"
          >
            Beni Bilgilendir
          </Button>
        </form>

        <p className="mt-4 text-xs text-slate-500">
          Spam gondermiyoruz. Yalnizca arac aktif oldugunda bildirim alirsiniz.
        </p>
      </motion.div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function SeoBrowserClient() {
  return (
    <main className="min-h-screen bg-[#0F2447]">
      <HeroSection />
      <DemoFormSection />
      <FeaturesSection />
      <AlternativeCtaSection />
      <PageFaq
        items={FAQ_ITEMS}
        title="Sikca Sorulan Sorular"
        subtitle="SEO Browser araci hakkinda merak edilenler"
      />
      <NotifySection />
    </main>
  )
}
