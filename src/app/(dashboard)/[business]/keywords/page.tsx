'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from 'lucide-react'

export default function KeywordsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Anahtar Kelime Araştırma</h2>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Search className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">Google Ads API entegrasyonu ile anahtar kelime hacmi sorgulama</p>
          <p className="mt-1 text-xs text-muted-foreground">Faz 6&apos;da gelecek</p>
        </CardContent>
      </Card>
    </div>
  )
}
