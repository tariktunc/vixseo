/**
 * cms.js — Site-agnostic Wix CMS Data Collections yöneticisi
 *
 * Kullanım:
 *   node scripts/cms.js --site blakfy --collection news --status
 *   node scripts/cms.js --site blakfy --collection news --pull
 *   node scripts/cms.js --site blakfy --collection news --sync
 *   node scripts/cms.js --site blakfy --collection news --sync --dry-run
 *   node scripts/cms.js --site blakfy --collection news --list
 *   node scripts/cms.js --site blakfy --list                      → tüm koleksiyonları listele
 *
 * Her site için:
 *   - Config    : sites/{site}/config.json
 *   - Inventory : sites/{site}/{collection}-inventory.json
 *   - Convert   : sites/{site}/scripts/convert.js  (varsa)
 *
 * fieldMap (inventory JSON içinde):
 *   inventory.fieldMap.title       → Wix'teki title alan adı   (default: "title")
 *   inventory.fieldMap.description → Wix'teki desc alan adı    (default: "description")
 */

'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ─── Argüman parse ────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}

const SITE_NAME    = getArg('--site');
const COLLECTION   = getArg('--collection');
const QUERY_COL    = getArg('--collection'); // listele için de kullanılır
const LIMIT        = parseInt(getArg('--limit') || '50', 10);
const DO_STATUS    = args.includes('--status');
const DO_PULL      = args.includes('--pull');
const DO_SYNC      = args.includes('--sync');
const DO_LIST      = args.includes('--list');
const DRY_RUN      = args.includes('--dry-run');

// ─── Gereklilik kontrolleri ───────────────────────────────────────────────────

if (!SITE_NAME) {
  console.error('Hata: --site <site-adi> gerekli.');
  console.error('  Örnek: node scripts/cms.js --site blakfy --collection news --status');
  process.exit(1);
}

// ─── Config yükleme ───────────────────────────────────────────────────────────

const ROOT        = path.join(__dirname, '..');
const SITES_DIR   = path.join(ROOT, 'sites');
const SITE_DIR    = path.join(SITES_DIR, SITE_NAME);
const CONFIG_PATH = path.join(SITE_DIR, 'config.json');

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('Hata: ' + CONFIG_PATH + ' bulunamadı.');
  console.error('  Site klasörünün doğru adlandırıldığından emin olun: sites/' + SITE_NAME + '/');
  process.exit(1);
}

require('dotenv').config({ path: path.join(ROOT, '.env') });
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

const API_KEY = process.env.WIX_API_KEY;
const SITE_ID = CONFIG.siteId;

if (!API_KEY) {
  console.error('Hata: WIX_API_KEY bulunamadı. Kök dizindeki .env dosyasını kontrol edin.');
  process.exit(1);
}

// ─── Inventory yükleme (collection gerektiğinde) ──────────────────────────────

let INVENTORY_PATH = null;
let inv = null;
let FIELD_TITLE = 'title';
let FIELD_DESC  = 'description';

function requireCollection() {
  if (!COLLECTION) {
    console.error('Hata: Bu komut için --collection <koleksiyon-id> gerekli.');
    console.error('  Örnek: node scripts/cms.js --site ' + SITE_NAME + ' --collection news --status');
    process.exit(1);
  }
  INVENTORY_PATH = path.join(SITE_DIR, COLLECTION + '-inventory.json');
  if (!fs.existsSync(INVENTORY_PATH)) {
    console.error('Hata: ' + INVENTORY_PATH + ' bulunamadı.');
    console.error('  Yeni bir koleksiyon için önce inventory dosyasını oluşturun.');
    process.exit(1);
  }
  inv = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
  const fm = inv.fieldMap || {};
  FIELD_TITLE = fm.title || 'title';
  FIELD_DESC  = fm.description || 'description';
}

function saveInventory() {
  fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inv, null, 2), 'utf8');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// ─── API yardımcısı ───────────────────────────────────────────────────────────

function wixReq(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const b = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'www.wixapis.com',
      path: apiPath,
      method,
      headers: {
        'Authorization': API_KEY,
        'wix-site-id': SITE_ID,
        'Content-Type': 'application/json',
        ...(b ? { 'Content-Length': Buffer.byteLength(b) } : {})
      }
    };
    const r = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
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

// ─── Koleksiyonları listele ───────────────────────────────────────────────────

