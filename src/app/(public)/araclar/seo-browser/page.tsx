import type { Metadata } from 'next'

import { SeoBrowserClient } from '@/components/tools/seo-browser-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'SEO Browser — Web Sayfalarını Arama Motoru Gözüyle Görüntüleyin | VixSEO',
  description:
    'Web sayfalarını arama motorlarının gördüğü şekilde görüntüleyin. Rendered HTML, meta tag analizi, yapısal veri kontrolü ve daha fazlası. Yakında aktif olacak.',
  openGraph: {
    title: 'SEO Browser — Web Sayfalarını Arama Motoru Gözüyle Görüntüleyin | VixSEO',
    description:
      'Web sayfalarını arama motorlarının gördüğü şekilde görüntüleyin. Rendered HTML, meta tag analizi, yapısal veri kontrolü ve daha fazlası.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function SeoBrowserPage() {
  return <SeoBrowserClient />
}
