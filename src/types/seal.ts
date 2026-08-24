/** Espelha App\Http\Resources\Public\SealVerifyResource no flocky-backend. */
export interface SealVerifyResponse {
  seal_code: string
  title: string
  author_name: string | null
  cover_url: string | null
  amazon_url: string | null
  publication_date: string | null
  is_prelaunch: boolean
  status: 'active' | 'inactive'
}
