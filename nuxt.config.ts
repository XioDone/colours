export default defineNuxtConfig({
  // app: {
  //   head: {
  //     link: [{ rel: 'icon', href: '/favicon.svg' }],
  //   },
  // },
  imports: {
    dirs: ['./hooks/**'],
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    inlineSSRStyles: false,
  },
  css: ['@unocss/reset/tailwind.css'],
  colorMode: {
    classSuffix: '',
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: false,
    },
  },
})
