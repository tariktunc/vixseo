/**
 * fetch-tags.js — Wix'teki tüm etiketleri çekip data/ klasörüne kaydeder
 *
 * Kullanım:
 *   node sites/ibrahiminyeri/scripts/fetch-tags.js
 *
 * Çıktı:
 *   sites/ibrahiminyeri/data/tags.json   ← Wix'ten gelen ham veri
 *
 * Ne zaman çalıştırılır:
 *   - Wix Panel'den etiket eklendikten/silinirken/düzenlendikten sonra
 *   - scripts/tags.json güncel mi diye kontrol etmek istediğinde
 */

'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ─── Ayarlar ──────────────────────────────────────────────────────────────

const CREDENTIALS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '..', '..', 'wix-credentials.json'), 'utf8')
);
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'config.json'), 'utf8')
);

const API_KEY  = process.env.WIX_API_KEY || CREDENTIALS.apiKey;
const SITE_ID  = CONFIG.siteId;
const DATA_DIR = path.join(__dirname, '..', 'data');
const OUT_FILE = path.join(DATA_DIR, 'tags.json');

// ─── API yardımcısı ───────────────────────────────────────────────────────

function wixPost(apiPath, body) {
  return new Promise((resolve, reject) => {
    const b = JSON.stringify(body);
    const opts = {
      hostname: 'www.wixapis.com',
      path:     apiPath,
      method:   'POST',
      headers: {
        'Authorization':  API_KEY,
        'wix-site-id':    SITE_ID,
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(b)
      }
    };
    const r = https.request(opts, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
        catch (e) { resolve({ status: res.statusCode, data: d }); }
      });
    });
    r.on('error', reject);
    r.write(b);
    r.end();
  });
}

// ─── Tüm sayfaları çek ────────────────────────────────────────────────────

async function fetchAllTags() {
  const allTags = [];
  let cursor    = null;
  let page      = 1;

  while (true) {
    const body = {
      paging: { limit: 100, ...(cursor ? { cursor } : {}) }
    };

    process.stdout.write(`  Sayfa ${page} çekiliyor...`);
    const res = await wixPost('/blog/v3/tags/query', body);

    if (res.status !== 200) {
      console.log(` HATA ${res.status}`);
      console.error(JSON.stringify(res.data, null, 2));
      process.exit(1);
    }

    const tags       = res.data.tags || [];
    const pagingMeta = res.data.pagingMetadata || {};

    allTags.push(...tags);
    console.log(` ${tags.length} etiket (toplam: ${allTags.length})`);

    // Sonraki sayfa var mı?
    if (!pagingMeta.hasNext || tags.length === 0) break;
    cursor = pagingMeta.cursors?.next || null;
    if (!cursor) break;
    page++;
  }

  return allTags;
}

// ─── Ana işlem ────────────────────────────────────────────────────────────

async function main() {
  console.log('\n═══════════════════════════════════════════');
  console.log(' fetch-tags.js — ibrahiminyeri.com');
  console.log('═══════════════════════════════════════════\n');

  const tags = await fetchAllTags();

  // data/ klasörünü oluştur (yoksa)
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Ham veriyi kaydet
  const output = {
    meta: {
      site:          CONFIG.domain || 'ibrahiminyeri.com',
      fetchedAt:     new Date().toISOString(),
      totalFetched:  tags.length
    },
    tags: tags.sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), 'utf8');

  console.log(`\n✅ ${tags.length} etiket kaydedildi → ${OUT_FILE}`);

  // Özet tablosu
  console.log('\n─── Etiketler (post sayısına göre) ────────');
  for (const tag of output.tags) {
    const posts = String(tag.postCount || 0).padStart(3);
    const slug  = tag.slug || '—';
    const hasTR = /[ğüşıöçĞÜŞİÖÇ]/.test(slug);
    const hasSuffix = /-\d+$/.test(slug);
    const warn = hasTR ? ' ⚠️ TR-char' : hasSuffix ? ' ⚠️ suffix' : '';
    console.log(`  ${posts}p  "${tag.label}"  [${slug}]${warn}`);
  }

  console.log('\n─── Uyarılar ───────────────────────────────');
  const trChar  = output.tags.filter(t => /[ğüşıöçĞÜŞİÖÇ]/.test(t.slug || ''));
  const suffix  = output.tags.filter(t => /-\d+$/.test(t.slug || ''));
  console.log(`  Türkçe karakter içeren slug: ${trChar.length} etiket`);
  console.log(`  Numeric suffix (-1/-2) olan: ${suffix.length} etiket`);

  if (trChar.length + suffix.length === 0) {
    console.log('  ✅ Sorun yok!');
  }
  console.log('');

  // ─── etiketler.json güncelle ────────────────────────────────────────
  const ETIKETLER_FILE = path.join(__dirname, '..', 'etiketler.json');
  if (fs.existsSync(ETIKETLER_FILE)) {
    const etiketler = JSON.parse(fs.readFileSync(ETIKETLER_FILE, 'utf8'));
    const wixById   = Object.fromEntries(tags.map(t => [t.id, t]));

    let updated = 0;
    let cleared = 0;

    for (const entry of etiketler.tags) {
      const wix = wixById[entry.id];
      if (!wix) continue;

      const oldSlug = entry.slug;

      // Slug ve postCount'u Wix'ten gelen gerçek değerle güncelle
      entry.slug      = wix.slug || entry.slug;
      entry.postCount = wix.postCount || entry.postCount;

      if (entry.slug !== oldSlug) {
        console.log(`  ✏️  ${oldSlug} → ${entry.slug}`);
        updated++;
      }

      // Slug düzeltmesi tamamlandıysa panelAction temizle
      if (entry.panelAction && entry.slug === entry.slugTarget) {
        entry.panelAction = null;
        cleared++;
      }
    }

    etiketler.meta.note = `SEO audit sonrası — 2026-03-18. 44'ten 11 tag silindi. Son güncelleme: ${new Date().toISOString().slice(0, 10)}.`;

    fs.writeFileSync(ETIKETLER_FILE, JSON.stringify(etiketler, null, 2), 'utf8');

    console.log(`\n─── etiketler.json senkronizasyonu ─────────`);
    console.log(`  Slug güncellenen : ${updated} etiket`);
    console.log(`  panelAction temizlenen: ${cleared} etiket`);

    const kalan = etiketler.tags.filter(t => t.panelAction).length;
    if (kalan === 0) {
      console.log('  ✅ Tüm panel işlemleri tamamlandı!');
    } else {
      console.log(`  ⏳ Bekleyen panel işlemi: ${kalan} etiket`);
    }
    console.log('');
  }
}

main().catch(err => {
  console.error('Beklenmeyen hata:', err);
  process.exit(1);
});
