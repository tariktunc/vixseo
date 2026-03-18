/**
 * update-tag-seo.js — Tüm etiketlere seoTitle + metaDescription ekle
 *
 * Kullanım:
 *   node sites/ibrahiminyeri/scripts/update-tag-seo.js
 *   node sites/ibrahiminyeri/scripts/update-tag-seo.js --dry-run
 *   node sites/ibrahiminyeri/scripts/update-tag-seo.js --slug et-mangal
 *
 * Kaynak: data/tag-seo.json
 * Endpoint: PATCH /blog/v3/tags/{tagId}
 *   {
 *     "tag": { "seoData": { "tags": [...] } },
 *     "fieldMask": { "paths": ["seoData"] }
 *   }
 *
 * Kategori güncellemesiyle aynı pattern — sadece endpoint ve wrapper değişir:
 *   Kategori : PATCH /blog/v3/categories/{id}  → body.category
 *   Etiket   : PATCH /blog/v3/tags/{id}        → body.tag
 */

'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ─── Ayarlar ──────────────────────────────────────────────────────────────

require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const CONFIG   = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json'), 'utf8'));
const TAG_SEO  = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'tag-seo.json'), 'utf8'));

const API_KEY  = process.env.WIX_API_KEY;
const SITE_ID  = CONFIG.siteId;
const DRY_RUN  = process.argv.includes('--dry-run');
const slugArg  = (() => {
  const idx = process.argv.indexOf('--slug');
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

// ─── API yardımcısı ───────────────────────────────────────────────────────

function wixReq(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const b = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'www.wixapis.com',
      path:     apiPath,
      method,
      headers: {
        'Authorization':  API_KEY,
        'wix-site-id':    SITE_ID,
        'Content-Type':   'application/json',
        ...(b ? { 'Content-Length': Buffer.byteLength(b) } : {})
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
    if (b) r.write(b);
    r.end();
  });
}

// ─── Tek tag güncelle ─────────────────────────────────────────────────────

async function updateTagSeo(slug, tagData) {
  const { id, seoTitle, metaDescription } = tagData;

  const descLen = metaDescription.length;
  if (descLen < 120 || descLen > 165) {
    console.log(`  ⚠️  metaDescription uzunluğu: ${descLen} karakter (ideal: 150-160)`);
  }

  if (DRY_RUN) {
    console.log(`  [DRY] id: ${id.slice(0, 8)}...`);
    console.log(`        title: "${seoTitle}"`);
    console.log(`        desc (${descLen}): "${metaDescription.slice(0, 60)}..."`);
    return { ok: true };
  }

  const seoData = {
    tags: [
      {
        type:     'title',
        children: seoTitle,
        custom:   false,
        disabled: false
      },
      {
        type:     'meta',
        props:    { name: 'description', content: metaDescription },
        children: '',
        custom:   false,
        disabled: false
      }
    ]
  };

  const res = await wixReq('PATCH', `/blog/v3/tags/${id}`, {
    tag:       { seoData },
    fieldMask: { paths: ['seoData'] }
  });

  if (res.status === 200 || res.status === 201) {
    console.log(`  ✅ Güncellendi`);
    return { ok: true };
  } else {
    const err = typeof res.data === 'object'
      ? (res.data.message || JSON.stringify(res.data).slice(0, 150))
      : String(res.data).slice(0, 150);
    console.log(`  ❌ HATA ${res.status}: ${err}`);
    return { ok: false, reason: `${res.status}: ${err}` };
  }
}

// ─── Ana işlem ────────────────────────────────────────────────────────────

async function main() {
  if (!API_KEY) {
    console.error('WIX_API_KEY bulunamadı. .env dosyasını kontrol edin.');
    process.exit(1);
  }

  // _meta alanını çıkar, sadece tag'leri al
  const entries = Object.entries(TAG_SEO).filter(([k]) => !k.startsWith('_'));

  // --slug filtresi
  const targets = slugArg
    ? entries.filter(([slug]) => slug === slugArg)
    : entries;

  if (targets.length === 0) {
    console.log(slugArg
      ? `Slug bulunamadı: "${slugArg}" — data/tag-seo.json kontrol et`
      : 'data/tag-seo.json boş.'
    );
    process.exit(1);
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log(' update-tag-seo.js — ibrahiminyeri.com');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Güncellenecek: ${targets.length} etiket`);
  if (DRY_RUN) console.log('⚠️  DRY-RUN — API çağrısı yapılmıyor\n');
  else         console.log('');

  let ok = 0, fail = 0;
  const failures = [];

  for (let i = 0; i < targets.length; i++) {
    const [slug, tagData] = targets[i];
    console.log(`[${i + 1}/${targets.length}] ${slug}`);

    const result = await updateTagSeo(slug, tagData);
    if (result.ok) {
      ok++;
    } else {
      fail++;
      failures.push(`${slug} → ${result.reason}`);
    }

    // Rate limit
    if (!DRY_RUN) await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log(`Sonuç: ${ok} başarılı, ${fail} başarısız`);

  if (failures.length > 0) {
    console.log('\nBaşarısız:');
    failures.forEach(f => console.log(`  - ${f}`));
  }

  if (!DRY_RUN && fail === 0) {
    console.log('\n✅ Tüm etiketlerin SEO verisi güncellendi.');
    console.log('Doğrulamak için: fetch-tags.js çalıştır ve tag sayfalarını kontrol et.');
  }
}

main().catch(err => {
  console.error('Beklenmeyen hata:', err);
  process.exit(1);
});
