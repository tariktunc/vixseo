/**
 * marketplace-report.js — Wix Marketplace Otomasyon Raporu
 *
 * Kullanım:
 *   node scripts/marketplace-report.js
 *
 * Çıktı: Terminale 4 Marketplace otomasyonunun tam yapısını basar.
 * API'ye yazma yapmaz, sadece okur.
 */

'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const https = require('https');

// ─── Sabitler ─────────────────────────────────────────────────────────────

const API_KEY           = process.env.WIX_API_KEY;
const ACCOUNT_ID        = process.env.WIX_ACCOUNT_ID;
const MARKETPLACE_SITE_ID = 'f0faee7b-9ca4-4b8d-9863-e3be5fe89c81';

const AUTOMATIONS = [
  { label: 'Yeni Potansiyel Müşteri Oluşturulduğunda', id: '7b3d33da-875c-4017-a2f9-094931819b01' },
  { label: 'Sipariş Hazırlanıyor',                     id: '9099ae5e-a809-4e25-b80b-f677356bf814' },
  { label: 'Proje Tamamlandığında',                    id: 'bf403e4e-13fc-4810-9a6e-649f343fa108' },
  { label: 'Proje İptal Edildiğinde',                  id: 'e4a96168-12ef-4e44-a091-1e6583a17290' },
];

// ─── API yardımcısı ───────────────────────────────────────────────────────

function wixReq(method, apiPath, siteId) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'www.wixapis.com',
      path: apiPath,
      method,
      headers: {
        'Authorization': API_KEY,
        'wix-site-id':   siteId || MARKETPLACE_SITE_ID,
        'wix-account-id': ACCOUNT_ID,
        'Content-Type':  'application/json',
      }
    };
    const r = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
        catch (e) { resolve({ status: res.statusCode, data: d }); }
      });
    });
    r.on('error', reject);
    r.end();
  });
}

// ─── API fonksiyonları ────────────────────────────────────────────────────

async function getAutomation(id) {
  const res = await wixReq('GET', `/automations-service/v2/automations/${id}`);
  if (res.status !== 200) {
    return { error: `HTTP ${res.status}`, raw: JSON.stringify(res.data).slice(0, 200) };
  }
  return res.data?.automation || res.data;
}

async function getCampaign(messageId) {
  if (!messageId) return null;
  const res = await wixReq('GET', `/email-marketing/v1/campaigns/${messageId}`);
  if (res.status !== 200) return null;
  const c = res.data?.campaign || res.data;
  return c?.emailSubject || c?.subject || c?.title || c?.name || null;
}

// ─── Koşul ağacı çözümleyici ─────────────────────────────────────────────

function resolveConditionValue(expr) {
  // orExpressionGroups içindeki koşulları insan-okunur stringe çevir
  if (!expr || !expr.orExpressionGroups) return '(koşul yok)';

  const groups = expr.orExpressionGroups.map(group => {
    const parts = (group.expressions || []).map(ex => {
      const field  = ex.fieldName || ex.property || ex.key || '?';
      const op     = ex.operator  || '=';
      const val    = ex.value !== undefined
        ? JSON.stringify(ex.value)
        : (ex.values ? ex.values.join(', ') : '?');
      return `${field} ${op} ${val}`;
    });
    return parts.join(' VE ');
  });

  return groups.join(' VEYA ');
}

function parseActions(actions, depth) {
  if (!actions || actions.length === 0) return [];
  const indent = '  '.repeat(depth);
  const lines  = [];

  for (const action of actions) {
    const type = action.actionType || action.type || '?';

    if (type === 'CONDITION' || type === 'condition') {
      const condText = resolveConditionValue(action.condition || action.filter || action.expression);
      lines.push(`${indent}┬ KOŞUL: ${condText}`);

      // YES branch
      if (action.trueActions && action.trueActions.length > 0) {
        lines.push(`${indent}├─ EVET →`);
        lines.push(...parseActions(action.trueActions, depth + 2));
      }
      // NO branch
      if (action.falseActions && action.falseActions.length > 0) {
        lines.push(`${indent}└─ HAYIR →`);
        lines.push(...parseActions(action.falseActions, depth + 2));
      }

    } else if (type === 'SEND_EMAIL' || type === 'send_email' || type === 'TRIGGERED_EMAIL') {
      const mid = action.messageId || action.emailId || action.parameters?.messageId || '?';
      lines.push(`${indent}✉  Mail Gönder → messageId: ${mid}`);

    } else if (type === 'DELAY' || type === 'delay') {
      const d = action.delay || action.parameters?.delay || '';
      lines.push(`${indent}⏱  Bekle: ${JSON.stringify(d)}`);

    } else {
      lines.push(`${indent}• ${type}`);
    }
  }

  return lines;
}

