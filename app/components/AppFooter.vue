<script setup lang="ts">
const w3cLink = 'https://www.w3.org/TR/css-color-4/'
</script>

<template>
  <div pa-4 text-center>
    <div>
      <a :href="w3cLink" target="_blank">Reference: CSS Color Module Level 4</a>
    </div>
    <div flex items-center justify-center>
      <a px-2 href="https://github.com/XioDone/colours" target="_blank" aria-label="github page" title="github page">
        @xioDone
      </a>
      <a
        href="https://github.com/XioDone/colours"
        target="_blank"
        hover:text="green"
        aria-label="github page"
        title="github page"
      >
        <div i-carbon-logo-github aria-hidden="true" />
      </a>
    </div>
  </div>
</template>
