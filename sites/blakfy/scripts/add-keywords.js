/**
 * add-keywords.js — Tüm yazılara focusKeyword ekle ve Wix'te güncelle
 *
 * Kullanım:
 *   node scripts/add-keywords.js            → frontmatter yaz + Wix PATCH
 *   node scripts/add-keywords.js --dry-run  → sadece önizle
 */

'use strict';

const https  = require('https');
const fs     = require('fs');
const path   = require('path');
const { parseFrontmatter } = require('./convert');

// ─── Ayarlar ─────────────────────────────────────────────────────────────

const API_KEY  = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImRlODllZTA0LTg0NmYtNDEwNC1iMjA3LWZlNmZkZjE3NDA2OFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjc2M2U5NmI0LTM5NGItNDkyNC1iMTMxLWYxZGU0NmMyMmE2MlwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIxNjI2YjU5NS1mNTBjLTQ4ZWMtYTVkNC1jNGE3YzQzMGUxNGVcIn19IiwiaWF0IjoxNzczNjE5MDM0fQ.bCSWK71m5bUwiam4PYGVPavchBRNUcNdwL8df9hlUYrEggBbk0Or1WJ7c_5_ant72lM_tFa44-HpmGmC_DOm8fNxqBUq_TzXHRflTE5bs0Sqtx3P1bFxqiOvqonPQ15Jr02dwi5IUFl3RkMEPxdc7XeSCTrm6LwTQYXsHUokCEWpNS6bE-zLZgRX1Ulx6s3p6-U-zFIqa3HBR5KTgoYRRkAnRMUKHtP3TKq1tryqyCBod9zBK0MEBhjvsDgHCD7SeOmEDgbyuo8xDZKNuM9huSGIxSiduxKLpORSSgSqPjzFBOPqS-4Gx8ApDqFnFKiYEP7ByvS-iIe1-PnvHDkSLQ';
const SITE_ID  = '7a2f84ce-61de-4785-b61d-e81718514e0a';
const POSTS_DIR = path.join(__dirname, '..', 'posts');
const DRY_RUN   = process.argv.includes('--dry-run');

// ─── Odak anahtar kelime listesi ─────────────────────────────────────────

