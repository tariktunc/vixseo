import type { Metadata } from 'next'

import { MfiCheckerClient } from '@/components/tools/mfi-checker-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Ucretsiz MFI Denetleyici — Mobile-First Indexing Kontrolu | VixSEO',
  description:
    'Web sitenizin Mobile-First Indexing uyumlulugunu ucretsiz denetleyin. Mobil ve masaustu versiyonlarinizi karsilastirin, MFI sorunlarini tespit edin.',
  openGraph: {
    title: 'Ucretsiz MFI Denetleyici | VixSEO',
    description:
      'Web sitenizin Mobile-First Indexing uyumlulugunu kontrol edin. Mobil ve masaustu karsilastirmasi ile MFI sorunlarini tespit edin.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function MfiDenetleyiciPage() {
  return <MfiCheckerClient />
}