async function listCollections() {
  console.log('[' + SITE_NAME + '] Koleksiyonlar yükleniyor...\n');
  const res = await wixReq('GET', '/wix-data/v2/collections', null);

  if (res.status !== 200) {
    console.error('HATA [' + res.status + ']:', JSON.stringify(res.data, null, 2));
    process.exit(1);
  }

  const collections = res.data?.collections || [];

  if (collections.length === 0) {
    console.log('Koleksiyon bulunamadı.');
    return;
  }

  console.log('Toplam koleksiyon: ' + collections.length + '\n');
  console.log('─'.repeat(60));

  collections.forEach((col, i) => {
    const fieldCount = (col.fields || []).length;
    console.log((i + 1) + '. ' + (col.displayName || col.id));
    console.log('   ID         : ' + col.id);
    console.log('   Alan sayısı: ' + fieldCount);
    if (col.type) console.log('   Tür        : ' + col.type);
    console.log();
  });

  console.log('─'.repeat(60));
  console.log('Bir koleksiyonu sorgulamak için:');
  console.log('  node scripts/cms.js --site ' + SITE_NAME + ' --collection <ID> --list');
}

// ─── Koleksiyon item'larını sorgula ──────────────────────────────────────────

async function queryCollection() {
  requireCollection();
  console.log('[' + SITE_NAME + '] Koleksiyon sorgulanıyor: ' + COLLECTION);
  console.log('Limit: ' + LIMIT + '\n');

  const res = await wixReq('POST', '/wix-data/v2/items/query', {
    dataCollectionId: COLLECTION,
    paging: { limit: LIMIT, offset: 0 },
    returnTotalCount: true
  });

  if (res.status !== 200) {
    console.error('HATA [' + res.status + ']:', JSON.stringify(res.data, null, 2));
    process.exit(1);
  }

  const dataItems  = res.data?.dataItems || [];
  const totalCount = res.data?.totalCount || res.data?.pagingMetadata?.total || '?';

  if (dataItems.length === 0) {
    console.log('Bu koleksiyonda item bulunamadı.');
    return;
  }

  console.log('Toplam item: ' + totalCount + ' | Gösterilen: ' + dataItems.length + '\n');
  console.log('─'.repeat(60));

  dataItems.forEach((dataItem, i) => {
    const id   = dataItem.id || '—';
    const item = dataItem.data || dataItem;

    console.log('[' + (i + 1) + '] id: ' + id);

    const fmtDate = v => {
      if (!v) return null;
      if (typeof v === 'string') return v;
      if (v.$date) return new Date(v.$date).toLocaleString('tr-TR');
      if (v.seconds) return new Date(v.seconds * 1000).toLocaleString('tr-TR');
      return JSON.stringify(v);
    };
    if (item._createdDate) console.log('    Oluşturulma: ' + fmtDate(item._createdDate));
    if (item._updatedDate) console.log('    Güncellenme: ' + fmtDate(item._updatedDate));

    const dataFields = Object.entries(item).filter(([k]) => !k.startsWith('_'));
    dataFields.forEach(([k, v]) => {
      const val = typeof v === 'object' ? JSON.stringify(v) : String(v);
      const display = val.length > 120 ? val.slice(0, 117) + '...' : val;
      console.log('    ' + k + ': ' + display);
    });
    console.log();
  });

  console.log('─'.repeat(60));

  if (typeof totalCount === 'number' && totalCount > LIMIT) {
    console.log('Daha fazla item için: --limit ' + (LIMIT + 50));
  }
}

// ─── --status ─────────────────────────────────────────────────────────────────

function showStatus() {
  requireCollection();
  const counts  = { synced: 0, new: 0, modified: 0 };
  const pending = [];

  for (const item of inv.items) {
    const s = item._status || 'synced';
    counts[s] = (counts[s] || 0) + 1;
    if (s === 'new' || s === 'modified') {
      pending.push({ status: s, slug: item.slug });
    }
  }

  console.log('\n📊 [' + SITE_NAME + '] ' + COLLECTION + ' koleksiyonu durumu');
  console.log('  synced   : ' + (counts.synced || 0));
  console.log('  new      : ' + (counts.new || 0));
  console.log('  modified : ' + (counts.modified || 0));
  console.log('  Toplam   : ' + inv.items.length);
  console.log('  Son pull : ' + (inv.lastPulledAt || '—'));
  console.log('  Son sync : ' + (inv.lastSyncedAt || '—'));

  if (pending.length > 0) {
    console.log('\nWix\'e gönderilecek (--sync ile):');
    for (const p of pending) {
      console.log('  [' + p.status.toUpperCase().padEnd(8) + '] ' + p.slug);
    }
  } else {
    console.log('\nHer şey Wix ile uyumlu, gönderilecek item yok.');
  }
  console.log();
}

