// @ts-expect-error - nuxt module/log
import buildLog from '#build/build.log'
import { inject as analytics } from '@vercel/analytics'
import { version } from '../../package.json'

export default defineNuxtPlugin(_app => {
  useHead({
    title: 'Colors-x - W3C CSS Color Specification',
    meta: [
      { name: 'description', content: 'W3C css color specification, CSS Color Module Level 4' },
      { name: 'keywords', content: 'colours, colors, css, W3C, web' },
    ],
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  })

  useServerSeoMeta({
    title: 'Colors-x - W3C CSS Color Specification',
    ogTitle: 'Colors-x - W3C CSS Color Specification',
    description: 'W3C css color specification, CSS Color Module Level 4',
    ogDescription: 'W3C css color specification, CSS Color Module Level 4',
    ogImage: '~/assets/imgs/screenshot.png',
    twitterCard: 'summary_large_image',
    twitterImage: '~/assets/imgs/screenshot.png',
    twitterTitle: 'Colors-x - W3C CSS Color Specification',
    twitterDescription: 'W3C css color specification, CSS Color Module Level 4',
    ogSiteName: 'Colors-x - W3C CSS Color Specification',
    ogUrl: 'https://colours-x.vercel.app',
    ogType: 'website',
    ogLocale: 'en_US',
    ogImageAlt: 'Colors-x - W3C CSS Color Specification',
    twitterSite: '@xioDone',
    twitterCreator: '@xioDone',
    twitterImageAlt: 'Colors-x - W3C CSS Color Specification',
    author: '@xioDone',
    robots: 'index, follow',
  })

  if (isDev) {
    return
  }

  $injectDevtools('buildLog', buildLog)
  $logBadge('App', `v${version}`)
  analytics()
})
