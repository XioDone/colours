export const log = console.log

export const isClient = import.meta.client

export const isServer = import.meta.server

export const isDev = process.env.NODE_ENV !== 'production'
