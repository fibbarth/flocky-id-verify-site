/**
 * Injeta meta tags dinâmicas (OG/Twitter/JSON-LD) por livro em /verify/:code,
 * na borda — antes de a resposta sair, para bots de rede social e para
 * usuários reais igualmente. Sem isso, o link compartilhado no WhatsApp ou no
 * Instagram mostraria sempre o título/descrição genéricos do index.html.
 *
 * Roda como Cloudflare Pages Function: nasce automaticamente por estar em
 * `functions/verify/[code].ts`, sem projeto ou deploy separado — publica
 * junto com o resto do site estático. Rotas fora de /verify/:code (a "/" e
 * qualquer outra) não passam por aqui; caem direto no `_redirects` normal.
 *
 * `API_BASE_URL` é uma env var PRÓPRIA desta Function (runtime, configurada
 * no painel da Cloudflare) — diferente de VITE_API_BASE_URL, que é build-time
 * do Vite e só o bundle do React enxerga. Ver o comentário em .env.example.
 */

interface Env {
  API_BASE_URL: string
}

interface SealData {
  seal_code: string
  title: string
  author_name: string | null
  cover_url: string | null
  status: 'active' | 'inactive'
}

const SITE_NAME = 'Flocky SecureBook'

/**
 * O código de demonstração (ver src/api/sealVerify.ts) — mesmo JSON estático,
 * lido aqui via fetch same-origin em vez de API_BASE_URL, para as meta tags
 * também funcionarem sem depender do backend estar no ar.
 */
const DEMO_CODE = 'FK-9A72-4Q8X'
const DEMO_JSON_PATH = '/demo/fk-9a72-4q8x.json'

export const onRequest: PagesFunction<Env> = async (context) => {
  const code = context.params.code
  const codeParam = Array.isArray(code) ? code[0] : code

  // Deixa a resposta estática seguir como está para qualquer coisa que não
  // seja um único segmento de código — não há o que enriquecer aqui.
  if (!codeParam) {
    return context.next()
  }

  const staticResponse = await context.next()
  const canonicalUrl = new URL(`/verify/${codeParam}`, context.request.url).toString()

  let seal: SealData | null = null
  let upstreamFailed = false

  try {
    const apiUrl =
      codeParam.toUpperCase() === DEMO_CODE
        ? new URL(DEMO_JSON_PATH, context.request.url).toString()
        : `${context.env.API_BASE_URL.replace(/\/$/, '')}/verify/${encodeURIComponent(codeParam)}`

    const apiResponse = await fetch(apiUrl)

    if (apiResponse.ok) {
      const body = (await apiResponse.json()) as { data: SealData }
      seal = body.data
    } else if (apiResponse.status !== 404) {
      upstreamFailed = true
    }
  } catch {
    upstreamFailed = true
  }

  // Instabilidade passageira da API: falha aberta. Serve o HTML genérico em
  // 200 — o corpo React ainda tenta buscar sozinho e mostra seu próprio
  // estado de erro. Um link compartilhado nunca deve quebrar por isso.
  if (upstreamFailed) {
    return staticResponse
  }

  if (!seal) {
    return rewriteNotFound(staticResponse)
  }

  return rewriteFound(staticResponse, seal, canonicalUrl)
}

function rewriteFound(response: Response, seal: SealData, canonicalUrl: string): Response {
  const title = `${seal.title} – ${seal.author_name ?? 'Autor'} | Verificação de Proteção Flocky SecureBook`
  const description = `Verificação oficial de proteção do livro ${seal.title}${
    seal.author_name ? ` de ${seal.author_name}` : ''
  } no sistema Flocky SecureBook.`

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: seal.title,
    author: seal.author_name ? { '@type': 'Person', name: seal.author_name } : undefined,
    image: seal.cover_url ?? undefined,
    identifier: seal.seal_code,
    publisher: { '@type': 'Organization', name: 'Flocky', url: 'https://flocky.pro' },
    mainEntityOfPage: canonicalUrl,
    copyrightHolder: seal.author_name ? { '@type': 'Person', name: seal.author_name } : undefined,
    isAccessibleForFree: false,
  })

  const rewriter = new HTMLRewriter()
    .on('title', { element: (el) => el.setInnerContent(title) })
    .on('meta[name="description"]', { element: (el) => el.setAttribute('content', description) })
    .on('meta[property="og:type"]', { element: (el) => el.setAttribute('content', 'book') })
    .on('meta[property="og:title"]', { element: (el) => el.setAttribute('content', title) })
    .on('meta[property="og:description"]', {
      element: (el) => el.setAttribute('content', description),
    })
    .on('meta[name="twitter:title"]', { element: (el) => el.setAttribute('content', title) })
    .on('meta[name="twitter:description"]', {
      element: (el) => el.setAttribute('content', description),
    })
    .on('head', {
      element: (el) => {
        el.append(`<meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}">`, {
          html: true,
        })

        if (seal.cover_url) {
          el.append(
            `<meta property="og:image" content="${escapeHtmlAttr(seal.cover_url)}">` +
              `<meta name="twitter:image" content="${escapeHtmlAttr(seal.cover_url)}">`,
            { html: true },
          )
        }

        el.append(
          `<script type="application/ld+json">${jsonLd.replace(/</g, '\\u003c')}</script>`,
          { html: true },
        )
      },
    })

  return rewriter.transform(response)
}

function rewriteNotFound(response: Response): Response {
  const title = 'Código de verificação não encontrado | Flocky SecureBook'
  const description =
    'Não encontramos este código de verificação no sistema Flocky SecureBook. Confira se o código foi digitado corretamente.'

  const rewriter = new HTMLRewriter()
    .on('title', { element: (el) => el.setInnerContent(title) })
    .on('meta[name="description"]', { element: (el) => el.setAttribute('content', description) })
    .on('meta[property="og:title"]', { element: (el) => el.setAttribute('content', title) })
    .on('meta[property="og:description"]', {
      element: (el) => el.setAttribute('content', description),
    })
    .on('meta[name="twitter:title"]', { element: (el) => el.setAttribute('content', title) })
    .on('meta[name="twitter:description"]', {
      element: (el) => el.setAttribute('content', description),
    })
    .on('meta[name="robots"]', { element: (el) => el.setAttribute('content', 'noindex,follow') })

  const transformed = rewriter.transform(response)

  return new Response(transformed.body, { status: 404, headers: transformed.headers })
}

function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}
