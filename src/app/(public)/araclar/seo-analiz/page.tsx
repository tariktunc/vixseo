import type { Metadata } from 'next'

import { SeoAnalyzeClient } from '@/components/tools/seo-analyze-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Ücretsiz SEO Analiz Aracı | VixSEO',
  description:
    'Web sitenizin SEO durumunu anında analiz edin. Title, meta description, Open Graph, canonical URL ve daha fazlasını kontrol edin. Tamamen ücretsiz.',
  openGraph: {
    title: 'Ücretsiz SEO Analiz Aracı | VixSEO',
    description:
      'Web sitenizin SEO durumunu anında analiz edin. Title, meta description, Open Graph, canonical URL ve daha fazlasını kontrol edin.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function SeoAnalizPage() {
  return <SeoAnalyzeClient />
}
