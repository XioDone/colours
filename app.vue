<script setup lang="ts"></script>

<template>
  <div bg="dark:dark-900" min-h-screen>
    <Header />
    <ColorList />
    <Footer />
  </div>
</template>

<style lang="scss">
html {
  scroll-behavior: smooth;
  color: var(--theme-color);
  transition: all 0.4s ease-in-out;
}
a {
  transition: all 0.4s ease-in-out;
  &:hover {
    color: gray;
  }
}
</style>