const FOCUS_KEYWORDS = {
  '301-vs-302-redirect': '301 vs 302 redirect',
  'affiliate-marketing-turkiye': 'affiliate marketing türkiye',
  'ahrefs-kullanim-rehberi': 'ahrefs kullanımı',
  'ahrefs-vs-semrush': 'ahrefs vs semrush',
  'amp-nedir': 'amp nedir',
  'anahtar-kelime-arastirmasi-nasil-yapilir': 'anahtar kelime araştırması',
  'anahtar-kelime-yamyamligi': 'anahtar kelime yamyamlığı',
  'b2b-seo-stratejisi': 'b2b seo stratejisi',
  'blog-icerik-takvimi': 'blog içerik takvimi',
  'canonical-url-nedir': 'canonical url nedir',
  'cdn-site-hizi-optimizasyonu': 'cdn nedir site hızı',
  'citation-building': 'citation building',
  'conversion-funnel-optimizasyonu': 'conversion funnel optimizasyonu',
  'core-update-toparlanma': 'core update sonrası toparlanma',
  'crawl-butcesi-optimizasyonu': 'crawl bütçesi optimizasyonu',
  'cro-donusum-orani-optimizasyonu': 'dönüşüm oranı optimizasyonu',
  'domain-otoritesi': 'domain otoritesi nedir',
  'e-e-a-t-nedir': 'e-e-a-t nedir',
  'e-posta-pazarlama-araclari': 'e-posta pazarlama araçları',
  'eticaret-eposta-otomasyon': 'e-ticaret e-posta otomasyonu',
  'facebook-ads-rehberi': 'facebook ads rehberi',
  'featured-snippet-nasil-kazanilir': 'featured snippet nasıl kazanılır',
  'freelance-seo': 'freelance seo',
  'geo-generative-engine-optimization': 'geo nedir generative engine optimization',
  'google-ads-kapsamli-rehber': 'google ads rehberi',
  'google-algoritma-guncellemeleri': 'google algoritma güncellemeleri',
  'google-analytics-4-seo-kararlari': 'google analytics 4 ile seo',
  'google-haritalar-seo': 'google haritalar seo',
  'google-keyword-planner': 'google keyword planner kullanımı',
  'google-penalty-kurtarma': 'google ceza kurtarma',
  'google-search-console-rehberi': 'google search console rehberi',
  'google-tag-manager-rehberi': 'google tag manager rehberi',
  'headless-cms-seo': 'headless cms seo',
  'hepsiburada-satici-seo': 'hepsiburada satıcı seo',
  'hreflang-nedir': 'hreflang nedir',
  'https-ssl-seo-rehberi': 'https ssl seo',
  'icerik-guncelleme-stratejisi': 'içerik güncelleme stratejisi',
  'icerik-kumesi-stratejisi': 'içerik kümesi stratejisi',
  'icerik-pazarlama-roi': 'içerik pazarlama roi',
  'ideasoft-seo-rehberi': 'ideasoft seo rehberi',
  'index-coverage-hatalari': 'index coverage hataları',
  'influencer-pazarlama-turkiye': 'influencer pazarlama türkiye',
  'inp-optimizasyonu': 'inp optimizasyonu',
  'instagram-pazarlama-rehberi': 'instagram pazarlama rehberi',
  'internal-linking-stratejisi': 'internal linking stratejisi',
  'javascript-seo-rehberi': 'javascript seo',
  'kategori-sayfasi-seo-rehberi': 'kategori sayfası seo',
  'lcp-cls-core-web-vitals-optimizasyonu': 'core web vitals optimizasyonu',
  'link-building-backlink-stratejisi': 'link building stratejisi',
  'linkedin-b2b-pazarlama': 'linkedin b2b pazarlama',
  'log-dosyasi-analizi': 'log dosyası analizi',
  'long-form-content-rehberi': 'long-form içerik rehberi',
  'long-tail-anahtar-kelime-stratejisi': 'long tail anahtar kelime',
  'marka-bilinirligi-stratejisi': 'marka bilinirliği stratejisi',
  'mobile-first-indexing-mobil-seo': 'mobile first indexing mobil seo',
  'n11-satici-seo': 'n11 satıcı seo',
  'nap-tutarliligi': 'nap tutarlılığı',
  'negatif-seo': 'negatif seo nedir',
  'opencart-seo-rehberi': 'opencart seo rehberi',
  'pagination-seo': 'pagination seo',
  'programmatic-reklamcilik': 'programmatic reklamcılık',
  'rakip-icerik-analizi': 'rakip içerik analizi',
  'rakip-seo-analizi': 'rakip seo analizi',
  'rank-tracking-araclar': 'rank tracking araçları',
  'retargeting-reklamlari': 'retargeting reklamları',
  'robots-txt-nedir': 'robots.txt nedir',
  'schema-markup-yapisal-veri-rehberi': 'schema markup nedir',
  'screaming-frog-kullanim-rehberi': 'screaming frog kullanımı',
  'search-intent-arama-niyeti': 'arama niyeti nedir',
  'semrush-kullanim-rehberi': 'semrush kullanımı',
  'seo-ajansi-secimi': 'seo ajansı seçimi',
  'seo-audit-nasil-yapilir': 'seo audit nasıl yapılır',
  'seo-copywriting-rehberi': 'seo copywriting',
  'seo-kpi-metrikleri': 'seo kpi metrikleri',
  'shopify-seo-rehberi': 'shopify seo rehberi',
  'shopify-vs-woocommerce': 'shopify vs woocommerce',
  'site-mimarisi-silo': 'site mimarisi silo yapısı',
  'sosyal-medya-icerik-takvimi': 'sosyal medya içerik takvimi',
  'ticimax-seo-rehberi': 'ticimax seo rehberi',
  'tiktok-pazarlama-rehberi': 'tiktok pazarlama rehberi',
  'topical-authority-nedir': 'topical authority nedir',
  'trendyol-satici-seo-rehberi': 'trendyol satıcı seo',
  'trendyol-vs-kendi-site': 'trendyol mu kendi site mi',
  'turkce-icerik-seo': 'türkçe içerik seo',
  'uluslararasi-seo': 'uluslararası seo',
  'url-yapisi-optimizasyonu': 'url yapısı optimizasyonu',
  'urun-gorseli-optimizasyonu': 'ürün görseli optimizasyonu',
  'urun-sayfasi-seo-optimizasyonu': 'ürün sayfası seo',
  'ux-ve-seo-iliskisi': 'ux ve seo ilişkisi',
  'white-hat-black-hat-seo': 'white hat black hat seo',
  'wix-seo-rehberi': 'wix seo rehberi',
  'woocommerce-seo-rehberi': 'woocommerce seo rehberi',
  'wordpress-seo-rehberi': 'wordpress seo rehberi',
  'wordpress-wix-ticimax-karsilastirma': 'wordpress wix ticimax karşılaştırma',
  'xml-sitemap-rehberi': 'xml sitemap rehberi',
  'yandex-seo-reklam-rehberi': 'yandex seo ve yandex direct',
  'yapay-zeka-icerik-uretimi': 'yapay zeka içerik üretimi',
  'yerel-anahtar-kelime-arastirmasi': 'yerel anahtar kelime araştırması',
  'yerel-seo-google-business-profile': 'yerel seo rehberi',
  'youtube-seo-rehberi': 'youtube seo rehberi',
};

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

