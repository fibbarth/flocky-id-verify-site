import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface PageShellProps {
  children: ReactNode
  className?: string
  /**
   * Telas de conteúdo (verificação, landing) vão de ponta a ponta no mobile —
   * é o que permite a barra fixa do rodapé grudar de verdade na viewport, sem
   * um ancestral `overflow-hidden` atrapalhando. O card flutuante com cantos
   * arredondados só aparece a partir do `md:`.
   *
   * Telas de mensagem (404, erro) são curtas e não têm barra fixa, então
   * continuam como um card centralizado mesmo no mobile.
   */
  wide?: boolean
}

export function PageShell({ children, className, wide = true }: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-background bg-grid-texture">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-[120px] md:h-[36rem] md:w-[36rem]"
      />

      <div
        className={cn(
          'relative flex min-h-screen justify-center',
          wide ? 'items-stretch md:items-center md:px-4 md:py-12' : 'items-center px-4 py-12',
        )}
      >
        <div
          className={cn(
            'animate-reveal relative w-full',
            wide
              ? 'md:max-w-5xl md:overflow-hidden md:rounded-3xl md:border md:border-border md:bg-surface/80 md:shadow-2xl md:shadow-black/40 md:backdrop-blur-xl'
              : 'max-w-lg overflow-hidden rounded-3xl border border-border bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-xl',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
