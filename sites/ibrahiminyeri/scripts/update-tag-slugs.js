/**
 * update-tag-slugs.js — Etiket slug'larını düzelt (TR karakter + numeric suffix)
 *
 * Kullanım:
 *   node sites/ibrahiminyeri/scripts/update-tag-slugs.js --dry-run
 *   node sites/ibrahiminyeri/scripts/update-tag-slugs.js
 *   node sites/ibrahiminyeri/scripts/update-tag-slugs.js --id 2ad320ad-...
 *
 * Kaynak: etiketler.json → panelAction !== null olan tag'ler
 * Endpoint: PATCH /blog/v3/tags/{id}  fieldMask: ["slug"]
 */

'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const CREDENTIALS = (() => {
  const f = path.join(__dirname, '..', '..', '..', 'wix-credentials.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
})();

const CONFIG       = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json'), 'utf8'));
const ETIKETLER    = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'etiketler.json'), 'utf8'));

const API_KEY = process.env.WIX_API_KEY || CREDENTIALS.apiKey;
const SITE_ID = CONFIG.siteId;
const DRY_RUN = process.argv.includes('--dry-run');
const idArg   = (() => { const i = process.argv.indexOf('--id'); return i !== -1 ? process.argv[i + 1] : null; })();

// ─── API yardımcısı ───────────────────────────────────────────────────────

function wixPatch(tagId, body) {
  return new Promise((resolve, reject) => {
    const b = JSON.stringify(body);
    const opts = {
      hostname: 'www.wixapis.com',
      path:     `/blog/v3/tags/${tagId}`,
      method:   'PATCH',
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

// ─── Ana işlem ────────────────────────────────────────────────────────────

async function main() {
  if (!API_KEY) {
    console.error('WIX_API_KEY bulunamadı.');
    process.exit(1);
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log(' update-tag-slugs.js — ibrahiminyeri.com');
  console.log('═══════════════════════════════════════════════════');
  if (DRY_RUN) console.log('⚠️  DRY-RUN — API çağrısı yapılmıyor\n');

  // panelAction olan (slug düzeltme bekleyen) tag'leri filtrele
  let targets = ETIKETLER.tags.filter(t => t.slug !== t.slugTarget);
  if (idArg) targets = targets.filter(t => t.id === idArg);

  if (targets.length === 0) {
    console.log('✅ Düzeltilecek slug yok. etiketler.json zaten temiz.');
    return;
  }

  console.log(`Düzeltilecek: ${targets.length} etiket\n`);

  let ok = 0, fail = 0;
  const failures = [];
  const results  = [];

  for (let i = 0; i < targets.length; i++) {
    const tag = targets[i];
    console.log(`[${i + 1}/${targets.length}] "${tag.label}"`);
    console.log(`  ${tag.slug} → ${tag.slugTarget}`);

    if (DRY_RUN) {
      console.log('  [DRY] atlandı\n');
      ok++;
      continue;
    }

    const res = await wixPatch(tag.id, {
      tag:       { slug: tag.slugTarget },
      fieldMask: { paths: ['slug'] }
    });

    if (res.status === 200 || res.status === 201) {
      const actualSlug = res.data?.tag?.slug;
      console.log(`  ✅ Güncellendi → gerçek slug: "${actualSlug}"`);
      ok++;
      results.push({ id: tag.id, oldSlug: tag.slug, newSlug: actualSlug || tag.slugTarget });
    } else {
      const err = typeof res.data === 'object'
        ? (res.data.message || res.data.details?.applicationError?.description || JSON.stringify(res.data).slice(0, 200))
        : String(res.data).slice(0, 200);
      console.log(`  ❌ HATA ${res.status}: ${err}`);
      fail++;
      failures.push({ label: tag.label, slug: tag.slug, target: tag.slugTarget, error: `${res.status}: ${err}` });
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }

  // ─── Özet ───────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════');
  console.log(`Sonuç: ${ok} başarılı, ${fail} başarısız`);

  if (failures.length > 0) {
    console.log('\n─── Başarısız ──────────────────────────────────────');
    failures.forEach(f => console.log(`  ❌ "${f.label}" [${f.slug}] → ${f.target}\n     ${f.error}`));

    if (failures.every(f => f.error.includes('400') || f.error.toLowerCase().includes('slug'))) {
      console.log('\n⚠️  Wix Blog Tag API slug güncellemeyi DESTEKLEMIYOR.');
      console.log('   Slug değişikliği YALNIZCA Wix Panel\'den yapılabilir:');
      console.log('   Panel → Blog → Etiketler → Etiket → ✏️ Düzenle → URL Alanı');
      console.log('\n   Rehber: sites/ibrahiminyeri/SEO-AUDIT-SLUG-DUZELTME.md');
    }
  }

  // ─── Başarılıysa etiketler.json güncelle ─────────────────────────────
  if (results.length > 0 && !DRY_RUN) {
    const etiketler = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'etiketler.json'), 'utf8'));
    for (const r of results) {
      const entry = etiketler.tags.find(t => t.id === r.id);
      if (entry) {
        entry.slug = r.newSlug;
        if (entry.slug === entry.slugTarget) entry.panelAction = null;
      }
    }
    fs.writeFileSync(
      path.join(__dirname, '..', 'etiketler.json'),
      JSON.stringify(etiketler, null, 2),
      'utf8'
    );
    console.log('\n✅ etiketler.json güncellendi.');
  }
}

main().catch(err => {
  console.error('Beklenmeyen hata:', err);
  process.exit(1);
});
