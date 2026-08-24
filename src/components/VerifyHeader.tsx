import type { SealVerifyResponse } from '../types/seal'

interface VerifyHeaderProps {
  seal: SealVerifyResponse
}

/**
 * Cabeçalho compacto do mobile: miniatura da capa + título — o veredito de
 * proteção (o que quem escaneou o QR code quer ver primeiro) fica logo
 * abaixo, sem precisar rolar por uma capa em tela cheia. No desktop, capa e
 * título voltam a aparecer dentro do próprio CertCard (ver BookCover/BookTitleRow).
 */
export function VerifyHeader({ seal }: VerifyHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4 md:hidden">
      <div className="h-[74px] w-[52px] shrink-0 overflow-hidden rounded-md border border-border shadow-lg shadow-black/40">
        {seal.cover_url ? (
          <img src={seal.cover_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-raised text-[9px] text-zinc-600">
            —
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="mb-0.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-text">
          <ShieldIcon />
          SecureBook Verification
        </p>
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[15px] font-bold text-white">{seal.title}</p>
          {seal.is_prelaunch && (
            <span className="shrink-0 rounded-full border border-border bg-surface-raised px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-zinc-300">
              Pré-lançamento
            </span>
          )}
        </div>
        {seal.author_name && <p className="truncate text-[12.5px] text-zinc-500">{seal.author_name}</p>}
      </div>
    </div>
  )
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[11px] w-[11px] shrink-0"
    >
      <path d="M10 2.2 4.5 5v4.7c0 4 2.6 6.9 5.5 7.9 2.9-1 5.5-3.9 5.5-7.9V5L10 2.2z" />
    </svg>
  )
}
