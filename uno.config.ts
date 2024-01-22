import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    // presetForms(),
    presetTypography(),
    presetWebFonts({
      // provider: 'bunny',
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
        caveat: 'Waterfall',
        nunito: 'Nunito',
      },
    }),
  ],
  shortcuts: [
    {
      'hide': 'hidden',
      'flex-center': 'flex items-center justify-center',
    },
    [/^wh-(\w+)$/, ([, num]) => `w-${num} h-${num}`],
    [/^fs-(\w+)$/, ([, num]) => `text-${num}`],
  ],
  theme: {
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'xxl': '1536px',
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
