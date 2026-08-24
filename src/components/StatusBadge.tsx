import { cn } from '../lib/utils'
import { SealTimestamp } from './SealTimestamp'
import { TrustBadges } from './TrustBadges'

interface StatusBadgeProps {
  status: 'active' | 'inactive'
}

const COPY = {
  active: {
    heading: 'Proteção Ativa',
    description:
      'Esta obra está sob monitoramento contínuo de direitos autorais, com tecnologia ativa de detecção, rastreamento e ações contra uso não autorizado.',
  },
  inactive: {
    heading: 'Monitoramento Inativo no Momento',
    description:
      'Este livro tem um selo Flocky SecureBook emitido e autêntico, mas o monitoramento contínuo de direitos autorais não está em vigor no momento.',
  },
} as const

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'active'
  const c = COPY[status]

  return (
    <div className="relative mt-8 flex w-full flex-col items-center text-center md:mt-0 md:flex-1 md:items-start md:text-left">
      <div className="flex flex-col items-center gap-0 md:flex-row md:items-start md:gap-5">
        <ShieldRing isActive={isActive} />
        <div className="mt-3 md:mt-0.5">
          <p
            className={cn(
              'text-xl font-extrabold leading-tight md:text-[26px]',
              isActive ? 'text-accent-text' : 'text-amber-300',
            )}
          >
            {c.heading}
          </p>
          <SealTimestamp status={status} className="mt-1.5 justify-center md:justify-start" />
        </div>
      </div>

      <p
        className={cn(
          'mt-4 max-w-md text-[13.5px] leading-relaxed md:max-w-xl md:text-[14.5px]',
          isActive ? 'text-emerald-200/90' : 'text-amber-100/80',
        )}
      >
        {c.description}
      </p>

      <TrustBadges status={status} className="mt-4" />
    </div>
  )
}

function ShieldRing({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={cn(
        'relative flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-full border md:h-16 md:w-16',
        isActive ? 'animate-seal-active border-accent-border bg-accent-subtle' : 'animate-seal-warning border-warning/30 bg-warning/10',
      )}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -left-[60%] -top-[20%] h-[140%] w-[40%] -skew-x-[16deg] animate-sweep-once bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      </span>
      <svg viewBox="0 0 24 24" fill="currentColor" className={cn('h-8 w-8 md:h-7 md:w-7', isActive ? 'text-accent-text' : 'text-amber-300')}>
        <path d="M12 2.25c-.3 0-.6.08-.86.23l-6 3.5A1.75 1.75 0 0 0 4.5 7.5v5.2c0 5.02 3.36 9.46 7.12 10.97a1.1 1.1 0 0 0 .76 0c3.76-1.51 7.12-5.95 7.12-10.97V7.5c0-.62-.33-1.2-.86-1.52l-6-3.5a1.75 1.75 0 0 0-.86-.23z" />
        {isActive ? (
          <path
            fill="#09090B"
            d="M10.6 13.9l-1.9-1.9a.75.75 0 1 0-1.06 1.06l2.43 2.43c.3.3.77.3 1.06 0l4.96-4.96a.75.75 0 1 0-1.06-1.06l-4.43 4.43z"
          />
        ) : (
          <>
            <rect x="11.15" y="7.5" width="1.7" height="6" rx="0.85" fill="#09090B" />
            <circle cx="12" cy="15.75" r="1" fill="#09090B" />
          </>
        )}
      </svg>
    </span>
  )
}
