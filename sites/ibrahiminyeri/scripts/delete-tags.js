/**
 * delete-tags.js — İbrahiminyeri SEO Audit: 11 gereksiz etiket sil
 *
 * Kullanım:
 *   node sites/ibrahiminyeri/scripts/delete-tags.js
 *   node sites/ibrahiminyeri/scripts/delete-tags.js --dry-run
 *
 * Silinecek 11 tag (SEO audit kararı — 2026-03-18):
 *   1.  İbrahiminyeri      — marka adı tag, SEO değeri yok
 *   2.  bolu et mangal     — kannibalizasyon + bolu-et-mangal-2 suffix
 *   3.  bolu mangal        — kannibalizasyon (et mangal zaten var)
 *   4.  Bolu Yemek         — "Bolu'da Ne Yenir" ile identical search intent
 *   5.  Düzce Yemek        — "Düzce'de Ne Yenir" ile identical search intent
 *   6.  Düzce turizm       — "Düzce gezi" ile overlap
 *   7.  mola noktası       — "mola noktaları" ile tekil/çoğul duplicate
 *   8.  bolu dağı mola     — -1 suffix + "et mangal mola" yeterli
 *   9.  et mangal tarifi   — "mangal tarifleri" ile duplicate
 *  10.  mangal teknikleri  — "et mangal rehberi" kapsamında
 *  11.  gezi rehberi       — generic; "bolu gezilecek yerler" daha spesifik
 *
 * Sonraki adım (manuel):
 *   Wix Panel → Blog → Etiketler → Slug düzeltmeleri
 *   Bkz: sites/ibrahiminyeri/SEO-AUDIT-SLUG-DUZELTME.md
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

const API_KEY = process.env.WIX_API_KEY || CREDENTIALS.apiKey;
const SITE_ID = CONFIG.siteId;
const DRY_RUN = process.argv.includes('--dry-run');

// ─── Silinecek 11 tag ─────────────────────────────────────────────────────

const TAGS_TO_DELETE = [
  {
    id:     '577f479b-c337-4a2e-90da-ca3217f96edc',
    label:  'İbrahiminyeri',
    slug:   'i̇brahiminyeri',
    posts:  91,
    reason: 'Marka adı tag — kimse bunu arama motorunda aramaz'
  },
  {
    id:     '0a5e5a82-6bbf-42c7-a3ac-fee8276b758c',
    label:  'bolu et mangal',
    slug:   'bolu-et-mangal-2',
    posts:  7,
    reason: 'Kannibalizasyon + -2 suffix (3. kopya)'
  },
  {
    id:     '2947729e-3aee-469e-b795-cecb86905ecc',
    label:  'bolu mangal',
    slug:   'bolu-mangal',
    posts:  6,
    reason: 'Kannibalizasyon — "et mangal" (81p) zaten kapsıyor'
  },
  {
    id:     'd5661d16-39cd-40e0-b60b-21886450b58b',
    label:  'Bolu Yemek',
    slug:   'bolu-yemek',
    posts:  10,
    reason: '"Bolu\'da Ne Yenir" ile identical search intent'
  },
  {
    id:     '9bef872a-dd52-41ce-a397-19aa4031da5f',
    label:  'Düzce Yemek',
    slug:   'düzce-yemek',
    posts:  10,
    reason: '"Düzce\'de Ne Yenir" ile identical search intent'
  },
  {
    id:     'eb5f8583-c498-4959-825e-21544469611a',
    label:  'Düzce turizm',
    slug:   'düzce-turizm',
    posts:  5,
    reason: '"Düzce gezi" ile overlap; daha az spesifik'
  },
  {
    id:     'f3008896-6094-4d47-a2b9-ccf7a56b9d5c',
    label:  'mola noktası',
    slug:   'mola-noktası',
    posts:  4,
    reason: '"mola noktaları" ile tekil/çoğul duplicate'
  },
  {
    id:     '5f08e9f7-1935-46ae-a54b-c72dea39e7f7',
    label:  'bolu dağı mola',
    slug:   'bolu-dağı-mola-1',
    posts:  7,
    reason: '-1 suffix + "et mangal mola" (12p) yeterince kapsıyor'
  },
  {
    id:     'ac32acd0-81a4-47a7-8642-1a6d921f1488',
    label:  'et mangal tarifi',
    slug:   'et-mangal-tarifi',
    posts:  4,
    reason: '"mangal tarifleri" ile duplicate'
  },
  {
    id:     '34654baf-f2d6-4297-816a-c1802d39f888',
    label:  'mangal teknikleri',
    slug:   'mangal-teknikleri',
    posts:  4,
    reason: '"et mangal rehberi" kapsamında; gereksiz split'
  },
  {
    id:     '357b608d-0acc-4d71-bde9-edfa17f0a849',
    label:  'gezi rehberi',
    slug:   'gezi-rehberi',
    posts:  5,
    reason: 'Generic; "bolu gezilecek yerler" daha spesifik'
  },
];

// ─── API yardımcısı ───────────────────────────────────────────────────────

function wixDelete(tagId) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'www.wixapis.com',
      path:     `/blog/v3/tags/${tagId}`,
      method:   'DELETE',
      headers: {
        'Authorization': API_KEY,
        'wix-site-id':   SITE_ID,
        'Content-Type':  'application/json'
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
    r.end();
  });
}

// ─── Ana işlem ────────────────────────────────────────────────────────────

async function main() {
  console.log('\n═══════════════════════════════════════════════');
  console.log(' İbrahiminyeri — SEO Tag Temizliği (2026-03-18)');
  console.log('═══════════════════════════════════════════════');
  console.log(`Silinecek: ${TAGS_TO_DELETE.length} tag`);
  if (DRY_RUN) {
    console.log('⚠️  DRY-RUN modu — API çağrısı yapılmıyor');
  }
  console.log('');

  // Önizleme tablosu
  console.log('─── Silinecek Etiketler ───────────────────────');
  for (const tag of TAGS_TO_DELETE) {
    const posts = String(tag.posts).padStart(3);
    console.log(`  ${posts}p  "${tag.label}"  (slug: ${tag.slug})`);
    console.log(`       → ${tag.reason}`);
  }
  console.log('');

  if (!DRY_RUN) {
    console.log('─── API Silme İşlemleri ───────────────────────');
  }

  let deleted = 0;
  let failed  = 0;

  for (const tag of TAGS_TO_DELETE) {
    const label = `"${tag.label}"`;

    if (DRY_RUN) {
      deleted++;
      continue;
    }

    try {
      const res = await wixDelete(tag.id);
      if (res.status === 200 || res.status === 204) {
        console.log(`  ✅ Silindi: ${label}`);
        deleted++;
      } else if (res.status === 404) {
        console.log(`  ⚠️  Bulunamadı (zaten silinmiş?): ${label}`);
        deleted++; // Zaten yoksa tamam sayılır
      } else {
        console.log(`  ❌ HATA ${res.status}: ${label}`);
        const errMsg = typeof res.data === 'object'
          ? (res.data.message || JSON.stringify(res.data).slice(0, 100))
          : String(res.data).slice(0, 100);
        console.log(`     ${errMsg}`);
        failed++;
      }
    } catch (err) {
      console.log(`  ❌ BAĞLANTI HATASI: ${label} — ${err.message}`);
      failed++;
    }
  }

  console.log('\n═══════════════════════════════════════════════');
  if (DRY_RUN) {
    console.log(`DRY-RUN tamamlandı. Gerçek silme için --dry-run olmadan çalıştır.`);
  } else {
    console.log(`Sonuç: ${deleted} silindi, ${failed} başarısız`);
    if (failed === 0) {
      console.log(`\n✅ 44 → 33 tag. Wix'te artık ${44 - deleted} tag var.`);
    }
  }

  console.log('\nSonraki adım (manuel):');
  console.log('  Wix Panel → Blog → Etiketler → Slug + Label düzeltmeleri');
  console.log('  Bkz: sites/ibrahiminyeri/SEO-AUDIT-SLUG-DUZELTME.md\n');
}

main().catch(err => {
  console.error('Beklenmeyen hata:', err);
  process.exit(1);
});
