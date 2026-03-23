'use client'

import { motion } from 'framer-motion'
import { Database, Search, ArrowRight, Activity, AppWindow } from 'lucide-react'

export function FlowDiagram() {
  const steps = [
    {
      id: 1,
      title: 'Wix Sitesi',
      desc: 'Blog ve CMS Verileri',
      icon: AppWindow,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/20',
    },
    {
      id: 2,
      title: 'Google Search Console',
      desc: 'Tıklama ve Sıralamalar',
      icon: Search,
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
      border: 'border-orange-400/20',
    },
    {
      id: 3,
      title: 'VixSEO Engine',
      desc: 'Veri Birleştirme & Analiz',
      icon: Database,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
    },
    {
      id: 4,
      title: 'SEO Raporu',
      desc: 'Aksiyon Alınabilir İçgörüler',
      icon: Activity,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/20',
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1528]" />
      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Verileriniz Nasıl İşleniyor?
          </h2>
          <p className="text-slate-400">
            Wix ve Google Search Console verileriniz API üzerinden güvenle çekilir,
            VixSEO motorunda analiz edilerek size eyleme dönüştürülebilir SEO içgörüleri sunulur.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group relative flex flex-col items-center w-full md:w-56"
            >
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center border mb-6 ${step.bg} ${step.border} ${step.color} relative z-10`}
              >
                <step.icon className="w-8 h-8" />
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 text-slate-600">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
              
              {/* Mobile connector */}
              {index < steps.length - 1 && (
                <div className="md:hidden w-px h-8 bg-slate-800 my-2" />
              )}

              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 text-center">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
