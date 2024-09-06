import type { CookieOptions } from '#app'

export interface CookieConfig<T> extends Omit<CookieOptions, 'maxAge' | 'default'> {
  maxAge?: number | boolean
  encrypt?: boolean
  default?: (() => T | Ref<T>) | T | Ref<T>
}

interface EncodeOpts {
  encode?: <T>(data: T) => string
  decode?: <T>(data: string) => T
}

const useCookieConfig = <T>(options: CookieConfig<T> = {}): CookieOptions<T> => {
  const defaultOpts: CookieOptions = {}
  const defaultMaxAge = 2592000

  const { encrypt, maxAge: _maxAge = true, default: _def, ...rest } = options

  let encodeOpts: EncodeOpts = {}

  if (encrypt ?? !isDev) {
    encodeOpts = {}
  }

  if (typeof _maxAge === 'number') {
    defaultOpts.maxAge = _maxAge
  }

  if (_maxAge === true) {
    defaultOpts.maxAge = defaultMaxAge
  }

  if (_def !== undefined && typeof _def !== 'function') {
    defaultOpts.default = () => _def
  }

  if (typeof _def === 'function') {
    defaultOpts.default = _def as () => T | Ref<T>
  }

  const opts = { ...defaultOpts, ...encodeOpts, ...rest }

  return opts
}

export { useCookieConfig, useCookieConfig as $cookieCfg }
