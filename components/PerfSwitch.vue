<script setup lang="ts">
const { perfMode, switchPerfMode } = usePerfMode()
const onSwitch = () => {
  switchPerfMode()
}
</script>

<template>
  <button
    :class="{ 'c-green': perfMode }"
    hover="bg-dark-7/45"
    rounded
    p-5px
    title="Switch efficiency mode"
    c-gray
    @click="onSwitch()"
  >
    <i i-carbon:lightning block text-5 />
  </button>
</template>
