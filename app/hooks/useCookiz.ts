import type { CookieRef } from 'nuxt/dist/app/composables'
import type { CookieConfig } from './useCookieConfig'

interface DefaultOpts<T> extends Omit<CookieConfig<T>, 'encode' | 'decode'> {
  name: string
  value?: T
}
type Sources<T> = string | DefaultOpts<T>

function useCookiz<T = string | null | undefined>(sources: DefaultOpts<T>): CookieRef<T>
function useCookiz<T = string | null | undefined>(sources: string, value?: T, maxAge?: number | boolean): CookieRef<T>
function useCookiz<T = string | null | undefined>(sources: Sources<T>, value?: T, maxAge: number | boolean = true): CookieRef<T> {
  let opts: CookieConfig<T> = {}
  let name = ''

  if (Object.prototype.toString.call(sources) === '[object Object]') {
    const { name: _key, value: _val, ..._opts } = sources as DefaultOpts<T>
    name = _key
    value = _val
    opts = _opts
  }

  if (typeof sources === 'string') {
    name = sources
    opts.maxAge = maxAge
  }

  const res = useCookie<T>(name, $cookieCfg(opts))

  if (value !== undefined) {
    res.value = value
  }

  return res
}

export { useCookiz, useCookiz as $cookiz }
