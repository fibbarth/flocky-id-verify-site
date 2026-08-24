import type { SealVerifyResponse } from '../types/seal'

/**
 * O código de demonstração — usado para mostrar como a página funciona antes
 * de ter um selo real emitido (numa conversa de venda, por exemplo). Serve de
 * `public/demo/fk-9a72-4q8x.json`, um JSON estático, em vez de bater na API:
 * funciona mesmo sem backend no ar, e o mesmo arquivo é lido pela Cloudflare
 * Pages Function (ver functions/verify/[code].ts) para as meta tags.
 */
const DEMO_CODE = 'FK-9A72-4Q8X'
const DEMO_JSON_PATH = '/demo/fk-9a72-4q8x.json'

export class SealNotFoundError extends Error {}

export class SealFetchError extends Error {
  status: number

  constructor(status: number) {
    super(`Falha ao consultar o selo (HTTP ${status}).`)
    this.status = status
  }
}

/**
 * O backend responde envelopado em `{ data: ... }` — é o wrapping padrão do
 * JsonResource do Laravel, que este endpoint não desliga (ver
 * SealVerifyResource no flocky-backend).
 */
export async function fetchSeal(code: string): Promise<SealVerifyResponse> {
  const url =
    code.toUpperCase() === DEMO_CODE
      ? DEMO_JSON_PATH
      : `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/verify/${encodeURIComponent(code)}`

  const response = await fetch(url)

  if (response.status === 404) {
    throw new SealNotFoundError()
  }

  if (!response.ok) {
    throw new SealFetchError(response.status)
  }

  const body = (await response.json()) as { data: SealVerifyResponse }

  return body.data
}
