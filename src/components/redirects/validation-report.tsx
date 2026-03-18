'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, XCircle } from 'lucide-react'

interface ValidationIssue {
  id: string
  type: 'KRITIK' | 'UYARI'
  msg: string
}

interface ValidationReportProps {
  total: number
  issues: ValidationIssue[]
}

export function ValidationReport({ total, issues }: ValidationReportProps) {
  if (issues.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-sm text-accent">
          {total} redirect kontrol edildi — sorun bulunamadı
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Doğrulama Raporu — {issues.length} sorun
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {issues.map((issue, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            {issue.type === 'KRITIK' ? (
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            ) : (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
            )}
            <div>
              <Badge
                variant="outline"
                className={`mr-2 text-xs ${
                  issue.type === 'KRITIK'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
              >
                {issue.type}
              </Badge>
              {issue.msg}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
