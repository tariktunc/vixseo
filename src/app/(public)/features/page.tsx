'use client'

import { motion, type Variants } from 'framer-motion'
import { FlowDiagram } from '@/components/landing/flow-diagram'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, TrendingUp, Search, PenTool, ShieldAlert } from 'lucide-react'

export default function FeaturesPage() {
  const staggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const features = [
    {
      title: 'Google Search Console Entegrasyonu',
      badge: 'Gerçek Veri Optimizasyonu',
      icon: Search,
      desc: 'Tahmini veya yaklaşık verilerle çalışmayı bırakın. Doğrudan Google Search Console hesabınıza bağlanarak sitenizin Google gözündeki gerçek performansını analiz edin.',
      benefits: [
        'Hangi sorguların (keywords) size daha fazla hit getirdiğini görün',
        'Zayıflayan kelimeleri anında tespit edip içeriği güncelleyin',
        'Tıklama Oranı (CTR) düşük, sıralaması yüksek olan gizli eksiği/potansiyeli yakalayın',
        'Keyword Cannibalization (Kelime çakışması) hatalarını hızlıca bulun'
      ],
      code: `// VixSEO Analytics Algoritması
const ctrScore = (clicks / impressions) * 100;
if (ctrScore < 2.0 && rank < 10) {
  return "Acil: Title & Description Optimizasyonu Gerekiyor!";
}`,
      gradient: 'from-blue-600/20 to-cyan-600/20'
    },
    {
      title: 'Headless Wix CMS ve Blog Yönetimi',
      badge: 'Tek Ekranda İçerik Optimizasyonu',
      icon: PenTool,
      desc: 'Sitenizde onlarca sayfayı veya blog gönderisini tek tek editlemekle uğraşmayın. Headless API sayesinde verilerinizi okur, yazar ve düzenleriz; her şey anında canlı yansır.',
      benefits: [
        'Wix platformuna giriş yapmadan tüm blog yazılarını VixSEO panelinden editleyin',
        'Otomatik eksik Meta Description/Title taramasıyla puanınızı artırın',
        'Google kelime sıralamanızı baz alarak doğrudan ilgili blog yazısını eşleştirin',
        'Saniyeler içinde içerik SEO sağlığını 0 dan 100 e taşıyın'
      ],
      code: `// Headless SEO Update
await wixClient.site.updatePageSeo(pageId, {
  title: "Wix SEO Rehberi - 2026",
  description: "Wix sitelerinizde organik trafiği nasıl 
  artırabileceğinize dair uzman taktikleri."
});`,
      gradient: 'from-orange-600/20 to-red-600/20'
    },
    {
      title: 'Otomatik SEO Denetimi (Health Audit)',
      badge: 'Teknik SEO Sorunlarına Son',
      icon: ShieldAlert,
      desc: 'Bir bağlantı koptuğunda veya sitenizde yeni bir sayfa index almadığında günler sonra haberiniz olmasın. VixSEO sizi gerçek zamanlı uyarır ve düzeltme adımlarını sunar.',
      benefits: [
        '301/302 Yönlendirmelerin tam analizi ve kırık link (404) uyarısı',
        'Canonical, Hreflang ve Robots.txt yapısal kontrolleri',
        'Birden çok H1 etiketi veya yetersiz içerik uyarısı',
        'Otomatik oluşturulan Sitemap.xml sağlığı ve Google Ping mekanizması'
      ],
      code: `// Audit Engine
const issues = performTechnicalAudit(siteMapUrls)
if (issues.find(i => i.type === 'BROKEN_LINK')) {
  notifyUser("404 Hataları Bulundu! Lütfen 301 
  yönlendirmelerinizi VixSEO Yönlendirme panelinden yapın.");
}`,
      gradient: 'from-emerald-600/20 to-teal-600/20'
    }
  ]

  return (
    <div className="pt-24 pb-16 bg-[#0F2447] min-h-screen text-slate-100 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-[#0F2447] to-[#0F2447] pointer-events-none" />
        
        <motion.div 
          className="mx-auto max-w-7xl relative z-10 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            Profesyonel SEO Araçları
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8">
            SEO Performansınızı <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Mikro Seviyede Kontrol Edin</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-3xl mx-auto text-xl text-slate-200 mb-12 leading-relaxed">
            Pahalı ajanslara veya birbirine bağlı karmaşık araç setlerine ihtiyacınız kalmadı. Wix sitenizi 
            büyütmeniz için gereken tüm anahtar kelime takibi, arama motoru sinyalleri ve CMS düzenlemeleri tek bir profesyonel ekranda.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/sign-up">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-6 text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] gap-2 rounded-full">
                Sitenizin Potansiyelini Keşfedin <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Akış Diyagramı */}
      <FlowDiagram />

      {/* Detaylı Özellikler (Uzun Pazarlama Akışı) */}
      <section className="py-24 bg-[#0B1528] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-32">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-white mb-6">Her Şey, Daha İyi Sıralama İçin</h2>
            <p className="text-xl text-slate-300">İyi bir SEO aracı size sadece data sunmaz, o data ile ne yapmanız gerektiğini de söyler. VixSEO işte tam olarak bunu yapıyor.</p>
          </div>

          {features.map((feat, index) => (
            <motion.div 
              key={index}
              variants={staggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <motion.div variants={fadeUp} className="relative group">
                <div className={`absolute -inset-4 bg-gradient-to-tr ${feat.gradient} blur-2xl rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="bg-[#0F2447] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-[400px] flex flex-col justify-end">
                  
                  {/* Fake UI Element */}
                  <div className="absolute top-6 left-6 right-6 p-6 bg-[#0B1528] rounded-2xl border border-white/5 shadow-inner">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                        <feat.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="h-2 w-24 bg-slate-300 rounded mb-2"></div>
                        <div className="h-2 w-48 bg-white/10 rounded"></div>
                      </div>
                    </div>
                    {/* Progress bars to look like app structure */}
                    <div className="space-y-3 mt-8">
                      <div className="h-2 w-full bg-white/5 rounded"><div className="h-2 w-3/4 bg-emerald-400 rounded"></div></div>
                      <div className="h-2 w-full bg-white/5 rounded"><div className="h-2 w-1/2 bg-cyan-400 rounded"></div></div>
                      <div className="h-2 w-full bg-white/5 rounded"><div className="h-2 w-5/6 bg-blue-500 rounded"></div></div>
                    </div>
                  </div>

                  <div className="p-8 bg-black/40 border-t border-white/5 backdrop-blur-md relative z-10">
                    <pre className="text-sm font-mono text-emerald-300/80">
                      <code>{feat.code}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">
                    {feat.badge}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{feat.title}</h3>
                  <p className="text-lg text-slate-200 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <ul className="space-y-5">
                  {feat.benefits.map((benefit, i) => (
                    <motion.li key={i} variants={fadeUp} className="flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-100 font-medium text-[1.05rem]">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 text-center px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-emerald-600/10 via-blue-600/10 to-purple-600/10 blur-[100px] pointer-events-none" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-6">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Organik Trafiğinizi Ortaya Çıkarın</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Sitenizin hak ettiği değeri görmesinin zamanı geldi. Kredi kartı olmadan 30 saniyede kurulum yapın ve 
            farkı anında kendi verilerinizle test edin.
          </p>
          <Link href="/pricing">
            <Button size="lg" className="bg-white text-[#0F2447] hover:bg-slate-100 font-extrabold px-10 py-6 text-lg rounded-full shadow-2xl">
              Fiyatlandırmayı İncele
            </Button>
          </Link>
        </motion.div>
      </section>

    </div>
  )
}
// Force compile
