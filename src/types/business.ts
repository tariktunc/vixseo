import { z } from 'zod/v4'

export const businessSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  domain: z.string().min(1),
  siteId: z.string().min(1),
  memberId: z.string().optional(),
  language: z.string().default('tr'),
  searchConsoleUrl: z.string().optional(),
  coverGeneration: z.boolean().default(false),
  wixKeyConfigured: z.boolean().default(false),
  scKeyConfigured: z.boolean().default(false),
  adsKeyConfigured: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createBusinessSchema = z.object({
  name: z.string().min(1, 'İşletme adı zorunlu'),
  domain: z.string().min(1, 'Domain zorunlu'),
  siteId: z.string().min(1, 'Wix Site ID zorunlu'),
  memberId: z.string().optional(),
  language: z.string().optional().default('tr'),
  searchConsoleUrl: z.string().optional(),
})

export type Business = z.infer<typeof businessSchema>
export type CreateBusiness = z.infer<typeof createBusinessSchema>
