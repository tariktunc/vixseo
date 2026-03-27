'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

type FaqItem = {
  question: string
  answer: string
}

type PageFaqProps = {
  items: FaqItem[]
  title?: string
  subtitle?: string
}

export function PageFaq({ items, title = 'Sıkça Sorulan Sorular', subtitle }: PageFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="bg-[#0B1528] py-20 md:py-28 px-4 lg:px-8 border-y border-white/5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            SSS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left rounded-xl border p-5 transition-all duration-200 ${
                    isOpen
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-white/10 bg-white/[0.02] hover:border-emerald-500/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white text-sm md:text-base">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
