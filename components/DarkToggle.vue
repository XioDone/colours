<script setup lang="ts">
const color = useColorMode()

const isDark = computed(() => {
  return color.value === 'dark'
})

setTheme(isDark)

const onToggle = () => {
  color.preference = isDark.value ? 'light' : 'dark'
  setTheme(isDark)
}

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    {
      id: 'theme-color',
      name: 'theme-color',
      content: () => (isDark.value ? '#222222' : '#ffffff'),
    },
  ],
})
</script>

<template>
  <button class="!outline-none" title="Toggle theme mode" role="button" @click="onToggle()">
    <div class="i-carbon-sun dark:i-carbon-moon" text-5 hover:bg="green" />
  </button>
</template>
