import { NextResponse } from 'next/server'
import { requirePermission, requireBusinessAccess } from '@/lib/auth'
import { getDb } from '@/lib/db'
import { agentTasks, businesses } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET /api/[business]/agents/tasks — Görev listesi
export async function GET(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  const { business } = await params

  const guard = await requireBusinessAccess(business)
  if (guard) return guard

  const permGuard = await requirePermission('write:agents')
  if (permGuard) return permGuard

  const db = getDb()

  // Get business ID
  const [biz] = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(eq(businesses.name, business))
    .limit(1)

  if (!biz) {
    return NextResponse.json({ error: 'İşletme bulunamadı' }, { status: 404 })
  }

  const tasks = await db
    .select({
      id: agentTasks.id,
      type: agentTasks.type,
      status: agentTasks.status,
      input: agentTasks.input,
      currentStep: agentTasks.currentStep,
      iterationCount: agentTasks.iterationCount,
      estimatedCostUsd: agentTasks.estimatedCostUsd,
      createdAt: agentTasks.createdAt,
    })
    .from(agentTasks)
    .where(eq(agentTasks.businessId, biz.id))
    .orderBy(desc(agentTasks.createdAt))
    .limit(50)

  const formatted = tasks.map((t) => ({
    ...t,
    topics: (t.input as { topics?: string[] })?.topics || [],
  }))

  return NextResponse.json({ tasks: formatted })
}

// POST /api/[business]/agents/tasks — Görev oluştur
export async function POST(
  request: Request,
  { params }: { params: Promise<{ business: string }> }
) {
  const { business } = await params

  const guard = await requireBusinessAccess(business)
  if (guard) return guard

  const permGuard = await requirePermission('write:agents')
  if (permGuard) return permGuard

  const body = await request.json()
  const { type, topics } = body as { type?: string; topics?: string[] }

  if (!type || !topics || topics.length === 0) {
    return NextResponse.json(
      { error: 'type ve topics alanları gerekli' },
      { status: 400 }
    )
  }

  if (!['blog_single', 'blog_batch'].includes(type)) {
    return NextResponse.json(
      { error: 'type: blog_single veya blog_batch olmalı' },
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
    .insert(agentTasks)
    .values({
      businessId: biz.id,
      type,
      input: { topics },
      status: 'pending',
    })
    .returning({ id: agentTasks.id })

  return NextResponse.json({ taskId: task.id }, { status: 201 })
}
