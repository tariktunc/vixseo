/**
 * publish.js — Markdown posts/ → Wix Blog API
 *
 * Kullanım:
 *   node scripts/publish.js            → status: ready olan tüm yazıları yükle
 *   node scripts/publish.js --dry-run  → API'ye göndermeden önce önizle
 *
 * Adımlar:
 *   1. posts/*.md oku (status: ready olanlar)
 *   2. Kategori ve etiket slug → ID çözümle (eksikse WARN ver)
 *   3. imageUrl varsa Wix Media'ya import et
 *   4. Markdown → Wix RichContent dönüştür
 *   5. Wix Blog API'ye UNPUBLISHED draft olarak POST et
 *   6. seoSlug + seoData PATCH (CREATE'de slug çalışmaz)
 *   7. Başarılıysa frontmatter'da status: published ve wixId yaz
 *
 * ÖNEMLİ NOTLAR (wix/api-reference.md):
 *   - slug alanı CREATE'de çalışmaz → seoSlug PATCH ile set edilir
 *   - seoData ve media aynı PATCH'te gönderilemez
 *   - categoryIds: sadece mevcut ID'ler eklenir, hata vermez
 *   - meta description için meta.description okunur (metaDesc değil)
 */

'use strict';

const https  = require('https');
const fs     = require('fs');
const path   = require('path');
const { parseFrontmatter, markdownToWixNodes } = require('./convert');
const { generateCover } = require('./generate-cover');

// ─── Ayarlar ─────────────────────────────────────────────────────────────

const CREDENTIALS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'wix-credentials.json'), 'utf8'));
const CONFIG      = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json'), 'utf8'));

const API_KEY    = CREDENTIALS.apiKey;
const SITE_ID    = CONFIG.siteId;
const MEMBER_ID  = CONFIG.memberId;
const SITE_NAME  = CONFIG.site || 'İbrahimin Yeri';

const POSTS_DIR  = path.join(__dirname, '..', 'posts');
const CATEGORIES = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'));
const TAGS       = JSON.parse(fs.readFileSync(path.join(__dirname, 'tags.json'), 'utf8'));
const DRY_RUN    = process.argv.includes('--dry-run');

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
  await new Promise(r => setTimeout(r, 3000)); // PENDING → READY için bekle
  return fileId;
}

// ─── Slug → ID çözümleyiciler ─────────────────────────────────────────────

