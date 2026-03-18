'use strict';

/**
 * core/sitemap.js — Sitemap fetch, parse, local cache ve slug çakışma kontrolü
 *
 * Wix siteleri iki yapıda sitemap üretir:
 *   1. Sitemap index → birden fazla alt sitemap'e işaret eder
 *   2. Direkt sitemap → <url><loc>...</loc></url> listesi
 *
 * Her ikisi de otomatik işlenir.
 *
 * Kullanım:
 *   const sitemap = require('./core/sitemap');
 *   await sitemap.pull(siteDir, 'blakfy.com');
 *   sitemap.checkSlug(siteDir, 'yeni-yazi-slug');
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const DATA_FILE = 'sitemap.json';

// ─── HTTP fetch ───────────────────────────────────────────────────────────

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'xmlBlog-sitemap/1.0' } }, res => {
      // Redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} — ${url}`));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// ─── XML parse — sitemap index ────────────────────────────────────────────

function parseSitemapIndex(xml) {
  const urls = [];
  const re   = /<loc>\s*(https?:\/\/[^<]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const loc = m[1].trim();
    if (loc.includes('sitemap') || loc.endsWith('.xml')) urls.push(loc);
  }
  return urls;
}

// ─── XML parse — sitemap sayfaları ────────────────────────────────────────

function parseSitemap(xml) {
  const entries = [];
  // Her <url> bloğunu ayır
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/gi) || [];

  for (const block of blocks) {
    const locMatch     = block.match(/<loc>\s*(.*?)\s*<\/loc>/i);
    const lastmodMatch = block.match(/<lastmod>\s*(.*?)\s*<\/lastmod>/i);
    const prioMatch    = block.match(/<priority>\s*(.*?)\s*<\/priority>/i);

    if (!locMatch) continue;

    const loc = locMatch[1].trim();
    // Slug: URL'nin son segmenti
    const slug = loc.replace(/\/$/, '').split('/').pop();

    entries.push({
      url:     loc,
      slug,
      lastmod: lastmodMatch ? lastmodMatch[1].trim() : null,
      priority: prioMatch  ? parseFloat(prioMatch[1]) : null
    });
  }

  return entries;
}

// ─── Sitemap index mi normal sitemap mı? ─────────────────────────────────

function isSitemapIndex(xml) {
  return xml.includes('<sitemapindex') || xml.includes('<sitemap>');
}

// ─── Ana fetch: tüm URL'leri topla ────────────────────────────────────────

async function fetchAll(domain) {
  const base = domain.startsWith('http') ? domain : `https://${domain}`;
  const rootUrl = `${base}/sitemap.xml`;

  console.log(`  Sitemap çekiliyor: ${rootUrl}`);
  const rootXml = await fetchUrl(rootUrl);

  let allEntries = [];

  if (isSitemapIndex(rootXml)) {
    // Sitemap index → alt sitemap'leri çek
    const childUrls = parseSitemapIndex(rootXml);
    console.log(`  Sitemap index — ${childUrls.length} alt sitemap bulundu`);

    for (const childUrl of childUrls) {
      try {
        console.log(`    ↳ ${childUrl}`);
        const childXml = await fetchUrl(childUrl);
        const entries  = parseSitemap(childXml);
        allEntries     = allEntries.concat(entries);
      } catch (e) {
        console.warn(`    [WARN] ${childUrl} alınamadı: ${e.message}`);
      }
    }
  } else {
    // Direkt sitemap
    allEntries = parseSitemap(rootXml);
  }

  return allEntries;
}

// ─── Local kaydet ─────────────────────────────────────────────────────────

function dataPath(siteDir) {
  return path.join(siteDir, 'data', DATA_FILE);
}

function save(siteDir, entries) {
  const filePath = dataPath(siteDir);
  const payload  = {
    pulledAt:    new Date().toISOString(),
    totalUrls:   entries.length,
    entries
  };
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
}

function load(siteDir) {
  const filePath = dataPath(siteDir);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// ─── Dışa aktarılan fonksiyonlar ──────────────────────────────────────────

/**
 * pull(siteDir, domain) — Sitemap'i çek, local'e kaydet
 */
async function pull(siteDir, domain) {
  const entries = await fetchAll(domain);
  save(siteDir, entries);
  console.log(`  ✓ ${entries.length} URL kaydedildi → sites/*/data/sitemap.json`);
  return entries;
}

/**
 * checkSlug(siteDir, slug) → { exists, url, source }
 * Slug çakışması kontrolü — sitemap + wix-posts.json birlikte kontrol edilir
 */
function checkSlug(siteDir, slug) {
  // 1. Sitemap kontrolü
  const data  = load(siteDir);
  if (data) {
    const match = data.entries.find(e =>
      e.slug === slug ||
      e.url.endsWith('/' + slug) ||
      e.url.endsWith('/' + slug + '/')
    );
    if (match) return { exists: true, url: match.url, lastmod: match.lastmod, source: 'sitemap' };
  }

  // 2. wix-posts.json kontrolü
  const wixFile = path.join(siteDir, 'data', 'wix-posts.json');
  if (fs.existsSync(wixFile)) {
    const wixData = JSON.parse(fs.readFileSync(wixFile, 'utf8'));
    const match   = (wixData.posts || []).find(p => p.slug === slug);
    if (match) return {
      exists: true,
      url:    `https://${wixData.site}/post/${match.slug}`,
      lastmod: match.updatedAt,
      source: 'wix-posts'
    };
  }

  if (!data && !fs.existsSync(path.join(siteDir, 'data', 'wix-posts.json'))) {
    return { exists: false, url: null, warning: 'Veri yok — önce: sync veya sitemap pull' };
  }

  return { exists: false, url: null };
}

/**
 * stats(siteDir) — Özet istatistik
 */
function stats(siteDir) {
  const data = load(siteDir);
  if (!data) return null;

  // URL tiplerini grupla (Wix path pattern'larına göre)
  const groups = {};
  for (const entry of data.entries) {
    const parts   = new URL(entry.url).pathname.split('/').filter(Boolean);
    const section = parts[0] || 'root';
    groups[section] = (groups[section] || 0) + 1;
  }

  return {
    pulledAt:  data.pulledAt,
    totalUrls: data.totalUrls,
    groups
  };
}

module.exports = { pull, checkSlug, load, stats };
