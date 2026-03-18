'use strict';

/**
 * core/sync.js — Wix → Local senkronizasyon (READ-ONLY Wix API)
 *
 * İki görev:
 *
 *   1. data/wix-posts.json güncelle
 *      Wix'teki tüm yayınlı yazıları çekip JSON olarak sakla.
 *      Slug çakışma kontrolü, audit ve referans için kullanılır.
 *
 *   2. posts/*.md frontmatter güncelle
 *      Local'de .md dosyası olan yazıların frontmatter'ını
 *      Wix verisiyle hizala (wixId, slug, seoTitle, description...).
 */

const fs   = require('fs');
const path = require('path');
const { queryPosts } = require('./blog');

// ─── SEO tag çözümleyici ──────────────────────────────────────────────────

function extractSeo(post) {
  const tags = post.seoData?.tags || [];
  return {
    seoTitle:    tags.find(t => t.type === 'title')?.children?.trim() || null,
    description: tags.find(t => t.type === 'meta' && t.props?.name === 'description')
                   ?.props?.content?.trim() || null
  };
}

// ─── ID → slug ters çevirme ───────────────────────────────────────────────

function buildReverseMap(jsonObj) {
  const map = {};
  for (const [slug, entry] of Object.entries(jsonObj)) map[entry.id] = slug;
  return map;
}

// ─── Frontmatter güncelleme yardımcıları ─────────────────────────────────

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function setField(content, key, value) {
  const line  = `${key}: "${value}"`;
  const regex = new RegExp(`^${escapeRegex(key)}:.*$`, 'm');
  if (regex.test(content)) return content.replace(regex, line);
  return content.replace(/^---\s*$/m, `${line}\n---`);
}

function setArray(content, key, arr) {
  const line  = `${key}: [${arr.join(', ')}]`;
  const regex = new RegExp(`^${escapeRegex(key)}:.*$`, 'm');
  if (regex.test(content)) return content.replace(regex, line);
  return content.replace(/^---\s*$/m, `${line}\n---`);
}

// ─── Local .md dosyalarını yükle ──────────────────────────────────────────

function loadLocalPosts(siteDir) {
  const postsDir = path.join(siteDir, 'posts');
  if (!fs.existsSync(postsDir)) return { byWixId: new Map(), bySlug: new Map() };

  const { parseFrontmatter } = require(path.join(siteDir, 'scripts', 'convert.js'));
  const all = [];

  for (const f of fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))) {
    const filePath = path.join(postsDir, f);
    const raw      = fs.readFileSync(filePath, 'utf8');
    const { meta } = parseFrontmatter(raw);
    all.push({ filePath, file: f, meta, raw });
  }

  return {
    byWixId: new Map(all.filter(p => p.meta.wixId).map(p => [p.meta.wixId, p])),
    bySlug:  new Map(all.map(p => [p.meta.slug || p.file.replace('.md', ''), p]))
  };
}

// ─── Local .md frontmatter güncelle ──────────────────────────────────────

