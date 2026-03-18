'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'

interface KeywordSearchFormProps {
  onSearch: (keywords: string[]) => void
  isPending: boolean
}

export function KeywordSearchForm({ onSearch, isPending }: KeywordSearchFormProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const keywords = input
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)
    if (keywords.length > 0) {
      onSearch(keywords)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Anahtar kelimeler (virgülle ayır): web tasarım, seo, dijital pazarlama"
        className="flex-1"
      />
      <Button type="submit" disabled={isPending || !input.trim()}>
        {isPending ? (
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        ) : (
          <Search className="mr-1 h-4 w-4" />
        )}
        Ara
      </Button>
    </form>
  )
}
