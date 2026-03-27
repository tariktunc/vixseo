import type { Metadata } from 'next'

import { CarbonMatcherClient } from '@/components/tools/carbon-matcher-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Carbon Eslestiricisi — Google Cache Kontrol Aracı | VixSEO',
  description:
    'Google\'ın indekslediği sayfalarınızı cache üzerinden kontrol edin. Canonical URL, indekslenen URL ve mobil URL eşleştirme sorunlarını tespit edin. Ücretsiz SEO aracı.',
  openGraph: {
    title: 'Carbon Eslestiricisi — Google Cache Kontrol Aracı | VixSEO',
    description:
      'Google\'ın indekslediği sayfalarınızı cache üzerinden kontrol edin. Eşleştirme sorunlarını tespit edin.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function CarbonEslestiricisiPage() {
  return <CarbonMatcherClient />
}
