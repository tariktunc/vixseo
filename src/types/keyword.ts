import { z } from 'zod'

export const scKeywordSchema = z.object({
  query: z.string(),
  clicks: z.number().nullable(),
  impressions: z.number().nullable(),
  ctr: z.number().nullable(),
  position: z.number().nullable(),
  fetchedAt: z.string().optional(),
})

export type SCKeyword = z.infer<typeof scKeywordSchema>

export const keywordResultSchema = z.object({
  keyword: z.string(),
  avgMonthly: z.number().nullable(),
  competition: z.string().nullable(), // LOW, MEDIUM, HIGH
  searchedAt: z.string().optional(),
})

export type KeywordResult = z.infer<typeof keywordResultSchema>

export type KeywordsResponse = {
  keywords: SCKeyword[]
  adKeywords: KeywordResult[]
  total: number
  hasScData: boolean
}
