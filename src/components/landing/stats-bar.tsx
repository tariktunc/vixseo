'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, FileSearch, MousePointerClick, TrendingUp } from 'lucide-react'

type Stat = {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
  displayPrefix?: string
}

const stats: Stat[] = [
  { icon: Globe, value: 50, suffix: '+', label: 'Yönetilen Site' },
  { icon: FileSearch, value: 10, suffix: 'K+', label: 'Analiz Edilen Sayfa' },
  { icon: MousePointerClick, value: 500, suffix: 'K+', label: 'Takip Edilen Tıklama' },
  { icon: TrendingUp, value: 99, suffix: '%', label: 'Müşteri Memnuniyeti' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const step = target / (duration / 16)

    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <section className="relative bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 mb-4"
              >
                <stat.icon className="h-6 w-6" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
