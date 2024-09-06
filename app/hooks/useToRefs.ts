import type { ToRef, UnwrapNestedRefs } from 'vue'

export type AutoTypes<T> = T extends object ? UnwrapNestedRefs<T> : ToRef<T>

export type UseToRefs<T = any> = {
  [K in keyof T]: AutoTypes<T[K]>
}

/**
 * Converts a reactive object to a plain object where each property of the
 * resulting object is a ref pointing to the corresponding property of the original object.
 * Each individual Ref object reference is created using {@link toRef()}.
 * Each reactive object reference returns the original reactive object directly.
 *
 * @param object - Reactive object to be made into an object of linked refs.
 * @see {@link https://vuejs.org/api/reactivity-utilities.html#torefs}
 *
 * @param skipNonreactive - Whether to skip non-reactive properties.
 * @default false
 *
 */
const useToRefs = <T extends object>(object: T, skipNonreactive = false): UseToRefs<T> => {
  const rawObject = toRaw(object)
  const res: any = Array.isArray(object) ? Array.from({ length: object.length }) : {}

  for (const key in object) {
    const value = object[key]
    const rawValue = rawObject[key]

    if (isReactive(value)) {
      res[key] = object[key]
      continue
    }

    if (isRef(rawValue)) {
      res[key] = toRef(object, key)
      continue
    }

    if (skipNonreactive) {
      continue
    }
    res[key] = toRef(object, key)
  }
  return res
}

export { useToRefs, useToRefs as $toRefs }
