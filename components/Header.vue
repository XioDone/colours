<script setup lang="ts">
const keyword = ref('')

const onSearch = () => {
  matchColor(keyword.value)
}
const onClear = () => {
  keyword.value = ''
  matchColor(keyword.value)
  $clientTask('loopThemeColor')()
}
</script>

<template>
  <header sticky top-0 z-99 h-80px overflow-hidden rounded-b backdrop-blur-60 md:h-120px>
    <div absolute right-10 top-5 z-1 flex>
      <div
        b="1 gray-400"
        w="260px"
        h="36px"
        mr-5
        hide
        items-center
        overflow-hidden
        rounded
        text-dark
        md="flex!"
        text="dark:gray-200"
      >
        <input
          v-model="keyword"
          h="100%"
          placeholder="Type to explore..."
          flex-1
          b-0
          bg-transparent
          px-10px
          focus:outline-none
          placeholder-gray
          @input="onSearch"
        >
        <div v-show="keyword.length" i-carbon:close ma-10px cursor-pointer @click="onClear" />
      </div>
      <DarkToggle h="36px" />
    </div>

    <div relative flex items-center justify-center overflow-hidden h="100%">
      <h1 py-10 text-4xl font-bold font-caveat md:text-6xl>
        Colours
      </h1>
      <div class="bg" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
.bg {
  position: absolute;
  // top: 50%;
  // left: 50%;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  filter: blur(60px);
  // transform: translate(-50%, -50%);
  z-index: -1;
  animation: rotate 10s linear infinite;
}
</style>
