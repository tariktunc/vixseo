import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ücretsiz SEO Araçları | VixSEO',
  description:
    'Kelime sayacı, SEO analiz ve sıra bulucu gibi ücretsiz SEO araçlarıyla web sitenizi optimize edin. Hesap açmadan, hemen kullanmaya başlayın.',
  openGraph: {
    title: 'Ücretsiz SEO Araçları | VixSEO',
    description:
      'Kelime sayacı, SEO analiz ve sıra bulucu gibi ücretsiz SEO araçlarıyla web sitenizi optimize edin.',
    type: 'website',
  },
}

export default function AraclarLayout({ children }: { children: React.ReactNode }) {
  return children
}
