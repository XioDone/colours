<script setup lang="ts">
const colors = getColors()

const { copy } = useClipboard()

const onCopy = (source: string) => {
  copy(source)
  $notify({
    title: 'Code copied to clipboard!',
    type: 'success',
    position: 'bottomRight',
  })
}

let timer: NodeJS.Timeout
const loopThemeColor = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    const random = Math.floor(Math.random() * colors.value.length)
    const color = colors.value[random]

    if (!color) {
      return
    }

    setThemeColor(color.name)
    loopThemeColor()
  }, 2500)
}

$onClient(loopThemeColor)

$clientTask('loopThemeColor', loopThemeColor)

const onChangeThemeColor = (color: string) => {
  loopThemeColor()
  setThemeColor(color)
}
</script>

<template>
  <div min-h="70vh">
    <div
      grid
      grid-cols-2
      gap-4
      pa-4
      text-black
      lg:grid-cols-4
      md:grid-cols-4
      xl:grid-cols-5
      xxl:grid-cols-6
      all:transition-400
    >
      <div v-for="(item, index) in colors" :key="index" @mouseenter="onChangeThemeColor(item.name)">
        <div
          :style="`background-color:${item.name}`"
          aspect-1
          flex
          flex-col
          items-center
          justify-center
          gap-4
          overflow-hidden
          rounded-md
        >
          <code @click="onCopy(item.name)">
            {{ item.name }}
          </code>
          <code @click="onCopy(item.hex)">
            {{ item.hex }}
          </code>
          <code @click="onCopy(item.rgb)">
            {{ item.rgb }}
          </code>
        </div>
      </div>
    </div>
    <div v-show="!colors.length" h="100%" flex items-center justify-center c-dark dark:c-gray-200>
      Nothing more . . .
    </div>
  </div>
</template>

<style lang="scss" scoped>
code {
  @apply b-b-1 b-b-red min-w-12em cursor-pointer py-1.2 text-center bg-white/60 hover:scale-110;
}
</style>
