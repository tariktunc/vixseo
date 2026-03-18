import { getAnthropicClient, MODELS } from './client'
import { SEO_REVIEWER_PROMPT } from './prompts'
import type { ReviewResult } from './types'

export async function runSeoReviewer(
  markdown: string,
  categories: string[],
  tags: string[]
): Promise<{ result: ReviewResult; inputTokens: number; outputTokens: number; durationMs: number }> {
  const client = getAnthropicClient()
  const model = MODELS.seo_reviewer

  const userMessage = `Aşağıdaki blog yazısını kontrol et.

## Mevcut Kategoriler
${categories.join(', ')}

## Mevcut Etiketler
${tags.join(', ')}

## Blog Yazısı
${markdown}`

  const start = Date.now()

  const response = await client.messages.create({
    model,
    max_tokens: 2048,
    system: SEO_REVIEWER_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  })

  const durationMs = Date.now() - start
  const inputTokens = response.usage.input_tokens
  const outputTokens = response.usage.output_tokens

  const text = response.content[0].type === 'text' ? response.content[0].text : '{}'

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  let result: ReviewResult = { passed: false, issues: [], score: 0 }

  if (jsonMatch) {
    try {
      result = JSON.parse(jsonMatch[0])
    } catch {
      result = {
        passed: false,
        score: 0,
        issues: [{ field: 'parse', severity: 'error', message: 'SEO reviewer yanıtı parse edilemedi' }],
      }
    }
  }

  return { result, inputTokens, outputTokens, durationMs }
}
