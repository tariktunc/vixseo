import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY env değişkeni bulunamadı')
    }
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return _client
}

export type AnthropicModel = 'claude-sonnet-4-6-20250514' | 'claude-haiku-4-5-20251001'

export const MODELS = {
  orchestrator: 'claude-sonnet-4-6-20250514' as AnthropicModel,
  writer: 'claude-sonnet-4-6-20250514' as AnthropicModel,
  seo_reviewer: 'claude-haiku-4-5-20251001' as AnthropicModel,
  editor: 'claude-sonnet-4-6-20250514' as AnthropicModel,
} as const
