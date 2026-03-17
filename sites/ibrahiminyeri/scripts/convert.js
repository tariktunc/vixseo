/**
 * convert.js — Markdown → Wix Blog RichContent
 *
 * Kullanım:
 *   const { parseFrontmatter, markdownToWixNodes } = require('./convert');
 *   const { meta, body } = parseFrontmatter(fileContent);
 *   const nodes = markdownToWixNodes(body);
 */

'use strict';

// ─── Inline text parser ───────────────────────────────────────────────────

/**
 * Ham metin string'ini Wix TEXT node dizisine çevirir.
 * Desteklenen: **bold**, `code`, [link](url)
 * @param {string} raw
 * @returns {Array}
 */
function parseInlineText(raw) {
  const nodes = [];
  // Sıra önemli: önce **bold**, sonra `code`, sonra [link](url)
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;

  while ((m = re.exec(raw)) !== null) {
    // Matchten önceki düz metin
    if (m.index > last) {
      nodes.push(textNode(raw.slice(last, m.index), []));
    }

    if (m[1] !== undefined) {
      // **bold**
      nodes.push(textNode(m[1], [{ type: 'BOLD', fontWeightValue: 700 }]));
    } else if (m[2] !== undefined) {
      // `code` — Wix inline code desteği sınırlı, kalın olarak göster
      nodes.push(textNode(m[2], [{ type: 'BOLD', fontWeightValue: 700 }]));
    } else if (m[3] !== undefined) {
      // [link text](url) — Wix LINK decoration formatı karmaşık, düz metin olarak ekle
      nodes.push(textNode(m[3], []));
    }

    last = m.index + m[0].length;
  }

  // Kalan düz metin
  if (last < raw.length) {
    nodes.push(textNode(raw.slice(last), []));
  }

  return nodes.length > 0 ? nodes : [textNode(raw, [])];
}

// ─── Wix node builder'lar ─────────────────────────────────────────────────

function textNode(text, decorations) {
  return { type: 'TEXT', id: '', textData: { text, decorations } };
}

const SPACER = {
  type: 'PARAGRAPH', id: '',
  nodes: [{ type: 'TEXT', id: '', textData: { text: '\u2800', decorations: [] } }],
  paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 }
};

function para(text) {
  return {
    type: 'PARAGRAPH', id: '',
    nodes: parseInlineText(text),
    paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 }
  };
}

function heading(level, text) {
  return {
    type: 'HEADING', id: '',
    nodes: parseInlineText(text),
    headingData: { level, textStyle: { textAlignment: 'AUTO' }, indentation: 0 }
  };
}

function listItem(text) {
  return {
    type: 'LIST_ITEM', id: '',
    nodes: [{
      type: 'PARAGRAPH', id: '',
      nodes: parseInlineText(text),
      paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 }
    }]
  };
}

function bulletList(items) {
  return { type: 'BULLETED_LIST', id: '', nodes: items.map(listItem) };
}

function orderedList(items) {
  return { type: 'ORDERED_LIST', id: '', nodes: items.map(listItem) };
}

// ─── Tablo → bullet list dönüştürücü ─────────────────────────────────────

function isSeparatorRow(line) {
  return /^\|[\s\-:|]+\|/.test(line.trim());
}

