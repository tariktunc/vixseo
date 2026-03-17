/**
 * json-to-md.js — new_posts.json → posts/*.md (tek seferlik dönüştürücü)
 * Kullanım: node scripts/json-to-md.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const POSTS_JSON = 'C:/Users/tarkt/.claude/projects/C--Users-tarkt-OneDrive-Desktop-Github-xmlBlog/new_posts.json';
const POSTS_DIR  = path.join(__dirname, '..', 'posts');

// Kategori ID → slug haritası (categories.json'dan türetildi)
const CAT_ID_TO_SLUG = {
  '8feb39cf-8c50-4011-8012-cfc9af79d0b8': 'teknik-seo',
  '4198fb0e-3b2d-4f00-a95a-5ad4acab91e3': 'seo',
  '82fb6ce8-2867-4497-ad4c-3e048b33d93a': 'e-ticaret',
  'b8c19d4b-69fd-4fad-b5c7-a2749b9429da': 'ileri-seviye-seo',
  'ad9a311e-af85-4818-87e3-88019c60972f': 'wix',
  'c0872aeb-2ccf-437f-bc6b-9b24da1c0ed4': 'dijital-pazarlama',
};

// Etiket ID → slug haritası
const TAG_ID_TO_SLUG = {
  '6cd27973-5590-41ad-ab2a-feee340e9459': 'seo',
  'e869d67a-2639-471a-b20f-dedc89a71851': 'anahtar-kelime',
  '5dcc7d68-bdee-4de8-909a-83601edf3239': 'ticimax',
  '49b94784-ad59-47cd-9d87-6e3cac8743fc': 'e-ticaret',
  '50a39560-3e80-404a-80ef-a458c10fe9eb': 'wordpress',
  'bb2d5ee1-a1bb-4e7a-bc43-af234c566bd0': 'shopify',
  'adf2290c-1a08-4b12-8b50-86180d409459': 'google-analytics',
  'ad32e249-fe0b-4460-8405-fdf8acdeeeb2': 'icerik-pazarlama',
  'b49f95f9-4e70-4b35-952c-4861e4635b8c': 'backlink',
  'fe68d7db-60ba-4b6b-865a-4db24659b4ae': 'wix',
  'f56007b8-7d29-4798-88e7-f277959a6941': 'core-web-vitals',
};

// Görsel URL'leri (add_images.js'den)
const IMAGE_URLS = {
  'e-e-a-t-nedir':                       { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop', alt: 'E-E-A-T güvenilirlik ve uzmanlık' },
  'featured-snippet-nasil-kazanilir':    { url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1600&h=900&fit=crop', alt: 'Google arama sonuçları featured snippet' },
  'ticimax-seo-rehberi':                 { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=900&fit=crop', alt: 'Ticimax e-ticaret mağaza SEO' },
  'topical-authority-nedir':             { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&h=900&fit=crop', alt: 'Topical authority konu uzmanlığı kütüphane' },
  'google-analytics-4-seo-kararlari':    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop', alt: 'Google Analytics 4 SEO dashboard veri analizi' },
  'icerik-kumesi-stratejisi':            { url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop', alt: 'İçerik kümesi stratejisi blog yazı masası' },
  'seo-audit-nasil-yapilir':             { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&h=900&fit=crop', alt: 'SEO audit website performans analizi' },
  'shopify-seo-rehberi':                 { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop', alt: 'Shopify e-ticaret mağaza SEO rehberi' },
  'hreflang-nedir':                      { url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&h=900&fit=crop', alt: 'Hreflang çok dilli site dünya haritası' },
  'wordpress-wix-ticimax-karsilastirma': { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&h=900&fit=crop', alt: 'WordPress Wix Ticimax platform karşılaştırma laptop' },
};

// JSON content node → Markdown satırları
function nodeToMarkdown(node) {
  switch (node.type) {
    case 'paragraph':
      return node.text + '\n';
    case 'heading2':
      return '\n## ' + node.text + '\n';
    case 'heading3':
      return '\n### ' + node.text + '\n';
    case 'bulletList':
      return '\n' + node.items.map(i => '- ' + i).join('\n') + '\n';
    case 'orderedList':
      return '\n' + node.items.map((i, idx) => (idx + 1) + '. ' + i).join('\n') + '\n';
    default:
      return '';
  }
}

function buildMarkdown(post) {
  const img   = IMAGE_URLS[post.slug] || {};
  const cats  = (post.categoryIds || []).map(id => CAT_ID_TO_SLUG[id]).filter(Boolean);
  const tags  = (post.tagIds || []).map(id => TAG_ID_TO_SLUG[id]).filter(Boolean);
  const seoTitle = post.title + ' | Blakfy';

  const frontmatter = [
    '---',
    'title: "' + post.title + '"',
    'slug: "' + post.slug + '"',
    'seoTitle: "' + seoTitle + '"',
    'metaDesc: "' + (post.metaDesc || '') + '"',
    'excerpt: "' + (post.excerpt || '') + '"',
    'categories: [' + cats.map(c => '"' + c + '"').join(', ') + ']',
    'tags: [' + tags.map(t => '"' + t + '"').join(', ') + ']',
    'imageUrl: "' + (img.url || '') + '"',
    'imageAlt: "' + (img.alt || '') + '"',
    'language: "tr"',
    'status: "published"',
    '---',
    ''
  ].join('\n');

  const body = post.content.map(nodeToMarkdown).join('');

  return frontmatter + body;
}

// ─── Main ─────────────────────────────────────────────────────────────────

const posts = JSON.parse(fs.readFileSync(POSTS_JSON, 'utf8'));
if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });

posts.forEach(post => {
  const md   = buildMarkdown(post);
  const file = path.join(POSTS_DIR, post.slug + '.md');
  fs.writeFileSync(file, md, 'utf8');
  console.log('Oluşturuldu: posts/' + post.slug + '.md');
});

console.log('\nToplam: ' + posts.length + ' dosya');
