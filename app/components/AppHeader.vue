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

const placeholderInfo = 'Type to explore...'
const placeholder = ref('')

useTyper(placeholderInfo, res => {
  placeholder.value = res
})
</script>

<template>
  <header sticky top-0 z-99 h-80px overflow-hidden rounded-b backdrop-blur-60 md:h-120px>
    <div relative flex items-center justify-center overflow-hidden h="100%">
      <h1 relative m-0 text-4xl font-bold font-caveat md:text-6xl>
        Colours
        <span bg="red" absolute rounded-4px py-3px pl-4px pr-7px fs-15px c-light-1 leading-none shadow-sm>CSS</span>
      </h1>
      <div class="bg" />
    </div>

    <div absolute right-10 top-5 z-1>
      <div flex items-center justify-end>
        <PerfSwitch />
        <DarkSwitch />
        <ScreenSwitch />
      </div>
      <div
        b="1 gray-400"
        w="260px"
        h="36px"
        mt-3
        hide
        items-center
        overflow-hidden
        rounded
        text-dark
        md="flex!"
        text="dark:gray-200"
        class="[&:has(input:focus)]:b-green"
      >
        <input
          v-model="keyword"
          h="100%"
          :placeholder
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
