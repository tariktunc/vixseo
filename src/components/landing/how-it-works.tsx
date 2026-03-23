'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { UserPlus, Link2, BarChart3, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Hesap Oluşturun',
    description: '30 saniyede ücretsiz hesabınızı oluşturun. Kredi kartı gerekmez.',
  },
  {
    number: '02',
    icon: Link2,
    title: 'Sitenizi Bağlayın',
    description: 'Wix API anahtarınızı ve Google Search Console erişiminizi ekleyin.',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Analiz Edin',
    description: 'SEO verilerinizi görselleştirin, trendleri takip edin ve iyileştirin.',
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 0])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const yTransforms = [y1, y2, y3]

  return (
    <section
      ref={containerRef}
      id="nasil-calisir"
      className="relative bg-background dark:bg-[#0B1120] py-20 md:py-28 px-4 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-3">
            Başlangıç
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            3 Adımda Başlayın
          </h2>
          <motion.p 
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            VixSEO ile tanışmak çok kolay. Dakikalar içinde analize başlayabilirsiniz.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connector lines (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[calc(33.33%+0.5rem)] right-[calc(33.33%+0.5rem)] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-emerald-500/40 via-emerald-500/20 to-emerald-500/40 relative">
              <ArrowRight className="absolute -right-2 -top-[7px] h-4 w-4 text-emerald-500/60" />
            </div>
          </div>

          {steps.map((step, i) => (
            <motion.div key={step.number} style={{ y: yTransforms[i] }} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center group"
              >
              {/* Step Number */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.3 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5, y: 0, transition: { type: 'spring', stiffness: 300 } }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 mb-6"
                >
                  <step.icon className="h-7 w-7" />
                </motion.div>
              </motion.div>
              <div className="absolute -top-2 left-1/2 translate-x-6 text-xs font-bold text-emerald-500 bg-emerald-500/10 rounded-full px-2 py-0.5">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
