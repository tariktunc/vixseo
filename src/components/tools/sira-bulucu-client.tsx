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
  Clock,
  Globe,
  BarChart3,
  FileSearch,
  Bell,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Layers,
} from 'lucide-react'

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

type DeviceType = 'desktop' | 'mobile'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FAQ_ITEMS = [
  {
    question: 'Sıra bulucu ne zaman aktif olacak?',
    answer:
      'Sıra Bulucu aracımız şu anda geliştirme aşamasındadır. Yakın zamanda kullanıma sunulacaktır. Sayfanın alt kısmındaki bildirim formunu doldurarak aktif olduğunda haberdar olabilirsiniz.',
  },
  {
    question: 'Şu an sıralama verilerimi nasıl görebilirim?',
    answer:
      'VixSEO\'nun Google Search Console entegrasyonunu kullanarak tüm anahtar kelimelerinizin sıralamasını, tıklama ve gösterim verilerini detaylı olarak görebilirsiniz. Ücretsiz hesap oluşturup GSC bağlantınızı yapmanız yeterlidir.',
  },
  {
    question: 'Google Search Console entegrasyonu nasıl çalışıyor?',
    answer:
      'VixSEO hesabınızı oluşturduktan sonra Google Search Console hesabınızı bağlayabilirsiniz. Bu sayede tüm arama verileri otomatik olarak VixSEO paneline aktarılır ve detaylı analizler sunulur.',
  },
  {
    question: 'Hangi arama motorlarını destekliyorsunuz?',
    answer:
      'Şu anda Google arama motoru desteklenmektedir. Sıra Bulucu aracı aktif olduğunda da öncelikli olarak Google sonuçları üzerinden çalışacaktır. İlerleyen dönemlerde farklı arama motorları da eklenebilir.',
  },
  {
    question: 'Mobil ve masaüstü sıralamaları farklı mı?',
    answer:
      'Evet, Google mobil ve masaüstü aramalarında farklı sıralamalar gösterebilir. Mobil uyumluluk, sayfa hızı ve kullanıcı deneyimi gibi faktörler mobil sıralamaları doğrudan etkiler. Sıra Bulucu her iki cihaz türü için ayrı sorgulama yapabilecektir.',
  },
  {
    question: 'Sıralama verileri ne sıklıkla güncellenir?',
    answer:
      'Google Search Console verileri genellikle 2-3 gün gecikmeyle güncellenir. Sıra Bulucu aracı ise anlık sorgu yaparak güncel sıralama bilgisini sunacaktır.',
  },
  {
    question: 'Rakip analizi yapabilir miyim?',
    answer:
      'Sıra Bulucu aktif olduğunda, aynı anahtar kelime için rakiplerinizin sıralamalarını da görebileceksiniz. Bu sayede rekabet ortamını daha iyi analiz edebilirsiniz.',
  },
  {
    question: 'Ücretsiz mi?',
    answer:
      'Evet, Sıra Bulucu aracı da diğer SEO araçlarımız gibi ücretsiz olarak sunulacaktır. Günlük sorgu limiti olabilir ancak temel kullanım tamamen ücretsizdir.',
  },
]

const HOW_IT_WORKS_STEPS = [
  {
    icon: Globe,
    title: 'Domain ve anahtar kelimenizi girin',
    description:
      'Sıralamasını öğrenmek istediğiniz domain adresini ve hedef anahtar kelimenizi yazın.',
  },
  {
    icon: Search,
    title: 'Google arama sonuçlarında sıralamanızı görün',
    description:
      'Aracımız Google arama sonuçlarını tarayarak sitenizin kaçıncı sırada olduğunu gösterir.',
  },
  {
    icon: BarChart3,
    title: 'Rakiplerinizle karşılaştırın',
    description:
      'Aynı anahtar kelimede hangi sitelerin sizden önce sıralandığını görün ve stratejinizi buna göre belirleyin.',
  },
]

const ALTERNATIVE_FEATURES = [
  { icon: TrendingUp, text: 'Tüm anahtar kelimeler' },
  { icon: Calendar, text: '16 aylık veri' },
  { icon: Clock, text: 'Günlük güncelleme' },
  { icon: Layers, text: 'Sayfa bazlı analiz' },
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
          Yakında
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          <Trophy className="inline-block h-10 w-10 md:h-12 md:w-12 text-amber-400 mr-3 -mt-2" />
          Sıra Bulucu
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
        >
          Google arama sonuçlarında anahtar kelime sıralamanızı anında öğrenin.
          Masaüstü ve mobil sonuçları ayrı ayrı sorgulayın, rakiplerinizle
          karşılaştırın.
        </motion.p>
      </div>
    </section>
  )
}

