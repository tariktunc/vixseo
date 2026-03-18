import { NextResponse } from 'next/server'
import { requirePermission, requireBusinessAccess } from '@/lib/auth'
import { getDb } from '@/lib/db'
import { agentTasks, agentRuns, businesses } from '@/db/schema'
import { eq, and, asc } from 'drizzle-orm'

// GET /api/[business]/agents/tasks/[taskId] — Detay
export async function GET(
  request: Request,
  { params }: { params: Promise<{ business: string; taskId: string }> }
) {
  const { business, taskId } = await params

  const guard = await requireBusinessAccess(business)
  if (guard) return guard

  const permGuard = await requirePermission('write:agents')
  if (permGuard) return permGuard

  const db = getDb()

  const [biz] = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(eq(businesses.name, business))
    .limit(1)

  if (!biz) {
    return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
  }

  const [task] = await db
    .select()
    .from(agentTasks)
    .where(and(eq(agentTasks.id, taskId), eq(agentTasks.businessId, biz.id)))
    .limit(1)

  if (!task) {
    return NextResponse.json({ error: 'Görev bulunamadı' }, { status: 404 })
  }

  const runs = await db
    .select({
      id: agentRuns.id,
      agentRole: agentRuns.agentRole,
      stepIndex: agentRuns.stepIndex,
      inputTokens: agentRuns.inputTokens,
      outputTokens: agentRuns.outputTokens,
      status: agentRuns.status,
      durationMs: agentRuns.durationMs,
      createdAt: agentRuns.createdAt,
    })
    .from(agentRuns)
    .where(eq(agentRuns.taskId, taskId))
    .orderBy(asc(agentRuns.stepIndex))

  return NextResponse.json({
    task: {
      ...task,
      topics: (task.input as { topics?: string[] })?.topics || [],
      runs,
    },
  })
}

// PATCH /api/[business]/agents/tasks/[taskId] — Onayla/Reddet
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ business: string; taskId: string }> }
) {
  const { business, taskId } = await params

  const guard = await requireBusinessAccess(business)
  if (guard) return guard

  const permGuard = await requirePermission('write:agents')
  if (permGuard) return permGuard

  const body = await request.json()
  const { action } = body as { action?: 'approve' | 'reject' }

  if (!action || !['approve', 'reject'].includes(action)) {
    return NextResponse.json(
      { error: 'action: approve veya reject olmalı' },
      { status: 400 }
    )
  }

  const db = getDb()

  const [biz] = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(eq(businesses.name, business))
    .limit(1)

  if (!biz) {
    return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
  }

  const [task] = await db
    .select({ status: agentTasks.status })
    .from(agentTasks)
    .where(and(eq(agentTasks.id, taskId), eq(agentTasks.businessId, biz.id)))
    .limit(1)

  if (!task) {
    return NextResponse.json({ error: 'Görev bulunamadı' }, { status: 404 })
  }

  if (task.status !== 'review') {
    return NextResponse.json(
      { error: 'Sadece review durumundaki görevler onaylanabilir/reddedilebilir' },
      { status: 400 }
    )
  }

  const newStatus = action === 'approve' ? 'approved' : 'failed'

  await db
    .update(agentTasks)
    .set({ status: newStatus })
    .where(eq(agentTasks.id, taskId))

  return NextResponse.json({ status: newStatus })
}
