'use strict';

/**
 * core/search-console.js — Google Search Console API entegrasyonu
 *
 * Auth: Service Account (google-search-console.json)
 * Kapsam: webmasters.readonly — sadece okuma
 *
 * Dışa aktarılanlar:
 *   getPerformance(siteUrl, opts)   → Sayfa/sorgu bazlı performans
 *   getTopPages(siteUrl, days)      → En çok trafik alan sayfalar
 *   getTopQueries(siteUrl, days)    → En çok trafik getiren sorgular
 *   saveSummary(siteDir, data)      → data/sc-summary.json olarak kaydet
 */

require('dotenv').config();
const { google } = require('googleapis');
const fs         = require('fs');
const path       = require('path');

const CREDENTIALS_FILE = path.join(__dirname, '..', 'google-search-console.json');
const SCOPES           = ['https://www.googleapis.com/auth/webmasters.readonly'];

// ─── Auth ─────────────────────────────────────────────────────────────────

function getAuth() {
  if (!fs.existsSync(CREDENTIALS_FILE)) {
    throw new Error('google-search-console.json bulunamadı — proje köküne koy');
  }
  return new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_FILE,
    scopes:  SCOPES
  });
}

function getClient() {
  const auth = getAuth();
  return google.searchconsole({ version: 'v1', auth });
}

// ─── Tarih yardımcıları ───────────────────────────────────────────────────

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

// ─── Performans sorgusu (genel) ───────────────────────────────────────────

/**
 * getPerformance(siteUrl, opts)
 *
 * opts.startDate   : 'YYYY-MM-DD'  (default: 90 gün önce)
 * opts.endDate     : 'YYYY-MM-DD'  (default: dün)
 * opts.dimensions  : ['page'] | ['query'] | ['page','query']
 * opts.rowLimit    : max satır (default: 100, max: 25000)
 * opts.filter      : { page: 'url-içeriyor' } opsiyonel
 */
async function getPerformance(siteUrl, opts = {}) {
  const sc        = getClient();
  const startDate = opts.startDate || daysAgo(90);
  const endDate   = opts.endDate   || daysAgo(1);
  const dims      = opts.dimensions || ['page'];
  const rowLimit  = opts.rowLimit   || 100;

  const requestBody = {
    startDate,
    endDate,
    dimensions: dims,
    rowLimit,
    dataState: 'all'
  };

  if (opts.filter?.page) {
    requestBody.dimensionFilterGroups = [{
      filters: [{
        dimension:  'page',
        operator:   'contains',
        expression: opts.filter.page
      }]
    }];
  }

  const res = await sc.searchanalytics.query({
    siteUrl,
    requestBody
  });

  return (res.data.rows || []).map(row => ({
    keys:        row.keys,
    page:        dims.includes('page')  ? row.keys[dims.indexOf('page')]  : null,
    query:       dims.includes('query') ? row.keys[dims.indexOf('query')] : null,
    clicks:      row.clicks,
    impressions: row.impressions,
    ctr:         parseFloat((row.ctr * 100).toFixed(2)),
    position:    parseFloat(row.position.toFixed(1))
  }));
}

// ─── En çok trafik alan sayfalar ──────────────────────────────────────────

async function getTopPages(siteUrl, days = 90, limit = 50) {
  return getPerformance(siteUrl, {
    startDate:  daysAgo(days),
    endDate:    daysAgo(1),
    dimensions: ['page'],
    rowLimit:   limit
  });
}

// ─── En çok trafik getiren sorgular ───────────────────────────────────────

async function getTopQueries(siteUrl, days = 90, limit = 50) {
  return getPerformance(siteUrl, {
    startDate:  daysAgo(days),
    endDate:    daysAgo(1),
    dimensions: ['query'],
    rowLimit:   limit
  });
}

// ─── Sayfa + sorgu bazlı detay ────────────────────────────────────────────

async function getPageQueries(siteUrl, pageUrl, days = 90) {
  return getPerformance(siteUrl, {
    startDate:  daysAgo(days),
    endDate:    daysAgo(1),
    dimensions: ['page', 'query'],
    rowLimit:   200,
    filter:     { page: pageUrl }
  });
}

// ─── Local kaydet ─────────────────────────────────────────────────────────

function saveSummary(siteDir, data) {
  const dataDir  = path.join(siteDir, 'data');
  const filePath = path.join(dataDir, 'sc-summary.json');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify({
    pulledAt: new Date().toISOString(),
    ...data
  }, null, 2), 'utf8');
  return filePath;
}

// ─── Tam rapor: Tüm yazıları çek ve kaydet ────────────────────────────────

async function pullSummary(siteDir) {
  const config   = JSON.parse(fs.readFileSync(path.join(siteDir, 'config.json'), 'utf8'));
  const siteUrl  = config.searchConsoleUrl;

  if (!siteUrl) {
    throw new Error('config.json\'da searchConsoleUrl yok');
  }

  console.log(`  Sayfa performansı çekiliyor (90 gün)...`);
  const pages = await getTopPages(siteUrl, 90, 500);

  console.log(`  Sorgu performansı çekiliyor...`);
  const queries = await getTopQueries(siteUrl, 90, 200);

  const summary = {
    siteUrl,
    period:  { start: daysAgo(90), end: daysAgo(1) },
    totals: {
      pages:        pages.length,
      totalClicks:  pages.reduce((s, p) => s + p.clicks, 0),
      totalImpressions: pages.reduce((s, p) => s + p.impressions, 0),
      avgPosition:  parseFloat((pages.reduce((s, p) => s + p.position, 0) / (pages.length || 1)).toFixed(1))
    },
    pages,
    queries
  };

  const filePath = saveSummary(siteDir, summary);
  return { summary, filePath };
}

module.exports = { getPerformance, getTopPages, getTopQueries, getPageQueries, pullSummary, saveSummary };
