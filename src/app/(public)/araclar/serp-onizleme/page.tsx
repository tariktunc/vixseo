import type { Metadata } from 'next'

import { SerpPreviewClient } from '@/components/tools/serp-preview-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'SERP Önizleme — Google Arama Sonucu Simulatörü | VixSEO',
  description:
    'Google arama sonuçlarında nasıl görüneceğinizi önizleyin. Title, meta description ve URL optimizasyonu ile tıklama oranınızı artırın. Ücretsiz SERP önizleme aracı.',
  openGraph: {
    title: 'SERP Önizleme — Google Arama Sonucu Simulatörü | VixSEO',
    description:
      'Google arama sonuçlarında nasıl görüneceğinizi önizleyin. Title, meta description ve URL optimizasyonu ile tıklama oranınızı artırın.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function SerpOnizlemePage() {
  return <SerpPreviewClient />
}
