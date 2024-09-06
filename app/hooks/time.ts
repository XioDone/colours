interface Options {
  y?: number
  d?: number
  h?: number
  m?: number
  s?: number
  ms?: number
}
/**
 * transform time to seconds
 * @param {Options} options - options
 *
 * @example
 * ```ts
 * useToSeconds({y: 1, d: 1, h: 1, m: 1, s: 1}) // 31626061
 * ```
 *
 */
const useToSeconds = (options: Options) => {
  const { y = 0, d = 0, h = 0, m = 0, s = 0 } = options
  const yRet = y * 365 * 24 * 60 * 60
  const dRet = d * 24 * 60 * 60
  const hRet = h * 60 * 60
  const mRet = m * 60
  return Math.round(yRet + dRet + hRet + mRet + s)
}

/**
 * transform time to milliseconds
 * @param {Options} options - options
 *
 * @example
 * ```ts
 * useToMilliseconds({y: 1, d: 1, h: 1, m: 1, s: 1, ms: 1}) // 31626061001
 * ```
 *
 */
const useToMilliseconds = (options: Options) => {
  const { ms = 0 } = options
  const s = useToSeconds(options)
  const msRet = s * 1000 + ms
  return Math.round(msRet)
}

export { useToMilliseconds, useToMilliseconds as $toMilliseconds, useToSeconds, useToSeconds as $toSeconds }
