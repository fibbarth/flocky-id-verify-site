import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'neutral' | 'success' | 'warning'

const variantClasses: Record<Variant, string> = {
  neutral: 'border-border bg-surface-raised text-zinc-400',
  success: 'border-accent-border bg-accent-subtle text-accent-text',
  warning: 'border-warning/20 bg-warning/10 text-amber-300',
}

interface BadgeProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-4 py-1 text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
