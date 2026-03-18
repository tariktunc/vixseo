#!/usr/bin/env node
'use strict';

/**
 * fix-en-categories.js — blakfy İngilizce yazılara kategori ve tag ata
 *
 * Akış (yayınlı yazı güncelleme):
 *   1. buildDraftMap → slug→draft map kur
 *   2. PATCH draft categoryIds + tagIds (fieldMask)
 *   3. publish → yeniden yayınla
 *
 * Kullanım:
 *   node sites/blakfy/scripts/fix-en-categories.js --dry-run   (önizle)
 *   node sites/blakfy/scripts/fix-en-categories.js             (uygula)
 */

const fs   = require('fs');
const path = require('path');
const { createClient } = require('../../../core/wix');

const SITE_DIR = path.join(__dirname, '..');
const config   = JSON.parse(fs.readFileSync(path.join(SITE_DIR, 'config.json'), 'utf8'));

const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'));
const tags       = JSON.parse(fs.readFileSync(path.join(__dirname, 'tags.json'), 'utf8'));

const dryRun = process.argv.includes('--dry-run');

// ─── Yazı → kategori + tag slug eşlemesi ─────────────────────────────────────

const ASSIGNMENTS = [
  {
    slug: 'the-most-effective-way-to-attract-new-patients-to-medical-clinics-with-google-ads-in-2025',
    categorySlugs: ['google-ads', 'dijital-pazarlama'],
    tagSlugs:      ['google-ads', 'dijital-pazarlama'],
  },
  {
    slug: 'rtt-and-site-speed-seo-performance-with-core-web-vitals',
    categorySlugs: ['teknik-seo', 'seo'],
    tagSlugs:      ['core-web-vitals', 'sayfa-hizi', 'seo'],
  },
  {
    slug: 'what-is-blakfy-the-right-brand-for-seo-and-digital-marketing',
    categorySlugs: ['dijital-pazarlama', 'seo'],
    tagSlugs:      ['dijital-pazarlama', 'seo'],
  },
  {
    slug: 'blakfy-or-blakify-which-brand-right',
    categorySlugs: ['dijital-pazarlama'],
    tagSlugs:      ['dijital-pazarlama'],
  },
  {
    slug: 'breadcrumb-seo-navigation-content-hierarchy',
    categorySlugs: ['teknik-seo', 'seo'],
    tagSlugs:      ['seo'],
  },
  {
    slug: 'wix-seo-and-geo-strategies-a-complete-guide-to-local-and-global-optimization',
    categorySlugs: ['wix', 'yerel-seo', 'seo'],
    tagSlugs:      ['wix', 'yerel-seo', 'google-business-profile'],
  },
  {
    slug: '2025-web-design-prices-what-depends-on-what',
    categorySlugs: ['web-tasarim', 'dijital-pazarlama'],
    tagSlugs:      ['web-tasarim', 'dijital-pazarlama'],
  },
];

// ─── slug → ID çözücüler ──────────────────────────────────────────────────────

function resolveCategoryIds(slugs) {
  return slugs.map(slug => {
    const entry = categories[slug];
    if (!entry) throw new Error(`Kategori bulunamadı: ${slug}`);
    return entry.id;
  });
}

function resolveTagIds(slugs) {
  return slugs.map(slug => {
    const entry = tags[slug];
    if (!entry) throw new Error(`Tag bulunamadı: ${slug}`);
    return entry.id;
  });
}

// ─── normalize slug ───────────────────────────────────────────────────────────

