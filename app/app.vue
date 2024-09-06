<script setup lang="ts"></script>

<template>
  <div id="layout-body" min-h-screen>
    <AppHeader />
    <main id="main">
      <ColorList />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 15px;
  display: block;
  background: transparent;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  min-height: 100px;
  border: 6px solid transparent;
  display: block;
  background: #787878;
  border-radius: 10px;
  background-clip: padding-box;
}

html {
  scroll-behavior: smooth;
  color: var(--theme-color);
  transition: all 3s ease-in-out;
}

body {
  // transition: background-color 0.3s ease-in-out;
  --at-apply: 'dark:bg-dark-900/99  bg-light-700 font-nunito';
}

a {
  &:hover {
    color: gray;
  }
}

#layout-body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#main {
  flex: 1;
}
</style>
