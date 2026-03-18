'use strict';

/**
 * core/wix.js — Wix API HTTP client factory
 *
 * Kullanım:
 *   const { createClient } = require('../core/wix');
 *   const wix = createClient(siteId);
 *   const res = await wix('POST', '/blog/v3/draft-posts', { draftPost });
 */

require('dotenv').config();
const https = require('https');
const fs    = require('fs');
const path  = require('path');

function getApiKey() {
  if (process.env.WIX_API_KEY) return process.env.WIX_API_KEY;

  // Fallback: wix-credentials.json (gerçek değer varsa)
  try {
    const cred = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'wix-credentials.json'), 'utf8')
    );
    if (cred.apiKey && !cred.apiKey.startsWith('WIX_')) return cred.apiKey;
  } catch {}

  throw new Error('WIX_API_KEY bulunamadı — .env dosyasına ekle: WIX_API_KEY=IST.xxx');
}

/**
 * createClient(siteId) → async wix(method, path, body)
 */
function createClient(siteId) {
  const API_KEY = getApiKey();

  return function wixReq(method, apiPath, body) {
    return new Promise((resolve, reject) => {
      const b = body ? JSON.stringify(body) : null;
      const opts = {
        hostname: 'www.wixapis.com',
        path:     apiPath,
        method,
        headers: {
          'Authorization': API_KEY,
          'wix-site-id':   siteId,
          'Content-Type':  'application/json',
          ...(b ? { 'Content-Length': Buffer.byteLength(b) } : {})
        }
      };

      const req = https.request(opts, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try   { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
          catch { resolve({ status: res.statusCode, data }); }
        });
      });

      req.on('error', reject);
      if (b) req.write(b);
      req.end();
    });
  };
}

module.exports = { createClient };
