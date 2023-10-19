<script setup lang="ts">
const color = useColorMode()

const isDark = computed(() => {
  return color.value === 'dark'
})

setTheme(isDark)

const onSwitch = () => {
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
  <button hover="bg-bluegray-4/30 c-green" rounded p-5px ring-0 title="Switch theme mode" role="button" @click="onSwitch()">
    <div class="i-carbon-sun dark:i-carbon-moon" text-5 />
  </button>
</template>
