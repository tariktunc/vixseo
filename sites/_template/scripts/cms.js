/**
 * Bu sitenin CMS koleksiyonları için thin wrapper.
 *
 * Kullanım:
 *   node sites/{SITE_NAME}/scripts/cms.js --collection {koleksiyon-id} --status
 *   node sites/{SITE_NAME}/scripts/cms.js --collection {koleksiyon-id} --pull
 *   node sites/{SITE_NAME}/scripts/cms.js --collection {koleksiyon-id} --sync
 *   node sites/{SITE_NAME}/scripts/cms.js --collection {koleksiyon-id} --sync --dry-run
 *   node sites/{SITE_NAME}/scripts/cms.js --list    → tüm koleksiyonları listele
 *
 * Önce: sites/{SITE_NAME}/{koleksiyon-id}-inventory.json oluştur
 *   {
 *     "collection": "{koleksiyon-id}",
 *     "fieldMap": { "title": "title", "description": "description" },
 *     "lastPulledAt": null,
 *     "lastSyncedAt": null,
 *     "items": []
 *   }
 *
 * Sonra --pull ile Wix'ten mevcut verileri çek.
 *
 * Doğrudan root script ile de çalışabilirsiniz:
 *   node scripts/cms.js --site {SITE_NAME} --collection {koleksiyon-id} --status
 */

'use strict';

const path     = require('path');
const { spawnSync } = require('child_process');

// Klasör adından site adını otomatik tespit et
const SITE = path.basename(path.join(__dirname, '..'));

const rootCms = path.join(__dirname, '..', '..', '..', 'scripts', 'cms.js');

const result = spawnSync(
  process.execPath,
  [rootCms, '--site', SITE, ...process.argv.slice(2)],
  { stdio: 'inherit' }
);

process.exit(result.status || 0);
