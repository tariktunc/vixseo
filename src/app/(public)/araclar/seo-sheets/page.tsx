import type { Metadata } from 'next'

import { SeoSheetsClient } from '@/components/tools/seo-sheets-client'

// ---------------------------------------------------------------------------
// Metadata (server component)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'SEO Sheets — Google Sheets ile SEO Formulleri ve Sablonlari | VixSEO',
  description:
    'SEO calismalari icin hazir Google Sheets formulleri, indirilebilir sablonlar ve pratik ipuclari. Anahtar kelime arastirma, icerik takvimi, backlink takip sablonlari.',
  openGraph: {
    title: 'SEO Sheets — Google Sheets ile SEO Yonetimi | VixSEO',
    description:
      'SEO icin ozel Google Sheets formulleri ve sablonlari. Verilerinizi profesyonelce yonetin.',
  },
}

// ---------------------------------------------------------------------------
// Page (server component — renders client component)
// ---------------------------------------------------------------------------

export default function SeoSheetsPage() {
  return <SeoSheetsClient />
}
