export const log = console.log

export const isClient = process.client

export const isServer = process.server

export const isDev = process.env.NODE_ENV !== 'production'
