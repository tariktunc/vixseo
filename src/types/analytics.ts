export type SCMetrics = {
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export type SCPage = SCMetrics & {
  url: string
}

export type SCQuery = SCMetrics & {
  query: string
}

export type SCDatePoint = SCMetrics & {
  date: string
}

export type SCDeviceBreakdown = SCMetrics & {
  device: 'DESKTOP' | 'MOBILE' | 'TABLET'
}

export type SCCountryBreakdown = SCMetrics & {
  country: string
}

export type SCSearchTypeBreakdown = SCMetrics & {
  searchType: 'web' | 'image' | 'video' | 'news'
}

export type SCFullAnalytics = {
  totals: SCMetrics & { pages: number }
  period: { start: string; end: string }
  pages: SCPage[]
  queries: SCQuery[]
  dailyTrend: SCDatePoint[]
  devices: SCDeviceBreakdown[]
  countries: SCCountryBreakdown[]
  searchTypes: SCSearchTypeBreakdown[]
  fetchedAt: string
  isStale: boolean
}

export type SCAnalyticsParams = {
  startDate?: string
  endDate?: string
  searchType?: string
  rowLimit?: number
}

export type SCFilterGroup = {
  dimension: string
  operator: string
  expression: string
}

// ── GSC Filter (spesifik operatorler) ───────────────────────

export type GSCFilter = {
  dimension: 'query' | 'page' | 'country' | 'device' | 'searchAppearance'
  operator: 'contains' | 'equals' | 'notContains' | 'notEquals' | 'includingRegex' | 'excludingRegex'
  expression: string
}

// ── GSC Sitemap ─────────────────────────────────────────────

export type GSCSitemap = {
  path: string
  lastSubmitted: string | null
  isPending: boolean
  isSitemapsIndex: boolean
  lastDownloaded: string | null
  warnings: number
  errors: number
  contents: Array<{
    type: string
    submitted: number
    indexed: number
  }>
}

// ── GSC URL Inspection ──────────────────────────────────────

export type GSCUrlInspection = {
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
        items?: Array<{
          name?: string
          issues?: Array<{ issueMessage?: string; severity?: string }>
        }>
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

// ── GSC Site ────────────────────────────────────────────────

export type GSCSite = {
  siteUrl: string
  permissionLevel: string
}

// ── Page + Query Combined ───────────────────────────────────

export type SCPageQuery = SCMetrics & {
  page: string
  query: string
}

// ── Eski uyumluluk ──────────────────────────────────────────

export type SCOverview = SCFullAnalytics

export type KeywordResult = {
  keyword: string
  avgMonthly: number | null
  competition: string | null
}
