interface Source {
  [k: string]: any
}
type GroupByResult<T extends Source, K extends keyof T> = { [key in T[K]]: T[] }

function useGroupBy<T extends Source, K extends keyof T>(sourceArr: T[], key: K): GroupByResult<T, K> {
  const result = {} as GroupByResult<T, K>

  for (let i = 0; i < sourceArr.length; i++) {
    const cur = sourceArr[i]
    const keyValue = cur[key]
    if (!result[keyValue]) {
      result[keyValue] = []
    }
    result[keyValue].push(cur)
  }
  return result
}

export { useGroupBy, useGroupBy as $groupBy }
