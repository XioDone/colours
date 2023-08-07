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

const onChangeThemeColor = (color: string) => {
  setThemeColor(color)
}
</script>

<template>
  <div min-h="70vh">
    <div grid grid-cols-2 gap-4 pa-4 text-black lg:grid-cols-4 md:grid-cols-4 xl:grid-cols-4 all:transition-400>
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
          rounded-2
        >
          <code
            border-b="1 red"
            bg="white/60"
            min-w-12em
            cursor-pointer
            py-1.2
            text-center
            hover:scale-110
            @click="onCopy(item.name)"
          >
            {{ item.name }}
          </code>
          <code
            border-b="1 red"
            bg="white/60"
            min-w-12em
            cursor-pointer
            py-1.2
            text-center
            hover:scale-110
            @click="onCopy(item.hex)"
          >
            {{ item.hex }}
          </code>
          <code
            border-b="1 red"
            bg="white/60"
            min-w-12em
            cursor-pointer
            py-1.2
            text-center
            hover:scale-110
            @click="onCopy(item.rgb)"
          >
            {{ item.rgb }}
          </code>
        </div>
      </div>
    </div>
    <div v-show="!colors.length" h="100%" flex items-center justify-center>
      Nothing more...
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