// messageId'leri actions ağacından topla (iç içe dahil)
function collectMessageIds(actions) {
  if (!actions || actions.length === 0) return [];
  const ids = [];
  for (const action of actions) {
    const type = action.actionType || action.type || '';
    if (type === 'SEND_EMAIL' || type === 'send_email' || type === 'TRIGGERED_EMAIL') {
      const mid = action.messageId || action.emailId || action.parameters?.messageId;
      if (mid) ids.push(mid);
    }
    if (action.trueActions)  ids.push(...collectMessageIds(action.trueActions));
    if (action.falseActions) ids.push(...collectMessageIds(action.falseActions));
    if (action.actions)      ids.push(...collectMessageIds(action.actions));
  }
  return [...new Set(ids)];
}

// ─── Rapor yazdır ─────────────────────────────────────────────────────────

function printHeader(date) {
  const w = 56;
  console.log('╔' + '═'.repeat(w) + '╗');
  console.log('║' + '     WIX MARKETPLACE OTOMASYON RAPORU'.padEnd(w) + '║');
  console.log('║' + ('     Tarih: ' + date).padEnd(w) + '║');
  console.log('╚' + '═'.repeat(w) + '╝');
  console.log('');
  console.log(`  Site ID : ${MARKETPLACE_SITE_ID}`);
  console.log(`  Hesap ID: ${ACCOUNT_ID || '(WIX_ACCOUNT_ID bulunamadı)'}`);
  console.log('');
}

async function printAutomation(index, meta, automation, campaigns) {
  const sep = '─'.repeat(54);
  const num = `${index + 1}. ${meta.label}`;
  console.log(`─── ${num} ${'─'.repeat(Math.max(0, 54 - num.length - 4))}`);

  if (automation.error) {
    console.log(`  [HATA] ${automation.error}`);
    console.log(`  ${automation.raw}`);
    console.log('');
    return;
  }

  // Temel bilgiler
  const trigger    = automation.trigger?.triggerKey || automation.triggerKey || '-';
  const status     = automation.status || '-';
  const revision   = automation.revision || '-';
  const updatedRaw = automation.updatedDate || automation.lastModified || null;
  const updated    = updatedRaw ? updatedRaw.slice(0, 10) : '-';

  console.log(`  Durum       : ${status === 'ACTIVE' || status === 'active' ? 'AKTİF' : status}`);
  console.log(`  Tetikleyici : ${trigger}`);
  console.log(`  Revizyon    : ${revision}`);
  console.log(`  Son Güncell : ${updated}`);
  console.log('');

  // Mail şablonları
  const actions   = automation.actions || automation.workflow?.actions || [];
  const msgIds    = collectMessageIds(actions);

  if (msgIds.length > 0) {
    console.log('  Mail Şablonları:');
    for (let i = 0; i < msgIds.length; i++) {
      const mid     = msgIds[i];
      const subject = campaigns[mid] || '(başlık alınamadı)';
      console.log(`    [${i + 1}] ID  : ${mid}`);
      console.log(`        Konu: ${subject}`);
    }
    console.log('');
  }

  // Aksiyon / koşul ağacı
  if (actions.length > 0) {
    console.log('  Aksiyon / Koşul Yapısı:');
    const lines = parseActions(actions, 2);
    lines.forEach(l => console.log(l));
    console.log('');
  } else {
    console.log('  (Aksiyon listesi boş veya farklı alanda)\n');
    // Ham veriyi kısaca göster
    console.log('  Ham keys:', Object.keys(automation).join(', '));
    console.log('');
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  if (!API_KEY) {
    console.error('HATA: WIX_API_KEY bulunamadı. .env dosyasını kontrol et.');
    process.exit(1);
  }

  const today = new Date().toISOString().slice(0, 10);
  printHeader(today);

  // 1) Tüm otomasyonları paralel çek
  console.log('Otomasyonlar çekiliyor...');
  const automations = await Promise.all(AUTOMATIONS.map(m => getAutomation(m.id)));

  // 2) Tüm messageId'leri topla
  const allMsgIds = [];
  for (const auto of automations) {
    if (!auto.error) {
      const acts = auto.actions || auto.workflow?.actions || [];
      allMsgIds.push(...collectMessageIds(acts));
    }
  }
  const uniqueMsgIds = [...new Set(allMsgIds)];

  // 3) Kampanyaları paralel çek
  if (uniqueMsgIds.length > 0) {
    console.log(`Mail kampanyaları çekiliyor (${uniqueMsgIds.length} adet)...`);
  }
  const campaignResults = await Promise.all(uniqueMsgIds.map(mid => getCampaign(mid)));
  const campaigns = {};
  uniqueMsgIds.forEach((mid, i) => { campaigns[mid] = campaignResults[i]; });

  console.log('');

  // 4) Raporu yazdır
  for (let i = 0; i < AUTOMATIONS.length; i++) {
    await printAutomation(i, AUTOMATIONS[i], automations[i], campaigns);
  }

  console.log('═'.repeat(56));
  console.log('Rapor tamamlandı.');
}

main().catch(err => {
  console.error('Beklenmeyen hata:', err.message);
  process.exit(1);
});
