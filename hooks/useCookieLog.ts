interface CookieStore {
  name: string
  value: string
  domain: string
  path: string
  expires: number | null
  httpOnly: boolean
  secure: boolean
  session: boolean
  sameSite: string
  _expires: string | null
}

interface CookieLog {
  [key: string]: CookieStore
}

type Include = (keyof CookieStore)[]

/**
 * get all cookies
 * @param isLog - open console.table
 * @param include - when the isLog is enabled, include fields from cookie
 * @returns all cookies
 */

const defaultInclude: Include = ['value', '_expires']

const useCookieLog = (isLog: boolean = false, logInclude: Include | boolean = false) => {
  return $onClient(async () => {
    // @ts-expect-error: window
    if (!window.cookieStore) {
      log('window.cookieStore is not supported')
      return
    }

    // @ts-expect-error - window
    const cookies: any[] = await window.cookieStore.getAll()
    const res: CookieLog = {}

    if (!cookies.length) {
      return
    }

    for (let i = 0; i < cookies.length; i++) {
      const { name, value, expires, ...rest } = cookies[i]

      const _expires = expires && `${expires}  __  ${new Date(expires).toLocaleString()}`

      await $catch(() => {
        res[name] = {
          name,
          value: $decrypt(value) || decodeURIComponent(value),
          expires,
          _expires,
          ...rest,
        }
      }).catch(_ => {
        res[name] = {
          name,
          value: decodeURIComponent(value),
          expires,
          _expires,
          ...rest,
        }
      })
    }

    if (isLog) {
      let _include = logInclude as Include
      if (logInclude === true) {
        _include = defaultInclude
      }
      console.table(res, _include)
    }

    return res
  })
}

export { useCookieLog, useCookieLog as $cookieLog }
