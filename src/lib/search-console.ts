import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

function getGoogleAuth() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!json) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env değişkeni bulunamadı')
  }
  const credentials = JSON.parse(json)
  return new google.auth.GoogleAuth({ credentials, scopes: SCOPES })
}

function getClient() {
  const auth = getGoogleAuth()
  return google.searchconsole({ version: 'v1', auth })
}

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

interface PerformanceOpts {
  startDate?: string
  endDate?: string
  dimensions?: string[]
  rowLimit?: number
  filter?: { page?: string }
}

interface PerformanceRow {
  page: string | null
  query: string | null
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export async function getPerformance(
  siteUrl: string,
  opts: PerformanceOpts = {}
): Promise<PerformanceRow[]> {
  const sc = getClient()
  const startDate = opts.startDate || daysAgo(90)
  const endDate = opts.endDate || daysAgo(1)
  const dims = opts.dimensions || ['page']
  const rowLimit = opts.rowLimit || 100

  const requestBody: Record<string, unknown> = {
    startDate,
    endDate,
    dimensions: dims,
    rowLimit,
    dataState: 'all',
  }

  if (opts.filter?.page) {
    requestBody.dimensionFilterGroups = [
      {
        filters: [
          { dimension: 'page', operator: 'contains', expression: opts.filter.page },
        ],
      },
    ]
  }

  const res = await sc.searchanalytics.query({ siteUrl, requestBody })

  return (res.data.rows || []).map((row) => ({
    page: dims.includes('page') ? row.keys![dims.indexOf('page')] : null,
    query: dims.includes('query') ? row.keys![dims.indexOf('query')] : null,
    clicks: row.clicks!,
    impressions: row.impressions!,
    ctr: parseFloat(((row.ctr || 0) * 100).toFixed(2)),
    position: parseFloat((row.position || 0).toFixed(1)),
  }))
}

export async function getTopPages(siteUrl: string, days = 90, limit = 50) {
  return getPerformance(siteUrl, {
    startDate: daysAgo(days),
    endDate: daysAgo(1),
    dimensions: ['page'],
    rowLimit: limit,
  })
}

export async function getTopQueries(siteUrl: string, days = 90, limit = 50) {
  return getPerformance(siteUrl, {
    startDate: daysAgo(days),
    endDate: daysAgo(1),
    dimensions: ['query'],
    rowLimit: limit,
  })
}

export async function getPageQueries(siteUrl: string, pageUrl: string, days = 90) {
  return getPerformance(siteUrl, {
    startDate: daysAgo(days),
    endDate: daysAgo(1),
    dimensions: ['page', 'query'],
    rowLimit: 200,
    filter: { page: pageUrl },
  })
}
