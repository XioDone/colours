// @ts-expect-error - nuxt module/log
import buildLog from '#build/build.log'
import { inject as analytics } from '@vercel/analytics'
import { version } from '../../package.json'

export default defineNuxtPlugin(_app => {
  useHead({
    title: 'Colors - W3C CSS Color Specification',
    meta: [
      { name: 'description', content: 'W3C css color specification, CSS Color Module Level 4' },
      { name: 'keywords', content: 'colours, colors, css, W3C, web' },
    ],
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  })

  if (isDev) {
    return
  }

  $injectDevtools('buildLog', buildLog)
  $logBadge('App', `v${version}`)
  analytics()
})
