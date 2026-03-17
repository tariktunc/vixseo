require('dotenv').config();
const { GoogleAdsApi } = require('google-ads-api');

const client = new GoogleAdsApi({
  client_id:     process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

const customer = client.Customer({
  customer_id:   process.env.GOOGLE_ADS_CUSTOMER_ID,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
});

const keywords = process.argv.slice(2);
if (!keywords.length) {
  console.log('Kullanım: node keyword-volume.js "web tasarım" "seo" "dijital pazarlama"');
  process.exit(1);
}

async function getKeywordVolume(keywordList) {
  console.log(`\nAranıyor: ${keywordList.join(', ')}\n`);

  const results = await customer.keywordPlanIdeas.generateKeywordIdeas({
    language: 'languageConstants/1011',        // Türkçe
    geo_target_constants: ['geoTargetConstants/2792'], // Türkiye
    include_adult_keywords: false,
    keyword_seed: { keywords: keywordList },
    page_size: 20,
  });

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Keyword Arama Hacimleri — Türkiye`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`${'Keyword'.padEnd(35)} ${'Aylık Hacim'.padStart(12)} ${'Rekabet'.padStart(10)}`);
  console.log('─'.repeat(60));

  const competition = { 0: 'Bilinmiyor', 1: 'Düşük', 2: 'Orta', 3: 'Yüksek' };

  for (const result of results) {
    const kw  = result.text || '';
    const vol = result.keyword_idea_metrics?.avg_monthly_searches ?? '-';
    const cmp = competition[result.keyword_idea_metrics?.competition] ?? '-';
    console.log(`${kw.padEnd(35)} ${String(vol).padStart(12)} ${cmp.padStart(10)}`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

getKeywordVolume(keywords).catch(e => {
  console.error('Hata:', e.message || e);
  if (e.errors) console.error(JSON.stringify(e.errors, null, 2));
});
