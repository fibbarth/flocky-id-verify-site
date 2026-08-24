import { useParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { VerifyHeader } from '../components/VerifyHeader'
import { CertCard } from '../components/CertCard'
import { BookCover } from '../components/BookCover'
import { BookTitleRow } from '../components/BookTitleRow'
import { StatusBadge } from '../components/StatusBadge'
import { FeaturePills } from '../components/FeaturePills'
import { SealCodeBlock } from '../components/SealCodeBlock'
import { LegalBlurb } from '../components/LegalBlurb'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'
import { MobileStickyCta } from '../components/MobileStickyCta'
import { useSealVerify } from '../hooks/useSealVerify'
import { NotFoundPage } from './NotFoundPage'

export function VerifyPage() {
  const { code } = useParams<{ code: string }>()
  const state = useSealVerify(code)

  if (state.status === 'loading') {
    return (
      <PageShell>
        <LoadingSkeleton />
      </PageShell>
    )
  }

  if (state.status === 'not-found') {
    return <NotFoundPage />
  }

  if (state.status === 'error') {
    return (
      <PageShell wide={false}>
        <div className="p-10 text-center">
          <p className="text-lg font-semibold text-white">Não foi possível carregar a verificação</p>
          <p className="mt-2 text-sm text-zinc-400">
            Houve uma instabilidade ao consultar o selo. Tente novamente em instantes.
          </p>
        </div>
        <Footer />
      </PageShell>
    )
  }

  const seal = state.data

  return (
    <PageShell>
      <div className="pb-6 md:pb-0">
        <VerifyHeader seal={seal} />

        <div className="hidden px-10 pb-10 pt-10 text-center md:block">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-text">
            SecureBook Verification
          </p>
        </div>

        <div className="md:px-10">
          <CertCard status={seal.status}>
            <BookCover seal={seal} />
            <div className="mt-8 flex w-full flex-col items-center text-center md:mt-0 md:w-auto md:flex-1 md:items-start md:text-left">
              <BookTitleRow seal={seal} />
              <StatusBadge status={seal.status} />
            </div>
          </CertCard>
        </div>

        <FeaturePills status={seal.status} />
        <SealCodeBlock sealCode={seal.seal_code} />
        <LegalBlurb />
        <CtaSection />
        <Footer />
      </div>

      <MobileStickyCta seal={seal} />
    </PageShell>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-10 p-6 md:flex-row md:p-10">
      <div className="h-80 w-full flex-shrink-0 animate-pulse rounded-xl bg-surface-raised md:w-64" />
      <div className="flex-1 space-y-4">
        <div className="h-8 w-2/3 animate-pulse rounded bg-surface-raised" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-surface-raised" />
        <div className="mt-10 h-8 w-1/2 animate-pulse rounded bg-surface-raised" />
        <div className="h-16 w-full animate-pulse rounded bg-surface-raised" />
      </div>
    </div>
  )
}
