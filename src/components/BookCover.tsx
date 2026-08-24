import type { SealVerifyResponse } from '../types/seal'

interface BookCoverProps {
  seal: SealVerifyResponse
}

/** A capa grande, só no desktop — no mobile ela vira a miniatura do VerifyHeader. */
export function BookCover({ seal }: BookCoverProps) {
  return (
    <div className="hidden shrink-0 md:block">
      <div
        className="w-[280px] overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/50"
        style={{ transform: 'rotate(-1.2deg)' }}
      >
        {seal.cover_url ? (
          <img
            src={seal.cover_url}
            alt={`Capa do livro ${seal.title}`}
            className="h-auto w-full bg-black object-contain"
          />
        ) : (
          <div className="flex h-[392px] w-full items-center justify-center bg-surface-raised text-sm text-zinc-500">
            Capa indisponível
          </div>
        )}
      </div>
    </div>
  )
}
