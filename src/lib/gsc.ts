import { google } from 'googleapis'

import type { SCAnalyticsParams, GSCFilter } from '@/types/analytics'
import type { GSCSitemapInfo } from '@/types/sitemap'
import { GSC_DELAY_DAYS } from '@/lib/constants'

// ── Credentials ─────────────────────────────────────────────

type GSCCredentials = {
  client_email: string
  private_key: string
}

export function getGSCCredentials(): GSCCredentials {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  try {
    if (!serviceAccountJson) throw new Error('JSON yok')
    return JSON.parse(serviceAccountJson)
  } catch {
    const clientEmail = process.env.GOOGLE_SC_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_SC_PRIVATE_KEY?.split('\\n').join('\n')
    if (!clientEmail || !privateKey) {
      throw new Error('Google servis hesabi yapilandirmamis')
    }
    return { client_email: clientEmail, private_key: privateKey }
  }
}

// ── Client Factory ──────────────────────────────────────────

type GSCScope = 'readonly' | 'full'

const SCOPE_MAP: Record<GSCScope, string> = {
  readonly: 'https://www.googleapis.com/auth/webmasters.readonly',
  full: 'https://www.googleapis.com/auth/webmasters',
}

export function createGSCClient(scope: GSCScope = 'readonly') {
  const credentials = getGSCCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [SCOPE_MAP[scope]],
  })
  return google.searchconsole({ version: 'v1', auth })
}

// ── Helper: Default Dates ───────────────────────────────────

function getDefaultDates(params?: SCAnalyticsParams) {
  const endDate = new Date()
  endDate.setDate(endDate.getDate() - GSC_DELAY_DAYS)

  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 27)

  return {
    startDate: params?.startDate || startDate.toISOString().split('T')[0],
    endDate: params?.endDate || endDate.toISOString().split('T')[0],
    searchType: params?.searchType || 'web',
    rowLimit: params?.rowLimit || 500,
  }
}

// ── Search Analytics Query ──────────────────────────────────

type DimensionFilterGroup = {
  groupType?: 'and'
  filters: GSCFilter[]
}

type QueryParams = {
  siteUrl: string
  startDate: string
  endDate: string
  dimensions: string[]
  searchType?: string
  rowLimit?: number
  dimensionFilterGroups?: DimensionFilterGroup[]
}

export async function queryGSC(params: QueryParams) {
  const client = createGSCClient()

  const requestBody: Record<string, unknown> = {
    startDate: params.startDate,
    endDate: params.endDate,
    dimensions: params.dimensions,
    rowLimit: params.rowLimit || 500,
  }

  if (params.searchType && params.searchType !== 'web') {
    requestBody.type = params.searchType
  }

  if (params.dimensionFilterGroups && params.dimensionFilterGroups.length > 0) {
    requestBody.dimensionFilterGroups = params.dimensionFilterGroups
  }

  const res = await client.searchanalytics.query({
    siteUrl: params.siteUrl,
    requestBody,
  })

  return res.data.rows || []
}

// ── Fetch All Dimensions ────────────────────────────────────

