import { WIX_API_BASE } from './constants'

interface WixResponse<T = unknown> {
  status: number
  data: T
}

export function createWixClient(siteId: string, apiKey?: string) {
  const key = apiKey || process.env.WIX_API_KEY

  if (!key) {
    throw new Error('WIX_API_KEY bulunamadı')
  }

  return async function wixFetch<T = unknown>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<WixResponse<T>> {
    const res = await fetch(`${WIX_API_BASE}${path}`, {
      method,
      headers: {
        Authorization: key,
        'wix-site-id': siteId,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await res.json()
    return { status: res.status, data: data as T }
  }
}

export function getSiteId(businessName: string): string {
  const envKey = `WIX_SITE_ID_${businessName.toUpperCase()}`
  const siteId = process.env[envKey]
  if (!siteId) {
    throw new Error(`${envKey} env değişkeni bulunamadı`)
  }
  return siteId
}
