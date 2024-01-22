<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()

const onSwitch = () => {
  toggle()
}
</script>

<template>
  <button hover="bg-bluegray-4/30 c-green" rounded p-5px ring-0 title="Switch f" role="button" @click="onSwitch()">
    <div :class="[isFullscreen ? 'i-tabler:arrows-diagonal-minimize2' : 'i-tabler:arrows-diagonal']" fs-17px />
  </button>
</template>
