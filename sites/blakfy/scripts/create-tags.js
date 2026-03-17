'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImRlODllZTA0LTg0NmYtNDEwNC1iMjA3LWZlNmZkZjE3NDA2OFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjc2M2U5NmI0LTM5NGItNDkyNC1iMTMxLWYxZGU0NmMyMmE2MlwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIxNjI2YjU5NS1mNTBjLTQ4ZWMtYTVkNC1jNGE3YzQzMGUxNGVcIn19IiwiaWF0IjoxNzczNjE5MDM0fQ.bCSWK71m5bUwiam4PYGVPavchBRNUcNdwL8df9hlUYrEggBbk0Or1WJ7c_5_ant72lM_tFa44-HpmGmC_DOm8fNxqBUq_TzXHRflTE5bs0Sqtx3P1bFxqiOvqonPQ15Jr02dwi5IUFl3RkMEPxdc7XeSCTrm6LwTQYXsHUokCEWpNS6bE-zLZgRX1Ulx6s3p6-U-zFIqa3HBR5KTgoYRRkAnRMUKHtP3TKq1tryqyCBod9zBK0MEBhjvsDgHCD7SeOmEDgbyuo8xDZKNuM9huSGIxSiduxKLpORSSgSqPjzFBOPqS-4Gx8ApDqFnFKiYEP7ByvS-iIe1-PnvHDkSLQ';
const SITE_ID = '7a2f84ce-61de-4785-b61d-e81718514e0a';
const TAGS_FILE = path.join(__dirname, 'tags.json');

// Oluşturulacak yeni taglar
const NEW_TAGS = [
  { slug: 'trendyol',              label: 'Trendyol' },
  { slug: 'hepsiburada',           label: 'Hepsiburada' },
  { slug: 'semrush',               label: 'SEMrush' },
  { slug: 'ahrefs',                label: 'Ahrefs' },
  { slug: 'google-tag-manager',    label: 'Google Tag Manager' },
  { slug: 'instagram',             label: 'Instagram' },
  { slug: 'tiktok',                label: 'TikTok' },
  { slug: 'youtube',               label: 'YouTube' },
  { slug: 'linkedin',              label: 'LinkedIn' },
  { slug: 'affiliate',             label: 'Affiliate' },
  { slug: 'influencer',            label: 'Influencer' },
  { slug: 'b2b',                   label: 'B2B' },
  { slug: 'google-business-profile', label: 'Google Business Profile' },
  { slug: 'facebook-ads',          label: 'Facebook Ads' },
  { slug: 'screaming-frog',        label: 'Screaming Frog' },
  { slug: 'n11',                   label: 'N11' },
];

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

async function main() {
  const existing = JSON.parse(fs.readFileSync(TAGS_FILE, 'utf8'));
  let added = 0;

  for (const tag of NEW_TAGS) {
    if (existing[tag.slug]) {
      console.log(`  SKIP — zaten var: ${tag.slug}`);
      continue;
    }

    const res = await wixReq('POST', '/blog/v3/tags', { label: tag.label });

    if (res.status === 200 || res.status === 201) {
      const id = res.data?.tag?.id;
      if (id) {
        existing[tag.slug] = { id, label: tag.label };
        console.log(`  ✓ ${tag.slug} → ${id}`);
        added++;
      } else {
        console.warn(`  [WARN] ID gelmedi: ${tag.slug}`, JSON.stringify(res.data).slice(0, 100));
      }
    } else {
      console.warn(`  [ERR ${res.status}] ${tag.slug}: ${JSON.stringify(res.data).slice(0, 150)}`);
    }

    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync(TAGS_FILE, JSON.stringify(existing, null, 2), 'utf8');
  console.log(`\nTamamlandı. ${added} yeni tag eklendi → tags.json güncellendi.`);
}

main().catch(console.error);
