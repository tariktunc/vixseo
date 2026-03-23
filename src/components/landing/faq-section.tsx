'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'VixSEO ücretsiz mi?',
    a: 'Evet, VixSEO şu an tamamen ücretsizdir. Hesap oluşturup tüm özellikleri kullanmaya hemen başlayabilirsiniz.',
  },
  {
    q: 'Hangi platformları destekliyorsunuz?',
    a: 'VixSEO, Wix platformunda oluşturulmuş web siteleri için özel olarak tasarlanmıştır. Wix Blog, CMS ve API entegrasyonları ile çalışır.',
  },
  {
    q: 'Google Search Console entegrasyonu nasıl çalışıyor?',
    a: 'Google Search Console hesabınızı yetkilendirdikten sonra, VixSEO otomatik olarak tıklama, gösterim, CTR ve sıralama verilerinizi çeker ve görselleştirir. Veriler düzenli aralıklarla güncellenir.',
  },
  {
    q: 'Birden fazla site ekleyebilir miyim?',
    a: 'Evet! VixSEO çoklu işletme yönetimi destekler. İstediğiniz kadar Wix sitesi ekleyip, aralarında kolayca geçiş yapabilirsiniz.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: 'Kesinlikle. Tüm verileriniz şifreli bağlantılar üzerinden aktarılır. Clerk altyapısı ile güvenli kimlik doğrulama ve rol tabanlı erişim kontrolü sağlanır.',
  },
  {
    q: 'SEO Audit ne tür sorunları tespit eder?',
    a: 'Eksik meta açıklamaları, kısa veya uzun başlıklar, eksik alt etiketler, yavaş sayfalar, kırık bağlantılar ve yapısal SEO sorunlarını otomatik olarak tespit eder.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="sss" className="bg-background py-20 md:py-28 px-4 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-3">
            SSS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Sıkça Sorulan Sorular
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
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
                      : 'border-border bg-card hover:border-emerald-500/20 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-foreground text-sm md:text-base">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
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
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
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
