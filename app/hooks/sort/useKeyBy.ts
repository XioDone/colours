// type KeyByPredicate<T > = string extends keyof typeof T extends { [key: string]: any } | ((item: T, index: number, array: T[]) => string)
type KeyByPredicate<T> = keyof T | ((item: T, index: number, array: T[]) => string)

/**
 * Transform an array into an object.
 *
 * @param array - The array to transform.
 * @param predicate - The keyBy predicate.
 */
const useKeyBy = <T extends { [key: string]: any }>(array: T[], predicate: KeyByPredicate<T>): Record<string, T> => {
  const result: Record<string, T> = {}

  if (typeof predicate === 'string') {
    array.forEach(item => {
      result[item[predicate]] = item
    })
    return result
  }

  if (typeof predicate === 'function') {
    array.forEach((item, index, array) => {
      const key = predicate(item, index, array)
      result[key] = item
    })
    return result
  }

  console.warn('useKeyBy: predicate must be string or function')
  return result
}

export { useKeyBy, useKeyBy as $keyBy }