function parseTableRows(tableLines) {
  const rows = [];
  for (const line of tableLines) {
    if (isSeparatorRow(line)) continue;
    const cells = line.trim()
      .replace(/^\||\|$/g, '')  // baş ve son pipe'ı kaldır
      .split('|')
      .map(c => c.trim())
      .filter(c => c.length > 0);
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

function tableToNodes(tableLines) {
  const rows = parseTableRows(tableLines);
  if (rows.length === 0) return [];

  const nodes = [];
  const headers = rows[0];

  // Başlık satırı → bold paragraph
  if (headers.length > 0) {
    nodes.push({
      type: 'PARAGRAPH', id: '',
      nodes: parseInlineText('**' + headers.join(' | ') + '**'),
      paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 }
    });
  }

  // Veri satırları → bullet list
  if (rows.length > 1) {
    const dataItems = rows.slice(1).map(cells => {
      // Her hücreyi "Başlık: Değer" formatında göster
      return cells.map((cell, i) => {
        const label = headers[i] ? headers[i] + ': ' : '';
        return label + cell;
      }).join(' | ');
    });
    nodes.push(bulletList(dataItems));
  }

  return nodes;
}

// ─── YAML frontmatter parser ──────────────────────────────────────────────

/**
 * Markdown dosyasının başındaki ---...--- bloğunu parse eder.
 * @param {string} content  Dosyanın tüm içeriği
 * @returns {{ meta: Object, body: string }}
 */
function parseKV(line, meta) {
  const colon = line.indexOf(':');
  if (colon === -1) return;
  const key = line.slice(0, colon).trim();
  if (!key) return;
  let val = line.slice(colon + 1).trim();

  // Tırnak temizle
  if ((val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }

  // Dizi parse: [a, b, c]
  if (val.startsWith('[') && val.endsWith(']')) {
    val = val.slice(1, -1)
      .split(',')
      .map(v => v.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  meta[key] = val;
}

function parseFrontmatter(content) {
  // Dosya formatı: [önek satırlar]\n---\n[yaml]\n---\n[body]
  // Önek satırlar (wixId gibi) frontmatter bloğu dışında olabilir
  const match = content.match(/^([\s\S]*?)---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta = {};

  // Önek satırları parse et (örn: wixId: "...")
  if (match[1].trim()) {
    match[1].trim().split('\n').forEach(line => parseKV(line.trim(), meta));
  }

  // YAML bloğunu parse et
  match[2].split('\n').forEach(line => parseKV(line, meta));

  return { meta, body: match[3] };
}

// ─── Markdown → Wix nodes ─────────────────────────────────────────────────

/**
 * Markdown metnini Wix RichContent node dizisine çevirir.
 * Desteklenen: ##, ###, - liste, 1. liste, ```kod blokları```,
 *              > alıntı, tablolar, paragraf + inline **bold**, `code`, [link]()
 * @param {string} markdown
 * @returns {Array}
 */
function markdownToWixNodes(markdown) {
  const lines = markdown.split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Boş satır → atla
    if (trimmed === '') { i++; continue; }

    // H2
    if (trimmed.startsWith('## ')) {
      if (result.length > 0) result.push(SPACER);
      result.push(heading(2, trimmed.slice(3).trim()));
      result.push(SPACER);
      i++;
      continue;
    }

    // H3
    if (trimmed.startsWith('### ')) {
      result.push(heading(3, trimmed.slice(4).trim()));
      result.push(SPACER);
      i++;
      continue;
    }

    // H4 → H3 olarak göster
    if (trimmed.startsWith('#### ')) {
      result.push(heading(3, trimmed.slice(5).trim()));
      i++;
      continue;
    }

    // Kod bloğu (```...```)
    if (trimmed.startsWith('```')) {
      const codeLines = [];
      i++; // açılış satırını geç
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // kapanış satırını geç
      if (codeLines.length > 0) {
        // Her satırı ayrı paragraph olarak ekle (monospace görünüm için)
        result.push({
          type: 'PARAGRAPH', id: '',
          nodes: [textNode(codeLines.join('\n'), [{ type: 'BOLD', fontWeightValue: 700 }])],
          paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 }
        });
        result.push(SPACER);
      }
      continue;
    }

    // Blockquote (> ...)
    if (trimmed.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2).trim());
        i++;
      }
      // Paragraf olarak göster
      result.push(para(quoteLines.join(' ')));
      result.push(SPACER);
      continue;
    }

    // Tablo (| ... |)
    if (trimmed.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const tableNodes = tableToNodes(tableLines);
      tableNodes.forEach(n => result.push(n));
      result.push(SPACER);
      continue;
    }

    // Bullet list — ardışık satırları topla
    if (trimmed.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2).trim());
        i++;
      }
      result.push(bulletList(items));
      result.push(SPACER);
      continue;
    }

    // Ordered list — ardışık satırları topla
    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, '').trim());
        i++;
      }
      result.push(orderedList(items));
      result.push(SPACER);
      continue;
    }

    // Yatay çizgi (--- veya ***)
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      result.push(SPACER);
      i++;
      continue;
    }

    // Paragraf
    result.push(para(trimmed));
    i++;
  }

  return result;
}

// ─── Export ───────────────────────────────────────────────────────────────

module.exports = { parseFrontmatter, markdownToWixNodes, SPACER, para, heading, bulletList, orderedList, parseInlineText };
