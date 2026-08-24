import type { SealVerifyResponse } from '../types/seal'
import { Button } from './ui/Button'

interface MobileStickyCtaProps {
  seal: SealVerifyResponse
}

/**
 * A barra fixa do rodapé, só no mobile — sempre alcançável sem rolar.
 * Depende do PageShell NÃO ter `overflow-hidden` no mobile (ver
 * PageShell.tsx), senão `position: sticky` não gruda na viewport de verdade.
 */
export function MobileStickyCta({ seal }: MobileStickyCtaProps) {
  return (
    <div className="sticky bottom-0 z-20 flex flex-col gap-2 border-t border-border bg-gradient-to-t from-background from-70% to-background/85 px-4 pb-[calc(12px+env(safe-area-inset-bottom,0px))] pt-3 backdrop-blur-md md:hidden">
      {seal.amazon_url ? (
        <Button
          href={seal.amazon_url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          className="w-full shadow-[0_10px_24px_rgba(245,158,11,0.28)]"
        >
          <BagIcon />
          Disponível na Amazon
        </Button>
      ) : (
        <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface-raised py-3.5 text-sm font-bold text-zinc-300">
          <ClockIcon />
          Em breve
        </div>
      )}

      <Button href="#cta-section" variant="instagram" size="md" className="w-full py-2.5 text-[13.5px]">
        <ShieldPlusIcon />
        Quer proteger seu livro também?
      </Button>
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

function ShieldPlusIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
    >
      <path d="M10 2.2 4.5 5v4.7c0 4 2.6 6.9 5.5 7.9 2.9-1 5.5-3.9 5.5-7.9V5L10 2.2z" />
    </svg>
  )
}