export async function fetchAllDimensions(
  siteUrl: string,
  params?: SCAnalyticsParams
) {
  const { startDate, endDate, searchType, rowLimit } = getDefaultDates(params)

  const base = { siteUrl, startDate, endDate, searchType, rowLimit }

  const [pages, queries, dates, devices, countries] = await Promise.all([
    queryGSC({ ...base, dimensions: ['page'] }),
    queryGSC({ ...base, dimensions: ['query'] }),
    queryGSC({ ...base, dimensions: ['date'], rowLimit: 1000 }),
    queryGSC({ ...base, dimensions: ['device'] }),
    queryGSC({ ...base, dimensions: ['country'] }),
  ])

  // searchType ayrı sorgularla: her tip için toplam metrik çek
  const searchTypeNames = ['web', 'image', 'video', 'news', 'discover', 'googleNews'] as const
  const searchTypeResults = await Promise.all(
    searchTypeNames.map(async (type) => {
      try {
        const rows = await queryGSC({
          siteUrl,
          startDate,
          endDate,
          dimensions: ['date'],
          searchType: type,
          rowLimit: 1,
        })
        if (rows.length === 0) return null
        // Toplam metrikleri hesapla
        const allRows = await queryGSC({
          siteUrl,
          startDate,
          endDate,
          dimensions: ['date'],
          searchType: type,
          rowLimit: 1000,
        })
        const totals = allRows.reduce(
          (acc, r) => ({
            clicks: (acc.clicks || 0) + Math.round(r.clicks || 0),
            impressions: (acc.impressions || 0) + Math.round(r.impressions || 0),
            ctr: 0,
            position: 0,
          }),
          { clicks: 0, impressions: 0, ctr: 0, position: 0 }
        )
        if (allRows.length > 0) {
          totals.ctr = allRows.reduce((s, r) => s + (r.ctr || 0), 0) / allRows.length
          totals.position = allRows.reduce((s, r) => s + (r.position || 0), 0) / allRows.length
        }
        return { searchType: type, ...totals }
      } catch {
        return null
      }
    })
  )

  return {
    pages: pages.map((r) => ({
      url: r.keys?.[0] || '',
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: r.ctr || 0,
      position: r.position || 0,
    })),
    queries: queries.map((r) => ({
      query: r.keys?.[0] || '',
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: r.ctr || 0,
      position: r.position || 0,
    })),
    dates: dates.map((r) => ({
      date: r.keys?.[0] || '',
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: r.ctr || 0,
      position: r.position || 0,
    })),
    devices: devices.map((r) => ({
      device: r.keys?.[0] || '',
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: r.ctr || 0,
      position: r.position || 0,
    })),
    countries: countries.map((r) => ({
      country: r.keys?.[0] || '',
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: r.ctr || 0,
      position: r.position || 0,
    })),
    searchTypes: searchTypeResults.filter((r) => r !== null),
    period: { start: startDate, end: endDate },
    searchType,
  }
}

// ── Page + Query Combined Query ─────────────────────────────

type PageQueryParams = {
  startDate?: string
  endDate?: string
  searchType?: string
  rowLimit?: number
  pageFilter?: string
}

export async function queryPageQueries(
  siteUrl: string,
  params?: PageQueryParams
) {
  const defaults = getDefaultDates(params)

  const dimensionFilterGroups: DimensionFilterGroup[] = []

  if (params?.pageFilter) {
    dimensionFilterGroups.push({
      groupType: 'and',
      filters: [
        {
          dimension: 'page',
          operator: 'contains',
          expression: params.pageFilter,
        },
      ],
    })
  }

  const rows = await queryGSC({
    siteUrl,
    startDate: defaults.startDate,
    endDate: defaults.endDate,
    searchType: defaults.searchType,
    rowLimit: defaults.rowLimit,
    dimensions: ['page', 'query'],
    dimensionFilterGroups: dimensionFilterGroups.length > 0 ? dimensionFilterGroups : undefined,
  })

  return {
    rows: rows.map((r) => ({
      page: r.keys?.[0] || '',
      query: r.keys?.[1] || '',
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: r.ctr || 0,
      position: r.position || 0,
    })),
    period: { start: defaults.startDate, end: defaults.endDate },
  }
}

// ── Sitemaps API ────────────────────────────────────────────

export async function listSitemaps(siteUrl: string): Promise<GSCSitemapInfo[]> {
  const client = createGSCClient()
  const res = await client.sitemaps.list({ siteUrl })

  if (!res.data.sitemap) return []

  return res.data.sitemap.map((s) => ({
    path: s.path || '',
    lastSubmitted: s.lastSubmitted || null,
    isPending: s.isPending || false,
    isSitemapsIndex: s.isSitemapsIndex || false,
    lastDownloaded: s.lastDownloaded || null,
    warnings: Number(s.warnings) || 0,
    errors: Number(s.errors) || 0,
    contents: s.contents?.map((c) => ({
      type: c.type || '',
      submitted: Number(c.submitted) || 0,
      indexed: Number(c.indexed) || 0,
    })) || [],
  }))
}

export async function submitSitemap(siteUrl: string, feedpath: string): Promise<void> {
  const client = createGSCClient()
  await client.sitemaps.submit({ siteUrl, feedpath })
}

export async function deleteSitemap(siteUrl: string, feedpath: string): Promise<void> {
  const client = createGSCClient()
  await client.sitemaps.delete({ siteUrl, feedpath })
}

// ── URL Inspection API ──────────────────────────────────────
// URL Inspection API requires full `webmasters` scope (readonly is not enough)

