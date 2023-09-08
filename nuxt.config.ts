export default defineNuxtConfig({
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
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
  devServer: {
    port: 8999,
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
})
