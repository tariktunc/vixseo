import { getAnthropicClient, MODELS } from './client'
import { ORCHESTRATOR_PROMPT } from './prompts'
import { loadFullContext } from './context'
import { runWriter } from './writer'
import { runSeoReviewer } from './seo-reviewer'
import { runEditor } from './editor'
import { runQualityGate } from './quality-gate'
import { calculateCost } from './cost'
import { sumCosts } from './cost'
import { getDb } from '@/lib/db'
import { agentTasks, agentRuns } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import type { AgentRole, AgentSSEEvent } from './types'

type EmitFn = (event: AgentSSEEvent) => void

async function logRun(
  taskId: string,
  agentRole: AgentRole,
  stepIndex: number,
  data: {
    systemPrompt?: string
    userMessage?: string
    assistantResponse?: string
    inputTokens: number
    outputTokens: number
    status: 'success' | 'error'
    errorMessage?: string
    durationMs: number
  }
) {
  const db = getDb()
  await db.insert(agentRuns).values({
    taskId,
    agentRole,
    stepIndex,
    systemPrompt: data.systemPrompt?.slice(0, 5000),
    userMessage: data.userMessage?.slice(0, 5000),
    assistantResponse: data.assistantResponse?.slice(0, 10000),
    inputTokens: data.inputTokens,
    outputTokens: data.outputTokens,
    status: data.status,
    errorMessage: data.errorMessage,
    durationMs: data.durationMs,
  })

  // Update task token totals
  await db
    .update(agentTasks)
    .set({
      totalInputTokens: sql`${agentTasks.totalInputTokens} + ${data.inputTokens}`,
      totalOutputTokens: sql`${agentTasks.totalOutputTokens} + ${data.outputTokens}`,
    })
    .where(eq(agentTasks.id, taskId))
}

async function updateTaskStatus(
  taskId: string,
  updates: Partial<{
    status: string
    currentStep: string
    iterationCount: number
    output: string
    reviewNotes: string
    estimatedCostUsd: string
    startedAt: Date
    completedAt: Date
  }>
) {
  const db = getDb()
  await db.update(agentTasks).set(updates).where(eq(agentTasks.id, taskId))
}

interface OrchestratorTask {
  topic: string
  keywords: string[]
  targetWordCount: number
}