function DemoFormSection() {
  const [device, setDevice] = useState<DeviceType>('desktop')

  const handleSubmitAttempt = () => {
    toast.info(
      'Bu özellik yakında aktif olacak. Sıralama verilerinizi görmek için ücretsiz hesap oluşturun ve Google Search Console entegrasyonunu kullanın.',
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
            Sıralama Sorgula
          </h2>
          <p className="text-slate-400">
            Domain ve anahtar kelimenizi girerek Google sıralamanızı öğrenin.
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
            {/* Domain input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Domain
              </label>
              <Input
                placeholder="ornek.com"
                disabled
                className="bg-white/5 border-white/10 text-slate-400 placeholder:text-slate-500"
              />
            </div>

            {/* Keyword input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Anahtar Kelime
              </label>
              <Input
                placeholder="anahtar kelime"
                disabled
                className="bg-white/5 border-white/10 text-slate-400 placeholder:text-slate-500"
              />
            </div>

            {/* Device toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cihaz
              </label>
              <div className="flex gap-2">
                <button
                  disabled
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    device === 'desktop'
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      : 'border-white/10 bg-white/5 text-slate-400'
                  }`}
                  onClick={() => setDevice('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                  Masaüstü
                </button>
                <button
                  disabled
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    device === 'mobile'
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      : 'border-white/10 bg-white/5 text-slate-400'
                  }`}
                  onClick={() => setDevice('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                  Mobil
                </button>
              </div>
            </div>

            {/* Submit button with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span tabIndex={0} className="inline-flex w-full">
                    <Button
                      disabled
                      className="w-full bg-amber-500/50 text-white cursor-not-allowed"
                      onClick={handleSubmitAttempt}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Sıralama Sorgula
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yakında aktif olacak</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Click handler on overlay */}
          <button
            className="absolute inset-0 z-20 rounded-2xl cursor-pointer"
            onClick={handleSubmitAttempt}
            aria-label="Bu özellik yakında aktif olacak"
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
          Bu araç geliştirme aşamasındadır. Sıralama verilerinize hemen erişmek
          için aşağıdaki GSC entegrasyonunu inceleyin.
        </motion.p>
      </div>
    </section>
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
          <span className="inline-block text-sm font-semibold text-amber-400 tracking-wider uppercase mb-3">
            Nasıl Çalışır
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Nasıl Çalışacak?
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
              {/* Step number */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <step.icon className="h-7 w-7 text-amber-400" />
              </div>

              {/* Connector line (between cards) */}
              {i < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
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
            Şu An Kullanılabilir
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Şu An Sıralama Verilerinizi{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Görebilirsiniz
            </span>
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
            VixSEO&apos;nun Google Search Console entegrasyonu ile tüm anahtar
            kelimelerinizin sıralamasını, tıklama ve gösterim verilerini detaylı
            analiz edin.
          </p>

          {/* Features grid */}
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

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 group">
                  Ücretsiz Hesap Oluştur
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/docs/features">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base font-semibold"
                >
                  <FileSearch className="mr-2 h-4 w-4" />
                  GSC Entegrasyonu Hakkında
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
      toast.error('Lütfen geçerli bir e-posta adresi girin.')
      return
    }
    toast.success(
      'Teşekkürler! Sıra Bulucu aktif olduğunda size bildirim göndereceğiz.',
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
          Sıra Bulucu aracı aktif olduğunda size bildirim gönderelim.
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
          Spam göndermiyoruz. Yalnızca araç aktif olduğunda bildirim alırsınız.
        </p>
      </motion.div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function SiraBulucuClient() {
  return (
    <main className="min-h-screen bg-[#0F2447]">
      <HeroSection />
      <DemoFormSection />
      <HowItWorksSection />
      <AlternativeCtaSection />
      <PageFaq
        items={FAQ_ITEMS}
        title="Sıkça Sorulan Sorular"
        subtitle="Sıra Bulucu aracı hakkında merak edilenler"
      />
      <NotifySection />
    </main>
  )
}
