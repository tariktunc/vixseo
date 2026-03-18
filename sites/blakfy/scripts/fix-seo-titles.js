#!/usr/bin/env node
'use strict';

/**
 * fix-seo-titles.js — blakfy seoTitle eksik yazıları Wix'te güncelle
 *
 * Akış (yayınlı yazı güncelleme):
 *   1. get-or-create draft  → draft ID al
 *   2. PATCH draft seoData  → seoTitle yaz
 *   3. publish              → yeniden yayınla
 *
 * Kullanım:
 *   node sites/blakfy/scripts/fix-seo-titles.js --dry-run   (önizle)
 *   node sites/blakfy/scripts/fix-seo-titles.js             (uygula)
 *   node sites/blakfy/scripts/fix-seo-titles.js --limit 5   (ilk 5)
 */

const fs        = require('fs');
const path      = require('path');
const { createClient } = require('../../../core/wix');
const redirects = require('../../../core/redirects');

const SITE_DIR   = path.join(__dirname, '..');
const config     = JSON.parse(fs.readFileSync(path.join(SITE_DIR, 'config.json'), 'utf8'));
const BRAND      = 'Blakfy';
const MAX_TITLE  = 60; // Google seoTitle önerilen max

const dryRun  = process.argv.includes('--dry-run');
const limitIdx = process.argv.indexOf('--limit');
const limit   = limitIdx !== -1 ? parseInt(process.argv[limitIdx + 1]) : Infinity;

// ─── seoTitle üret ────────────────────────────────────────────────────────────

function makeSeoTitle(title) {
  const suffix = ` | ${BRAND}`;
  const maxBase = MAX_TITLE - suffix.length;

  // Başlığı temizle (fazla boşluk, trailing noktalama)
  let base = title.trim().replace(/\s+/g, ' ').replace(/[.!?:,]+$/, '');

  if (base.length <= maxBase) {
    return base + suffix;
  }

  // Kısalt: son kelime sınırında kes
  base = base.slice(0, maxBase);
  const lastSpace = base.lastIndexOf(' ');
  if (lastSpace > maxBase * 0.7) base = base.slice(0, lastSpace);

  return base + suffix;
}

// ─── normalize slug (Türkçe → ASCII) ────────────────────────────────────────

function normalizeSlug(str) {
  return (str || '').toLowerCase()
    .replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// ─── Tüm published draft'ları çek → slug→draft map ──────────────────────────

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

  // slug (ve normalize) → draft nesne
  const map = {};
  for (const d of all) {
    if (d.seoSlug) {
      map[d.seoSlug] = d;
      map[normalizeSlug(d.seoSlug)] = d;
    }
  }
  return map;
}

async function patchSeoTitle(wix, draftId, seoTitle, existingSeoData) {
  // Mevcut seoData'yı koru, sadece title tag'ini güncelle
  const existingTags = (existingSeoData && existingSeoData.tags) ? existingSeoData.tags : [];

  // title tag'i bul veya ekle
  const titleTag = { type: 'title', children: seoTitle, custom: false, disabled: false };
  const otherTags = existingTags.filter(t => t.type !== 'title');
  const tags = [titleTag, ...otherTags];

  const seoData = {
    ...(existingSeoData || {}),
    tags
  };

  const res = await wix('PATCH', `/blog/v3/draft-posts/${draftId}`, {
    draftPost: { seoData },
    fieldMask: { paths: ['seoData'] }
  });

  if (res.status !== 200) {
    throw new Error(`PATCH seoData failed (${res.status}): ${JSON.stringify(res.data)}`);
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

// ─── delay yardımcısı ────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Ana akış ────────────────────────────────────────────────────────────────

async function main() {
  const wixPostsPath = path.join(SITE_DIR, 'data', 'wix-posts.json');
  if (!fs.existsSync(wixPostsPath)) {
    console.error('wix-posts.json bulunamadı — önce: node cli.js blakfy sync');
    process.exit(1);
  }

  const { posts } = JSON.parse(fs.readFileSync(wixPostsPath, 'utf8'));
  const toFix = posts.filter(p => !p.seoTitle).slice(0, limit);

  if (toFix.length === 0) {
    console.log('✅ Tüm yazılarda seoTitle mevcut — yapılacak iş yok.');
    return;
  }

  console.log(`\n${dryRun ? '[DRY-RUN] ' : ''}seoTitle eksik: ${toFix.length} yazı\n`);
  console.log('  Slug'.padEnd(55), 'seoTitle (üretilecek)');
  console.log('  ' + '─'.repeat(100));

  toFix.forEach(p => {
    const generated = makeSeoTitle(p.title);
    console.log(`  ${p.slug.slice(0, 52).padEnd(55)} ${generated}`);
  });

  if (dryRun) {
    console.log(`\n[DRY-RUN] Uygulamak için: node sites/blakfy/scripts/fix-seo-titles.js\n`);
    return;
  }

  console.log('\nUygulanıyor...\n');

  const wix = createClient(config.siteId);
  const results = { ok: 0, fail: 0, errors: [] };

  // Tüm published draft'ları çek (slug→draft map)
  process.stdout.write('  Draft listesi çekiliyor...');
  const draftMap = await buildDraftMap(wix);
  console.log(' ✓\n');

  for (const post of toFix) {
    const seoTitle = makeSeoTitle(post.title);
    process.stdout.write(`  [${String(results.ok + results.fail + 1).padStart(2)}/${toFix.length}] ${post.slug.slice(0, 45)}... `);

    try {
      // 1. Draft bul (slug veya normalize slug ile)
      const draft = draftMap[post.slug] || draftMap[normalizeSlug(post.slug)];
      if (!draft) throw new Error(`Draft bulunamadı (slug: ${post.slug})`);

      // 2. seoTitle patch
      await patchSeoTitle(wix, draft.id, seoTitle, draft.seoData);

      // 3. Yeniden yayınla
      await publishDraft(wix, draft.id);

      console.log(`✅ "${seoTitle.slice(0, 40)}..."`);
      results.ok++;

      // Rate limit önlemi
      await delay(500);
    } catch (err) {
      console.log(`❌ ${err.message.slice(0, 60)}`);
      results.fail++;
      results.errors.push({ slug: post.slug, error: err.message });
      await delay(300);
    }
  }

  // Özet
  console.log(`\n─── Sonuç ───`);
  console.log(`  Başarılı : ${results.ok}`);
  console.log(`  Hatalı   : ${results.fail}`);

  if (results.errors.length > 0) {
    console.log('\n  Hatalar:');
    results.errors.forEach(e => console.log(`    ${e.slug}: ${e.error.slice(0, 80)}`));
  }

  // wix-posts.json güncelle
  if (results.ok > 0) {
    const updatedPosts = posts.map(p => {
      const fixed = toFix.find(f => f.id === p.id);
      if (fixed && !p.seoTitle) return { ...p, seoTitle: makeSeoTitle(p.title) };
      return p;
    });

    const wixData = JSON.parse(fs.readFileSync(wixPostsPath, 'utf8'));
    wixData.posts = updatedPosts;
    fs.writeFileSync(wixPostsPath, JSON.stringify(wixData, null, 2), 'utf8');
    console.log(`\n  ✓ wix-posts.json güncellendi (${results.ok} yazı)\n`);
  }
}

main().catch(err => {
  console.error('Hata:', err.message);
  process.exit(1);
});
