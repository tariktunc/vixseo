'use client'

import { motion } from 'framer-motion'
import { FaqSection } from '@/components/landing/faq-section'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircleQuestion } from 'lucide-react'

export default function FaqPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#0F2447] overflow-hidden text-slate-100">
      
      {/* Hero */}
      <section className="text-center py-20 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="relative z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <MessageCircleQuestion className="w-4 h-4 mr-2" /> Canlı Destek ve SSS
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Aklınıza Takılan Her Şeyi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Bizim İçin Yanıtladık</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            VixSEO'nun kurulumundan faturalandırmaya kadar tüm detaylar hakkında bilgi alın. 
            Eğer aradığınız cevabı bulamazsanız destek ekibimiz ekranın diğer ucunda sizi bekliyor olacak.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Component */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FaqSection />
      </motion.div>

      {/* Support CTA */}
      <section className="py-24 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)] rounded-3xl p-10 md:p-16 text-center"
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Aradığınız cevabı bulamadınız mı?
          </h2>
          <p className="text-lg text-slate-200 mb-10 max-w-xl mx-auto leading-relaxed">
            Teknik mühendislerimiz ve müşteri ilişkileri uzmanlarımız tüm iş günlerinde 
            VixSEO kurulumunuzda size yardımcı olmak için hazır.
          </p>
          <a href="mailto:support@vixseo.com">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold gap-3 rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Mail className="h-6 w-6" /> Hemen Bize E-posta Gönderin
            </Button>
          </a>
        </motion.div>
      </section>
    </div>
  )
}
