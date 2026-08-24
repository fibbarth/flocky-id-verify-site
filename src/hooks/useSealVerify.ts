import { useEffect, useState } from 'react'
import { fetchSeal, SealNotFoundError } from '../api/sealVerify'
import type { SealVerifyResponse } from '../types/seal'

type State =
  | { status: 'loading' }
  | { status: 'success'; data: SealVerifyResponse }
  | { status: 'not-found' }
  | { status: 'error' }

interface LoadedState {
  data: SealVerifyResponse | null
  notFound: boolean
  error: boolean
  /**
   * O código cujo resultado está em `data`. Guardar isto, em vez de um
   * booleano `isLoading`, permite derivar o estado de carregamento (comparando
   * com o `code` atual) em vez de escrevê-lo num setState dentro do corpo do
   * efeito — que dispara render em cascata. Mesmo padrão do
   * flocky-admin-frontend (ver useAuthorDetail.ts, `loadedUuid`).
   */
  loadedCode: string | null
}

const EMPTY: LoadedState = { data: null, notFound: false, error: false, loadedCode: null }

/** Uma consulta por carregamento de página — não precisa de cache nem de lib de fetch. */
export function useSealVerify(code: string | undefined): State {
  const [state, setState] = useState<LoadedState>(EMPTY)

  useEffect(() => {
    if (!code) return

    let cancelled = false

    fetchSeal(code)
      .then((data) => {
        if (cancelled) return
        setState({ data, notFound: false, error: false, loadedCode: code })
      })
      .catch((caught: unknown) => {
        if (cancelled) return
        const notFound = caught instanceof SealNotFoundError
        setState({ data: null, notFound, error: !notFound, loadedCode: code })
      })

    return () => {
      cancelled = true
    }
  }, [code])

  if (!code) return { status: 'not-found' }
  if (state.loadedCode !== code) return { status: 'loading' }
  if (state.notFound) return { status: 'not-found' }
  if (state.error) return { status: 'error' }

  return { status: 'success', data: state.data! }
}
