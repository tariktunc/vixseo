import { pgTable, uuid, text, varchar, integer, real, timestamp, boolean, json } from 'drizzle-orm/pg-core'

// ── İşletmeler ──────────────────────────────────────────────
export const businesses = pgTable('businesses', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  domain: varchar('domain', { length: 255 }).notNull(),
  siteId: varchar('site_id', { length: 100 }).notNull(),
  memberId: varchar('member_id', { length: 100 }),
  language: varchar('language', { length: 5 }).default('tr'),
  searchConsoleUrl: varchar('sc_url', { length: 255 }),
  coverGeneration: boolean('cover_generation').default(false),
  wixKeyConfigured: boolean('wix_key_ok').default(false),
  scKeyConfigured: boolean('sc_key_ok').default(false),
  adsKeyConfigured: boolean('ads_key_ok').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// ── SC Sayfa Performansı Cache ──────────────────────────────
export const scPages = pgTable('sc_pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  url: text('url').notNull(),
  clicks: integer('clicks').default(0),
  impressions: integer('impressions').default(0),
  ctr: real('ctr').default(0),
  position: real('position').default(0),
  periodStart: varchar('period_start', { length: 10 }),
  periodEnd: varchar('period_end', { length: 10 }),
  fetchedAt: timestamp('fetched_at').defaultNow(),
})

// ── SC Sorgu Performansı Cache ──────────────────────────────
export const scQueries = pgTable('sc_queries', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  query: text('query').notNull(),
  clicks: integer('clicks').default(0),
  impressions: integer('impressions').default(0),
  ctr: real('ctr').default(0),
  position: real('position').default(0),
  periodStart: varchar('period_start', { length: 10 }),
  periodEnd: varchar('period_end', { length: 10 }),
  fetchedAt: timestamp('fetched_at').defaultNow(),
})

// ── SC Günlük Metrikler Cache ────────────────────────────────
export const scDailyMetrics = pgTable('sc_daily_metrics', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  date: varchar('date', { length: 10 }).notNull(),
  clicks: integer('clicks').default(0),
  impressions: integer('impressions').default(0),
  ctr: real('ctr').default(0),
  position: real('position').default(0),
  searchType: varchar('search_type', { length: 20 }).default('web'),
  periodStart: varchar('period_start', { length: 10 }),
  periodEnd: varchar('period_end', { length: 10 }),
  fetchedAt: timestamp('fetched_at').defaultNow(),
})

// ── SC Cihaz Kırılımı Cache ─────────────────────────────────
export const scDevices = pgTable('sc_devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  device: varchar('device', { length: 20 }).notNull(),
  clicks: integer('clicks').default(0),
  impressions: integer('impressions').default(0),
  ctr: real('ctr').default(0),
  position: real('position').default(0),
  periodStart: varchar('period_start', { length: 10 }),
  periodEnd: varchar('period_end', { length: 10 }),
  fetchedAt: timestamp('fetched_at').defaultNow(),
})

// ── SC Ülke Kırılımı Cache ──────────────────────────────────
export const scCountries = pgTable('sc_countries', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  country: varchar('country', { length: 10 }).notNull(),
  clicks: integer('clicks').default(0),
  impressions: integer('impressions').default(0),
  ctr: real('ctr').default(0),
  position: real('position').default(0),
  periodStart: varchar('period_start', { length: 10 }),
  periodEnd: varchar('period_end', { length: 10 }),
  fetchedAt: timestamp('fetched_at').defaultNow(),
})

// ── SC Arama Türü Kırılımı Cache ────────────────────────────
export const scSearchTypes = pgTable('sc_search_types', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  searchType: varchar('search_type', { length: 20 }).notNull(),
  clicks: integer('clicks').default(0),
  impressions: integer('impressions').default(0),
  ctr: real('ctr').default(0),
  position: real('position').default(0),
  periodStart: varchar('period_start', { length: 10 }),
  periodEnd: varchar('period_end', { length: 10 }),
  fetchedAt: timestamp('fetched_at').defaultNow(),
})

// ── Sitemap Cache ───────────────────────────────────────────
export const sitemapEntries = pgTable('sitemap_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  url: text('url').notNull(),
  slug: varchar('slug', { length: 255 }),
  lastmod: varchar('lastmod', { length: 30 }),
  priority: real('priority'),
  section: varchar('section', { length: 100 }),
  status: varchar('status', { length: 20 }).default('unchanged'),
  previousLastmod: varchar('previous_lastmod', { length: 30 }),
  firstSeenAt: timestamp('first_seen_at').defaultNow(),
  fetchedAt: timestamp('fetched_at').defaultNow(),
})

// ── Sitemap Snapshot'ları ───────────────────────────────────
export const sitemapSnapshots = pgTable('sitemap_snapshots', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  totalUrls: integer('total_urls').default(0),
  newUrls: integer('new_urls').default(0),
  removedUrls: integer('removed_urls').default(0),
  changedUrls: integer('changed_urls').default(0),
  sections: json('sections').$type<Record<string, number>>(),
  fetchedAt: timestamp('fetched_at').defaultNow(),
})

// ── Redirects ───────────────────────────────────────────────
export const redirects = pgTable('redirects', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  oldUrl: text('old_url').notNull(),
  newUrl: text('new_url').notNull(),
  type: varchar('type', { length: 50 }).default('301'),
  status: varchar('status', { length: 20 }).default('active'),
  note: text('note'),
  createdAt: timestamp('created_at').defaultNow(),
})

// ── Keyword Araştırma Geçmişi ───────────────────────────────
export const keywordSearches = pgTable('keyword_searches', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  keyword: varchar('keyword', { length: 255 }).notNull(),
  avgMonthly: integer('avg_monthly'),
  competition: varchar('competition', { length: 20 }),
  searchedAt: timestamp('searched_at').defaultNow(),
})

// ── Audit Sonuçları ─────────────────────────────────────────
export const auditResults = pgTable('audit_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  postSlug: varchar('post_slug', { length: 255 }),
  wixId: varchar('wix_id', { length: 100 }),
  field: varchar('field', { length: 50 }),
  severity: varchar('severity', { length: 20 }),
  detail: text('detail'),
  auditedAt: timestamp('audited_at').defaultNow(),
})
