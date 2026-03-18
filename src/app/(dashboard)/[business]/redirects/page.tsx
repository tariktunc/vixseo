'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftRight } from 'lucide-react'

export default function RedirectsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Redirect Yönetimi</h2>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <ArrowLeftRight className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">301 redirect ekleme, doğrulama ve yönetim</p>
          <p className="mt-1 text-xs text-muted-foreground">Faz 7&apos;de gelecek</p>
        </CardContent>
      </Card>
    </div>
  )
}
