export interface SCMetrics {
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface SCPage extends SCMetrics {
  url: string
}

export interface SCQuery extends SCMetrics {
  query: string
}

export interface SCOverview {
  totals: SCMetrics & { pages: number }
  period: { start: string; end: string }
  pages: SCPage[]
  queries: SCQuery[]
  fetchedAt: string
}

export interface KeywordResult {
  keyword: string
  avgMonthly: number | null
  competition: string | null
}
