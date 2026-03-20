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

// ── CMS Data Collections ──────────────────────────────────

type WixCollection = {
  id: string
  displayName: string
  collectionType: string
}

type WixDataItem = {
  id: string
  data: Record<string, unknown>
}

export async function queryCollections(businessName: string): Promise<WixCollection[]> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ collections: WixCollection[] }>(
    'GET',
    '/wix-data/v2/collections',
  )

  if (res.status !== 200) throw new Error(`Collections query failed (${res.status})`)

  // Blog ve sistem koleksiyonlarını filtrele, sadece NATIVE olanları göster
  return (res.data.collections || []).filter(
    (c) => c.collectionType === 'NATIVE'
  )
}

export async function queryCollectionItems(
  businessName: string,
  collectionId: string,
  limit = 50
): Promise<{ items: WixDataItem[]; total: number }> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ dataItems: Array<{ id: string; data: Record<string, unknown> }>; totalCount?: number }>(
    'POST',
    '/wix-data/v2/items/query',
    {
      dataCollectionId: collectionId,
      query: { paging: { limit } },
    }
  )

  if (res.status !== 200) throw new Error(`Items query failed (${res.status})`)

  const items = (res.data.dataItems || []).map((item) => ({
    id: item.id,
    data: item.data || {},
  }))

  return { items, total: res.data.totalCount ?? items.length }
}

// ── CMS CRUD ──────────────────────────────────────────────

export async function createCollectionItem(
  businessName: string,
  collectionId: string,
  data: Record<string, unknown>
): Promise<WixDataItem> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ dataItem: { id: string; data: Record<string, unknown> } }>(
    'POST',
    '/wix-data/v2/items',
    {
      dataCollectionId: collectionId,
      dataItem: { data },
    }
  )

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`Öğe oluşturulamadı (${res.status})`)
  }

  return {
    id: res.data.dataItem.id,
    data: res.data.dataItem.data || {},
  }
}

export async function updateCollectionItem(
  businessName: string,
  collectionId: string,
  itemId: string,
  data: Record<string, unknown>
): Promise<WixDataItem> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<{ dataItem: { id: string; data: Record<string, unknown> } }>(
    'PUT',
    `/wix-data/v2/items/${itemId}`,
    {
      dataCollectionId: collectionId,
      dataItem: { data },
    }
  )

  if (res.status !== 200) {
    throw new Error(`Öğe güncellenemedi (${res.status})`)
  }

  return {
    id: res.data.dataItem.id,
    data: res.data.dataItem.data || {},
  }
}

export async function deleteCollectionItem(
  businessName: string,
  collectionId: string,
  itemId: string
): Promise<void> {
  const siteId = getSiteId(businessName)
  const wix = createWixClient(siteId)

  const res = await wix<unknown>(
    'DELETE',
    `/wix-data/v2/items/${itemId}?dataCollectionId=${encodeURIComponent(collectionId)}`
  )

  if (res.status !== 200 && res.status !== 204) {
    throw new Error(`Öğe silinemedi (${res.status})`)
  }
}
