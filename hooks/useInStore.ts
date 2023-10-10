import type { ToRef } from 'vue'
import type { Store } from 'pinia'

type AutoToRefs<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
}

function useInStore<T extends Store>(storeFn: () => T, shouldToRefs: false): T

function useInStore<T extends Store>(storeFn: () => T, shouldToRefs?: true): AutoToRefs<T>

function useInStore<T extends Store>(storeFn: () => T, shouldToRefs = true): AutoToRefs<T> | T {
  const store = storeFn()
  if (shouldToRefs) {
    const storeRefs = storeToRefs(store)
    return { ...store, ...storeRefs } as AutoToRefs<T>
  }
  return store
}

export { useInStore, useInStore as $inStore }
