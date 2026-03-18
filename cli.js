#!/usr/bin/env node
'use strict';

/**
 * cli.js — xmlBlog Birleşik CLI
 *
 * Kullanım:
 *   node cli.js <site> <komut> [seçenekler]
 *
 * Komutlar:
 *   status                          Local posts/ durumu
 *   publish [--slug <s>] [--dry-run]  Wix'e gönder
 *   sitemap pull                    Sitemap çek, local'e kaydet
 *   sitemap stats                   Sitemap özet istatistiği
 *   sitemap check <slug>            Slug çakışması var mı?
 */

const fs   = require('fs');
const path = require('path');

// ─── Argüman parse ────────────────────────────────────────────────────────

const args    = process.argv.slice(2);
const site    = args[0];
const command = args[1];
const sub     = args[2];          // sitemap pull|stats|check  /  rss pull|list|check
const dryRun  = args.includes('--dry-run');
const slugIdx = args.indexOf('--slug');
const slug    = slugIdx !== -1 ? args[slugIdx + 1] : (args[3] || null);

// ─── Site listesi ─────────────────────────────────────────────────────────

function getSiteList() {
  const sitesDir = path.join(__dirname, 'sites');
  return fs.readdirSync(sitesDir).filter(d => {
    if (d.startsWith('_')) return false;
    return fs.existsSync(path.join(sitesDir, d, 'config.json'));
  });
}

function resolveSiteDir(siteName) {
  const sitesDir = path.join(__dirname, 'sites');
  const sites    = getSiteList();

  if (sites.includes(siteName)) return path.join(sitesDir, siteName);

  const match = sites.find(s =>
    siteName.toLowerCase().startsWith(s.toLowerCase()) ||
    s.toLowerCase().startsWith(siteName.toLowerCase())
  );

  if (match) return path.join(sitesDir, match);

  console.error(`Site bulunamadı: "${siteName}"\nMevcut siteler: ${sites.join(', ')}`);
  process.exit(1);
}

function getSiteDomain(siteDir) {
  const config = JSON.parse(fs.readFileSync(path.join(siteDir, 'config.json'), 'utf8'));
  return config.domain;
}

// ─── Yardım ───────────────────────────────────────────────────────────────

function printHelp() {
  console.log(`
xmlBlog CLI

Kullanım:
  node cli.js <site> <komut> [seçenekler]

KOMUTLAR

  status
    Local posts/ klasörünün durumunu listele

  publish [--dry-run]
    Tüm "ready" yazıları Wix'e gönder

  publish --slug <slug> [--dry-run]
    Tek yazıyı Wix'e gönder

  sitemap pull
    Sitenin sitemap.xml dosyasını çek, local'e kaydet

  sitemap stats
    Kaydedilen sitemap özet istatistiği (toplam URL, bölüm dağılımı)

  sitemap check <slug>
    Verilen slug sitemap'te var mı? (URL çakışma kontrolü)

  redirects add <eski-url> <yeni-url>
    sites/{site}/redirects.csv dosyasına yeni 301 redirect ekle

  redirects validate
    Redirect dosyasındaki sorunları raporla (Türkçe karakter, zincir, döngü)

  redirects list
    Tüm redirect'leri listele

  redirects export [dosya]
    Wix import için CSV üret (varsayılan: redirects-export.csv)

SİTELER
${getSiteList().map(s => '  ' + s).join('\n')}

ÖRNEKLER
  node cli.js blakfy sitemap pull
  node cli.js blakfy sitemap stats
  node cli.js blakfy sitemap check yeni-yazi-slug
  node cli.js blakfy publish --dry-run
  node cli.js ibrahiminyeri publish --slug yeni-yazi
`);
}

// ─── sitemap komutları ────────────────────────────────────────────────────

