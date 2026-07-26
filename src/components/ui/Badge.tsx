import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger'
  className?: string
}

const TONES: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-white/10 text-white/80',
  accent: 'bg-accent/20 text-accent',
  success: 'bg-emerald-500/15 text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-400',
  danger: 'bg-rose-500/15 text-rose-400',
}

export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
