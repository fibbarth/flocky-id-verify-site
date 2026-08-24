import { useState } from 'react'
import { cn } from '../lib/utils'

interface SealTimestampProps {
  status: 'active' | 'inactive'
  className?: string
}

/**
 * "Verificado agora" — o mesmo gatilho de confiança de uma página de status
 * de uptime ("last checked"). O horário é o do carregamento da página, lido
 * uma vez (useState lazy init), não recalculado a cada render.
 */
export function SealTimestamp({ status, className }: SealTimestampProps) {
  const [formatted] = useState(() =>
    new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  )

  return (
    <p className={cn('inline-flex items-center gap-1.5 text-[11.5px] text-zinc-500', className)}>
      <span
        className={cn(
          'h-1.5 w-1.5 shrink-0 rounded-full',
          status === 'active'
            ? 'bg-accent shadow-[0_0_0_3px_rgba(16,185,129,0.15)]'
            : 'bg-warning shadow-[0_0_0_3px_rgba(245,158,11,0.15)]',
        )}
      />
      Verificado agora · {formatted}
    </p>
  )
}