type URLInspectionResult = {
  inspectionResult: {
    indexStatusResult?: {
      verdict?: string
      coverageState?: string
      robotsTxtState?: string
      indexingState?: string
      lastCrawlTime?: string
      pageFetchState?: string
      googleCanonical?: string
      userCanonical?: string
      referringUrls?: string[]
      crawledAs?: string
    }
    mobileUsabilityResult?: {
      verdict?: string
      issues?: Array<{ issueType?: string; severity?: string; message?: string }>
    }
    richResultsResult?: {
      verdict?: string
      detectedItems?: Array<{
        richResultType?: string
        items?: Array<{ name?: string; issues?: Array<{ issueMessage?: string; severity?: string }> }>
      }>
    }
    ampResult?: {
      verdict?: string
      ampUrl?: string
      ampIndexStatusVerdict?: string
      issues?: Array<{ issueMessage?: string; severity?: string }>
    }
  } | null
}

export async function inspectUrl(
  siteUrl: string,
  inspectionUrl: string
): Promise<URLInspectionResult> {
  const client = createGSCClient('full')
  const res = await client.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl,
      siteUrl,
    },
  })

  return {
    inspectionResult: res.data.inspectionResult
      ? {
          indexStatusResult: res.data.inspectionResult.indexStatusResult
            ? {
                verdict: res.data.inspectionResult.indexStatusResult.verdict ?? undefined,
                coverageState: res.data.inspectionResult.indexStatusResult.coverageState ?? undefined,
                robotsTxtState: res.data.inspectionResult.indexStatusResult.robotsTxtState ?? undefined,
                indexingState: res.data.inspectionResult.indexStatusResult.indexingState ?? undefined,
                lastCrawlTime: res.data.inspectionResult.indexStatusResult.lastCrawlTime ?? undefined,
                pageFetchState: res.data.inspectionResult.indexStatusResult.pageFetchState ?? undefined,
                googleCanonical: res.data.inspectionResult.indexStatusResult.googleCanonical ?? undefined,
                userCanonical: res.data.inspectionResult.indexStatusResult.userCanonical ?? undefined,
                referringUrls: res.data.inspectionResult.indexStatusResult.referringUrls ?? undefined,
                crawledAs: res.data.inspectionResult.indexStatusResult.crawledAs ?? undefined,
              }
            : undefined,
          mobileUsabilityResult: res.data.inspectionResult.mobileUsabilityResult
            ? {
                verdict: res.data.inspectionResult.mobileUsabilityResult.verdict ?? undefined,
                issues: res.data.inspectionResult.mobileUsabilityResult.issues?.map((i) => ({
                  issueType: i.issueType ?? undefined,
                  severity: i.severity ?? undefined,
                  message: i.message ?? undefined,
                })) ?? undefined,
              }
            : undefined,
          richResultsResult: res.data.inspectionResult.richResultsResult
            ? {
                verdict: res.data.inspectionResult.richResultsResult.verdict ?? undefined,
                detectedItems: res.data.inspectionResult.richResultsResult.detectedItems?.map((d) => ({
                  richResultType: d.richResultType ?? undefined,
                  items: d.items?.map((item) => ({
                    name: item.name ?? undefined,
                    issues: item.issues?.map((issue) => ({
                      issueMessage: issue.issueMessage ?? undefined,
                      severity: issue.severity ?? undefined,
                    })) ?? undefined,
                  })) ?? undefined,
                })) ?? undefined,
              }
            : undefined,
          ampResult: res.data.inspectionResult.ampResult
            ? {
                verdict: res.data.inspectionResult.ampResult.verdict ?? undefined,
                ampUrl: res.data.inspectionResult.ampResult.ampUrl ?? undefined,
                ampIndexStatusVerdict: res.data.inspectionResult.ampResult.ampIndexStatusVerdict ?? undefined,
                issues: res.data.inspectionResult.ampResult.issues?.map((i) => ({
                  issueMessage: i.issueMessage ?? undefined,
                  severity: i.severity ?? undefined,
                })) ?? undefined,
              }
            : undefined,
        }
      : null,
  }
}

// ── Sites API ───────────────────────────────────────────────

type GSCSiteEntry = {
  siteUrl: string
  permissionLevel: string
}

export async function listSites(): Promise<GSCSiteEntry[]> {
  const client = createGSCClient()
  const res = await client.sites.list()

  if (!res.data.siteEntry) return []

  return res.data.siteEntry.map((s) => ({
    siteUrl: s.siteUrl || '',
    permissionLevel: s.permissionLevel || '',
  }))
}
