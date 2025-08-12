/**
 * A easier and more user-friendly useState wrapper
 * @param key — a unique key ensuring that data fetching can be properly de-duplicated across requests
 * @param value — a function that provides initial value for the state when it's not initiated
 */

function useStates<T>(key?: string, value?: T | Ref<T>): Ref<T>
function useStates<T>(key?: string, value?: () => T | Ref<T>): Ref<T>
function useStates<T>(init?: () => T | Ref<T>): Ref<T>
function useStates<T>(...args: any): Ref<T> {
  const argsLength = args.length

  if (!argsLength) {
    return useState()
  }

  const [maybeKey, maybeValue] = args as [string | (() => T | Ref<T>), T | Ref<T> | (() => T | Ref<T>)]

  let state: Ref<T>

  if (typeof maybeKey === 'function') {
    return useState<T>(maybeKey)
  } else {
    state = useState<T>(maybeKey)
  }

  let initValue: T | Ref<T>
  if (typeof maybeValue === 'function') {
    initValue = (<Function>maybeValue)()
  } else {
    initValue = maybeValue
  }

  if (isRef(initValue)) {
    state.value = initValue.value
  } else {
    state.value = initValue
  }

  return state
}

export { useStates as $states, useStates }
