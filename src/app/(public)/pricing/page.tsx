'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const packages = [
    {
      name: 'Başlangıç',
      desc: 'Küçük projeler ve bireysel bloglar için ideal çözüm.',
      price: isAnnual ? '16' : '20',
      period: '/ay',
      features: [
        '1 Wix Sitesi Yönetimi',
        'Aylık 25 Sayfa Analizi',
        'Temel SEO Denetimi (Audit)',
        'Haftalık (7 Günlük) GSC Verisi'
      ],
      cta: 'Ücretsiz Başla',
      href: '/sign-up',
      popular: false
    },
    {
      name: 'Pro',
      desc: 'Büyüyen işletmeler ve profesyonel içerik üreticileri için.',
      price: isAnnual ? '400' : '500',
      period: '/ay',
      features: [
        '5 Wix Sitesi Yönetimi',
        'Limitsiz Sayfa Analizi',
        'Gelişmiş GSC Entegrasyonu (16 Ay)',
        'Toplu Blog Yönetimi ve CMS',
        'Detaylı SEO Denetimi ve Hata Tespiti',
        'Öncelikli E-posta Desteği'
      ],
      cta: 'Pro\'ya Geç',
      href: '/sign-up',
      popular: true
    },
    {
      name: 'Ajans',
      desc: 'Birden fazla müşteri yöneten SEO ajansları ve dev projeler.',
      price: isAnnual ? '1200' : '1500',
      period: '/ay',
      features: [
        'Sınırsız Wix Sitesi Yönetimi',
        'White-label SEO Raporları',
        'Özel GSC Veri Dışa Aktarımı',
        'Ekip Üyeleri Ekleme',
        'API Erişimi',
        '7/24 Öncelikli Telefon Desteği'
      ],
      cta: 'Bize Ulaşın',
      href: 'mailto:sales@vixseo.com',
      popular: false
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#0F2447] overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-[#0F2447] to-[#0F2447] pointer-events-none" />

      <section className="text-center py-16 px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={cardVariants} className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-400 mb-8 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Sparkles className="w-4 h-4 mr-2" /> Şeffaf Fiyatlandırma
          </motion.div>
          <motion.h1 variants={cardVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Yatırımınızın Geri Dönüşünü <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Görün</span>
          </motion.h1>
          <motion.p variants={cardVariants} className="text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sürpriz ücret yok veya gizli maliyetler yok. İhtiyacınıza en uygun paketi seçin ve SEO 
            yönetiminizi hemen bugün profesyonelleştirin.
          </motion.p>

          {/* Toggle */}
          <motion.div variants={cardVariants} className="flex items-center justify-center gap-4 mb-20 bg-black/20 p-2 rounded-full border border-white/10 w-max mx-auto shadow-2xl backdrop-blur-md">
            <span className={`text-sm font-bold px-4 ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Aylık</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="flex w-16 h-8 bg-slate-800 rounded-full items-center px-1 transition-colors relative"
              style={{ backgroundColor: isAnnual ? '#10B981' : '#1E293B' }}
            >
              <div
                className="w-6 h-6 bg-white rounded-full shadow-md transition-transform"
                style={{ transform: isAnnual ? 'translateX(32px)' : 'translateX(0)' }}
              />
            </button>
            <div className="flex items-center gap-2 pr-2">
              <span className={`text-sm font-bold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>Yıllık</span>
              <span className="text-[10px] uppercase font-bold text-emerald-100 bg-emerald-500 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                %20 İndirim
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4 lg:px-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                pkg.popular 
                ? 'bg-[#0B1528] border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.15)] scale-100 md:scale-105 z-10' 
                : 'bg-[#0B1528] border-white/10 shadow-2xl'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  En Çok Tercih Edilen
                </div>
              )}
              
              <div className="mb-8 mt-2">
                <h3 className="text-2xl font-extrabold text-white mb-3">{pkg.name}</h3>
                <p className="text-slate-300 text-sm h-12 leading-relaxed">{pkg.desc}</p>
              </div>

              <div className="mb-8 flex items-end gap-1 pb-8 border-b border-white/10">
                <span className="text-5xl font-black text-white tracking-tight">${pkg.price}</span>
                <span className="text-slate-300 font-bold mb-2">{pkg.period}</span>
              </div>

              <ul className="flex-1 space-y-5 mb-10 text-left">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex gap-4 text-slate-200">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${pkg.popular ? 'text-emerald-400' : 'text-blue-400'}`} />
                    <span className="font-medium text-[1.05rem] leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={pkg.href}>
                <Button 
                  size="lg"
                  className={`w-full font-bold text-lg rounded-xl transition-all duration-300 ${
                    pkg.popular 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {pkg.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
// Force Next.js to recompile and clear the parse error
