'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSlugCheck } from '@/hooks/use-sitemap'
import { Search, CheckCircle, XCircle, Loader2 } from 'lucide-react'

export function SlugChecker({ businessName }: { businessName: string }) {
  const [slug, setSlug] = useState('')
  const checkMutation = useSlugCheck(businessName)

  const handleCheck = () => {
    if (slug.trim()) {
      checkMutation.mutate(slug.trim())
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug kontrol et..."
          className="max-w-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleCheck}
          disabled={checkMutation.isPending || !slug.trim()}
        >
          {checkMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {checkMutation.data && (
        <div className="flex items-center gap-2 text-sm">
          {checkMutation.data.exists ? (
            <>
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-destructive">
                Slug mevcut: {checkMutation.data.url}
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-accent">Slug kullanılabilir</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
