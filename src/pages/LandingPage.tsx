import { PageShell } from '../components/PageShell'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'

const STEPS = [
  {
    title: 'Escaneie o QR code',
    description: 'Todo livro protegido pelo Flocky SecureBook traz um código único impresso na obra.',
  },
  {
    title: 'Caia nesta página',
    description: 'O código leva direto à verificação pública daquele exemplar específico.',
  },
  {
    title: 'Confirme a proteção',
    description: 'Veja o status de monitoramento e o identificador oficial da obra, em tempo real.',
  },
]

export function LandingPage() {
  return (
    <PageShell>
      <header className="relative z-10 px-10 pb-2 pt-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-text">
          Flocky SecureBook
        </p>
      </header>

      <div className="px-8 py-10 text-center md:px-16">
        <h1 className="mx-auto max-w-2xl text-3xl font-bold text-white md:text-4xl">
          Verificação pública de proteção autoral
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
          O Flocky SecureBook monitora continuamente a internet em busca de cópias ilegais de
          livros protegidos, e dá a qualquer leitor uma forma pública de confirmar se uma obra
          está sob essa proteção — sem precisar de senha, login ou permissão de ninguém.
        </p>
      </div>

      <div className="grid gap-6 border-t border-border px-8 py-10 md:grid-cols-3 md:px-16">
        {STEPS.map((step, index) => (
          <div key={step.title} className="rounded-2xl border border-border-subtle bg-surface-raised/60 p-6">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent-border bg-accent-subtle text-sm font-bold text-accent-text">
              {index + 1}
            </span>
            <p className="mt-4 font-semibold text-white">{step.title}</p>
            <p className="mt-1 text-sm text-zinc-400">{step.description}</p>
          </div>
        ))}
      </div>

      <CtaSection variant="full" />
      <Footer />
    </PageShell>
  )
}
