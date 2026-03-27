'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

type FeedbackState = 'idle' | 'positive' | 'negative'

export function ArticleFeedback() {
  const [feedback, setFeedback] = useState<FeedbackState>('idle')

  if (feedback !== 'idle') {
    return (
      <div className="mt-16 pt-8 border-t border-border/60">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
          <p className="text-sm text-emerald-500 font-medium">
            {feedback === 'positive'
              ? 'Geri bildiriminiz için teşekkür ederiz!'
              : 'Geri bildiriminiz için teşekkür ederiz. İçeriğimizi geliştirmek için çalışacağız.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16 pt-8 border-t border-border/60">
      <div className="bg-card border border-border rounded-xl p-6 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Bu makale faydalı oldu mu?
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setFeedback('positive')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm text-foreground hover:border-emerald-500 hover:text-emerald-500 transition-colors cursor-pointer"
          >
            <ThumbsUp className="w-4 h-4" />
            Evet
          </button>
          <button
            onClick={() => setFeedback('negative')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm text-foreground hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <ThumbsDown className="w-4 h-4" />
            Hayır
          </button>
        </div>
      </div>
    </div>
  )
}
