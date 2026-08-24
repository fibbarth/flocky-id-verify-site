import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { Footer } from '../components/Footer'

export function NotFoundPage() {
  return (
    <PageShell wide={false}>
      <div className="px-8 py-14 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-warning/30 bg-warning/10 text-amber-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 8v5" />
            <circle cx="12" cy="16" r="0.5" fill="currentColor" />
          </svg>
        </span>

        <h1 className="mt-6 text-2xl font-bold text-white">
          Não encontramos esse código de verificação
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-zinc-400">
          Confira se o código foi digitado corretamente, ou escaneie novamente o QR code impresso
          no livro.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-accent-border hover:text-accent-text"
        >
          Voltar ao início
        </Link>
      </div>
      <Footer />
    </PageShell>
  )
}