function normalizeSlug(str) {
  return (str || '').toLowerCase()
    .replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// ─── Tüm published draft'ları çek → slug→draft map ───────────────────────────

async function buildDraftMap(wix) {
  const all = [];
  let offset = 0;
  while (true) {
    const r = await wix('POST', '/blog/v3/draft-posts/query', {
      query: { filter: { status: { '$in': ['PUBLISHED'] } }, paging: { limit: 50, offset } }
    });
    if (r.status !== 200) throw new Error(`draft query failed (${r.status}): ${JSON.stringify(r.data)}`);
    const drafts = r.data.draftPosts || [];
    all.push(...drafts);
    if (drafts.length < 50) break;
    offset += drafts.length;
    await delay(300);
  }

  const map = {};
  for (const d of all) {
    if (d.seoSlug) {
      map[d.seoSlug] = d;
      map[normalizeSlug(d.seoSlug)] = d;
    }
  }
  return map;
}

// ─── PATCH categoryIds + tagIds ───────────────────────────────────────────────

async function patchCategories(wix, draftId, categoryIds, tagIds) {
  const res = await wix('PATCH', `/blog/v3/draft-posts/${draftId}`, {
    draftPost: { categoryIds, tagIds },
    fieldMask: { paths: ['categoryIds', 'tagIds'] }
  });
  if (res.status !== 200) {
    throw new Error(`PATCH failed (${res.status}): ${JSON.stringify(res.data)}`);
  }
  return res.data.draftPost;
}

async function publishDraft(wix, draftId) {
  const res = await wix('POST', `/blog/v3/draft-posts/${draftId}/publish`, {});
  if (res.status !== 200) {
    throw new Error(`publish failed (${res.status}): ${JSON.stringify(res.data)}`);
  }
  return res.data.post;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Ana akış ─────────────────────────────────────────────────────────────────

async function main() {
  // ID'leri çöz (script başında hataları yakala)
  const resolved = ASSIGNMENTS.map(a => ({
    ...a,
    categoryIds: resolveCategoryIds(a.categorySlugs),
    tagIds:      resolveTagIds(a.tagSlugs),
  }));

  // Önizleme tablosu
  console.log(`\n${dryRun ? '[DRY-RUN] ' : ''}İngilizce yazılara kategori/tag atanacak: ${resolved.length} yazı\n`);
  console.log('  Slug'.padEnd(55) + 'Kategoriler'.padEnd(40) + 'Tag\'ler');
  console.log('  ' + '─'.repeat(120));
  resolved.forEach(a => {
    console.log(
      `  ${a.slug.slice(0, 52).padEnd(55)}` +
      `${a.categorySlugs.join(', ').padEnd(40)}` +
      a.tagSlugs.join(', ')
    );
  });

  if (dryRun) {
    console.log(`\n[DRY-RUN] Uygulamak için: node sites/blakfy/scripts/fix-en-categories.js\n`);
    return;
  }

  console.log('\nUygulanıyor...\n');

  const wix = createClient(config.siteId);
  const results = { ok: 0, fail: 0, errors: [] };

  process.stdout.write('  Draft listesi çekiliyor...');
  const draftMap = await buildDraftMap(wix);
  console.log(' ✓\n');

  for (const assignment of resolved) {
    process.stdout.write(`  [${String(results.ok + results.fail + 1).padStart(2)}/${resolved.length}] ${assignment.slug.slice(0, 50)}... `);

    try {
      const draft = draftMap[assignment.slug] || draftMap[normalizeSlug(assignment.slug)];
      if (!draft) throw new Error(`Draft bulunamadı (slug: ${assignment.slug})`);

      await patchCategories(wix, draft.id, assignment.categoryIds, assignment.tagIds);
      await publishDraft(wix, draft.id);

      console.log(`✅ cat:[${assignment.categorySlugs.join(',')}] tag:[${assignment.tagSlugs.join(',')}]`);
      results.ok++;
      await delay(600);
    } catch (err) {
      console.log(`❌ ${err.message.slice(0, 80)}`);
      results.fail++;
      results.errors.push({ slug: assignment.slug, error: err.message });
      await delay(300);
    }
  }

  console.log(`\n─── Sonuç ───`);
  console.log(`  Başarılı : ${results.ok}`);
  console.log(`  Hatalı   : ${results.fail}`);

  if (results.errors.length > 0) {
    console.log('\n  Hatalar:');
    results.errors.forEach(e => console.log(`    ${e.slug}: ${e.error.slice(0, 100)}`));
  }

  if (results.ok > 0) {
    console.log(`\n  ✓ Tamamlandı. wix-posts.json güncellemek için:\n`);
    console.log(`    node cli.js blakfy sync\n`);
  }
}

main().catch(err => {
  console.error('Hata:', err.message);
  process.exit(1);
});