// ─── --pull ───────────────────────────────────────────────────────────────────

async function pullFromWix() {
  requireCollection();
  console.log('[' + SITE_NAME + '] ' + COLLECTION + ' koleksiyonu Wix\'ten çekiliyor...\n');

  const res = await wixReq('POST', '/wix-data/v2/items/query', {
    dataCollectionId: COLLECTION,
    paging: { limit: 100, offset: 0 },
    returnTotalCount: true
  });

  if (res.status !== 200) {
    console.error('HATA [' + res.status + ']:', JSON.stringify(res.data, null, 2));
    process.exit(1);
  }

  const wixItems   = res.data?.dataItems || [];
  const totalCount = res.data?.totalCount || res.data?.pagingMetadata?.total || '?';
  console.log('Wix\'ten ' + wixItems.length + ' item alındı (toplam: ' + totalCount + ')\n');

  let updated = 0, added = 0, skipped = 0;

  const parseDate = v => {
    if (!v) return null;
    if (typeof v === 'string') return v.slice(0, 10);
    if (v.$date) return new Date(v.$date).toISOString().slice(0, 10);
    return null;
  };

  for (const wi of wixItems) {
    const wixId      = wi.id;
    const wixData    = wi.data || {};
    const wixSlug    = wixData.slug || '';
    const wixUpdated = parseDate(wixData._updatedDate);
    const wixCreated = parseDate(wixData._createdDate);

    const localIdx = inv.items.findIndex(
      it => it.id === wixId || (wixSlug && it.slug === wixSlug)
    );

    if (localIdx !== -1) {
      const local = inv.items[localIdx];

      // new veya modified item'a dokunma
      if (local._status === 'new' || local._status === 'modified') {
        skipped++;
        continue;
      }

      // Wix daha yeni → local güncelle
      if (wixUpdated && local.updatedDate && wixUpdated > local.updatedDate) {
        inv.items[localIdx] = Object.assign({}, local, {
          id:          wixId,
          slug:        wixSlug || local.slug,
          title:       wixData[FIELD_TITLE] || local.title,
          description: wixData[FIELD_DESC]  || local.description,
          updatedDate: wixUpdated,
          createdDate: wixCreated || local.createdDate,
          _status:     'synced'
        });
        updated++;
      }
    } else {
      // Wix'te var ama local'de yok → ekle
      inv.items.push({
        id:          wixId,
        slug:        wixSlug,
        title:       wixData[FIELD_TITLE] || '',
        description: wixData[FIELD_DESC]  || null,
        content:     null,
        createdDate: wixCreated || today(),
        updatedDate: wixUpdated || today(),
        _status:     'synced'
      });
      added++;
    }
  }

  inv.lastPulledAt = today();
  saveInventory();

  console.log('Pull tamamlandı:');
  console.log('  Güncellenen: ' + updated);
  console.log('  Eklenen    : ' + added);
  console.log('  Atlanan    : ' + skipped + ' (new/modified — korundu)');
  console.log('  lastPulledAt → ' + inv.lastPulledAt + '\n');
}

// ─── --sync ───────────────────────────────────────────────────────────────────

