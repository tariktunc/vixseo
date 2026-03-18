'use strict';

/**
 * core/publisher.js — Birleşik Wix Blog yayıncısı
 *
 * Tüm sitelerde aynı akış çalışır; fark config.json'dan okunur:
 *   coverGeneration: true  → imageUrl yoksa generate-cover.js tetiklenir
 *
 * Dışa aktarılan:
 *   publishPost(filePath, ctx)            → tek .md yayınla
 *   publishSite(siteDir, opts)            → site posts/ klasörünü tara
 */

const fs   = require('fs');
const path = require('path');
const { createClient } = require('./wix');

// ─── Yardımcılar ──────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function resolveSlugs(slugArray, lookup, type) {
  if (!Array.isArray(slugArray)) return [];
  return slugArray.map(slug => {
    const entry = lookup[slug];
    if (!entry) {
      console.warn(`  [WARN] ${type} bulunamadı: "${slug}" — categories.json / tags.json güncellenmeli`);
      return null;
    }
    return entry.id;
  }).filter(Boolean);
}

function updateFrontmatter(filePath, updates) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp('^' + key + ':.*$', 'm');
    const line  = `${key}: "${value}"`;
    if (regex.test(content)) {
      content = content.replace(regex, line);
    } else {
      content = content.replace(/^---$/m, `${line}\n---`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// ─── Görsel import ────────────────────────────────────────────────────────

async function importImage(wix, imageUrl, slug) {
  const res = await wix('POST', '/site-media/v1/files/import', {
    url:            imageUrl,
    displayName:    slug + '.jpg',
    mimeType:       'image/jpeg',
    mediaType:      'IMAGE',
    parentFolderId: 'media-root'
  });

  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`Görsel import hatası [${res.status}]: ${JSON.stringify(res.data).slice(0, 150)}`);
  }

  const fileId = res.data?.file?.id;
  if (!fileId) throw new Error('file.id boş');

  await delay(3000); // PENDING → READY
  return fileId;
}

// ─── SEO PATCH (seoSlug + seoData — ayrı istekler) ───────────────────────

