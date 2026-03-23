'use client'

import { motion } from 'framer-motion'
import { SignUpButton } from '@clerk/nextjs'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F2447] via-[#132d54] to-[#0a1a35] dark:from-[#0B1120] dark:via-[#0e1726] dark:to-[#080d18] py-20 md:py-28 px-4 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Hemen Başlayın
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          SEO Yönetiminizi{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            Bir Üst Seviyeye
          </span>{' '}
          Taşıyın
        </h2>

        <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
          Ücretsiz hesap oluşturun, Wix sitenizi bağlayın ve profesyonel SEO analizine hemen başlayın.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <SignUpButton mode="modal">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 h-13 text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 group"
              >
                Ücretsiz Kayıt Ol
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </SignUpButton>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Kredi kartı gerekmez • Kurulum 30 saniye
        </p>
      </motion.div>
    </section>
  )
}