async function cmdSitemap(siteDir, action, actionArg) {
  const sitemap = require('./core/sitemap');
  const domain  = getSiteDomain(siteDir);

  switch (action) {
    case 'pull': {
      console.log(`\nSitemap çekiliyor: ${domain}`);
      await sitemap.pull(siteDir, domain);
      break;
    }

    case 'stats': {
      const s = sitemap.stats(siteDir);
      if (!s) { console.log('Sitemap verisi yok — önce: sitemap pull'); break; }
      console.log(`\nSite      : ${domain}`);
      console.log(`Çekilme   : ${new Date(s.pulledAt).toLocaleString('tr-TR')}`);
      console.log(`Toplam URL: ${s.totalUrls}\n`);
      console.log('Bölüm dağılımı:');
      for (const [section, count] of Object.entries(s.groups).sort((a, b) => b[1] - a[1])) {
        console.log(`  /${section.padEnd(25)} ${count}`);
      }
      console.log('');
      break;
    }

    case 'check': {
      if (!actionArg) { console.error('Kullanım: sitemap check <slug>'); process.exit(1); }
      const result = sitemap.checkSlug(siteDir, actionArg);
      if (result.warning) { console.log(`⚠  ${result.warning}`); break; }
      if (result.exists) {
        console.log(`\n🔴 ÇAKIŞMA — Bu slug zaten mevcut:`);
        console.log(`   URL    : ${result.url}`);
        console.log(`   Lastmod: ${result.lastmod || 'bilinmiyor'}\n`);
      } else {
        console.log(`\n✅ Temiz — "${actionArg}" slug'ı sitemap'te yok\n`);
      }
      break;
    }

    default:
      console.error(`Bilinmeyen sitemap alt komutu: "${action}"`);
      console.error('Geçerli: pull | stats | check <slug>');
      process.exit(1);
  }
}

// ─── sc komutları ─────────────────────────────────────────────────────────

async function cmdSearchConsole(siteDir, action, actionArg) {
  const sc     = require('./core/search-console');
  const config = JSON.parse(require('fs').readFileSync(require('path').join(siteDir, 'config.json'), 'utf8'));
  const siteUrl = config.searchConsoleUrl;

  if (!siteUrl && action !== 'pull') {
    console.error('config.json\'da searchConsoleUrl yok');
    process.exit(1);
  }

  switch (action) {
    case 'pull': {
      console.log(`\nSearch Console verisi çekiliyor: ${siteUrl}`);
      const { summary, filePath } = await sc.pullSummary(siteDir);
      console.log(`\n  ✓ Kaydedildi: ${require('path').basename(filePath)}`);
      console.log(`  Toplam tıklama  : ${summary.totals.totalClicks.toLocaleString()}`);
      console.log(`  Toplam gösterim : ${summary.totals.totalImpressions.toLocaleString()}`);
      console.log(`  Ort. pozisyon   : ${summary.totals.avgPosition}`);
      console.log(`  Sayfa sayısı    : ${summary.totals.pages}`);
      break;
    }

    case 'pages': {
      const data = require('./sites/' + require('path').basename(siteDir) + '/data/sc-summary.json');
      const limit = parseInt(actionArg) || 20;
      console.log(`\nEn çok trafik alan ${limit} sayfa (${config.domain}):\n`);
      console.log('  Tıklama  Gösterim  CTR%   Pos    Sayfa');
      console.log('  ' + '─'.repeat(80));
      data.pages.slice(0, limit).forEach(p => {
        const page = p.page.replace(siteUrl, '/');
        console.log(`  ${String(p.clicks).padStart(7)}  ${String(p.impressions).padStart(8)}  ${String(p.ctr).padStart(5)}  ${String(p.position).padStart(5)}  ${page.slice(0, 50)}`);
      });
      console.log('');
      break;
    }

    case 'queries': {
      const data  = require('./sites/' + require('path').basename(siteDir) + '/data/sc-summary.json');
      const limit = parseInt(actionArg) || 20;
      console.log(`\nEn çok trafik getiren ${limit} sorgu (${config.domain}):\n`);
      console.log('  Tıklama  Gösterim  CTR%   Pos    Sorgu');
      console.log('  ' + '─'.repeat(80));
      data.queries.slice(0, limit).forEach(q => {
        console.log(`  ${String(q.clicks).padStart(7)}  ${String(q.impressions).padStart(8)}  ${String(q.ctr).padStart(5)}  ${String(q.position).padStart(5)}  ${q.query}`);
      });
      console.log('');
      break;
    }

    default:
      console.error(`Bilinmeyen sc komutu: "${action}"`);
      console.error('Geçerli: pull | pages [limit] | queries [limit]');
      process.exit(1);
  }
}