async function patchSeo(wix, draftId, { slug, seoTitle, seoDesc, imageUrl }) {
  // 1. seoSlug
  await wix('PATCH', `/blog/v3/draft-posts/${draftId}`, {
    draftPost: { seoSlug: slug },
    fieldMask: { paths: ['seoSlug'] }
  });

  // 2. seoData + og tags
  const keywords = slug.replace(/-/g, ' ');
  await wix('PATCH', `/blog/v3/draft-posts/${draftId}`, {
    draftPost: {
      seoData: {
        tags: [
          { type: 'title', children: seoTitle, custom: false, disabled: false },
          { type: 'meta', props: { name: 'description', content: seoDesc }, children: '', custom: false, disabled: false },
          { type: 'meta', props: { name: 'keywords',    content: keywords  }, children: '', custom: false, disabled: false },
          { type: 'meta', props: { property: 'og:title',       content: seoTitle }, children: '', custom: false, disabled: false },
          { type: 'meta', props: { property: 'og:description', content: seoDesc  }, children: '', custom: false, disabled: false },
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

// ─── Tek yazı yayınla ─────────────────────────────────────────────────────

async function publishPost(filePath, ctx) {
  const {
    siteDir,
    config,
    categories,
    tags,
    dryRun = false
  } = ctx;

  const fileName = path.basename(filePath);

  // convert.js site'ın kendi scripts/ klasöründen yüklenir
  const { parseFrontmatter, markdownToWixNodes } = require(
    path.join(siteDir, 'scripts', 'convert.js')
  );

  const raw = fs.readFileSync(filePath, 'utf8');
  const { meta, body } = parseFrontmatter(raw);

  if (!meta.title) { console.log('  SKIP — title yok'); return; }

  const wix        = createClient(config.siteId);
  const slug       = meta.slug || fileName.replace('.md', '');
  const seoTitle   = meta.seoTitle   || `${meta.title} | ${config.domain}`;
  const seoDesc    = meta.description || meta.metaDesc || '';
  const categoryIds = resolveSlugs(
    Array.isArray(meta.categories) ? meta.categories : [meta.categories].filter(Boolean),
    categories, 'Kategori'
  );
  const tagIds = resolveSlugs(
    Array.isArray(meta.tags) ? meta.tags : [meta.tags].filter(Boolean),
    tags, 'Etiket'
  );

  // ─── Görsel ───────────────────────────────────────────────────────────
  let finalImageUrl = meta.imageUrl;
  let wixImageUrl   = undefined;
  let mediaObj      = undefined;

  if (!finalImageUrl && config.coverGeneration && !dryRun) {
    try {
      console.log('  imageUrl yok — kapak otomatik üretiliyor...');
      const { generateCover } = require(path.join(siteDir, 'scripts', 'generate-cover.js'));
      const cover = await generateCover({
        slug,
        title:      meta.title,
        subtitle:   meta.excerpt || '',
        imageQuery: meta.imageQuery || meta.title
      });
      finalImageUrl = cover.pexelsUrl;
      updateFrontmatter(filePath, { imageUrl: finalImageUrl });
      console.log(`  Kapak hazır (${cover.sizeKb} KB)`);
    } catch (e) {
      console.warn('  [WARN] Otomatik kapak üretilemedi:', e.message);
    }
  }

  if (finalImageUrl && !dryRun) {
    try {
      console.log('  Görsel import ediliyor...');
      const fileId = await importImage(wix, finalImageUrl, slug);
      wixImageUrl  = `https://static.wixstatic.com/media/${fileId}`;
      mediaObj = {
        wixMedia:  { image: { id: fileId, altText: meta.imageAlt || meta.title } },
        displayed: true,
        custom:    true,
        altText:   meta.imageAlt || meta.title
      };
      console.log('  Görsel OK →', fileId);
    } catch (e) {
      console.warn('  [WARN] Görsel atlanamadı:', e.message);
    }
  }

  // ─── Slug çakışma kontrolü ────────────────────────────────────────────
  const sitemap      = require('./sitemap');
  const sitemapCheck = sitemap.checkSlug(siteDir, slug);

  if (sitemapCheck.exists) {
    console.warn(`  [WARN] Slug sitemap'te mevcut: ${sitemapCheck.url}`);
    console.warn('         Bu yazı URL çakışmasına neden olabilir!');
  }

  // ─── İçerik dönüştür ──────────────────────────────────────────────────
  const nodes = markdownToWixNodes(body);
  console.log('  Node sayısı:', nodes.length);

  // ─── Dry-run ──────────────────────────────────────────────────────────
  if (dryRun) {
    console.log('  [DRY RUN] Gönderilecek:');
    console.log('    title      :', meta.title);
    console.log('    slug       :', slug);
    console.log('    categories :', categoryIds, categoryIds.length === 0 ? '⚠ BOŞ' : '');
    console.log('    tags       :', tagIds.length);
    console.log('    seoTitle   :', seoTitle);
    console.log('    seoDesc    :', seoDesc ? seoDesc.slice(0, 80) + '…' : '⚠ BOŞ');
    console.log('    nodes      :', nodes.length);
    console.log('    media      :', finalImageUrl ? 'VAR' : 'YOK');
    return;
  }

  // ─── Wix API — Draft POST ─────────────────────────────────────────────
  const draftPost = {
    title:        meta.title,
    richContent:  { nodes },
    excerpt:      meta.excerpt || '',
    seoDescription: seoDesc,
    categoryIds,
    tagIds,
    memberId:     config.memberId,
    language:     meta.language || config.language || 'tr',
    ...(mediaObj ? { media: mediaObj } : {})
  };

  const res = await wix('POST', '/blog/v3/draft-posts', { draftPost });

  if (res.status === 200 || res.status === 201) {
    const wixId = res.data?.draftPost?.id || res.data?.post?.id;

    if (!wixId) {
      console.log('  ⚠ Yüklendi ama wixId alınamadı:', JSON.stringify(res.data).slice(0, 200));
      updateFrontmatter(filePath, { status: 'published' });
      return;
    }

    console.log('  ✓ Draft oluşturuldu — wixId:', wixId);

    // SEO PATCH (ayrı istekler — seoData + media aynı PATCH'te gönderilemez)
    try {
      await patchSeo(wix, wixId, { slug, seoTitle, seoDesc, imageUrl: wixImageUrl });
      console.log('  ✓ SEO patch tamam (seoSlug + seoData)');
    } catch (e) {
      console.warn('  [WARN] SEO patch hatası:', e.message);
    }

    updateFrontmatter(filePath, { status: 'published', wixId });
  } else {
    console.log(`  ✗ HATA [${res.status}]:`, JSON.stringify(res.data).slice(0, 200));
  }
}

// ─── Site posts/ klasörünü tara ve yayınla ────────────────────────────────

async function publishSite(siteDir, opts = {}) {
  const { dryRun = false, slugFilter = null } = opts;

  const config     = JSON.parse(fs.readFileSync(path.join(siteDir, 'config.json'), 'utf8'));
  const categories = JSON.parse(fs.readFileSync(path.join(siteDir, 'scripts', 'categories.json'), 'utf8'));
  const tags       = JSON.parse(fs.readFileSync(path.join(siteDir, 'scripts', 'tags.json'), 'utf8'));
  const postsDir   = path.join(siteDir, 'posts');

  if (!fs.existsSync(postsDir)) {
    console.error('posts/ klasörü bulunamadı:', postsDir);
    process.exit(1);
  }

  const { parseFrontmatter } = require(path.join(siteDir, 'scripts', 'convert.js'));

  let files = fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(postsDir, f));

  // slug filtresi
  if (slugFilter) {
    files = files.filter(f => path.basename(f, '.md') === slugFilter);
    if (files.length === 0) {
      console.log(`Slug bulunamadı: ${slugFilter}`);
      return;
    }
  } else {
    // sadece status: ready olanlar
    files = files.filter(f => {
      const { meta } = parseFrontmatter(fs.readFileSync(f, 'utf8'));
      return meta.status === 'ready';
    });
  }

  console.log(`Site: ${config.domain}`);
  console.log(`Yayınlanacak: ${files.length} yazı`);
  if (dryRun) console.log('[DRY RUN — API çağrısı yapılmaz]\n');

  const ctx = { siteDir, config, categories, tags, dryRun };

  for (let i = 0; i < files.length; i++) {
    console.log(`\n[${i + 1}/${files.length}] ${path.basename(files[i])}`);
    await publishPost(files[i], ctx);
    await delay(600);
  }

  console.log('\nTamamlandı.');
}

module.exports = { publishPost, publishSite };
