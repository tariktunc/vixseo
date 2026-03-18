import { GoogleAdsApi } from 'google-ads-api'
import { db } from '@/lib/db'
import { keywordSearches } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

const COMPETITION_MAP: Record<number, string> = {
  0: 'UNKNOWN',
  1: 'LOW',
  2: 'MEDIUM',
  3: 'HIGH',
}

function getAdsClient() {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN

  if (!clientId || !clientSecret || !developerToken) {
    throw new Error('Google Ads API credentials eksik (CLIENT_ID, CLIENT_SECRET, DEVELOPER_TOKEN)')
  }

  return new GoogleAdsApi({ client_id: clientId, client_secret: clientSecret, developer_token: developerToken })
}

function getCustomer() {
  const client = getAdsClient()
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN

  if (!customerId || !refreshToken) {
    throw new Error('Google Ads CUSTOMER_ID veya REFRESH_TOKEN eksik')
  }

  return client.Customer({ customer_id: customerId, refresh_token: refreshToken })
}

export interface KeywordIdea {
  keyword: string
  avgMonthly: number | null
  competition: string | null
}

export async function searchKeywords(keywords: string[]): Promise<KeywordIdea[]> {
  const customer = getCustomer()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results: any = await customer.keywordPlanIdeas.generateKeywordIdeas({
    language: 'languageConstants/1011', // Türkçe
    geo_target_constants: ['geoTargetConstants/2792'], // Türkiye
    include_adult_keywords: false,
    keyword_seed: { keywords },
    page_size: 50,
  } as any)

  const items = Array.isArray(results) ? results : results?.results || []

  return items.map((r: Record<string, unknown>) => ({
    keyword: (r.text as string) || '',
    avgMonthly: (r.keyword_idea_metrics as Record<string, unknown>)?.avg_monthly_searches as number ?? null,
    competition: COMPETITION_MAP[(r.keyword_idea_metrics as Record<string, unknown>)?.competition as number] ?? null,
  }))
}

export async function searchAndCache(businessId: string, keywords: string[]): Promise<KeywordIdea[]> {
  const results = await searchKeywords(keywords)
  const now = new Date()

  if (results.length > 0) {
    await db.insert(keywordSearches).values(
      results.map((r) => ({
        businessId,
        keyword: r.keyword,
        avgMonthly: r.avgMonthly,
        competition: r.competition,
        searchedAt: now,
      }))
    )
  }

  return results
}

export async function getCachedKeywords(businessId: string) {
  return db
    .select()
    .from(keywordSearches)
    .where(eq(keywordSearches.businessId, businessId))
    .orderBy(desc(keywordSearches.searchedAt))
    .limit(200)
}
