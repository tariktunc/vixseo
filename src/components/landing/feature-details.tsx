'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  FileText,
  Shield,
  TrendingUp,
  Zap,
  Eye,
  CheckCircle2,
} from 'lucide-react'

const details = [
  {
    badge: 'Search Console',
    title: 'Google Search Console Verilerinizi Derinlemesine Analiz Edin',
    description:
      'Tıklama trendleri, gösterim değişimleri, CTR dalgalanmaları ve sıralama hareketlerini tek bir panelde görselleştirin. Cihaz, ülke ve arama türü kırılımlarıyla detaylı raporlar alın.',
    features: [
      'Günlük trend grafikleri',
      'Cihaz ve ülke kırılımı',
      'Sayfa ve sorgu performansı',
      'Dönemsel karşılaştırma',
    ],
    icon: BarChart3,
    iconColor: 'text-blue-500',
    bgColor: 'from-blue-500/10 to-blue-500/5',
  },
  {
    badge: 'Blog Yönetimi',
    title: 'Wix Blog Yazılarınızı SEO Odaklı Yönetin',
    description:
      'Tüm blog yazılarını senkronize edin, SEO başlıklarını ve meta açıklamalarını düzenleyin, yayın durumlarını takip edin. Eksik SEO alanları otomatik tespit edilir.',
    features: [
      'Wix CMS senkronizasyonu',
      'SEO alan kontrolü',
      'Kategori yönetimi',
      'Toplu güncelleme',
    ],
    icon: FileText,
    iconColor: 'text-emerald-500',
    bgColor: 'from-emerald-500/10 to-emerald-500/5',
  },
  {
    badge: 'SEO Denetimi',
    title: 'Otomatik SEO Denetimi ile Sorunları Hızla Tespit Edin',
    description:
      'Eksik meta açıklamaları, kısa başlıklar, yavaş sayfalar ve yapısal sorunları otomatik olarak tespit edin. Öncelik sıralı iyileştirme önerileri alın.',
    features: [
      'Meta tag analizi',
      'Başlık yapısı kontrolü',
      'Sitemap doğrulama',
      'Yönlendirme kontrolü',
    ],
    icon: Shield,
    iconColor: 'text-rose-500',
    bgColor: 'from-rose-500/10 to-rose-500/5',
  },
]

export function FeatureDetails() {
  return (
    <section className="bg-background py-20 md:py-28 px-4 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-3">
            Detaylar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Güçlü Araçlar, Basit Arayüz
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-32">
          {details.map((detail, i) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col gap-12 items-center ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Text content */}
              <div className="flex-1 max-w-xl">
                <span className="inline-block text-xs font-bold text-emerald-500 tracking-wider uppercase bg-emerald-500/10 rounded-full px-3 py-1 mb-4">
                  {detail.badge}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  {detail.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {detail.description}
                </p>
                <ul className="space-y-3">
                  {detail.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-lg">
                <div
                  className={`relative rounded-2xl border border-border bg-gradient-to-br ${detail.bgColor} p-8 md:p-10`}
                >
                  {/* Decorative elements */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
                        <detail.icon className={`h-10 w-10 ${detail.iconColor}`} />
                      </div>
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="h-3 w-3 text-white" />
                      </motion.div>
                    </div>
                    {/* Mock data visualization */}
                    <div className="w-full space-y-3">
                      {[85, 65, 92, 78].map((val, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-16 text-xs text-muted-foreground text-right">
                            {['Sayfa', 'Meta', 'Başlık', 'Link'][j]}
                          </div>
                          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                val >= 80
                                  ? 'bg-emerald-500'
                                  : val >= 60
                                    ? 'bg-amber-500'
                                    : 'bg-red-500'
                              }`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${val}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: j * 0.15 }}
                            />
                          </div>
                          <div className="w-10 text-xs font-semibold text-foreground">
                            {val}%
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Mini stats */}
                    <div className="mt-6 grid grid-cols-3 gap-3 w-full">
                      {[
                        { icon: TrendingUp, label: 'Artış', val: '+24%' },
                        { icon: Eye, label: 'Görünüm', val: '1.2K' },
                        { icon: CheckCircle2, label: 'Sağlık', val: '92%' },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="bg-card/80 rounded-lg p-2 border border-border"
                        >
                          <s.icon className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                          <div className="text-xs font-semibold text-foreground">{s.val}</div>
                          <div className="text-[10px] text-muted-foreground">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
