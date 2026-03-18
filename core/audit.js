'use strict';

/**
 * core/audit.js — Wix vs Local karşılaştırma raporu (READ-ONLY)
 *
 * Kontrol edilen alanlar:
 *   - seoSlug        : Wix'teki URL slug doğru mu?
 *   - seoTitle       : seoData içinde title tag var mı?
 *   - seoDescription : seoData içinde description meta var mı?
 *   - wixId          : Local frontmatter'daki wixId Wix ile eşleşiyor mu?
 *   - metaDesc       : Eski hatalı alan kullanılmış mı? (metaDesc yerine description)
 */

const fs   = require('fs');
const path = require('path');
const { queryPosts } = require('./blog');

// ─── Local posts oku ──────────────────────────────────────────────────────

function loadLocalPosts(siteDir) {
  const postsDir  = path.join(siteDir, 'posts');
  const { parseFrontmatter } = require(path.join(siteDir, 'scripts', 'convert.js'));

  if (!fs.existsSync(postsDir)) return [];

  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw    = fs.readFileSync(path.join(postsDir, f), 'utf8');
      const { meta } = parseFrontmatter(raw);
      return { file: f, ...meta };
    })
    .filter(p => p.status === 'published' && p.wixId);
}

// ─── SEO tag çözümleyici ──────────────────────────────────────────────────

function extractSeoTags(post) {
  const tags = post.seoData?.tags || [];

  const title = tags.find(t => t.type === 'title')?.children || null;

  const desc = tags.find(t =>
    t.type === 'meta' && t.props?.name === 'description'
  )?.props?.content || null;

  const ogTitle = tags.find(t =>
    t.type === 'meta' && t.props?.property === 'og:title'
  )?.props?.content || null;

  const keywords = post.seoData?.settings?.keywords || [];

  return { title, desc, ogTitle, keywords };
}

// ─── Tek post karşılaştır ─────────────────────────────────────────────────

function comparePost(local, wixPost) {
  const issues = [];

  const seo       = extractSeoTags(wixPost);
  const wixSlug   = wixPost.slug || null;
  const localSlug = local.slug || local.file?.replace('.md', '');

  // 1. seoSlug kontrolü
  if (!wixSlug) {
    issues.push({ field: 'seoSlug', severity: 'kritik', detail: 'Wix\'te slug YOK' });
  } else if (wixSlug !== localSlug) {
    issues.push({
      field:    'seoSlug',
      severity: 'kritik',
      detail:   `Wix: "${wixSlug}" ≠ Local: "${localSlug}"`
    });
  }

  // 2. seoTitle kontrolü
  if (!seo.title) {
    issues.push({ field: 'seoTitle', severity: 'kritik', detail: 'seoData\'da title tag YOK' });
  } else if (local.seoTitle && seo.title !== local.seoTitle) {
    issues.push({
      field:    'seoTitle',
      severity: 'orta',
      detail:   `Wix: "${seo.title.slice(0, 60)}" ≠ Local: "${local.seoTitle?.slice(0, 60)}"`
    });
  }

  // 3. seoDescription kontrolü
  if (!seo.desc) {
    issues.push({ field: 'seoDesc', severity: 'kritik', detail: 'seoData\'da description meta YOK' });
  }

  // 4. og:title kontrolü
  if (!seo.ogTitle) {
    issues.push({ field: 'og:title', severity: 'orta', detail: 'seoData\'da og:title YOK' });
  }

  // 5. keywords kontrolü
  if (!seo.keywords || seo.keywords.length === 0) {
    issues.push({ field: 'keywords', severity: 'düşük', detail: 'SEO keyword tanımlı değil' });
  }

  // 6. Local frontmatter'da metaDesc kullanımı (hatalı alan)
  if (local.metaDesc && !local.description) {
    issues.push({
      field:    'local.metaDesc',
      severity: 'orta',
      detail:   '"metaDesc" kullanılmış, "description" olmalı — publisher bu alanı okumaz'
    });
  }

  return issues;
}

// ─── Ana audit fonksiyonu ─────────────────────────────────────────────────

