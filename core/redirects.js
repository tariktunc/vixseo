'use strict';

/**
 * core/redirects.js — Site bazlı 301 redirect yönetimi
 *
 * Her site sites/{site}/redirects.csv dosyasını kullanır.
 * Wix Dashboard → SEO Tools → URL Redirect Manager → Import CSV
 *
 * Dışa aktarılanlar:
 *   add(siteDir, oldUrl, newUrl)   → redirects.csv'ye satır ekle
 *   validate(siteDir)              → sorunları raporla
 *   list(siteDir)                  → tüm redirect'leri döndür
 *   exportCsv(siteDir, destPath)   → Wix import için CSV üret
 */

const fs   = require('fs');
const path = require('path');

const HEADER  = 'Eski URL,Yeni URL,Yönlendirme Türü,Yönlendirme Durumu,Notlar';
const TR_CHARS = /[ğşçıöüĞŞÇİÖÜ]/;

// ─── Yardımcılar ──────────────────────────────────────────────────────────────

function csvPath(siteDir) {
  return path.join(siteDir, 'redirects.csv');
}

function toAscii(str) {
  return str
    .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
    .replace(/ş/g, 's').replace(/Ş/g, 'S')
    .replace(/ç/g, 'c').replace(/Ç/g, 'C')
    .replace(/ı/g, 'i').replace(/İ/g, 'I')
    .replace(/ö/g, 'o').replace(/Ö/g, 'O')
    .replace(/ü/g, 'u').replace(/Ü/g, 'U');
}

function parseRows(siteDir) {
  const file = csvPath(siteDir);
  if (!fs.existsSync(file)) return [];
  const lines = fs.readFileSync(file, 'utf8').trim().split('\n').slice(1); // header atla
  return lines.filter(Boolean).map(l => {
    const parts = l.split(',');
    return {
      old:    parts[0] || '',
      new:    parts[1] || '',
      type:   parts[2] || 'Tek Yönlendirme',
      status: parts[3] || 'Aktif',
      note:   parts[4] || ''
    };
  });
}

function writeRows(siteDir, rows) {
  const lines = rows.map(r =>
    [r.old, r.new, r.type, r.status, r.note].join(',')
  );
  fs.writeFileSync(csvPath(siteDir), HEADER + '\n' + lines.join('\n'), 'utf8');
}

function initFile(siteDir) {
  const file = csvPath(siteDir);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, HEADER + '\n', 'utf8');
  }
}

// ─── add ──────────────────────────────────────────────────────────────────────

/**
 * Yeni bir redirect ekler. Duplicate varsa atlar.
 * oldUrl ve newUrl / ile başlamalı (path formatı).
 * newUrl'deki Türkçe karakter otomatik ASCII'ye çevrilir.
 */
function add(siteDir, oldUrl, newUrl, note = '') {
  initFile(siteDir);

  // Git Bash Windows path dönüşümünü geri al (C:/Program Files/Git/foo → /foo)
  const gitBashPrefix = /^[A-Z]:\/Program Files\/Git/i;
  if (gitBashPrefix.test(oldUrl)) oldUrl = oldUrl.replace(gitBashPrefix, '');
  if (gitBashPrefix.test(newUrl)) newUrl = newUrl.replace(gitBashPrefix, '');

  // Normalize
  if (!oldUrl.startsWith('/')) oldUrl = '/' + oldUrl;
  if (!newUrl.startsWith('/') && !newUrl.startsWith('http')) newUrl = '/' + newUrl;

  // Yeni URL'de Türkçe karakter → ASCII
  if (TR_CHARS.test(newUrl)) {
    const fixed = toAscii(newUrl);
    console.warn(`  ⚠ Yeni URL Türkçe karakter içeriyor, düzeltildi: ${newUrl} → ${fixed}`);
    newUrl = fixed;
  }

  const rows = parseRows(siteDir);

  // Duplicate kontrol
  const exists = rows.find(r => r.old === oldUrl);
  if (exists) {
    if (exists.new === newUrl) {
      return { added: false, reason: 'Zaten mevcut' };
    } else {
      // Farklı hedefe güncelle
      exists.new  = newUrl;
      exists.note = note || exists.note;
      writeRows(siteDir, rows);
      return { added: false, updated: true };
    }
  }

  rows.push({ old: oldUrl, new: newUrl, type: 'Tek Yönlendirme', status: 'Aktif', note });
  writeRows(siteDir, rows);
  return { added: true };
}

// ─── validate ─────────────────────────────────────────────────────────────────

function validate(siteDir) {
  const rows   = parseRows(siteDir);
  const issues = [];

  // 1. Yeni URL'de Türkçe karakter (kritik)
  rows.forEach((r, i) => {
    if (TR_CHARS.test(r.new)) {
      issues.push({ line: i + 2, type: 'KRITIK', msg: `Yeni URL'de Türkçe karakter: ${r.new}`, row: r });
    }
  });

  // 2. Eski URL'de Türkçe karakter (uyarı)
  rows.forEach((r, i) => {
    if (TR_CHARS.test(r.old)) {
      issues.push({ line: i + 2, type: 'UYARI', msg: `Eski URL'de Türkçe karakter: ${r.old}`, row: r });
    }
  });

  // 3. Zincir redirect (A→B ve B→C)
  const oldMap = new Map(rows.map(r => [r.old, r.new]));
  rows.forEach((r, i) => {
    if (oldMap.has(r.new)) {
      issues.push({
        line: i + 2, type: 'UYARI',
        msg:  `Zincir: ${r.old} → ${r.new} → ${oldMap.get(r.new)}`,
        row: r
      });
    }
  });

  // 4. Döngüsel redirect (A→B ve B→A)
  rows.forEach((r, i) => {
    const target = rows.find(r2 => r2.old === r.new && r2.new === r.old);
    if (target) {
      issues.push({ line: i + 2, type: 'KRITIK', msg: `Döngü: ${r.old} ↔ ${r.new}`, row: r });
    }
  });

  return { total: rows.length, issues };
}

// ─── list ─────────────────────────────────────────────────────────────────────

function list(siteDir) {
  return parseRows(siteDir);
}

// ─── exportCsv ────────────────────────────────────────────────────────────────

/**
 * Wix import için CSV dosyası üretir.
 * destPath belirtilmezse sites/{site}/redirects-export.csv oluşturur.
 */
function exportCsv(siteDir, destPath) {
  const rows = parseRows(siteDir);
  const out  = HEADER + '\n' + rows.map(r =>
    [r.old, r.new, r.type, r.status, r.note].join(',')
  ).join('\n');

  const target = destPath || path.join(siteDir, 'redirects-export.csv');
  fs.writeFileSync(target, out, 'utf8');
  return { path: target, count: rows.length };
}

module.exports = { add, validate, list, exportCsv, initFile };
