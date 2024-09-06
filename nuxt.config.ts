export default defineNuxtConfig({
  app: {
    rootAttrs: {
      id: 'app',
    },
  },
  imports: {
    dirs: ['hooks/**'],
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
  future: {
    compatibilityVersion: 4,
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
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  telemetry: false,
  compatibilityDate: new Date().toISOString().slice(0, 10) as any,
})
