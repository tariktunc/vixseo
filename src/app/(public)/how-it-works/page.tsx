'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Zap, Target, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HowItWorksPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <div className="pt-24 pb-16 bg-[#0F2447] min-h-screen text-slate-100 overflow-hidden">
      
      {/* Hero Section */}
      <section className="text-center py-20 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            Kurulum Süreci
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-8 text-balance">
            Algoritmalar Sizin İçin Çalışsın. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Karmaşık Süreçleri Otomatikleştirdik.</span>
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            VixSEO, geleneksel SEO araçlarının karmaşıklığını ortadan kaldırır. API düzeyinde özel Wix entegrasyonumuz ve Google Search Console verilerinizin birleşimiyle, sitenizin performansını analiz etmek daha önce hiç olmadığı kadar kolay ve şeffaf.
          </p>
        </motion.div>
      </section>

      {/* Step 1: Kayıt ve Kurulum */}
      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8 relative">
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/20 to-blue-600/20 blur-2xl rounded-3xl" />
            <div className="bg-[#0B1528] rounded-3xl p-8 border border-white/20 shadow-2xl relative">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Hesap Oluşturma</h3>
                  <p className="text-slate-300 text-sm">30 saniyeden kısa sürer.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-emerald-400"/></div>
                  <div className="h-2 w-32 bg-slate-300 rounded-full" />
                </div>
                <div className="h-12 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-emerald-400"/></div>
                  <div className="h-2 w-48 bg-slate-300 rounded-full" />
                </div>
                <div className="h-12 bg-emerald-500/20 rounded-lg border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  Hesabınız Hazır!
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">
              <Zap className="w-5 h-5" /> Adım 01
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-6">Saniyeler İçinde VixSEO'ya Katılın</h2>
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Uzun formlara, gereksiz onay e-postalarına veya kredi kartı bilgilerine ihtiyacınız yok. Temel bir hesap oluşturarak, sistemimizin sizin için çalışmasını başlatın. Altyapımız anında size özel bir çalışma alanı oluşturur.
            </p>
            <ul className="space-y-4">
              {[
                'Kredi kartı bilgisi zorunluluğu yok',
                'Ücretsiz başlangıç paketi ile anında erişim',
                'E-posta veya Google ile hızlı kayıt (SSO)',
                'Gereksiz teknik ayarlar olmadan sade başlangıç'
              ].map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex gap-4 items-start text-slate-200">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-[1.1rem]">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Step 2: Wix & GSC Integration */}
      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8 relative bg-black/20 my-16 rounded-[3rem] border border-white/5">
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">
              <Target className="w-5 h-5" /> Adım 02
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-6">Wix ve Google Search Console'u Bağlayın</h2>
            <p className="text-lg text-slate-200 mb-6 leading-relaxed">
              VixSEO'nun kalbi bu adımda atıyor. Özel olarak geliştirdiğimiz Headless API mimarisi ile Wix sitenizi bağlarsınız. Ardından Analytics verileri için Google hesabınıza yetki verirsiniz.
            </p>
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Bu yöntem sayesinde, sitenizde değişiklik yapmak için Wix editörüne girmeden VixSEO paneli üzerinden blog yazıları, metadata (title, description), ve yönlendirme ayarlarınızı toplu olarak düzenleyebilirsiniz. Google verileriniz doğrudan analiz motorlarımıza akar!
            </p>
            
            <Link href="/features">
              <Button variant="outline" className="text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/10 font-bold px-8 py-6 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                Detaylı Özellikleri Keşfedin
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-600/20 to-purple-600/20 blur-2xl rounded-3xl" />
            <div className="bg-[#0B1528] rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative">
              <div className="flex bg-black/40 border-b border-white/10">
                <div className="px-6 py-4 border-r border-white/10 font-bold text-white bg-white/5">Wix API İstemi</div>
                <div className="px-6 py-4 text-slate-300">Google Auth</div>
              </div>
              <div className="p-8">
                <pre className="text-sm text-emerald-400 font-mono leading-relaxed overflow-x-auto">
                  <code>
{`async function syncWixData() {
  console.log("Bağlantı Kuruluyor...");
  
  // 1. Wix Headless API'den Blog verisi çekme
  const pages = await wixClient.site.getPages();
  console.log(\`\${pages.length} sayfa bulundu.\`);
  
  // 2. Eksik Meta Verilerin Tespiti
  const missingMeta = pages.filter(p => !p.seo.title);
  
  // 3. VixSEO Engine Senkronizasyonu
  await updateVixSeoDatabase(pages);
  
  return "Senkronizasyon Başarılı!";
}`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Step 3: Analysis and Action */}
      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8 relative">
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/20 to-blue-600/20 blur-2xl rounded-3xl" />
            <div className="bg-[#0B1528] rounded-3xl p-8 border border-white/20 shadow-2xl relative">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white">Canlı Performans Tablosu</h3>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold font-mono">+12.4% Artış</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-200 font-medium">Toplam Organik Gösterim</span>
                    <span className="text-white font-bold">124.500</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-emerald-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-200 font-medium">Tespit Edilen Fırsat Kelimeler (Sıra 11-20)</span>
                    <span className="text-white font-bold">48 Kelime</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '45%' }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-200 font-medium">Sayfa İçi SEO Sağlık Skoru</span>
                    <span className="text-white font-bold">94/100</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '94%' }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">
              <BarChart3 className="w-5 h-5" /> Adım 03
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-6">Veriyi Analiz Edin, Harekete Geçin</h2>
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Arka planda çalışan VixSEO algoritması, milyarlarca veri noktasını bir araya getirerek size okunması kolay, aksiyon alınabilir grafikler sunar. Size düşen tek şey, "Fırsat Kelimeler" raporuna bakıp ilgili blog içeriklerini doğrudan panelimizden güncellemektir!
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Çakışan içerikleri (Keyword Cannibalization) otomatik tespit edin',
                'Hangi sayfanın hangi anahtar kelimede yükseldiğini canlı izleyin',
                'Meta etiket optimizasyon eksikliğinden kaynaklı sıçrama oranlarını düzeltin',
                'Wix panelinde saatler süren işleri saniyeler içinde tamamlayın'
              ].map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex gap-4 items-start text-slate-200">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-[1.1rem]">{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link href="/sign-up">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 font-bold px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                Şimdi Ücretsiz Başlayın <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  )
}
