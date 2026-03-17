'use strict';

/**
 * generate-cover.js — Blog kapak görseli üretici
 *
 * Kullanım (standalone):
 *   node generate-cover.js --slug="et-mangal" --title="Başlık" --query="grilled meat"
 *
 * publish.js'den modül olarak:
 *   const { generateCover } = require('./generate-cover');
 *   const result = await generateCover({ slug, title, imageUrl, imageQuery });
 *   // result.pexelsUrl  → Wix import için
 *   // result.localPath  → yerel WebP dosyası
 */

const https  = require('https');
const http   = require('http');
const fs     = require('fs');
const path   = require('path');

// .env'den yükle (publish.js zaten yüklüyorsa sorun yok)
try { require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') }); } catch(e) {}

let sharp;
try { sharp = require('sharp'); } catch(e) {
  console.warn('[generate-cover] Sharp bulunamadı: npm install sharp');
}

const PEXELS_KEY  = process.env.PEXELS_API_KEY;
const COVERS_DIR  = path.join(__dirname, '..', 'covers');

// ─── Yardımcılar ─────────────────────────────────────────────────────────

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'xmlBlog/1.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function pexelsSearch(query) {
  return new Promise((resolve, reject) => {
    if (!PEXELS_KEY || PEXELS_KEY === 'BURAYA_YAZILACAK') {
      return reject(new Error('PEXELS_API_KEY .env\'de tanımlı değil'));
    }
    const q = encodeURIComponent(query);
    const opts = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${q}&per_page=5&orientation=landscape`,
      headers: { Authorization: PEXELS_KEY }
    };
    https.get(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          const photo = json.photos?.[0];
          if (!photo) return reject(new Error('Pexels sonuç yok: ' + query));
          resolve({
            url: photo.src.large2x || photo.src.large,
            photographer: photo.photographer,
            id: photo.id
          });
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function buildOverlay(imageBuffer, title, subtitle) {
  if (!sharp) throw new Error('Sharp kurulu değil');

  if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });

  // Başlık metni görseli
  const titleImg = await sharp({
    text: {
      text: `<span foreground="white" size="40000" weight="bold">${title}</span>`,
      rgba: true, width: 1050, height: 85, align: 'left'
    }
  }).png().toBuffer();

  // Alt başlık (opsiyonel)
  let subtitleLayer = [];
  if (subtitle) {
    const subImg = await sharp({
      text: {
        text: `<span foreground="#cccccc" size="24000">${subtitle}</span>`,
        rgba: true, width: 900, height: 50, align: 'left'
      }
    }).png().toBuffer();
    subtitleLayer = [{ input: subImg, top: 553, left: 62, blend: 'over' }];
  }

  // Gradient overlay
  const gradient = Buffer.from(`<svg width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="40%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.88"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="60" y="600" width="130" height="5" fill="#FF6B35" rx="2"/>
  </svg>`);

  const buffer = await sharp(imageBuffer)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .composite([
      { input: gradient, blend: 'over' },
      { input: titleImg, top: 486, left: 60, blend: 'over' },
      ...subtitleLayer
    ])
    .webp({ quality: 32, smartSubsample: true })
    .toBuffer();

  return buffer;
}

// ─── Ana fonksiyon ────────────────────────────────────────────────────────

/**
 * @param {object} opts
 * @param {string} opts.slug        - URL slug (dosya adı için)
 * @param {string} opts.title       - Kapak başlığı (overlay metni)
 * @param {string} [opts.subtitle]  - Alt başlık (opsiyonel)
 * @param {string} [opts.imageUrl]  - Hazır Pexels URL (varsa arama yapma)
 * @param {string} [opts.imageQuery]- Pexels arama terimi (yoksa title kullanılır)
 * @returns {{ pexelsUrl, localPath, sizeKb }}
 */
async function generateCover({ slug, title, subtitle, imageUrl, imageQuery }) {
  // 1. Görsel URL bul
  let pexelsUrl = imageUrl;
  if (!pexelsUrl) {
    const query = imageQuery || title;
    console.log('  Pexels aranıyor: "' + query + '"');
    const photo = await pexelsSearch(query);
    pexelsUrl = photo.url;
    console.log('  Pexels: ' + pexelsUrl);
  }

  // 2. İndir
  const imageBuffer = await fetchBuffer(pexelsUrl);

  // 3. Sharp overlay
  const coverBuffer = await buildOverlay(imageBuffer, title, subtitle);

  // 4. Kaydet
  const localPath = path.join(COVERS_DIR, slug + '.webp');
  fs.writeFileSync(localPath, coverBuffer);
  const sizeKb = Math.round(coverBuffer.length / 1024);
  console.log(`  Kapak kaydedildi: covers/${slug}.webp (${sizeKb} KB)`);

  return { pexelsUrl, localPath, sizeKb };
}

module.exports = { generateCover };

// ─── Standalone çalıştırma ────────────────────────────────────────────────

if (require.main === module) {
  const args = Object.fromEntries(
    process.argv.slice(2)
      .filter(a => a.startsWith('--'))
      .map(a => a.slice(2).split('='))
  );

  if (!args.slug || !args.title) {
    console.log('Kullanım: node generate-cover.js --slug="et-mangal" --title="Başlık" [--query="grilled meat"] [--subtitle="Alt başlık"]');
    process.exit(1);
  }

  generateCover({ ...args, imageQuery: args.query })
    .then(r => console.log('Tamamlandı:', r))
    .catch(e => { console.error('Hata:', e.message); process.exit(1); });
}
