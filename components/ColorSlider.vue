<script setup lang="ts">
import colorTo from 'color'

const { initColor } = defineProps<{ initColor: string }>()

const initData = {
  hue: { value: 0, color: initColor, prevValue: 0, scope: 360 },
  saturation: { value: 0, color: initColor, prevValue: 0, scope: 100 },
  lightness: { value: 0, color: initColor, prevValue: 0, scope: 100 },
  alpha: { value: 0, color: initColor, prevValue: 0, scope: 100 },
}

const colorModel = reactive($clone(initData))

const complexColor = ref('')
const init = () => {
  Object.assign(colorModel, $clone(initData))
  // @ts-expect-error color is set
  const [h, s, l] = colorTo(initColor).hsl().color
  colorModel.hue.value = h
  colorModel.saturation.value = s
  colorModel.lightness.value = l
  colorModel.alpha.value = 100
  complexColor.value = initColor
}
init()

type ColorModelKey = keyof typeof colorModel
const onChangeSliderColor = (key: ColorModelKey) => {
  const currentModel = colorModel[key]
  const currentValue = currentModel.value

  if (currentModel.prevValue === currentValue) {
    return
  }
  currentModel.prevValue = currentValue

  // @ts-expect-error color is set
  const [h, s, l] = colorTo(initColor).hsl().color

  let hVal = h.toFixed(2)
  let sVal = `${s.toFixed(2)}%`
  let lVal = `${l.toFixed(2)}%`
  let aVal = 1
  if (key === 'hue') {
    hVal = currentValue.toFixed(2)
  }

  if (key === 'saturation') {
    sVal = `${currentValue.toFixed(2)}%`
  }

  if (key === 'lightness') {
    lVal = `${currentValue.toFixed(2)}%`
  }

  if (key === 'alpha') {
    aVal = currentValue / 100
  }

  const hsl = `hsl(${hVal}, ${sVal}, ${lVal}, ${aVal})`
  currentModel.color = hsl
  const complexHsl = []

  for (const key in colorModel) {
    const value = colorModel[key as ColorModelKey].value
    if (key === 'hue') {
      complexHsl[0] = value.toFixed(2)
    }

    if (key === 'saturation') {
      complexHsl[1] = `${value.toFixed(2)}%`
    }

    if (key === 'lightness') {
      complexHsl[2] = `${value.toFixed(2)}%`
    }

    if (key === 'alpha') {
      complexHsl[3] = value / 100
    }
  }
  complexColor.value = `hsl(${complexHsl[0]}, ${complexHsl[1]}, ${complexHsl[2]}, ${complexHsl[3]})`
}

const { copy } = useClipboard()
const onCopy = (source: string) => {
  copy(source)
  $notify({
    title: 'Code copied to clipboard!',
    message: source,
    type: 'success',
    position: 'bottomRight',
  })
}
</script>

<template>
  <div class="color-slider" fs-base>
    <div
      :style="`background-color: ${complexColor};`"
      b="1 dark/50 dark:white"
      relative
      mb-5
      h-20
      flex-center
      rounded-md
    >
      <div hover="bg-red" absolute right-1 top-1 rotate-y-180 cursor-pointer rounded p-5px transition-300 @click="init">
        <div i-tabler:reload />
      </div>

      <span cursor-pointer hover="bg-red" rounded p-5px @click="onCopy(complexColor)">{{ complexColor }}</span>
    </div>

    <div grid grid-cols-2 gap-5>
      <div
        v-for="(item, key) in colorModel"
        :key="key"
        :style="`background-color: ${item.color};`"
        b="1 dark/50 dark:white"
        px="20%"
        h-20
        flex-center
        flex-col
        rounded-md
      >
        <span fs-lg>{{ key }}</span>
        <span cursor-pointer hover="bg-red" rounded p-5px transition-300 @click="onCopy(item.color)">{{ item.color }}</span>
        <ASlider v-model="item.value" :max="item.scope" @change="onChangeSliderColor(key)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color-slider {
  --color-bg-2: #fff;
}
</style>
