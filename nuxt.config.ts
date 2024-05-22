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
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },
  features: {
    // For UnoCSS
    inlineStyles: false,
    devLogs: false,
    compatibilityVersion: 4,
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
})
