/**
 * update.js — Yayınlanmış yazıların içeriğini Wix'te güncelle
 *
 * Kullanım:
 *   node scripts/update.js                    → status: published olan tüm yazıları güncelle
 *   node scripts/update.js --dry-run          → API çağrısı yapmadan önizle
 *   node scripts/update.js --slug anahtar-seo → sadece belirtilen slug'ı güncelle
 *
 * Ne yapar:
 *   1. status: published + wixId olan .md dosyalarını okur
 *   2. markdownToWixNodes() ile içeriği yeniden dönüştürür (inline bold/kod/link dahil)
 *   3. PATCH /blog/v3/draft-posts/{wixId} ile sadece richContent günceller
 */

'use strict';

const https  = require('https');
const fs     = require('fs');
const path   = require('path');
const { parseFrontmatter, markdownToWixNodes } = require('./convert');

// ─── Ayarlar ─────────────────────────────────────────────────────────────

const API_KEY  = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImRlODllZTA0LTg0NmYtNDEwNC1iMjA3LWZlNmZkZjE3NDA2OFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjc2M2U5NmI0LTM5NGItNDkyNC1iMTMxLWYxZGU0NmMyMmE2MlwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIxNjI2YjU5NS1mNTBjLTQ4ZWMtYTVkNC1jNGE3YzQzMGUxNGVcIn19IiwiaWF0IjoxNzczNjE5MDM0fQ.bCSWK71m5bUwiam4PYGVPavchBRNUcNdwL8df9hlUYrEggBbk0Or1WJ7c_5_ant72lM_tFa44-HpmGmC_DOm8fNxqBUq_TzXHRflTE5bs0Sqtx3P1bFxqiOvqonPQ15Jr02dwi5IUFl3RkMEPxdc7XeSCTrm6LwTQYXsHUokCEWpNS6bE-zLZgRX1Ulx6s3p6-U-zFIqa3HBR5KTgoYRRkAnRMUKHtP3TKq1tryqyCBod9zBK0MEBhjvsDgHCD7SeOmEDgbyuo8xDZKNuM9huSGIxSiduxKLpORSSgSqPjzFBOPqS-4Gx8ApDqFnFKiYEP7ByvS-iIe1-PnvHDkSLQ';
const SITE_ID  = '7a2f84ce-61de-4785-b61d-e81718514e0a';

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const DRY_RUN   = process.argv.includes('--dry-run');
const slugArg   = (() => {
  const idx = process.argv.indexOf('--slug');
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

// ─── API yardımcısı ───────────────────────────────────────────────────────

function wixReq(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const b = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'www.wixapis.com', path: apiPath, method,
      headers: {
        'Authorization': API_KEY,
        'wix-site-id': SITE_ID,
        'Content-Type': 'application/json',
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

// ─── Tek yazı güncelle ────────────────────────────────────────────────────

async function updatePost(filePath) {
  const fileName = path.basename(filePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { meta, body } = parseFrontmatter(raw);

  const wixId = meta.wixId;
  if (!wixId || wixId === '?') {
    console.log('  SKIP — wixId yok');
    return { ok: false, reason: 'no-wixId' };
  }

  // Yeni nodes üret
  const nodes = markdownToWixNodes(body);

  if (DRY_RUN) {
    console.log('  [DRY RUN] wixId: ' + wixId + ' | nodes: ' + nodes.length);
    // İlk 3 node'u önizle
    nodes.slice(0, 3).forEach((n, idx) => {
      const preview = JSON.stringify(n).slice(0, 120);
      console.log('    node[' + idx + ']: ' + preview);
    });
    return { ok: true };
  }

  // PATCH richContent
  const patchBody = {
    draftPost: {
      richContent: { nodes }
    },
    fieldMask: 'richContent'
  };

  const res = await wixReq('PATCH', '/blog/v3/draft-posts/' + wixId, patchBody);

  if (res.status === 200 || res.status === 201) {
    console.log('  ✓ Güncellendi — ' + nodes.length + ' node');
    return { ok: true };
  } else {
    const errMsg = JSON.stringify(res.data).slice(0, 200);
    console.log('  ✗ HATA [' + res.status + ']: ' + errMsg);
    return { ok: false, reason: res.status + ': ' + errMsg };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('posts/ klasörü bulunamadı: ' + POSTS_DIR);
    process.exit(1);
  }

  const allFiles = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(POSTS_DIR, f));

  // Sadece published + wixId olan dosyaları işle
  let targets = allFiles.filter(f => {
    const raw = fs.readFileSync(f, 'utf8');
    const { meta } = parseFrontmatter(raw);
    if (meta.status !== 'published') return false;
    if (!meta.wixId || meta.wixId === '?') return false;
    return true;
  });

  // --slug filtresi
  if (slugArg) {
    targets = targets.filter(f => path.basename(f, '.md') === slugArg);
    if (targets.length === 0) {
      console.log('Slug bulunamadı: ' + slugArg);
      return;
    }
  }

  console.log('Toplam hedef: ' + targets.length + (slugArg ? ' (--slug: ' + slugArg + ')' : ''));
  if (DRY_RUN) console.log('[DRY RUN modu — API çağrısı yapılmaz]\n');

  let ok = 0;
  let fail = 0;
  const failures = [];

  for (let i = 0; i < targets.length; i++) {
    const f = targets[i];
    const name = path.basename(f);
    console.log('\n[' + (i + 1) + '/' + targets.length + '] ' + name);

    const result = await updatePost(f);
    if (result.ok) {
      ok++;
    } else {
      fail++;
      failures.push(name + ' → ' + (result.reason || 'bilinmeyen hata'));
    }

    // Rate limit için kısa bekleme
    if (!DRY_RUN) await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n─────────────────────────────────');
  console.log('Tamamlandı: ' + ok + ' başarılı, ' + fail + ' başarısız');
  if (failures.length > 0) {
    console.log('\nBaşarısız yazılar:');
    failures.forEach(f => console.log('  - ' + f));
  }
}

main().catch(console.error);
