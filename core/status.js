'use strict';

/**
 * core/status.js — Site posts/ klasörü durum okuyucu
 */

const fs   = require('fs');
const path = require('path');

function getPostsStatus(siteDir) {
  const postsDir = path.join(siteDir, 'posts');

  if (!fs.existsSync(postsDir)) return [];

  const { parseFrontmatter } = require(path.join(siteDir, 'scripts', 'convert.js'));

  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const filePath = path.join(postsDir, f);
      const { meta } = parseFrontmatter(fs.readFileSync(filePath, 'utf8'));
      return {
        file:       f,
        slug:       meta.slug || f.replace('.md', ''),
        title:      meta.title   || '(başlık yok)',
        status:     meta.status  || 'draft',
        wixId:      meta.wixId   || null,
        categories: meta.categories || [],
        tags:       (meta.tags || []).length
      };
    })
    .sort((a, b) => {
      const order = { ready: 0, draft: 1, published: 2 };
      return (order[a.status] ?? 1) - (order[b.status] ?? 1);
    });
}

function printStatus(siteDir) {
  const config  = JSON.parse(fs.readFileSync(path.join(siteDir, 'config.json'), 'utf8'));
  const posts   = getPostsStatus(siteDir);

  const counts = posts.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  console.log(`\nSite: ${config.domain}`);
  console.log(`Toplam: ${posts.length} yazı  |  ready: ${counts.ready || 0}  draft: ${counts.draft || 0}  published: ${counts.published || 0}\n`);

  const icon = { ready: '🟢', draft: '⚪', published: '✅' };

  for (const p of posts) {
    const mark = icon[p.status] || '❓';
    const wix  = p.wixId ? ` [${p.wixId.slice(0, 8)}…]` : '';
    console.log(`${mark} ${p.status.padEnd(10)} ${p.slug.padEnd(45)} ${p.title.slice(0, 50)}${wix}`);
  }

  console.log('');
}

module.exports = { getPostsStatus, printStatus };