async function syncToWix() {
  requireCollection();

  // convert.js: site'ın kendi convert.js'ini kullan, yoksa içeriği plain text gönder
  let markdownToWixNodes = null;
  const convertPath = path.join(SITE_DIR, 'scripts', 'convert.js');
  if (fs.existsSync(convertPath)) {
    try {
      markdownToWixNodes = require(convertPath).markdownToWixNodes;
    } catch (e) {
      console.warn('convert.js yüklenemedi, richcontent devre dışı: ' + e.message);
    }
  }

  const newItems      = inv.items.filter(it => it._status === 'new');
  const modifiedItems = inv.items.filter(it => it._status === 'modified');

  if (newItems.length === 0 && modifiedItems.length === 0) {
    console.log('Gönderilecek item yok. Hepsi synced durumunda.');
    return;
  }

  console.log('\n' + (DRY_RUN ? '[DRY-RUN] ' : '') + '[' + SITE_NAME + '] Sync başlıyor...');
  console.log('  Koleksiyon : ' + COLLECTION);
  console.log('  NEW        : ' + newItems.length);
  console.log('  MODIFIED   : ' + modifiedItems.length + '\n');

  // ── CREATE (new) ──────────────────────────────────────────────────────────

  for (const item of newItems) {
    const richcontent = (item.content && markdownToWixNodes)
      ? { nodes: markdownToWixNodes(item.content) }
      : null;

    const data = {
      [FIELD_TITLE]: item.title,
      slug: item.slug,
      ...(item.description != null ? { [FIELD_DESC]: item.description } : {}),
      ...(richcontent ? { richcontent } : {})
    };

    // Ek alanlar (title/description/slug/richcontent dışı)
    for (const [k, v] of Object.entries(item)) {
      if (['id', 'slug', 'title', 'description', 'content', 'createdDate',
           'updatedDate', '_status', 'fieldMap'].includes(k)) continue;
      data[k] = v;
    }

    const payload = {
      dataCollectionId: COLLECTION,
      item: { data }
    };

    console.log('[NEW] ' + item.slug);
    if (DRY_RUN) {
      console.log('  Payload:', JSON.stringify(payload, null, 2));
      continue;
    }

    const res = await wixReq('POST', '/wix-data/v2/items', payload);
    if (res.status === 200 || res.status === 201) {
      const createdId = res.data?.dataItem?.id || res.data?.item?.id || res.data?.id;
      if (createdId) {
        const idx = inv.items.findIndex(it => it.slug === item.slug);
        if (idx !== -1) {
          inv.items[idx].id        = createdId;
          inv.items[idx]._status   = 'synced';
          inv.items[idx].updatedDate = today();
        }
        console.log('  ✅ Oluşturuldu. id: ' + createdId);
      } else {
        console.log('  ✅ Oluşturuldu (id alınamadı). Yanıt:', JSON.stringify(res.data));
      }
    } else {
      console.error('  ❌ HATA [' + res.status + ']:', JSON.stringify(res.data));
    }
  }

  // ── UPDATE (modified) ─────────────────────────────────────────────────────

  for (const item of modifiedItems) {
    if (!item.id) {
      console.warn('[MODIFIED] ' + item.slug + ' → id eksik, atlandı. Önce --pull çalıştırın.');
      continue;
    }

    const richcontent = (item.content && markdownToWixNodes)
      ? { nodes: markdownToWixNodes(item.content) }
      : null;

    const data = {
      [FIELD_TITLE]: item.title,
      slug: item.slug,
      ...(item.description != null ? { [FIELD_DESC]: item.description } : {}),
      ...(richcontent ? { richcontent } : {})
    };

    // Ek alanlar
    for (const [k, v] of Object.entries(item)) {
      if (['id', 'slug', 'title', 'description', 'content', 'createdDate',
           'updatedDate', '_status', 'fieldMap'].includes(k)) continue;
      data[k] = v;
    }

    const payload = {
      dataCollectionId: COLLECTION,
      item: {
        id: item.id,
        data
      }
    };

    console.log('[MODIFIED] ' + item.slug);
    if (DRY_RUN) {
      console.log('  Payload:', JSON.stringify(payload, null, 2));
      continue;
    }

    const res = await wixReq('PUT', '/wix-data/v2/items/' + item.id, payload);
    if (res.status === 200) {
      const idx = inv.items.findIndex(it => it.id === item.id);
      if (idx !== -1) {
        inv.items[idx]._status   = 'synced';
        inv.items[idx].updatedDate = today();
      }
      console.log('  ✅ Güncellendi.');
    } else {
      console.error('  ❌ HATA [' + res.status + ']:', JSON.stringify(res.data));
    }
  }

  if (!DRY_RUN) {
    inv.lastSyncedAt = today();
    saveInventory();
    console.log('\n✅ Sync tamamlandı. lastSyncedAt → ' + inv.lastSyncedAt);
  } else {
    console.log('\n[DRY-RUN] Tamamlandı. Hiçbir şey gönderilmedi ve kaydedilmedi.');
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (DO_STATUS) {
    showStatus();
  } else if (DO_PULL) {
    await pullFromWix();
  } else if (DO_SYNC) {
    await syncToWix();
  } else if (DO_LIST && COLLECTION) {
    await queryCollection();
  } else if (DO_LIST || (!COLLECTION && !DO_STATUS && !DO_PULL && !DO_SYNC)) {
    await listCollections();
  } else if (COLLECTION) {
    await queryCollection();
  } else {
    console.log('Kullanım:');
    console.log('  node scripts/cms.js --site <site> --collection <col> --status');
    console.log('  node scripts/cms.js --site <site> --collection <col> --pull');
    console.log('  node scripts/cms.js --site <site> --collection <col> --sync [--dry-run]');
    console.log('  node scripts/cms.js --site <site> --list');
  }
}

main().catch(console.error);
