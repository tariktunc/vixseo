'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import {
  Building2,
  FileText,
  BarChart3,
  Search,
  Shield,
  ArrowLeftRight,
} from 'lucide-react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const features = [
  {
    icon: Building2,
    title: 'Çoklu İşletme Yönetimi',
    description: 'Tüm Wix sitelerinizi tek bir panelden yönetin. İşletmeler arası hızlı geçiş yapın.',
  },
  {
    icon: FileText,
    title: 'Wix Blog & CMS',
    description: 'Blog yazılarınızı ve CMS koleksiyonlarınızı doğrudan panelden düzenleyin.',
  },
  {
    icon: BarChart3,
    title: 'Search Console Analizi',
    description: 'Google Search Console verilerinizi görselleştirin, tıklama ve gösterim trendlerini takip edin.',
  },
  {
    icon: Search,
    title: 'Anahtar Kelime Araştırma',
    description: 'Hedef anahtar kelimelerinizi belirleyin ve sıralama performansınızı izleyin.',
  },
  {
    icon: Shield,
    title: 'SEO Audit',
    description: 'Sitenizdeki SEO sorunlarını tespit edin ve iyileştirme önerileri alın.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Sitemap & Redirects',
    description: 'Sitemap yönetimi ve URL yönlendirmelerini kolayca yapılandırın.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0F2447]/80 backdrop-blur-md dark:bg-[#0B1120]/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-dark.svg"
              alt="VixSEO"
              width={140}
              height={32}
              priority
            />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                Giriş Yap
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="bg-[#10B981] hover:bg-[#059669] text-white">
                Kayıt Ol
              </Button>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-[#0F2447] to-[#193157] px-4 pt-14 dark:from-[#0B1120] dark:to-[#131C2E]">
        <div className="mx-auto max-w-4xl py-24 text-center md:py-32">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            {...fadeUp}
          >
            Wix Sitelerinizin SEO&apos;sunu
            <br />
            <span className="text-[#10B981]">Tek Panelden</span> Yönetin
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-300"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Blog yönetimi, Search Console analizi, anahtar kelime araştırma ve SEO audit — tüm araçlar tek bir yerde.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-[#10B981] hover:bg-[#059669] text-white px-8 text-base">
                Hemen Başlayın
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 text-base">
                Giriş Yap
              </Button>
            </SignInButton>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-3xl font-bold">Neler Yapabilirsiniz?</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              VixSEO ile Wix sitelerinizi profesyonelce yönetin
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-[#10B981] mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#0F2447] to-[#193157] py-20 px-4 dark:from-[#0B1120] dark:to-[#131C2E]">
        <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp}>
          <h2 className="text-3xl font-bold text-white">Hemen Başlayın</h2>
          <p className="mt-4 text-slate-300 text-lg">
            Ücretsiz hesap oluşturun ve Wix sitelerinizin SEO performansını artırın.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="mt-8 bg-[#10B981] hover:bg-[#059669] text-white px-10 text-base">
              Ücretsiz Kayıt Ol
            </Button>
          </SignUpButton>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8 px-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Image
            src="/logo.svg"
            alt="VixSEO"
            width={100}
            height={24}
            className="dark:hidden"
          />
          <Image
            src="/logo-dark.svg"
            alt="VixSEO"
            width={100}
            height={24}
            className="hidden dark:block"
          />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VixSEO. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  )
}
