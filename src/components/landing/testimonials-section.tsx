'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ahmet Y.',
    role: 'Dijital Pazarlama Uzmanı',
    company: 'Ajans360',
    text: 'VixSEO ile 5 farklı müşterimin Wix sitesini tek panelden yönetiyorum. Eskiden saatlerce uğraştığım işler artık dakikalar sürüyor.',
    rating: 5,
  },
  {
    name: 'Elif K.',
    role: 'E-Ticaret Yöneticisi',
    company: 'ModaTrend',
    text: 'Search Console verilerini bu kadar anlaşılır gösteren başka bir araç bulamadım. SEO denetimi özelliği sayesinde sıralamalarımız %40 yükseldi.',
    rating: 5,
  },
  {
    name: 'Murat B.',
    role: 'İçerik Müdürü',
    company: 'BlogMaster',
    text: 'Blog yazılarımızın SEO durumunu tek bakışta görebiliyoruz. Eksik meta açıklamalarını hemen yakaladık ve trafik gözle görülür arttı.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative bg-background dark:bg-[#0B1120] py-20 md:py-28 px-4 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-3">
            Kullanıcılarımız
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Profesyonellerin Tercihi
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            VixSEO kullanan dijital pazarlama uzmanları ve işletme sahipleri ne diyor?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <div className="h-full rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/10 hover:border-emerald-500/30">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-emerald-500/30 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
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
