type Fn<T> = () => T

/**
 * Calls the specified function only when running server-side.
 *
 * @param {Fn} fn - The function to call on the server.
 */
const useOnServer = <T>(fn: Fn<T>): T => {
  if (isClient || typeof fn !== 'function') {
    return undefined as T
  }
  return fn()
}

/**
 * Calls the specified function only when running client-side.
 *
 * @param {Fn} fn - The function to call on the client.
 */
const useOnClient = <T>(fn: Fn<T>): T => {
  if (isServer || typeof fn !== 'function') {
    return undefined as T
  }
  return fn()
}

export { useOnServer, useOnClient, useOnServer as $onServer, useOnClient as $onClient }