async function runAudit(siteDir) {
  const config = JSON.parse(
    fs.readFileSync(path.join(siteDir, 'config.json'), 'utf8')
  );

  console.log(`\nAudit başlıyor: ${config.domain}`);
  console.log('Wix\'ten yazılar çekiliyor (read-only)...\n');

  // Wix'ten tüm yayınlı yazıları çek
  const wixPosts = await queryPosts(siteDir, { fieldsets: ['SEO'] });
  console.log(`Wix: ${wixPosts.length} yayınlı yazı bulundu`);

  // Local published yazıları yükle
  const localPosts = loadLocalPosts(siteDir);
  console.log(`Local: ${localPosts.length} published yazı\n`);

  // Çift lookup: hem wixId hem slug bazlı eşleştirme
  const wixById   = new Map(wixPosts.map(p => [p.id, p]));
  const wixBySlug = new Map(wixPosts.map(p => [p.slug, p]));

  const results = {
    ok:       [],
    issues:   [],
    notInWix: []   // Wix'te ne ID ne slug ile bulunamadı
  };

  for (const local of localPosts) {
    const localSlug = local.slug || local.file?.replace('.md', '');

    // Önce wixId, bulamazsa slug ile dene
    const wixPost = wixById.get(local.wixId) || wixBySlug.get(localSlug);

    if (!wixPost) {
      results.notInWix.push({ file: local.file, slug: localSlug, wixId: local.wixId });
      continue;
    }

    const issues = comparePost(local, wixPost);

    if (issues.length === 0) {
      results.ok.push(local.slug || local.file);
    } else {
      results.issues.push({
        file:   local.file,
        slug:   local.slug || local.file?.replace('.md', ''),
        wixId:  local.wixId,
        issues
      });
    }
  }

  // ─── Rapor yazdır ─────────────────────────────────────────────────────

  const sevIcon = { kritik: '🔴', orta: '🟡', düşük: '🔵' };

  // Sorunlu yazılar
  if (results.issues.length > 0) {
    console.log(`── SORUNLU YAZILAR (${results.issues.length}) ${'─'.repeat(50)}\n`);

    for (const r of results.issues) {
      const kritikCount = r.issues.filter(i => i.severity === 'kritik').length;
      const ortaCount   = r.issues.filter(i => i.severity === 'orta').length;
      console.log(`📄 ${r.slug}`);
      console.log(`   wixId : ${r.wixId}`);
      for (const issue of r.issues) {
        console.log(`   ${sevIcon[issue.severity]} [${issue.severity.toUpperCase().padEnd(6)}] ${issue.field}: ${issue.detail}`);
      }
      console.log('');
    }
  }

  // Wix'te bulunamayanlar
  if (results.notInWix.length > 0) {
    console.log(`── WİX'TE BULUNAMAYANLAR (${results.notInWix.length}) — muhtemelen draft/unpublished ${'─'.repeat(10)}\n`);
    for (const r of results.notInWix) {
      console.log(`  ⚠  ${r.slug?.padEnd(45)} wixId: ${r.wixId}`);
    }
    console.log('');
  }

  // Özet
  const kritikTotal = results.issues.reduce((n, r) =>
    n + r.issues.filter(i => i.severity === 'kritik').length, 0
  );
  const ortaTotal = results.issues.reduce((n, r) =>
    n + r.issues.filter(i => i.severity === 'orta').length, 0
  );
  const dusukTotal = results.issues.reduce((n, r) =>
    n + r.issues.filter(i => i.severity === 'düşük').length, 0
  );

  console.log(`── ÖZET ${'─'.repeat(60)}\n`);
  console.log(`  ✅ Sorunsuz  : ${results.ok.length} yazı`);
  console.log(`  ⚠  Wix\'te yok: ${results.notInWix.length} yazı`);
  console.log(`  📋 Sorunlu   : ${results.issues.length} yazı`);
  console.log(`     🔴 Kritik : ${kritikTotal} alan`);
  console.log(`     🟡 Orta   : ${ortaTotal} alan`);
  console.log(`     🔵 Düşük  : ${dusukTotal} alan`);
  console.log('');

  return results;
}

module.exports = { runAudit };
