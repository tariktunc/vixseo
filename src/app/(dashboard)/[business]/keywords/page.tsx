'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KeywordSearchForm } from '@/components/keywords/keyword-search-form'
import { KeywordResultsTable } from '@/components/keywords/keyword-results-table'
import { useKeywords, useKeywordSearch } from '@/hooks/use-keywords'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function KeywordsPage() {
  const params = useParams()
  const business = params.business as string
  const { data, isLoading } = useKeywords(business)
  const searchMutation = useKeywordSearch(business)
  const [searchResults, setSearchResults] = useState<
    Array<{ keyword: string; avgMonthly: number | null; competition: string | null }>
  >([])

  const handleSearch = async (keywords: string[]) => {
    try {
      const result = await searchMutation.mutateAsync(keywords)
      setSearchResults(result.results)
      toast.success(`${result.results.length} sonuç bulundu`)
    } catch {
      toast.error('Arama başarısız')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Anahtar Kelime Araştırma</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Keyword Ara</CardTitle>
        </CardHeader>
        <CardContent>
          <KeywordSearchForm onSearch={handleSearch} isPending={searchMutation.isPending} />
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Arama Sonuçları</CardTitle>
          </CardHeader>
          <CardContent>
            <KeywordResultsTable results={searchResults} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Geçmiş Aramalar</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-32" />
          ) : data?.keywords && data.keywords.length > 0 ? (
            <KeywordResultsTable
              results={data.keywords.map((k) => ({
                keyword: k.keyword,
                avgMonthly: k.avgMonthly,
                competition: k.competition,
              }))}
            />
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              Henüz arama yapılmadı
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
