import type { Metadata } from 'next'

import { ChromeExtensionsClient } from '@/components/tools/chrome-extensions-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'SEO Chrome Eklentileri — SEO Çalışmalarınızı Hızlandırın | VixSEO',
  description:
    'SEO profesyonelleri için en iyi Chrome uzantılarının küratörlü listesi. SEO analiz, teknik SEO, içerik optimizasyonu ve yapısal veri araçlarını keşfedin.',
  openGraph: {
    title: 'SEO Chrome Eklentileri — SEO Çalışmalarınızı Hızlandırın | VixSEO',
    description:
      'SEO profesyonelleri için en iyi Chrome uzantılarının küratörlü listesi. SEO analiz, teknik SEO, içerik optimizasyonu ve yapısal veri araçlarını keşfedin.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function ChromeEklentileriPage() {
  return <ChromeExtensionsClient />
}
