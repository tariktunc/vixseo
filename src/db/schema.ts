import { pgTable, uuid, text, varchar, integer, real, timestamp, boolean, jsonb, numeric } from 'drizzle-orm/pg-core'

// ── İşletmeler ──────────────────────────────────────────────
export const businesses = pgTable('businesses', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
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

// ── Sitemap Cache ───────────────────────────────────────────
export const sitemapEntries = pgTable('sitemap_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  url: text('url').notNull(),
  slug: varchar('slug', { length: 255 }),
  lastmod: varchar('lastmod', { length: 30 }),
  priority: real('priority'),
  section: varchar('section', { length: 100 }),
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

// ── Agent Tasks ─────────────────────────────────────────────
export const agentTasks = pgTable('agent_tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 20 }).notNull(), // blog_single | blog_batch
  input: jsonb('input').notNull(), // { topics: string[] }
  status: varchar('status', { length: 20 }).default('pending').notNull(),
  currentStep: varchar('current_step', { length: 50 }),
  iterationCount: integer('iteration_count').default(0).notNull(),
  maxIterations: integer('max_iterations').default(3).notNull(),
  output: text('output'),
  reviewNotes: text('review_notes'),
  totalInputTokens: integer('total_input_tokens').default(0).notNull(),
  totalOutputTokens: integer('total_output_tokens').default(0).notNull(),
  estimatedCostUsd: numeric('estimated_cost_usd', { precision: 10, scale: 6 }),
  createdAt: timestamp('created_at').defaultNow(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
})

// ── Agent Runs (her LLM çağrısı logu) ──────────────────────
export const agentRuns = pgTable('agent_runs', {
  id: uuid('id').defaultRandom().primaryKey(),
  taskId: uuid('task_id').references(() => agentTasks.id, { onDelete: 'cascade' }).notNull(),
  agentRole: varchar('agent_role', { length: 20 }).notNull(),
  stepIndex: integer('step_index').default(0).notNull(),
  systemPrompt: text('system_prompt'),
  userMessage: text('user_message'),
  assistantResponse: text('assistant_response'),
  inputTokens: integer('input_tokens').default(0).notNull(),
  outputTokens: integer('output_tokens').default(0).notNull(),
  status: varchar('status', { length: 20 }).default('success').notNull(),
  errorMessage: text('error_message'),
  durationMs: integer('duration_ms').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
