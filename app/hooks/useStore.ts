import type { StoreGeneric } from 'pinia'
import type { ToRef, UnwrapNestedRefs } from 'vue'

type AutoStore<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : T[K] extends object ? UnwrapNestedRefs<T[K]> : ToRef<T[K]>
}

function useStore<T extends StoreGeneric>(storeFn: () => T, shouldToRefs: false): T

function useStore<T extends StoreGeneric>(storeFn: () => T, shouldToRefs?: true): AutoStore<T>

function useStore<T extends StoreGeneric>(storeFn: () => T, shouldToRefs = true): AutoStore<T> | T {
  const store = storeFn()
  if (shouldToRefs) {
    const storeRefs = $toRefs(store, true)
    return { ...store, ...storeRefs }
  }
  return store
}
export { useStore as $store, useStore }