// ─── Frontmatter'a focusKeyword satırı ekle ───────────────────────────────

function writeFocusKeyword(filePath, keyword) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Zaten varsa güncelle
  if (/^focusKeyword:/m.test(content)) {
    content = content.replace(/^focusKeyword:.*$/m, 'focusKeyword: "' + keyword + '"');
  } else {
    // slug: satırından sonra ekle
    content = content.replace(/^(slug:.*)$/m, '$1\nfocusKeyword: "' + keyword + '"');
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// ─── Tek yazı işle ───────────────────────────────────────────────────────

async function processPost(filePath, keyword) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { meta } = parseFrontmatter(raw);
  const wixId = meta.wixId;

  if (DRY_RUN) {
    console.log('  keyword: "' + keyword + '" | wixId: ' + (wixId || 'YOK'));
    return { ok: true };
  }

  // 1. Frontmatter güncelle
  writeFocusKeyword(filePath, keyword);

  // wixId yoksa sadece frontmatter yaz, API atla
  if (!wixId || wixId === '?') {
    console.log('  ✓ Frontmatter yazıldı (wixId yok — API atlandı)');
    return { ok: true };
  }

  // 2. seoData PATCH
  const seoData = {
    tags: [
      {
        type: 'title',
        children: meta.seoTitle || (meta.title + ' | Blakfy'),
        custom: false,
        disabled: false
      },
      {
        type: 'meta',
        props: { name: 'description', content: meta.metaDesc || '' },
        children: '',
        custom: false,
        disabled: false
      }
    ],
    settings: {
      keywords: [{ term: keyword, isMain: true }]
    }
  };

  const res = await wixReq('PATCH', '/blog/v3/draft-posts/' + wixId, {
    draftPost: { seoData },
    fieldMask: 'seoData'
  });

  if (res.status === 200 || res.status === 201) {
    console.log('  ✓ Güncellendi → "' + keyword + '"');
    return { ok: true };
  } else {
    const err = JSON.stringify(res.data).slice(0, 150);
    console.log('  ✗ HATA [' + res.status + ']: ' + err);
    return { ok: false, reason: err };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  const targets = files.filter(f => FOCUS_KEYWORDS[f.replace('.md', '')]);

  console.log('Odak kelime eklenecek yazı: ' + targets.length);
  if (DRY_RUN) console.log('[DRY RUN modu]\n');

  let ok = 0, fail = 0;
  const failures = [];

  for (let i = 0; i < targets.length; i++) {
    const f = targets[i];
    const slug = f.replace('.md', '');
    const keyword = FOCUS_KEYWORDS[slug];
    console.log('\n[' + (i + 1) + '/' + targets.length + '] ' + slug);

    const result = await processPost(path.join(POSTS_DIR, f), keyword);
    if (result.ok) ok++;
    else { fail++; failures.push(slug); }

    if (!DRY_RUN) await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n─────────────────────────────');
  console.log('Tamamlandı: ' + ok + ' başarılı, ' + fail + ' başarısız');
  if (failures.length > 0) {
    console.log('Başarısız:', failures.join(', '));
  }
}

main().catch(console.error);
