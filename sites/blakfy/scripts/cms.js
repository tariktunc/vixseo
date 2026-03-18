/**
 * Blakfy news koleksiyonu için kısayol wrapper.
 *
 * Kullanım (değişmedi):
 *   node sites/blakfy/scripts/cms.js --status
 *   node sites/blakfy/scripts/cms.js --pull
 *   node sites/blakfy/scripts/cms.js --sync
 *   node sites/blakfy/scripts/cms.js --sync --dry-run
 *
 * Tüm işlemler root scripts/cms.js'e yönlendirilir:
 *   --site blakfy --collection news otomatik eklenir.
 *
 * Başka koleksiyon için:
 *   node scripts/cms.js --site blakfy --collection <koleksiyon-id> --status
 */

'use strict';

const path     = require('path');
const { spawnSync } = require('child_process');

const rootCms = path.join(__dirname, '..', '..', '..', 'scripts', 'cms.js');

const result = spawnSync(
  process.execPath,
  [rootCms, '--site', 'blakfy', '--collection', 'news', ...process.argv.slice(2)],
  { stdio: 'inherit' }
);

process.exit(result.status || 0);
