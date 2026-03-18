// Markdown → Wix RichContent dönüştürücü (port: sites/*/scripts/convert.js)

interface TextDecoration {
  type: string
  fontWeightValue?: number
}

interface TextNode {
  type: 'TEXT'
  id: string
  textData: { text: string; decorations: TextDecoration[] }
}

interface WixNode {
  type: string
  id: string
  nodes?: (WixNode | TextNode)[]
  paragraphData?: { textStyle: { textAlignment: string }; indentation: number }
  headingData?: { level: number; textStyle: { textAlignment: string }; indentation: number }
}

function textNode(text: string, decorations: TextDecoration[]): TextNode {
  return { type: 'TEXT', id: '', textData: { text, decorations } }
}

const SPACER: WixNode = {
  type: 'PARAGRAPH',
  id: '',
  nodes: [textNode('\u2800', [])],
  paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 },
}

function parseInlineText(raw: string): TextNode[] {
  const nodes: TextNode[] = []
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) {
      nodes.push(textNode(raw.slice(last, m.index), []))
    }
    if (m[1] !== undefined) {
      nodes.push(textNode(m[1], [{ type: 'BOLD', fontWeightValue: 700 }]))
    } else if (m[2] !== undefined) {
      nodes.push(textNode(m[2], [{ type: 'BOLD', fontWeightValue: 700 }]))
    } else if (m[3] !== undefined) {
      nodes.push(textNode(m[3], []))
    }
    last = m.index + m[0].length
  }

  if (last < raw.length) {
    nodes.push(textNode(raw.slice(last), []))
  }

  return nodes.length > 0 ? nodes : [textNode(raw, [])]
}

function para(text: string): WixNode {
  return {
    type: 'PARAGRAPH',
    id: '',
    nodes: parseInlineText(text),
    paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 },
  }
}

function heading(level: number, text: string): WixNode {
  return {
    type: 'HEADING',
    id: '',
    nodes: parseInlineText(text),
    headingData: { level, textStyle: { textAlignment: 'AUTO' }, indentation: 0 },
  }
}

function listItem(text: string): WixNode {
  return {
    type: 'LIST_ITEM',
    id: '',
    nodes: [
      {
        type: 'PARAGRAPH',
        id: '',
        nodes: parseInlineText(text),
        paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 },
      },
    ],
  }
}

function bulletList(items: string[]): WixNode {
  return { type: 'BULLETED_LIST', id: '', nodes: items.map(listItem) }
}

function orderedList(items: string[]): WixNode {
  return { type: 'ORDERED_LIST', id: '', nodes: items.map(listItem) }
}

function isSeparatorRow(line: string): boolean {
  return /^\|[\s\-:|]+\|/.test(line.trim())
}

function tableToNodes(tableLines: string[]): WixNode[] {
  const rows: string[][] = []
  for (const line of tableLines) {
    if (isSeparatorRow(line)) continue
    const cells = line
      .trim()
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((c) => c.trim())
      .filter((c) => c.length > 0)
    if (cells.length > 0) rows.push(cells)
  }
  if (rows.length === 0) return []

  const nodes: WixNode[] = []
  const headers = rows[0]

  nodes.push({
    type: 'PARAGRAPH',
    id: '',
    nodes: parseInlineText('**' + headers.join(' | ') + '**'),
    paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 },
  })

  if (rows.length > 1) {
    const dataItems = rows.slice(1).map((cells) =>
      cells
        .map((cell, i) => {
          const label = headers[i] ? headers[i] + ': ' : ''
          return label + cell
        })
        .join(' | ')
    )
    nodes.push(bulletList(dataItems))
  }

  return nodes
}

export function markdownToWixNodes(markdown: string): WixNode[] {
  const lines = markdown.split('\n')
  const result: WixNode[] = []
  let i = 0

  while (i < lines.length) {
    const trimmed = lines[i].trim()

    if (trimmed === '') {
      i++
      continue
    }

    if (trimmed.startsWith('## ')) {
      if (result.length > 0) result.push(SPACER)
      result.push(heading(2, trimmed.slice(3).trim()))
      result.push(SPACER)
      i++
      continue
    }

    if (trimmed.startsWith('### ')) {
      result.push(heading(3, trimmed.slice(4).trim()))
      result.push(SPACER)
      i++
      continue
    }

    if (trimmed.startsWith('#### ')) {
      result.push(heading(3, trimmed.slice(5).trim()))
      i++
      continue
    }

    if (trimmed.startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++
      if (codeLines.length > 0) {
        result.push({
          type: 'PARAGRAPH',
          id: '',
          nodes: [textNode(codeLines.join('\n'), [{ type: 'BOLD', fontWeightValue: 700 }])],
          paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 },
        })
        result.push(SPACER)
      }
      continue
    }

    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2).trim())
        i++
      }
      result.push(para(quoteLines.join(' ')))
      result.push(SPACER)
      continue
    }

    if (trimmed.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      tableToNodes(tableLines).forEach((n) => result.push(n))
      result.push(SPACER)
      continue
    }

    if (trimmed.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2).trim())
        i++
      }
      result.push(bulletList(items))
      result.push(SPACER)
      continue
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, '').trim())
        i++
      }
      result.push(orderedList(items))
      result.push(SPACER)
      continue
    }

    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      result.push(SPACER)
      i++
      continue
    }

    result.push(para(trimmed))
    i++
  }

  return result
}

export function parseFrontmatter(content: string): { meta: Record<string, unknown>; body: string } {
  const match = content.match(/^([\s\S]*?)---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: content }

  const meta: Record<string, unknown> = {}

  function parseKV(line: string) {
    const colon = line.indexOf(':')
    if (colon === -1) return
    const key = line.slice(0, colon).trim()
    if (!key) return
    let val: string | string[] = line.slice(colon + 1).trim()

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }

    if (typeof val === 'string' && val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    }

    meta[key] = val
  }

  if (match[1].trim()) {
    match[1]
      .trim()
      .split('\n')
      .forEach((line) => parseKV(line.trim()))
  }
  match[2].split('\n').forEach((line) => parseKV(line))

  return { meta, body: match[3] }
}
