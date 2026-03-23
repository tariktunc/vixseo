'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { 
  Search, BookOpen, CreditCard, Link as LinkIcon, 
  AlertCircle, Terminal, ChevronRight, Mail, MessageSquare, PhoneCall 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const categories = [
  { icon: BookOpen, title: 'Başlangıç ve Kurulum', desc: 'VixSEO kullanımı ve temel ayarlar.', color: 'emerald' },
  { icon: LinkIcon, title: 'Entegrasyonlar', desc: 'Wix ve Search Console bağlantıları.', color: 'blue' },
  { icon: CreditCard, title: 'Faturalandırma & Planlar', desc: 'Abonelik paketleri ve ödemeler.', color: 'purple' },
  { icon: AlertCircle, title: 'Sorun Giderme', desc: 'Senkronizasyon hataları ve çözümleri.', color: 'rose' },
  { icon: Terminal, title: 'Geliştiriciler & API', desc: 'Dış erişim ve özel entegrasyonlar.', color: 'amber' },
]

const popularGuides = [
  'Wix Sitemi VixSEO paneline nasıl bağlarım?',
  'Google Search Console verilerim neden güncellenmiyor?',
  'Toplu Blog yöneticisi ile içerik paylaşımı nasıl yapılır?',
  'Abonelik planımı nasıl Ajans paketine yükseltirim?',
  'Sayfa içi SEO denetimi (Audit) hatalarını nerede bulabilirim?'
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0F2447] dark:bg-[#0B1120] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Support Hero */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Nasıl yardımcı <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">olabiliriz?</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-slate-300 mb-10">
            Aradığınız tüm cevaplar, kurulum rehberleri ve sorun giderme makalelerine hızlıca ulaşın.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
              <Search className="w-6 h-6 text-slate-400 ml-3" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Makalelerde veya konularda arama yapın..." 
                className="border-0 bg-transparent text-white placeholder:text-slate-400 focus-visible:ring-0 text-lg h-14"
              />
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 h-12">Ara</Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Support Grid & Popular */}
        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          
          {/* Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-8">Yardım Konuları</h2>
            <motion.div 
              className="grid sm:grid-cols-2 gap-4"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
            >
              {categories.map((cat, i) => (
                <motion.div key={i} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="cursor-pointer">
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#162B4D]/50 dark:bg-white/5 hover:bg-white/10 transition-colors h-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${cat.color}-500/20 text-${cat.color}-400 mb-4`}>
                      <cat.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{cat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{cat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Popular Articles */}
          <div className="lg:col-span-1">
            <div className="p-8 rounded-2xl border border-white/10 bg-[#162B4D]/30 dark:bg-white/5 shadow-2xl h-full">
              <h2 className="text-xl font-bold text-white mb-6">Popüler Rehberler</h2>
              <div className="space-y-4">
                {popularGuides.map((guide, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Link href="#" className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0 hover:text-emerald-400 transition-colors">
                      <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white leading-snug">{guide}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Contact Direct */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#162B4D] to-[#0A1628] dark:from-white/10 dark:to-black/20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          <h2 className="text-3xl font-extrabold text-white mb-4 relative z-10">Hala yardıma ihtiyacınız var mı?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10 relative z-10">Müşteri temsilcilerimiz ve teknik SEO uzmanlarımızdan destek almak için doğrudan canlı desteğe bağlanabilir veya bilet (ticket) oluşturabilirsiniz.</p>
          
          <div className="grid sm:grid-cols-3 gap-6 relative z-10">
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-emerald-500/30">
              <MessageSquare className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-foreground text-white font-bold mb-1">Canlı Sohbet</h3>
              <p className="text-xs text-slate-400">Ort. Yanıt: 2 dk</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-blue-500/30">
              <Mail className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-foreground text-white font-bold mb-1">E-posta Bilet</h3>
              <p className="text-xs text-slate-400">Ort. Yanıt: 4 Saat</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-purple-500/30">
              <PhoneCall className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-foreground text-white font-bold mb-1">Telefon Çağrısı</h3>
              <p className="text-xs text-slate-400">Sadece Ajans Paketi</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
