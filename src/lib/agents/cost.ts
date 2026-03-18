import type { AnthropicModel } from './client'

// Pricing per million tokens (USD) — updated 2025
const PRICING: Record<AnthropicModel, { input: number; output: number }> = {
  'claude-sonnet-4-6-20250514': { input: 3, output: 15 },
  'claude-haiku-4-5-20251001': { input: 1, output: 5 },
}

export function calculateCost(
  model: AnthropicModel,
  inputTokens: number,
  outputTokens: number
): number {
  const p = PRICING[model]
  return (inputTokens * p.input + outputTokens * p.output) / 1_000_000
}

export function formatCost(usd: number): string {
  return `$${usd.toFixed(4)}`
}

export function sumCosts(costs: number[]): number {
  return costs.reduce((sum, c) => sum + c, 0)
}