export async function runPipeline(
  businessName: string,
  taskId: string,
  topics: string[],
  emit: EmitFn
) {
  const db = getDb()
  let stepIndex = 0
  const costs: number[] = []

  try {
    // Mark as running
    await updateTaskStatus(taskId, {
      status: 'running',
      startedAt: new Date(),
      currentStep: 'orchestrator',
    })

    emit({ type: 'step', step: 'orchestrator', agentRole: 'orchestrator' })

    // Load site context
    const context = await loadFullContext(businessName)

    // Step 1: Orchestrator — plan tasks
    const client = getAnthropicClient()
    const orchStart = Date.now()
    const orchResponse = await client.messages.create({
      model: MODELS.orchestrator,
      max_tokens: 2048,
      system: ORCHESTRATOR_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Konular:\n${topics.map((t, i) => `${i + 1}. ${t}`).join('\n')}`,
        },
      ],
    })
    const orchDuration = Date.now() - orchStart
    const orchText = orchResponse.content[0].type === 'text' ? orchResponse.content[0].text : '{}'

    costs.push(
      calculateCost(MODELS.orchestrator, orchResponse.usage.input_tokens, orchResponse.usage.output_tokens)
    )

    await logRun(taskId, 'orchestrator', stepIndex++, {
      systemPrompt: ORCHESTRATOR_PROMPT,
      userMessage: topics.join(', '),
      assistantResponse: orchText,
      inputTokens: orchResponse.usage.input_tokens,
      outputTokens: orchResponse.usage.output_tokens,
      status: 'success',
      durationMs: orchDuration,
    })

    // Parse orchestrator output
    const jsonMatch = orchText.match(/\{[\s\S]*\}/)
    let tasks: OrchestratorTask[] = []
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0])
        tasks = parsed.tasks || []
      } catch {
        // Fallback: each topic as a simple task
        tasks = topics.map((t) => ({ topic: t, keywords: [], targetWordCount: 1500 }))
      }
    } else {
      tasks = topics.map((t) => ({ topic: t, keywords: [], targetWordCount: 1500 }))
    }

    emit({ type: 'progress', message: `${tasks.length} görev planlandı` })

    // Process each task (for single, there'll be just one)
    const allOutputs: string[] = []

    for (const task of tasks) {
      const pipelineCtx = {
        businessName,
        taskId,
        topic: task.topic,
        brandContext: context.brandContext,
        categories: context.categories,
        tags: context.tags,
      }

      // Step 2: Writer
      await updateTaskStatus(taskId, { currentStep: 'writer' })
      emit({ type: 'step', step: 'writer', agentRole: 'writer' })

      const writerResult = await runWriter(pipelineCtx, task.keywords)
      costs.push(calculateCost(MODELS.writer, writerResult.inputTokens, writerResult.outputTokens))

      await logRun(taskId, 'writer', stepIndex++, {
        userMessage: task.topic,
        assistantResponse: writerResult.result.markdown.slice(0, 10000),
        inputTokens: writerResult.inputTokens,
        outputTokens: writerResult.outputTokens,
        status: 'success',
        durationMs: writerResult.durationMs,
      })

      let currentMarkdown = writerResult.result.markdown

      // Step 3: SEO Review → Edit loop (max iterations)
      const [taskRow] = await db
        .select({ maxIterations: agentTasks.maxIterations })
        .from(agentTasks)
        .where(eq(agentTasks.id, taskId))
      const maxIterations = taskRow?.maxIterations ?? 3
      let iteration = 0

      while (iteration < maxIterations) {
        iteration++
        await updateTaskStatus(taskId, {
          currentStep: 'seo_reviewer',
          iterationCount: iteration,
        })
        emit({ type: 'step', step: 'seo_reviewer', agentRole: 'seo_reviewer' })
        emit({ type: 'iteration', count: iteration, maxIterations })

        const reviewResult = await runSeoReviewer(
          currentMarkdown,
          context.categories,
          context.tags
        )
        costs.push(
          calculateCost(MODELS.seo_reviewer, reviewResult.inputTokens, reviewResult.outputTokens)
        )

        await logRun(taskId, 'seo_reviewer', stepIndex++, {
          userMessage: `Review iteration ${iteration}`,
          assistantResponse: JSON.stringify(reviewResult.result),
          inputTokens: reviewResult.inputTokens,
          outputTokens: reviewResult.outputTokens,
          status: 'success',
          durationMs: reviewResult.durationMs,
        })

        await updateTaskStatus(taskId, {
          reviewNotes: JSON.stringify(reviewResult.result),
        })

        if (reviewResult.result.passed && reviewResult.result.score >= 80) {
          emit({ type: 'progress', message: `SEO review geçti (skor: ${reviewResult.result.score})` })
          break
        }

        // Needs editing
        if (iteration >= maxIterations) {
          emit({ type: 'progress', message: `Max iterasyon (${maxIterations}) aşıldı, devam ediliyor` })
          break
        }

        await updateTaskStatus(taskId, { currentStep: 'editor' })
        emit({ type: 'step', step: 'editor', agentRole: 'editor' })

        const editorResult = await runEditor(currentMarkdown, reviewResult.result.issues)
        costs.push(calculateCost(MODELS.editor, editorResult.inputTokens, editorResult.outputTokens))

        await logRun(taskId, 'editor', stepIndex++, {
          userMessage: `Fix issues: ${reviewResult.result.issues.map((i) => i.message).join('; ')}`,
          assistantResponse: editorResult.result.slice(0, 10000),
          inputTokens: editorResult.inputTokens,
          outputTokens: editorResult.outputTokens,
          status: 'success',
          durationMs: editorResult.durationMs,
        })

        currentMarkdown = editorResult.result
      }

      // Step 4: Quality Gate (deterministic)
      await updateTaskStatus(taskId, { currentStep: 'quality_gate' })
      emit({ type: 'step', step: 'quality_gate', agentRole: 'quality_gate' })

      const qgResult = runQualityGate(currentMarkdown, context.categories, context.tags)

      await logRun(taskId, 'quality_gate', stepIndex++, {
        userMessage: 'Quality gate check',
        assistantResponse: JSON.stringify(qgResult),
        inputTokens: 0,
        outputTokens: 0,
        status: qgResult.passed ? 'success' : 'error',
        durationMs: 0,
      })

      if (!qgResult.passed) {
        const failedChecks = qgResult.checks.filter((c) => !c.passed).map((c) => c.detail)
        emit({
          type: 'progress',
          message: `Quality gate uyarıları: ${failedChecks.join(', ')}`,
        })
      }

      allOutputs.push(currentMarkdown)
    }

    // Combine all outputs
    const finalOutput = allOutputs.join('\n\n---\n\n')
    const totalCost = sumCosts(costs)

    await updateTaskStatus(taskId, {
      status: 'review',
      currentStep: 'done',
      output: finalOutput,
      estimatedCostUsd: totalCost.toFixed(6),
      completedAt: new Date(),
    })

    emit({ type: 'complete', status: 'review' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Bilinmeyen hata'

    await updateTaskStatus(taskId, {
      status: 'failed',
      currentStep: 'error',
      estimatedCostUsd: sumCosts(costs).toFixed(6),
      completedAt: new Date(),
    })

    await logRun(taskId, 'orchestrator', stepIndex, {
      inputTokens: 0,
      outputTokens: 0,
      status: 'error',
      errorMessage: message,
      durationMs: 0,
    })

    emit({ type: 'error', message })
  }
}
