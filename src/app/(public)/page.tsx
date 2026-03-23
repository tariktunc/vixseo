import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing/landing-page'

export const metadata: Metadata = {
  title: 'VixSEO — Wix Siteleri İçin Profesyonel SEO Yönetim Paneli',
  description:
    'Wix sitelerinizin SEO performansını tek panelden yönetin. Blog yönetimi, Google Search Console analizi, anahtar kelime araştırma ve SEO denetimi — tüm araçlar tek yerde.',
}

export default function HomePage() {
  return <LandingPage />
}
