import type { Metadata } from 'next'

import { SiraBulucuClient } from '@/components/tools/sira-bulucu-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Sıra Bulucu — Google Anahtar Kelime Sıralama Aracı | VixSEO',
  description:
    'Google arama sonuçlarında anahtar kelime sıralamanızı öğrenin. Rakip analizi yapın, masaüstü ve mobil sıralamaları karşılaştırın. Yakında aktif olacak.',
  openGraph: {
    title: 'Sıra Bulucu — Google Anahtar Kelime Sıralama Aracı | VixSEO',
    description:
      'Google arama sonuçlarında anahtar kelime sıralamanızı öğrenin. Rakip analizi yapın, masaüstü ve mobil sıralamaları karşılaştırın.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function SiraBulucuPage() {
  return <SiraBulucuClient />
}
