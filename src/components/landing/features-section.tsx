'use client'

import { motion } from 'framer-motion'
import {
  Building2,
  FileText,
  BarChart3,
  Search,
  Shield,
  ArrowLeftRight,
} from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Çoklu İşletme Yönetimi',
    description:
      'Tüm Wix sitelerinizi tek bir panelden yönetin. İşletmeler arası saniyeler içinde geçiş yapın.',
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-500',
    borderColor: 'group-hover:border-emerald-500/30',
  },
  {
    icon: FileText,
    title: 'Wix Blog & CMS',
    description:
      'Blog yazılarınızı senkronize edin, SEO alanlarını düzenleyin, yayın durumlarını takip edin.',
    color: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-500',
    borderColor: 'group-hover:border-blue-500/30',
  },
  {
    icon: BarChart3,
    title: 'Search Console Analizi',
    description:
      'Tıklama, gösterim, CTR ve sıralama verilerini görselleştirin. Trend grafiklerini takip edin.',
    color: 'from-purple-500/20 to-purple-500/5',
    iconColor: 'text-purple-500',
    borderColor: 'group-hover:border-purple-500/30',
  },
  {
    icon: Search,
    title: 'Anahtar Kelime Araştırma',
    description:
      'Hedef anahtar kelimelerinizi belirleyin, aylık arama hacmini ve rekabet seviyesini analiz edin.',
    color: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-500',
    borderColor: 'group-hover:border-amber-500/30',
  },
  {
    icon: Shield,
    title: 'SEO Denetimi',
    description:
      'Sitenizdeki eksik meta açıklamalarını, başlık sorunlarını ve SEO hatalarını otomatik tespit edin.',
    color: 'from-rose-500/20 to-rose-500/5',
    iconColor: 'text-rose-500',
    borderColor: 'group-hover:border-rose-500/30',
  },
  {
    icon: ArrowLeftRight,
    title: 'Sitemap & Yönlendirmeler',
    description:
      'Sitemap değişikliklerini takip edin, 301 yönlendirmelerini kolayca yapılandırın ve yönetin.',
    color: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-500',
    borderColor: 'group-hover:border-cyan-500/30',
  },
]

export function FeaturesSection() {
  return (
    <section id="ozellikler" className="bg-background py-20 md:py-28 px-4 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-3">
            Özellikler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            SEO Yönetimi İçin İhtiyacınız Olan Her Şey
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            VixSEO, Wix sitelerinizin SEO performansını artırmak için kapsamlı araçlar sunar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <div
                className={`h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/10 hover:border-emerald-500/30`}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 5, y: 0, transition: { type: 'spring', stiffness: 300 } }}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
