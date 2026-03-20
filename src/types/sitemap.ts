export type SitemapEntry = {
  id: string
  url: string
  slug: string | null
  lastmod: string | null
  priority: number | null
  section: string | null
  status: 'new' | 'changed' | 'removed' | 'unchanged'
  previousLastmod: string | null
  firstSeenAt: string | null
  fetchedAt: string | null
}

export type SitemapSnapshot = {
  id: string
  businessId: string
  totalUrls: number
  newUrls: number
  removedUrls: number
  changedUrls: number
  sections: Record<string, number>
  fetchedAt: string
}

export type SitemapHealthReport = {
  missingInSitemap: string[]
  orphanUrls: string[]
  staleUrls: SitemapEntry[]
  totalBlogPosts: number
  totalSitemapUrls: number
}

export type SitemapResponse = {
  urls: SitemapEntry[]
  total: number
  sections: Record<string, number>
  sitemapUrl: string
  fetchedAt: string
  snapshot: SitemapSnapshot | null
}

// ── GSC Sitemap Bilgisi ─────────────────────────────────────

export type GSCSitemapInfo = {
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