// ─── redirects komutları ──────────────────────────────────────────────────

function fixGitBashPath(p) {
  if (!p) return p;
  return p.replace(/^[A-Z]:\/Program Files\/Git/i, '');
}

async function cmdRedirects(siteDir, action, arg1, arg2) {
  const redirects = require('./core/redirects');
  const siteName  = require('path').basename(siteDir);
  arg1 = fixGitBashPath(arg1);
  arg2 = fixGitBashPath(arg2);

  switch (action) {
    case 'add': {
      if (!arg1 || !arg2) {
        console.error('Kullanım: redirects add <eski-url> <yeni-url>');
        process.exit(1);
      }
      const result = redirects.add(siteDir, arg1, arg2);
      if (result.added)         console.log(`✅ Eklendi: ${arg1} → ${arg2}`);
      else if (result.updated)  console.log(`🔄 Güncellendi: ${arg1} → ${arg2}`);
      else                      console.log(`⏭  Zaten mevcut: ${arg1} → ${arg2}`);
      break;
    }

    case 'validate': {
      const { total, issues } = redirects.validate(siteDir);
      console.log(`\nSite: ${siteName} | Toplam: ${total} redirect\n`);
      if (issues.length === 0) {
        console.log('✅ Sorun bulunamadı\n');
      } else {
        const kritik = issues.filter(i => i.type === 'KRITIK');
        const uyari  = issues.filter(i => i.type === 'UYARI');
        if (kritik.length) {
          console.log(`🔴 KRİTİK (${kritik.length}):`);
          kritik.forEach(i => console.log(`  Satır ${i.line}: ${i.msg}`));
        }
        if (uyari.length) {
          console.log(`\n🟡 UYARI (${uyari.length}):`);
          uyari.forEach(i => console.log(`  Satır ${i.line}: ${i.msg}`));
        }
        console.log('');
      }
      break;
    }

    case 'list': {
      const rows = redirects.list(siteDir);
      console.log(`\n${siteName} redirects (${rows.length}):\n`);
      console.log('  Eski URL'.padEnd(55) + 'Yeni URL');
      console.log('  ' + '─'.repeat(80));
      rows.forEach(r => console.log(`  ${r.old.slice(0,52).padEnd(55)}${r.new}`));
      console.log('');
      break;
    }

    case 'export': {
      const dest   = arg1 || null;
      const result = redirects.exportCsv(siteDir, dest);
      console.log(`✅ Export: ${result.path} (${result.count} redirect)`);
      break;
    }

    default:
      console.error(`Bilinmeyen redirects alt komutu: "${action}"`);
      console.error('Geçerli: add <eski> <yeni> | validate | list | export [dosya]');
      process.exit(1);
  }
}

// ─── Ana akış ─────────────────────────────────────────────────────────────

async function main() {
  if (!site || !command || site === '--help' || site === '-h') {
    printHelp();
    process.exit(0);
  }

  const siteDir = resolveSiteDir(site);

  switch (command) {
    case 'status': {
      const { printStatus } = require('./core/status');
      printStatus(siteDir);
      break;
    }

    case 'publish': {
      const { publishSite } = require('./core/publisher');
      await publishSite(siteDir, { dryRun, slugFilter: slug });
      break;
    }

    case 'audit': {
      const { runAudit } = require('./core/audit');
      await runAudit(siteDir);
      break;
    }

    case 'sync': {
      const { pullFromWix } = require('./core/sync');
      await pullFromWix(siteDir, { dryRun });
      break;
    }

    case 'sc':
      await cmdSearchConsole(siteDir, sub, args[3]);
      break;

    case 'sitemap':
      await cmdSitemap(siteDir, sub, args[3]);
      break;

    case 'redirects':
      await cmdRedirects(siteDir, sub, args[3], args[4]);
      break;

    default:
      console.error(`Bilinmeyen komut: "${command}"`);
      printHelp();
      process.exit(1);
  }
}

main().catch(err => {
  console.error('Hata:', err.message);
  process.exit(1);
});
