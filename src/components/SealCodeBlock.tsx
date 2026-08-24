import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface SealCodeBlockProps {
  sealCode: string
}

/**
 * O código do selo, tratado como número de série de certificado (mono,
 * tracking largo), com um QR code do próprio link ao lado — fecha o
 * círculo: "isto é literalmente o que você escaneou no livro".
 */
export function SealCodeBlock({ sealCode }: SealCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(sealCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Sem clipboard (contexto não seguro, permissão negada) — o código já
      // está visível na tela para copiar à mão, então não há erro a mostrar.
    }
  }

  return (
    <div className="mx-4 mt-5 flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 md:mx-0 md:mt-8 md:justify-center md:gap-8 md:p-7">
      <div className="min-w-0 flex-1 md:flex-none">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500 md:text-center md:text-xs">
          Identificador Flocky Secure Book
        </p>
        <p className="mb-2.5 truncate font-mono text-base font-bold tracking-wider text-white md:text-center md:text-xl">
          {sealCode}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-[11px] font-semibold text-zinc-400 transition hover:border-accent-border hover:text-accent-text md:mx-auto md:flex md:px-3.5 md:py-2 md:text-xs"
        >
          <CopyIcon />
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      <div aria-hidden className="hidden self-stretch border-l border-border md:block" />

      <div className="shrink-0 rounded-lg bg-white p-1.5 shadow-lg shadow-black/30 md:rounded-xl md:p-2">
        <QRCodeSVG value={sealVerifyUrl(sealCode)} size={72} className="md:!h-[96px] md:!w-[96px]" />
      </div>
    </div>
  )
}

function sealVerifyUrl(sealCode: string): string {
  if (typeof window === 'undefined') return sealCode
  return `${window.location.origin}/verify/${sealCode}`
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[13px] w-[13px]"
    >
      <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" />
      <path d="M4.5 12.5v-7a1 1 0 0 1 1-1h7" />
    </svg>
  )
}
