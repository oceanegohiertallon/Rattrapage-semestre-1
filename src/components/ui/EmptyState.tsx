import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
      <p className="font-display text-xl text-white/90">{title}</p>
      {description && <p className="max-w-sm text-sm text-white/50">{description}</p>}
      {action}
    </div>
  )
}
