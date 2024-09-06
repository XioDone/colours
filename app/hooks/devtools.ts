/**
 * inject devtools to window
 * @param {string} key - key
 * @param {any} value - value
 * @param {boolean} isInject - is inject, default true
 * @return {*}
 */
const useInjectDevtools = (key: string, value: any, isInject: boolean = true) => {
  // only run on dev
  isInject = isInject ?? true

  if (!isInject) {
    return
  }

  if (isClient) {
    // @ts-expect-error: window
    const devtools = (window.devtools = window.devtools || {})
    devtools[key] = value
  }
}

export { useInjectDevtools, useInjectDevtools as $injectDevtools }
