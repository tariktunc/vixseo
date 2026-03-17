/**
 * publish.js — Markdown posts/ → Wix Blog API
 *
 * Kullanım:
 *   node scripts/publish.js            → status: ready olan tüm yazıları yükle
 *   node scripts/publish.js --dry-run  → API'ye göndermeden önce önizle
 *
 * Adımlar:
 *   1. posts/*.md oku (status: ready olanlar)
 *   2. Kategori ve etiket slug → ID çözümle
 *   3. imageUrl varsa Wix Media'ya import et
 *   4. Markdown → Wix RichContent dönüştür
 *   5. Wix Blog API'ye UNPUBLISHED draft olarak POST et
 *   6. Başarılıysa frontmatter'da status: published ve wixId yaz
 */

'use strict';

const https  = require('https');
const fs     = require('fs');
const path   = require('path');
const { parseFrontmatter, markdownToWixNodes } = require('./convert');

// ─── Ayarlar ─────────────────────────────────────────────────────────────

const CREDENTIALS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'wix-credentials.json'), 'utf8'));
const CONFIG      = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json'), 'utf8'));

const API_KEY   = CREDENTIALS.apiKey;
const SITE_ID   = CONFIG.siteId;
const MEMBER_ID = CONFIG.memberId;

const POSTS_DIR    = path.join(__dirname, '..', 'posts');
const CATEGORIES   = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'));
const TAGS         = JSON.parse(fs.readFileSync(path.join(__dirname, 'tags.json'), 'utf8'));
const DRY_RUN      = process.argv.includes('--dry-run');

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

// ─── Görsel import ────────────────────────────────────────────────────────

async function importImage(imageUrl, slug) {
  const res = await wixReq('POST', '/site-media/v1/files/import', {
    url: imageUrl,
    displayName: slug + '.jpg',
    mimeType: 'image/jpeg',
    mediaType: 'IMAGE',
    parentFolderId: 'media-root'
  });
  if (res.status !== 200 && res.status !== 201) {
    throw new Error('Görsel import hatası [' + res.status + ']: ' + JSON.stringify(res.data).slice(0, 150));
  }
  const fileId = res.data?.file?.id;
  if (!fileId) throw new Error('file.id boş');
  await new Promise(r => setTimeout(r, 3000)); // import işlenmesi için bekle
  return fileId;
}

// ─── Slug → ID çözümleyiciler ─────────────────────────────────────────────

function resolveSlugs(slugArray, lookup, type) {
  if (!Array.isArray(slugArray)) return [];
  return slugArray.map(slug => {
    const entry = lookup[slug];
    if (!entry) { console.warn('  [WARN] ' + type + ' bulunamadı: ' + slug); return null; }
    return entry.id;
  }).filter(Boolean);
}

// ─── Frontmatter güncelle ─────────────────────────────────────────────────

function updateFrontmatter(filePath, updates) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp('^' + key + ':.*$', 'm');
    const line = key + ': "' + value + '"';
    if (regex.test(content)) {
      content = content.replace(regex, line);
    } else {
      // Satır yoksa --- kapanışından önce ekle
      content = content.replace(/^---$/m, line + '\n---');
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// ─── Tek yazı yükle ───────────────────────────────────────────────────────

async function publishPost(filePath) {
  const fileName = path.basename(filePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { meta, body } = parseFrontmatter(raw);

  if (!meta.title) { console.log('  SKIP — title yok'); return; }

  // Kategori ve etiket ID'leri
  const categoryIds = resolveSlugs(
    Array.isArray(meta.categories) ? meta.categories : [meta.categories].filter(Boolean),
    CATEGORIES, 'Kategori'
  );
  const tagIds = resolveSlugs(
    Array.isArray(meta.tags) ? meta.tags : [meta.tags].filter(Boolean),
    TAGS, 'Etiket'
  );

  // SEO data
  const seoTitle = meta.seoTitle || (meta.title + ' | Blakfy');
  const seoDesc  = meta.metaDesc || '';

  // Görsel
  let mediaObj = undefined;
  if (meta.imageUrl) {
    try {
      console.log('  Görsel import ediliyor...');
      const fileId = await importImage(meta.imageUrl, meta.slug || fileName.replace('.md', ''));
      mediaObj = {
        wixMedia: { image: { id: fileId, altText: meta.imageAlt || meta.title } },
        displayed: true, custom: true,
        altText: meta.imageAlt || meta.title
      };
      console.log('  Görsel OK → ' + fileId);
    } catch (e) {
      console.warn('  [WARN] Görsel atlanamadı: ' + e.message);
    }
  }

  // İçerik dönüştür
  const nodes = markdownToWixNodes(body);
  console.log('  Node sayısı: ' + nodes.length);

  // Draft post objesi
  const draftPost = {
    title: meta.title,
    richContent: { nodes },
    excerpt: meta.excerpt || '',
    seoDescription: seoDesc,
    slug: meta.slug || fileName.replace('.md', ''),
    categoryIds,
    tagIds,
    memberId: MEMBER_ID,
    language: meta.language || 'tr',
    seoData: {
      tags: [
        { type: 'title',  children: seoTitle, custom: false, disabled: false },
        { type: 'meta', props: { name: 'description', content: seoDesc }, children: '', custom: false, disabled: false }
      ]
    },
    ...(mediaObj ? { media: mediaObj } : {})
  };

  if (DRY_RUN) {
    console.log('  [DRY RUN] Gönderilecek veri:');
    console.log('    title:', draftPost.title);
    console.log('    slug:', draftPost.slug);
    console.log('    categories:', categoryIds);
    console.log('    tags:', tagIds);
    console.log('    seoTitle:', seoTitle);
    console.log('    nodes:', nodes.length);
    console.log('    media:', mediaObj ? 'VAR' : 'YOK');
    return;
  }

  // API'ye gönder
  const res = await wixReq('POST', '/blog/v3/draft-posts', { draftPost });

  if (res.status === 200 || res.status === 201) {
    const wixId = res.data?.draftPost?.id || res.data?.post?.id;
    if (!wixId) {
      console.log('  ⚠ Yüklendi ama wixId alınamadı. Ham yanıt:', JSON.stringify(res.data).slice(0, 300));
      updateFrontmatter(filePath, { status: 'published' });
    } else {
      console.log('  ✓ Yüklendi — wixId: ' + wixId);
      updateFrontmatter(filePath, { status: 'published', wixId });
    }
  } else {
    console.log('  ✗ HATA [' + res.status + ']: ' + JSON.stringify(res.data).slice(0, 200));
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('posts/ klasörü bulunamadı: ' + POSTS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(POSTS_DIR, f));

  if (files.length === 0) {
    console.log('posts/ klasöründe .md dosyası yok.');
    return;
  }

  // Sadece status: ready olanları yükle
  const ready = files.filter(f => {
    const raw = fs.readFileSync(f, 'utf8');
    const { meta } = parseFrontmatter(raw);
    return meta.status === 'ready';
  });

  console.log('Toplam .md: ' + files.length + ' | Yüklenecek (ready): ' + ready.length);
  if (DRY_RUN) console.log('[DRY RUN modu — API çağrısı yapılmaz]\n');

  for (let i = 0; i < ready.length; i++) {
    const f = ready[i];
    console.log('\n[' + (i + 1) + '/' + ready.length + '] ' + path.basename(f));
    await publishPost(f);
    await new Promise(r => setTimeout(r, 600));
  }

  console.log('\nTamamlandı.');
}

main().catch(console.error);
