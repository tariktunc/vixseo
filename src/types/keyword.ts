import { z } from 'zod'

export const keywordResultSchema = z.object({
  keyword: z.string(),
  avgMonthly: z.number().nullable(),
  competition: z.string().nullable(), // LOW, MEDIUM, HIGH
  searchedAt: z.string().optional(),
})

export type KeywordResult = z.infer<typeof keywordResultSchema>
