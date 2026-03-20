'use client'

import { useParams } from 'next/navigation'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Map, Globe, HeartPulse } from 'lucide-react'
import { SitemapUrls } from '@/components/sitemap/sitemap-urls'
import { SitemapGscStatus } from '@/components/sitemap/sitemap-gsc-status'
import { SitemapHealth } from '@/components/sitemap/sitemap-health'

export default function SitemapPage() {
  const params = useParams()
  const business = params.business as string

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Sitemap Analiz</h2>

      <Tabs defaultValue="urls">
        <TabsList className="w-full overflow-x-auto" variant="line">
          <TabsTrigger value="urls">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Sitemap URL'leri</span>
            <span className="sm:hidden">URL'ler</span>
          </TabsTrigger>
          <TabsTrigger value="gsc">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">GSC Durumu</span>
            <span className="sm:hidden">GSC</span>
          </TabsTrigger>
          <TabsTrigger value="health">
            <HeartPulse className="h-4 w-4" />
            <span className="hidden sm:inline">Sağlık Raporu</span>
            <span className="sm:hidden">Sağlık</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="urls" className="mt-6">
          <SitemapUrls business={business} />
        </TabsContent>

        <TabsContent value="gsc" className="mt-6">
          <SitemapGscStatus business={business} />
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <SitemapHealth business={business} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
