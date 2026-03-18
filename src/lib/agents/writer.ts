import { getAnthropicClient, MODELS } from './client'
import { writerPrompt } from './prompts'
import { calculateCost } from './cost'
import type { PipelineContext, WriterOutput } from './types'

export async function runWriter(
  ctx: PipelineContext,
  keywords: string[]
): Promise<{ result: WriterOutput; inputTokens: number; outputTokens: number; durationMs: number }> {
  const client = getAnthropicClient()
  const model = MODELS.writer
  const systemPrompt = writerPrompt(ctx.brandContext, ctx.categories, ctx.tags)

  const userMessage = `Konu: ${ctx.topic}
Anahtar Kelimeler: ${keywords.join(', ')}
Hedef: Minimum 1500 kelimelik, SEO uyumlu blog yazısı üret.`

  const start = Date.now()

  const response = await client.messages.create({
    model,
    max_tokens: 8192,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })

  const durationMs = Date.now() - start
  const inputTokens = response.usage.input_tokens
  const outputTokens = response.usage.output_tokens

  const markdown =
    response.content[0].type === 'text' ? response.content[0].text : ''

  // Parse frontmatter
  const frontmatter: Record<string, unknown> = {}
  const fmMatch = markdown.match(/^---\n([\s\S]*?)\n---/)
  if (fmMatch) {
    const lines = fmMatch[1].split('\n')
    let currentKey = ''
    let currentArray: string[] = []

    for (const line of lines) {
      const kvMatch = line.match(/^(\w+):\s*"?(.+?)"?\s*$/)
      if (kvMatch) {
        if (currentKey && currentArray.length > 0) {
          frontmatter[currentKey] = currentArray
          currentArray = []
        }
        currentKey = kvMatch[1]
        frontmatter[currentKey] = kvMatch[2]
      } else if (line.match(/^(\w+):$/)) {
        if (currentKey && currentArray.length > 0) {
          frontmatter[currentKey] = currentArray
          currentArray = []
        }
        currentKey = line.replace(':', '').trim()
        currentArray = []
      } else if (line.match(/^\s+-\s+(.+)$/)) {
        const val = line.replace(/^\s+-\s+/, '').trim()
        currentArray.push(val)
      }
    }
    if (currentKey && currentArray.length > 0) {
      frontmatter[currentKey] = currentArray
    }
  }

  return {
    result: { markdown, frontmatter },
    inputTokens,
    outputTokens,
    durationMs,
  }
}
