import type { Metadata } from 'next'

import { KelimeSayaciClient } from '@/components/tools/kelime-sayaci-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Kelime Sayacı — Ücretsiz Online Kelime ve Karakter Sayma Aracı | VixSEO',
  description:
    'Metninizi yapıştırın, kelime, karakter, cümle ve paragraf sayısını anında öğrenin. Ücretsiz SEO kelime sayacı.',
  openGraph: {
    title: 'Kelime Sayacı — Ücretsiz Online Kelime ve Karakter Sayma Aracı | VixSEO',
    description:
      'Metninizi yapıştırın, kelime, karakter, cümle ve paragraf sayısını anında öğrenin. Ücretsiz SEO kelime sayacı.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function KelimeSayaciPage() {
  return <KelimeSayaciClient />
}
