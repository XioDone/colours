<script setup lang="tsx">
import colorTo from 'color'

const colors = getColors()
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

let timer: NodeJS.Timeout
const { perfMode } = $perfMode()
const loopThemeColor = () => {
  if (perfMode.value) {
    return
  }

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
$clientTask('clearLoopThemeColor', () => {
  clearTimeout(timer)
})

const onChangeThemeColor = (color: string) => {
  loopThemeColor()
  setThemeColor(color)
}

type ColorItem = (typeof colors.value)[0]

const selectedColor = ref<ColorItem & { hsl: string }>({
  name: '',
  hex: '',
  rgb: '',
  hsl: '',
})

const hslLightnessColors = ref<any[]>([])
const paletteDialogVisible = ref(false)
const onOpenColorPaletteDialog = (colorItem: ColorItem) => {
  $catch(async () => {
    // const [h, s, l] = colorTo('#4D9375').hsl().color

    // @ts-expect-error color is set
    const [h, s, l] = colorTo(colorItem.hex).hsl().color
    const hString = `${h.toFixed(2)}`
    const sString = `${s.toFixed(2)}%`

    const hlsLightnessList = Array.from({ length: 50 }, (_, i) => {
      i++
      const lString = `${i * 2}%`
      const hsl = `hsl(${hString}, ${sString}, ${lString})`
      const colorModel = colorTo(hsl)

      return {
        hsl,
        rgb: colorModel.rgb().string(),
        hex: colorModel.hex(),
      }
    })

    hslLightnessColors.value = hlsLightnessList
    selectedColor.value = { ...colorItem, hsl: `hsl(${hString}, ${sString}, ${l.toFixed(2)}%, 1)` }

    paletteDialogVisible.value = true

    // Fix scroll up - aspect-ratio
    const scrollY = window.scrollY
    await nextTick()
    window.scrollTo({
      top: scrollY,
      behavior: 'instant',
    })
  })
}

// Reset the body width when the modal is opened and the window is resized.
$onClient(() => {
  useResizeObserver(document.querySelector('html'), entries => {
    if (!paletteDialogVisible.value) {
      return
    }
    const entry = entries[0]
    const { width } = entry.contentRect
    document.body.style.width = `${width - 15}px`
  })
})
</script>

<template>
  <div>
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
      role="list"
    >
      <div
        v-for="(item, index) in colors"
        :key="index"
        role="listitem"
        :tabindex="index + 1"
        @mouseenter="onChangeThemeColor(item.name)"
      >
        <div
          :style="`background-color:${item.name}`"
          class="group"
          relative
          aspect-1
          flex
          flex-center
          overflow-hidden
          rounded-md
        >
          <div
            group-hover="opacity-100"
            i-carbon:color-palette
            absolute
            right-3
            top-3
            cursor-pointer
            fs-5
            opacity-0
            :class="{ 'c-light-9': item.name === 'black' }"
            @click="onOpenColorPaletteDialog(item)"
          />

          <div group-hover="rotate-y-0" flex flex-col gap-4>
            <span class="code-tag" @click="onCopy(item.name)">
              {{ item.name }}
            </span>
            <span class="code-tag" @click="onCopy(item.hex)">
              {{ item.hex }}
            </span>
            <span class="code-tag" @click="onCopy(`rgb(${item.rgb})`)">
              {{ item.rgb }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!colors.length" h="100%" flex items-center justify-center c-dark dark:c-gray-200>
      Nothing more . . .
    </div>

    <AModal v-model:visible="paletteDialogVisible" width="80%" :footer="false">
      <template #title>
        <span :style="`background-color: ${selectedColor?.name}`" b="1 dark dark:white" mr-1 wh-1em rounded-full />
        <span fs-6 font-nunito>{{ selectedColor?.name }}</span>
      </template>
      <div v-if="paletteDialogVisible">
        <ColorSlider :init-color="selectedColor.hsl" />

        <div max-h="50vh" overflow="x-hidden y-auto" rounded-md>
          <div grid grid-cols-5 p-2>
            <div
              v-for="(item, index) in hslLightnessColors"
              :key="item.hex"
              :style="`background-color: ${item.hex}`"
              :class="{ 'c-dark!': index > 14 }"
              aspect-1
              flex
              items-end
              c-light
            >
              <div inline-flex flex-col class="[&>*]:rounded [&>*]:p-1">
                <span
                  flex
                  cursor-pointer
                  items-center
                  gap-1
                  hover="bg-red"
                  rounded
                  p-5px
                  transition-300
                  @click="onCopy(item.hex)"
                >
                  <i i-tabler:copy />
                  HEX
                </span>
                <span
                  flex
                  cursor-pointer
                  items-center
                  gap-1
                  hover="bg-red"
                  rounded
                  p-5px
                  transition-300
                  @click="onCopy(item.rgb)"
                >
                  <i i-tabler:copy />
                  RGB
                </span>
                <span
                  flex
                  cursor-pointer
                  items-center
                  gap-1
                  hover="bg-red"
                  rounded
                  p-5px
                  transition-300
                  @click="onCopy(item.hsl)"
                >
                  <i i-tabler:copy />
                  HSL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AModal>
  </div>
</template>

<style lang="scss" scoped>
.code-tag {
  @apply b-b-1 b-b-red min-w-12em cursor-pointer py-1.2 text-center bg-white/60 hover:scale-110;
}
</style>