function resolveSlugs(slugArray, lookup, type) {
  if (!Array.isArray(slugArray)) return [];
  return slugArray.map(slug => {
    const entry = lookup[slug];
    if (!entry) {
      console.warn('  [WARN] ' + type + ' bulunamadı: "' + slug + '" — categories.json / tags.json güncellenmeli');
      return null;
    }
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
      content = content.replace(/^---$/m, line + '\n---');
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// ─── SEO PATCH: seoSlug + seoData (ayrı istekler) ────────────────────────

async function patchSeo(draftId, slug, seoTitle, seoDesc, imageUrl) {
  // 1. seoSlug
  await wixReq('PATCH', '/blog/v3/draft-posts/' + draftId, {
    draftPost: { seoSlug: slug },
    fieldMask: { paths: ['seoSlug'] }
  });

  // 2. seoData (og tags + meta keywords + focus keyword)
  const keywords = slug.replace(/-/g, ' ');
  await wixReq('PATCH', '/blog/v3/draft-posts/' + draftId, {
    draftPost: {
      seoData: {
        tags: [
          { type: 'title', children: seoTitle, custom: false, disabled: false },
          { type: 'meta', props: { name: 'description', content: seoDesc }, children: '', custom: false, disabled: false },
          { type: 'meta', props: { name: 'keywords', content: seoDesc }, children: '', custom: false, disabled: false },
          { type: 'meta', props: { property: 'og:title', content: seoTitle }, children: '', custom: false, disabled: false },
          { type: 'meta', props: { property: 'og:description', content: seoDesc }, children: '', custom: false, disabled: false },
          ...(imageUrl ? [{ type: 'meta', props: { property: 'og:image', content: imageUrl }, children: '', custom: false, disabled: false }] : [])
        ],
        settings: {
          preventAutoRedirect: false,
          keywords: [{ term: keywords, isMain: true }]
        }
      }
    },
    fieldMask: { paths: ['seoData'] }
  });
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

  const slug     = meta.slug || fileName.replace('.md', '');
  const seoTitle = meta.seoTitle || (meta.title + ' | ' + SITE_NAME);
  const seoDesc  = meta.description || meta.metaDesc || '';  // description öncelikli

  // Görsel — imageUrl yoksa Pexels'ten otomatik bul + Sharp overlay üret
  let mediaObj    = undefined;
  let wixImageUrl = undefined;
  let finalImageUrl = meta.imageUrl;

  if (!finalImageUrl && !DRY_RUN) {
    try {
      console.log('  imageUrl yok — kapak otomatik üretiliyor...');
      const cover = await generateCover({
        slug,
        title: meta.title,
        subtitle: meta.excerpt || '',
        imageQuery: meta.imageQuery || meta.title
      });
      finalImageUrl = cover.pexelsUrl;
      // frontmatter'a kaydet
      updateFrontmatter(filePath, { imageUrl: finalImageUrl });
      console.log('  Kapak hazır (' + cover.sizeKb + ' KB) → imageUrl frontmatter\'a eklendi');
    } catch (e) {
      console.warn('  [WARN] Otomatik kapak üretilemedi: ' + e.message);
    }
  }

  if (finalImageUrl) {
    try {
      console.log('  Görsel import ediliyor...');
      const fileId = await importImage(finalImageUrl, slug);
      wixImageUrl = 'https://static.wixstatic.com/media/' + fileId;
      const altText = meta.imageAlt || meta.title;
      mediaObj = {
        wixMedia: { image: { id: fileId, altText } },
        displayed: true, custom: true,
        altText
      };
      console.log('  Görsel OK → ' + fileId);
    } catch (e) {
      console.warn('  [WARN] Görsel atlanamadı: ' + e.message);
    }
  }

  // İçerik dönüştür
  const nodes = markdownToWixNodes(body);
  console.log('  Node sayısı: ' + nodes.length);

  if (DRY_RUN) {
    console.log('  [DRY RUN] Gönderilecek veri:');
    console.log('    title:', meta.title);
    console.log('    slug:', slug);
    console.log('    categories:', categoryIds, categoryIds.length === 0 ? '⚠️ BOŞ' : '');
    console.log('    tags:', tagIds);
    console.log('    seoTitle:', seoTitle);
    console.log('    seoDesc:', seoDesc ? seoDesc.slice(0, 80) + '...' : '⚠️ BOŞ');
    console.log('    nodes:', nodes.length);
    console.log('    media:', mediaObj ? 'VAR' : 'YOK');
    return;
  }

  // Draft post objesi — seoData ayrı PATCH ile gönderilecek
  const draftPost = {
    title: meta.title,
    richContent: { nodes },
    excerpt: meta.excerpt || '',
    seoDescription: seoDesc,
    categoryIds,
    tagIds,
    memberId: MEMBER_ID,
    language: meta.language || 'tr',
    ...(mediaObj ? { media: mediaObj } : {})
  };

  // API'ye gönder
  const res = await wixReq('POST', '/blog/v3/draft-posts', { draftPost });

  if (res.status === 200 || res.status === 201) {
    const wixId = res.data?.draftPost?.id || res.data?.post?.id;
    if (!wixId) {
      console.log('  ⚠ Yüklendi ama wixId alınamadı:', JSON.stringify(res.data).slice(0, 300));
      updateFrontmatter(filePath, { status: 'published' });
      return;
    }

    console.log('  ✓ Draft oluşturuldu — wixId: ' + wixId);

    // SEO PATCH (seoSlug + seoData — ayrı istekler)
    try {
      await patchSeo(wixId, slug, seoTitle, seoDesc, wixImageUrl);
      console.log('  ✓ SEO patch tamam (seoSlug + seoData)');
    } catch (e) {
      console.warn('  [WARN] SEO patch hatası:', e.message);
    }

    updateFrontmatter(filePath, { status: 'published', wixId });
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

  if (files.length === 0) { console.log('posts/ klasöründe .md dosyası yok.'); return; }

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
