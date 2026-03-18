'use strict';

/**
 * core/blog.js — Wix Blog API sorgulama (READ-ONLY)
 *
 * Dışa aktarılanlar:
 *   queryPosts(siteDir, opts)   → Wix'ten yayınlı yazıları çek (sayfalama dahil)
 *   getPost(siteDir, wixId)     → Tek yazı getir
 */

const fs   = require('fs');
const path = require('path');
const { createClient } = require('./wix');

function loadConfig(siteDir) {
  return JSON.parse(fs.readFileSync(path.join(siteDir, 'config.json'), 'utf8'));
}

/**
 * queryPosts — tüm yayınlı yazıları sayfalayarak çeker
 * opts.fieldsets: ['SEO', 'CONTENT', 'OWNER'] — default: ['SEO']
 */
async function queryPosts(siteDir, opts = {}) {
  const config   = loadConfig(siteDir);
  const wix      = createClient(config.siteId);
  const fieldsets = opts.fieldsets || ['SEO'];
  const limit     = 50;

  let all    = [];
  let offset = 0;
  let total  = null;

  do {
    const res = await wix('POST', '/blog/v3/posts/query', {
      query: {
        paging: { limit, offset },
        sort: [{ fieldName: 'firstPublishedDate', order: 'DESC' }]
      },
      fieldsets
    });

    if (res.status !== 200) {
      throw new Error(`Wix posts/query [${res.status}]: ${JSON.stringify(res.data).slice(0, 200)}`);
    }

    const posts = res.data.posts || [];
    all = all.concat(posts);

    if (total === null) {
      total = res.data.metaData?.total ?? posts.length;
    }

    offset += posts.length;

    if (posts.length < limit) break;

    // Rate limit — istekler arası bekle
    await new Promise(r => setTimeout(r, 300));

  } while (offset < total);

  return all;
}

/**
 * getPost — tek yazı getir
 */
async function getPost(siteDir, wixId) {
  const config = loadConfig(siteDir);
  const wix    = createClient(config.siteId);

  const res = await wix('GET', `/blog/v3/posts/${wixId}?fieldsets=SEO`);

  if (res.status !== 200) {
    throw new Error(`Wix posts/${wixId} [${res.status}]: ${JSON.stringify(res.data).slice(0, 200)}`);
  }

  return res.data.post || null;
}

module.exports = { queryPosts, getPost };