function syncLocalFile(wixPost, localPost, { catRevMap, tagRevMap, dryRun }) {
  const seo     = extractSeo(wixPost);
  const changes = [];
  let   content = localPost.raw;
  const meta    = localPost.meta;

  const check = (field, wixVal, localVal) => {
    if (wixVal && localVal !== wixVal) {
      changes.push(`${field} güncellendi`);
      return true;
    }
    return false;
  };

  if (check('wixId',   wixPost.id,    meta.wixId))   content = setField(content, 'wixId', wixPost.id);
  if (check('slug',    wixPost.slug,  meta.slug))     content = setField(content, 'slug', wixPost.slug);
  if (check('title',   wixPost.title, meta.title))    content = setField(content, 'title', (wixPost.title || '').replace(/"/g, '\\"'));
  if (check('seoTitle',seo.seoTitle,  meta.seoTitle)) content = setField(content, 'seoTitle', (seo.seoTitle || '').replace(/"/g, '\\"'));

  if (seo.description) {
    const localDesc = meta.description || meta.metaDesc;
    if (localDesc !== seo.description) {
      changes.push('description güncellendi');
      content = setField(content, 'description', seo.description.replace(/"/g, '\\"'));
    }
    if (meta.metaDesc) {
      changes.push('metaDesc → description düzeltildi');
      content = content.replace(/^metaDesc:.*\n?/m, '');
    }
  }

  if (meta.status !== 'published') {
    changes.push('status → published');
    content = setField(content, 'status', 'published');
  }

  if (wixPost.categoryIds?.length) {
    const cats = wixPost.categoryIds.map(id => catRevMap[id]).filter(Boolean);
    if (cats.length) {
      const same = JSON.stringify((meta.categories || []).sort()) === JSON.stringify(cats.sort());
      if (!same) { changes.push('categories güncellendi'); content = setArray(content, 'categories', cats); }
    }
  }

  if (wixPost.tagIds?.length) {
    const tags = wixPost.tagIds.map(id => tagRevMap[id]).filter(Boolean);
    if (tags.length) {
      const same = JSON.stringify((meta.tags || []).sort()) === JSON.stringify(tags.sort());
      if (!same) { changes.push('tags güncellendi'); content = setArray(content, 'tags', tags); }
    }
  }

  if (changes.length > 0 && !dryRun) {
    fs.writeFileSync(localPost.filePath, content, 'utf8');
  }

  return changes;
}

// ─── Ana sync fonksiyonu ──────────────────────────────────────────────────

async function pullFromWix(siteDir, opts = {}) {
  const dryRun = opts.dryRun || false;
  const config = JSON.parse(fs.readFileSync(path.join(siteDir, 'config.json'), 'utf8'));

  console.log(`\nSync: ${config.domain}${dryRun ? ' [DRY RUN]' : ''}`);
  console.log('Wix\'ten yazılar çekiliyor...\n');

  const wixPosts = await queryPosts(siteDir, { fieldsets: ['SEO'] });
  console.log(`Wix: ${wixPosts.length} yayınlı yazı bulundu\n`);

  // ── 1. data/wix-posts.json kaydet ───────────────────────────────────────
  const dataDir  = path.join(siteDir, 'data');
  const dataFile = path.join(dataDir, 'wix-posts.json');

  const seo = extractSeo; // closure için referans
  const snapshot = wixPosts.map(p => {
    const s = extractSeo(p);
    return {
      id:          p.id,
      slug:        p.slug,
      title:       p.title,
      seoTitle:    s.seoTitle,
      description: s.description,
      categoryIds: p.categoryIds || [],
      tagIds:      p.tagIds || [],
      language:    p.language,
      publishedAt: p.firstPublishedDate,
      updatedAt:   p.lastPublishedDate,
      imageUrl:    p.media?.wixMedia?.image?.url || null
    };
  });

  if (!dryRun) {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(dataFile, JSON.stringify({
      site:      config.domain,
      pulledAt:  new Date().toISOString(),
      total:     snapshot.length,
      posts:     snapshot
    }, null, 2), 'utf8');
    console.log(`  ✓ data/wix-posts.json güncellendi (${snapshot.length} yazı)`);
  } else {
    console.log(`  [DRY RUN] data/wix-posts.json → ${snapshot.length} yazı yazılacak`);
  }

  // ── 2. Local .md frontmatter güncelle ────────────────────────────────────
  const categoriesJson = JSON.parse(fs.readFileSync(path.join(siteDir, 'scripts', 'categories.json'), 'utf8'));
  const tagsJson       = JSON.parse(fs.readFileSync(path.join(siteDir, 'scripts', 'tags.json'), 'utf8'));
  const catRevMap      = buildReverseMap(categoriesJson);
  const tagRevMap      = buildReverseMap(tagsJson);
  const local          = loadLocalPosts(siteDir);

  const wixBySlug = new Map(wixPosts.map(p => [p.slug, p]));
  const wixById   = new Map(wixPosts.map(p => [p.id, p]));

  const summary = { updated: [], unchanged: 0, notInWix: [] };

  for (const [, localPost] of [...local.byWixId, ...local.bySlug].reduce((map, [k, v]) => {
    if (!map.has(v.filePath)) map.set(v.filePath, v);
    return map;
  }, new Map())) {
    const slug    = localPost.meta.slug || localPost.file.replace('.md', '');
    const wixPost = wixById.get(localPost.meta.wixId) || wixBySlug.get(slug);

    if (!wixPost) {
      summary.notInWix.push(slug);
      continue;
    }

    const changes = syncLocalFile(wixPost, localPost, { catRevMap, tagRevMap, dryRun });
    if (changes.length > 0) {
      summary.updated.push({ slug, changes });
      console.log(`  ✏  ${slug}: ${changes.join(', ')}`);
    } else {
      summary.unchanged++;
    }
  }

  // ── Özet ─────────────────────────────────────────────────────────────────
  console.log(`\n── ÖZET ${'─'.repeat(50)}\n`);
  console.log(`  📦 wix-posts.json  : ${snapshot.length} yazı`);
  console.log(`  ✏  .md güncellenen : ${summary.updated.length}`);
  console.log(`  ✅ .md değişmeyen  : ${summary.unchanged}`);
  console.log(`  📝 Wix'te yok (draft): ${summary.notInWix.length}`);
  if (dryRun) console.log('\n  [DRY RUN — hiçbir dosya yazılmadı]');
  console.log('');

  return summary;
}

module.exports = { pullFromWix };
