import type { CSSProperties, ReactNode } from 'react'

interface CertCardProps {
  status: 'active' | 'inactive'
  children: ReactNode
}

/**
 * O card de veredito: borda holográfica girando (CSS em index.css, cor pela
 * variável `--holo-color`), marca d'água do logo real, e o layout que empilha
 * no mobile e vira duas colunas (capa | resto) a partir do `md:`.
 */
export function CertCard({ status, children }: CertCardProps) {
  const holoStyle = {
    '--holo-color': status === 'active' ? '#10B981' : '#F59E0B',
    '--holo-duration': status === 'active' ? '7s' : '8.5s',
  } as CSSProperties

  return (
    <div className="mx-4 mt-5 overflow-hidden rounded-[25px] p-[5px] md:mx-0 md:mt-0">
      <div className="cert-holo relative rounded-[22px]" style={holoStyle}>
        <div className="relative flex flex-col items-center overflow-hidden rounded-[22px] border border-border bg-gradient-to-b from-surface-raised to-surface p-6 text-center md:flex-row md:items-start md:gap-12 md:p-12 md:text-left">
          <img
            src="/images/logo.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-3 w-[190px] -translate-x-1/2 select-none opacity-[0.06] md:w-[340px]"
          />
          {children}
        </div>
      </div>
    </div>
  )
}
