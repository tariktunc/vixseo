import { z } from 'zod/v4'

export const createRedirectSchema = z.object({
  oldUrl: z.string().min(1, 'Eski URL zorunlu').startsWith('/', 'URL / ile başlamalı'),
  newUrl: z.string().min(1, 'Yeni URL zorunlu').startsWith('/', 'URL / ile başlamalı'),
  type: z.enum(['301', '302', '307']).default('301'),
  note: z.string().optional(),
})

export const updateRedirectSchema = z.object({
  id: z.string().uuid(),
  oldUrl: z.string().min(1).startsWith('/').optional(),
  newUrl: z.string().min(1).startsWith('/').optional(),
  type: z.enum(['301', '302', '307']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  note: z.string().optional(),
})

export const bulkImportSchema = z.array(
  z.object({
    oldUrl: z.string().min(1).startsWith('/'),
    newUrl: z.string().min(1).startsWith('/'),
    type: z.enum(['301', '302', '307']).default('301'),
    note: z.string().optional(),
  })
).min(1, 'En az 1 redirect gerekli')

export type CreateRedirect = z.infer<typeof createRedirectSchema>
export type UpdateRedirect = z.infer<typeof updateRedirectSchema>
export type BulkImportRedirects = z.infer<typeof bulkImportSchema>

export type Redirect = {
  id: string
  businessId: string
  oldUrl: string
  newUrl: string
  type: string
  status: string
  note: string | null
  createdAt: string
}
