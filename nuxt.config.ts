export default defineNuxtConfig({
  imports: {
    dirs: ['./hooks/**'],
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    'arco-design-nuxt-module',
  ],
  experimental: {
    asyncContext: true,
  },
  css: ['@unocss/reset/tailwind.css'],
  colorMode: {
    classSuffix: '',
  },
  vue: {
    propsDestructure: true,
  },
  devServer: {
    port: 5300,
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
})
