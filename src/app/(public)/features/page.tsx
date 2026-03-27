'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Search,
  PenTool,
  ShieldAlert,
  Crosshair,
  Tags,
  ArrowLeftRight,
  FileSearch,
  Building2,
  Check,
  X,
  Minus,
  BarChart3,
  Globe,
  Sparkles,
} from 'lucide-react'

import { FlowDiagram } from '@/components/landing/flow-diagram'
import { PageFaq } from '@/components/landing/page-faq'
import { Button } from '@/components/ui/button'

type Feature = {
  title: string
  badge: string
  icon: React.ComponentType<{ className?: string }>
  desc: string
  benefits: string[]
  code: string
  gradient: string
}

type ComparisonRow = {
  feature: string
  vixseo: 'yes' | 'no' | 'partial'
  manual: 'yes' | 'no' | 'partial'
  agency: 'yes' | 'no' | 'partial'
}

type StatItem = {
  value: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

type TechCard = {
  name: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

export default function FeaturesPage() {
  const staggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  }

  const features: Feature[] = [
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
  yönlendirmelerinizi VixSEO panelinden yapın.");
}`,
      gradient: 'from-emerald-600/20 to-teal-600/20'
    },
    {
      title: 'Anahtar Kelime Kannibalizasyonu Tespiti',
      badge: 'Akıllı Kelime Analizi',
      icon: Crosshair,
      desc: 'Aynı anahtar kelimeyi hedefleyen birden fazla sayfa, Google gözünde birbirini zayıflatır. VixSEO bu çakışmaları otomatik tespit eder ve hangi sayfanın öncelikli olması gerektiğini size söyler.',
      benefits: [
        'Aynı kelimeyi hedefleyen sayfaları otomatik gruplandırın',
        'Hangi sayfanın daha iyi performans gösterdiğini karşılaştırın',
        'Birleştirilmesi gereken içerikleri tespit edin',
        'Cannibalization skoru ile öncelik sıralama yapın'
      ],
      code: `// Cannibalization Detection
const overlaps = detectKeywordOverlap(pages);
overlaps.forEach(group => {
  const winner = group.sort((a, b) => b.ctr - a.ctr)[0];
  suggestConsolidate(group, winner);
});`,
      gradient: 'from-purple-600/20 to-violet-600/20'
    },
    {
      title: 'Toplu Meta Etiket Düzenleyici',
      badge: 'Hızlı İçerik Yönetimi',
      icon: Tags,
      desc: 'Başlık, açıklama ve meta etiketlerini tek ekrandan yönetin. Onlarca sayfanın SEO meta verilerini topluca düzenleyerek saatler süren işlemleri dakikalara indirin.',
      benefits: [
        'Tüm sayfaların meta verilerini tek tablo görünümünde görüntüleyin',
        'Eksik veya çok kısa/uzun title ve description uyarıları',
        'Topluca seç ve düzenle özelliği ile hızlı güncelleme',
        'Değişiklikleri önizleme ve tek tıkla yayınlama'
      ],
      code: `// Bulk Meta Editor
const updates = selectedPages.map(page => ({
  id: page.id,
  title: generateOptimizedTitle(page),
  description: generateMetaDesc(page),
}));
await bulkUpdateMeta(updates); // 50+ sayfa, < 3sn`,
      gradient: 'from-amber-600/20 to-yellow-600/20'
    },
    {
      title: '301/302 Yönlendirme Yöneticisi',
      badge: 'Kırık Link Koruması',
      icon: ArrowLeftRight,
      desc: 'Kırık linkleri tespit edin ve yönlendirmeleri yönetin. URL değişikliklerinde SEO değerinizi kaybetmeden kullanıcıları doğru sayfaya yönlendirin.',
      benefits: [
        '404 hatası veren sayfaları otomatik tarama ile tespit edin',
        'Tek tıkla 301 kalıcı yönlendirme oluşturun',
        'Yönlendirme zincirlerini ve döngülerini tespit edin',
        'Toplu yönlendirme import/export özelliği'
      ],
      code: `// Redirect Manager
const brokenLinks = await scanForBrokenLinks(siteUrl);
for (const link of brokenLinks) {
  const suggestion = findBestMatch(link.url, activePages);
  await createRedirect(link.url, suggestion.url, 301);
}`,
      gradient: 'from-rose-600/20 to-pink-600/20'
    },
    {
      title: 'Sitemap Sağlık Analizi',
      badge: 'XML Sitemap Kontrolü',
      icon: FileSearch,
      desc: 'XML sitemap dosyanızı analiz edin, hataları ve uyarıları görün. Google\'ın sitenizi doğru şekilde indexlemesi için sitemap sağlığınızı takip edin.',
      benefits: [
        'Sitemap.xml yapısını otomatik doğrulama',
        'İndexlenmeyen veya hatalı URL tespiti',
        'Son değişiklik tarihlerinin tutarlılığı kontrolü',
        'Google\'a otomatik ping göndererek hızlı indexlenme'
      ],
      code: `// Sitemap Health Check
const sitemap = await parseSitemap(sitemapUrl);
const health = analyzeSitemapHealth(sitemap);
if (health.orphanPages.length > 0) {
  alert(\`\${health.orphanPages.length} sayfa sitemap'te yok!\`);
}`,
      gradient: 'from-sky-600/20 to-blue-600/20'
    },
    {
      title: 'Çoklu İşletme Paneli',
      badge: 'Merkezi Yönetim',
      icon: Building2,
      desc: 'Birden fazla web sitesini tek dashboard\'dan yönetin. İşletmeler arası hızlıca geçiş yapın ve tüm sitelerinizin SEO performansını tek noktadan takip edin.',
      benefits: [
        'Sınırsız işletme ekleyerek tüm siteleri merkezi yönetin',
        'İşletmeler arası tek tıkla geçiş yapın',
        'Her işletme için ayrı GSC ve Wix entegrasyonu',
        'Rol tabanlı erişim kontrolü ile ekip yönetimi'
      ],
      code: `// Multi-Business Dashboard
const businesses = await getBusinesses(userId);
const overview = await Promise.all(
  businesses.map(b => getPerformanceSummary(b.id))
);
// Tüm işletmeler tek panelde!`,
      gradient: 'from-indigo-600/20 to-blue-600/20'
    }
  ]

  const comparisonData: ComparisonRow[] = [
    { feature: 'Google Search Console Entegrasyonu', vixseo: 'yes', manual: 'partial', agency: 'yes' },
    { feature: 'Wix CMS Blog Yönetimi', vixseo: 'yes', manual: 'no', agency: 'partial' },
    { feature: 'Otomatik SEO Denetimi', vixseo: 'yes', manual: 'no', agency: 'yes' },
    { feature: 'Anahtar Kelime Kannibalizasyonu', vixseo: 'yes', manual: 'no', agency: 'partial' },
    { feature: 'Toplu Meta Etiket Düzenleme', vixseo: 'yes', manual: 'no', agency: 'partial' },
    { feature: '301/302 Yönlendirme Yönetimi', vixseo: 'yes', manual: 'partial', agency: 'yes' },
    { feature: 'Sitemap Sağlık Analizi', vixseo: 'yes', manual: 'no', agency: 'partial' },
    { feature: 'Çoklu İşletme Desteği', vixseo: 'yes', manual: 'no', agency: 'yes' },
    { feature: 'Gerçek Zamanlı Uyarılar', vixseo: 'yes', manual: 'no', agency: 'partial' },
    { feature: 'Uygun Maliyet', vixseo: 'yes', manual: 'yes', agency: 'no' },
  ]

  const stats: StatItem[] = [
    { value: '500+', label: 'Aktif Site', icon: Globe },
    { value: '1M+', label: 'Analiz Edilen Anahtar Kelime', icon: Search },
    { value: '50K+', label: 'Optimize Edilen Sayfa', icon: BarChart3 },
  ]

  const techCards: TechCard[] = [
    {
      name: 'Wix Headless CMS',
      desc: 'Wix platformuyla doğrudan entegrasyon. Blog, sayfa ve CMS içeriklerini API üzerinden okuyun ve düzenleyin.',
      icon: PenTool,
      gradient: 'from-orange-500/20 to-amber-500/20',
    },
    {
      name: 'Google Search Console',
      desc: 'Google\'ın resmi API\'si üzerinden tıklama, gösterim, CTR ve sıralama verilerinize erişin.',
      icon: Search,
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      name: 'Yapay Zeka Desteği',
      desc: 'AI tabanlı meta açıklama önerisi, içerik optimizasyonu ve anahtar kelime analizi.',
      icon: Sparkles,
      gradient: 'from-purple-500/20 to-violet-500/20',
    },
  ]

  const renderComparisonIcon = (status: 'yes' | 'no' | 'partial') => {
    switch (status) {
      case 'yes':
        return <Check className="w-5 h-5 text-emerald-400" />
      case 'no':
        return <X className="w-5 h-5 text-red-400" />
      case 'partial':
        return <Minus className="w-5 h-5 text-amber-400" />
    }
  }

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

      {/* Sosyal Kanıt / İstatistikler */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2447] via-[#0B1528] to-[#0F2447] pointer-events-none" />
        <motion.div
          className="max-w-5xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Rakamların Gücü</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">VixSEO ile SEO yönetiminizi ölçün, analiz edin ve büyütün.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <motion.div
                  className="text-4xl md:text-5xl font-extrabold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

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

      {/* VixSEO vs Diğerleri Karşılaştırma Tablosu */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528] via-[#0F2447] to-[#0B1528] pointer-events-none" />
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-6">
              Karşılaştırma
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">VixSEO vs Diğerleri</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Manuel SEO çalışması veya ajans maliyeti yerine, VixSEO ile her şeyi tek panelden yönetin.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-slate-300 font-medium text-sm">Özellik</th>
                  <th className="text-center py-4 px-4 min-w-[120px]">
                    <span className="text-emerald-400 font-bold text-sm">VixSEO</span>
                  </th>
                  <th className="text-center py-4 px-4 min-w-[120px]">
                    <span className="text-slate-400 font-medium text-sm">Manuel SEO</span>
                  </th>
                  <th className="text-center py-4 px-4 min-w-[120px]">
                    <span className="text-slate-400 font-medium text-sm">SEO Ajansı</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <td className="py-3.5 px-4 text-slate-200 text-sm font-medium">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex justify-center">{renderComparisonIcon(row.vixseo)}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex justify-center">{renderComparisonIcon(row.manual)}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex justify-center">{renderComparisonIcon(row.agency)}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" /> Tam destek
            </div>
            <div className="flex items-center justify-center gap-2">
              <Minus className="w-4 h-4 text-amber-400" /> Kısmi / Sınırlı
            </div>
            <div className="flex items-center justify-center gap-2">
              <X className="w-4 h-4 text-red-400" /> Yok / Çok Zor
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Teknoloji Entegrasyonları */}
      <section className="py-24 bg-[#0B1528] border-y border-white/5 px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-6">
              Entegrasyonlar
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Güçlü Teknoloji Altyapısı</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">En güçlü platformlarla doğrudan entegrasyon sayesinde verileriniz her zaman güncel ve güvenilir.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techCards.map((card) => (
              <motion.div
                key={card.name}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className={`h-full rounded-2xl border border-white/10 bg-gradient-to-br ${card.gradient} p-8 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5`}>
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                    <card.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.name}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SSS */}
      <PageFaq
        title="Özellikler Hakkında Sıkça Sorulan Sorular"
        subtitle="VixSEO'nun sunduğu özellikler hakkında merak edilenler."
        items={[
          {
            question: 'VixSEO hangi platformları destekliyor?',
            answer: 'VixSEO, Wix platformunda oluşturulmuş web siteleri için özel olarak tasarlanmıştır. Wix Blog, Wix CMS ve Wix Headless API entegrasyonları sayesinde tüm site verilerinize erişim sağlar. Ayrıca Google Search Console ile doğrudan entegre çalışarak arama motoru performansınızı takip eder. Gelecekte ek platform destekleri de planlanmaktadır.',
          },
          {
            question: 'Google Search Console entegrasyonu nasıl çalışıyor?',
            answer: 'Google Search Console hesabınızı VixSEO panelinden yetkilendirmeniz yeterlidir. Yetkilendirme tamamlandığında VixSEO, tıklama, gösterim, CTR ve ortalama sıralama verilerinizi otomatik olarak çeker. Bu veriler düzenli aralıklarla güncellenir ve anlaşılır grafikler halinde sunulur. Böylece sitenizin Google gözündeki gerçek performansını anlık olarak takip edebilirsiniz.',
          },
          {
            question: 'Wix dışında başka CMS destekliyor musunuz?',
            answer: 'Şu anda VixSEO yalnızca Wix platformu için optimize edilmiştir. Wix Headless API mimarisini kullanarak blog yazıları, sayfa meta verileri ve site ayarlarına doğrudan erişim sağlarız. WordPress, Shopify ve diğer platformlar için destek geliştirme yol haritamızda yer almaktadır. Güncellemelerden haberdar olmak için bültenimize abone olabilirsiniz.',
          },
          {
            question: 'Anahtar kelime kannibalizasyonu tespiti ne işe yarar?',
            answer: 'Anahtar kelime kannibalizasyonu, aynı anahtar kelimeyi hedefleyen birden fazla sayfanızın Google gözünde birbirini zayıflatması durumudur. VixSEO bu çakışmaları otomatik olarak tespit eder ve hangi sayfanın daha iyi performans gösterdiğini raporlar. Böylece gereksiz rekabeti ortadan kaldırarak içeriklerinizi birleştirebilir veya yeniden odaklayabilirsiniz. Bu özellik organik sıralamalarınızı doğrudan iyileştirir.',
          },
          {
            question: 'Toplu meta etiket düzenleme nasıl çalışıyor?',
            answer: 'VixSEO panelinden tüm sayfalarınızın başlık (title) ve açıklama (description) meta etiketlerini tek bir tablo görünümünde yönetebilirsiniz. Eksik, çok kısa veya çok uzun meta etiketleri otomatik olarak işaretlenir. Birden fazla sayfayı seçerek toplu düzenleme yapabilir ve değişiklikleri önizledikten sonra tek tıkla Wix sitenize yayınlayabilirsiniz. Bu sayede saatlerce süren manuel işlemler dakikalara iner.',
          },
          {
            question: '301 yönlendirme yöneticisi ne sağlıyor?',
            answer: '301 yönlendirme yöneticisi, URL değişikliklerinde SEO değerinizi korumanızı sağlar. Sitenizde 404 hatası veren kırık linkleri otomatik tarama ile tespit eder. Tek tıkla kalıcı 301 yönlendirmeler oluşturabilir, yönlendirme zincirlerini ve döngülerini kolayca belirleyebilirsiniz. Ayrıca toplu yönlendirme import ve export özelliği ile büyük ölçekli URL taşımalarını sorunsuz yönetebilirsiniz.',
          },
          {
            question: 'Sitemap sağlık analizi hangi hataları tespit eder?',
            answer: 'Sitemap analizi, XML sitemap dosyanızın yapısını otomatik olarak doğrular ve hataları raporlar. İndexlenmeyen veya hatalı URL\'leri, sitemap\'te eksik olan sayfaları ve son değişiklik tarihlerindeki tutarsızlıkları tespit eder. Ayrıca Google\'a otomatik ping göndererek yeni içeriklerinizin hızlıca indexlenmesini sağlar. Böylece arama motorlarının sitenizi tam olarak taramasını garanti edersiniz.',
          },
          {
            question: 'Çoklu işletme paneli kaç site destekliyor?',
            answer: 'VixSEO çoklu işletme paneli ile sınırsız sayıda Wix sitesi ekleyebilirsiniz. Her işletme için ayrı Google Search Console ve Wix entegrasyonu yapılır. İşletmeler arasında tek tıkla geçiş yapabilir ve tüm sitelerinizin SEO performansını merkezi bir panelden takip edebilirsiniz. Rol tabanlı erişim kontrolü sayesinde ekip üyelerinize farklı yetki seviyeleri atayabilirsiniz.',
          },
          {
            question: 'VixSEO SEO denetimi neleri kontrol eder?',
            answer: 'VixSEO SEO denetimi, eksik meta açıklamalarını, kısa veya uzun başlıkları, birden fazla H1 etiketi kullanımını ve yetersiz içerik uyarılarını tespit eder. Canonical, hreflang ve robots.txt yapısal kontrollerini otomatik olarak gerçekleştirir. Kırık bağlantıları ve 404 hatalarını tarar, ayrıca sayfa hızı ve teknik SEO sorunlarını raporlar. Tüm bulgular öncelik sırasına göre sıralanarak aksiyon alınabilir bir şekilde sunulur.',
          },
          {
            question: 'Ücretsiz deneme süresi var mı?',
            answer: 'Evet, VixSEO şu an tamamen ücretsizdir. Kredi kartı bilgisi gerekmeden hesap oluşturabilir ve tüm özellikleri kullanmaya hemen başlayabilirsiniz. Kayıt işlemi 30 saniyeden kısa sürer ve e-posta veya Google hesabınızla hızlıca giriş yapabilirsiniz. İleride premium planlar sunulduğunda mevcut ücretsiz kullanıcılar özel avantajlardan yararlanacaktır.',
          },
        ]}
      />

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
