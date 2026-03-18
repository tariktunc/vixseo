import { getAnthropicClient, MODELS } from './client'
import { editorPrompt } from './prompts'
import type { ReviewIssue } from './types'

export async function runEditor(
  markdown: string,
  issues: ReviewIssue[]
): Promise<{ result: string; inputTokens: number; outputTokens: number; durationMs: number }> {
  const client = getAnthropicClient()
  const model = MODELS.editor

  const issuesText = issues
    .map((i) => `- [${i.severity}] ${i.field}: ${i.message}`)
    .join('\n')

  const systemPrompt = editorPrompt(issuesText)

  const userMessage = `Aşağıdaki blog yazısını düzelt:

${markdown}`

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

  const result = response.content[0].type === 'text' ? response.content[0].text : markdown

  return { result, inputTokens, outputTokens, durationMs }
}
