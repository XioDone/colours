import { consola } from 'consola'

const warn = consola.warn
const start = consola.start
const info = consola.info
const success = consola.success
const debug = consola.debug
const trace = consola.trace
const fatal = consola.fatal
const ready = consola.ready
const prompt = consola.prompt

const onlyDevMode = ['warn', 'error', 'info'] as const

type CMethods = { [key in (typeof onlyDevMode)[number]]: (...args: any) => void } | { [key: string]: (...args: any) => void }

const c: CMethods = {}

onlyDevMode.map(key => {
  if (isDev || isServer) {
    c[key] = consola[key]
    return
  }
  c[key] = () => {}
})

export { c, consola as cs, debug, fatal, info, prompt, ready, start, success, trace, warn }
