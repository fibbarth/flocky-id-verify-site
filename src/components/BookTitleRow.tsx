import type { SealVerifyResponse } from '../types/seal'
import { Button } from './ui/Button'

interface BookTitleRowProps {
  seal: SealVerifyResponse
}

/**
 * Título, autor e o CTA de compra — só no desktop (ver BookCover). No
 * mobile o título já saiu no VerifyHeader, e o CTA vira a barra fixa do
 * rodapé (ver MobileStickyCta) em vez de aparecer aqui.
 */
export function BookTitleRow({ seal }: BookTitleRowProps) {
  return (
    <div className="hidden md:block">
      <div className="mb-1.5 flex items-center gap-3">
        <p className="text-[34px] font-extrabold leading-tight tracking-tight text-white">{seal.title}</p>
        {seal.is_prelaunch && (
          <span className="shrink-0 rounded-full border border-border bg-surface-raised px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-300">
            Pré-lançamento
          </span>
        )}
      </div>
      {seal.author_name && <p className="mb-6 text-base text-zinc-400">{seal.author_name}</p>}

      {seal.amazon_url ? (
        <Button
          href={seal.amazon_url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          className="mb-8 shadow-[0_10px_24px_rgba(245,158,11,0.25)]"
        >
          <BagIcon />
          Disponível na Amazon
        </Button>
      ) : (
        <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-dashed border-border bg-surface-raised px-6 py-3.5 text-sm font-bold text-zinc-300">
          <ClockIcon />
          Em breve
        </div>
      )}
    </div>
  )
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M7.5 7V6a4.5 4.5 0 1 1 9 0v1h2.25L20 21H4l1.25-14H7.5zm1.5 0h6V6a3 3 0 1 0-6 0v1z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-zinc-500"
    >
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 5.8V10l3 1.8" />
    </svg>
  )
}
