import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing/landing-page'

export const metadata: Metadata = {
  title: 'VixSEO — Wix SEO Yönetim Paneli',
  description: 'Wix sitelerinizin SEO performansını tek panelden yönetin',
}

export default function HomePage() {
  return <LandingPage />
}
