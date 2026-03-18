// ── Agent Task Types ─────────────────────────────────────

export type AgentTaskType = 'blog_single' | 'blog_batch'

export type AgentTaskStatus =
  | 'pending'
  | 'running'
  | 'review'
  | 'approved'
  | 'published'
  | 'failed'

export type AgentRole = 'orchestrator' | 'writer' | 'seo_reviewer' | 'editor' | 'quality_gate'

export type AgentRunStatus = 'success' | 'error'

// ── API Request / Response ───────────────────────────────

export interface CreateTaskInput {
  type: AgentTaskType
  topics: string[]
}

export interface TaskSummary {
  id: string
  type: AgentTaskType
  status: AgentTaskStatus
  topics: string[]
  currentStep: string | null
  iterationCount: number
  estimatedCostUsd: string | null
  createdAt: string
}

export interface TaskDetail extends TaskSummary {
  output: string | null
  reviewNotes: string | null
  totalInputTokens: number
  totalOutputTokens: number
  startedAt: string | null
  completedAt: string | null
  runs: AgentRunSummary[]
}

export interface AgentRunSummary {
  id: string
  agentRole: AgentRole
  stepIndex: number
  inputTokens: number
  outputTokens: number
  status: AgentRunStatus
  durationMs: number
  createdAt: string
}

// ── SSE Events ───────────────────────────────────────────

export type AgentSSEEvent =
  | { type: 'step'; step: string; agentRole: AgentRole }
  | { type: 'progress'; message: string }
  | { type: 'iteration'; count: number; maxIterations: number }
  | { type: 'complete'; status: AgentTaskStatus }
  | { type: 'error'; message: string }

// ── Pipeline Internal Types ──────────────────────────────

export interface PipelineContext {
  businessName: string
  taskId: string
  topic: string
  brandContext: string
  categories: string[]
  tags: string[]
}

export interface WriterOutput {
  markdown: string
  frontmatter: Record<string, unknown>
}

export interface ReviewResult {
  passed: boolean
  issues: ReviewIssue[]
  score: number
}

export interface ReviewIssue {
  field: string
  severity: 'error' | 'warning'
  message: string
}

export interface QualityGateResult {
  passed: boolean
  checks: QualityCheck[]
}

export interface QualityCheck {
  name: string
  passed: boolean
  detail: string
}
