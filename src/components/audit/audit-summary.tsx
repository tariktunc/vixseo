'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, XCircle, Info } from 'lucide-react'

interface AuditSummaryProps {
  totalPosts?: number
  summary: { kritik: number; orta: number; dusuk: number }
  auditedAt?: string | null
}

export function AuditSummary({ totalPosts, summary, auditedAt }: AuditSummaryProps) {
  const cards = [
    {
      label: 'Kritik',
      value: summary.kritik,
      icon: XCircle,
      color: 'text-destructive',
    },
    {
      label: 'Orta',
      value: summary.orta,
      icon: AlertTriangle,
      color: 'text-yellow-500',
    },
    {
      label: 'Düşük',
      value: summary.dusuk,
      icon: Info,
      color: 'text-blue-500',
    },
  ]

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <c.icon className={`h-5 w-5 ${c.color}`} />
              <div>
                <p className="text-2xl font-bold">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {(totalPosts !== undefined || auditedAt) && (
        <p className="text-xs text-muted-foreground">
          {totalPosts !== undefined && `${totalPosts} yazı kontrol edildi`}
          {auditedAt && ` — ${new Date(auditedAt).toLocaleString('tr-TR')}`}
        </p>
      )}
    </div>
  )
}
