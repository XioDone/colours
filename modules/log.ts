import { addTemplate, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  async setup() {
    const buildLog = {
      date: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
      timeStamp: Date.now(),
    }

    addTemplate({
      filename: 'build.log.mjs',
      getContents: () => `export default ${JSON.stringify(buildLog, null, 2)}`,
    })
  },
})
