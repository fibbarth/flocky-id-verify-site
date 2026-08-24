import { cn } from '../lib/utils'

interface TrustBadgesProps {
  status: 'active' | 'inactive'
  className?: string
}

const BADGES = {
  active: [
    { icon: LockIcon, label: 'Verificação criptográfica' },
    { icon: RadarIcon, label: 'Monitoramento contínuo' },
    { icon: BoltIcon, label: 'Selo único e rastreável' },
  ],
  inactive: [
    { icon: LockIcon, label: 'Selo autêntico' },
    { icon: DocIcon, label: 'Emitido oficialmente' },
    { icon: BoltIcon, label: 'Rastreável a qualquer momento' },
  ],
} as const

export function TrustBadges({ status, className }: TrustBadgesProps) {
  const isActive = status === 'active'

  return (
    <div className={cn('flex flex-wrap justify-center gap-2 md:justify-start', className)}>
      {BADGES[status].map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface px-2.5 py-1.5 text-[10.5px] font-semibold text-zinc-300 md:text-xs"
        >
          <Icon className={cn('h-3 w-3 shrink-0', isActive ? 'text-accent-text' : 'text-amber-300')} />
          {label}
        </span>
      ))}
    </div>
  )
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  )
}

function RadarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="10" cy="10" r="2" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.8 4.8l1.4 1.4M13.8 13.8l1.4 1.4M4.8 15.2l1.4-1.4M13.8 6.2l1.4-1.4" />
    </svg>
  )
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M11 2 4 11.5h4.4L8.2 18 16 8h-4.6L11 2z" />
    </svg>
  )
}

function DocIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3.5" y="3.5" width="13" height="13" rx="2" />
      <path d="M7 10h6M7 13h4" />
    </svg>
  )
}
