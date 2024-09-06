import { Notification } from '@arco-design/web-vue'
import type { NotificationConfig, NotificationMethod, NotificationReturn } from '@arco-design/web-vue'

// import '@arco-design/web-vue/es/notification/style/css.js'

const NotifyType = ['info', 'success', 'warning', 'error'] as const

type NotifyMessage = NotificationConfig['content']

declare interface NotifyOptions extends Omit<NotificationConfig, 'content'> {
  message?: NotifyMessage
  type?: (typeof NotifyType)[number]
}

interface Notify {
  /**
   * @description Notify function component
   * @see https://arco.design/vue/component/notification
   * @param {NotifyOptions} options - Notification options
   * @example
   * ```ts
   *  // type: 'info' | 'success' | 'warning' | 'error'
   *  $notify({
   *   type: 'success', // default: 'info'
   *   title: 'Success',
   *   message: 'This is a success message',
   *  })
   *
   *  //methods: remove and clear
   *  $notify.clear()
   * ```
   */
  (options: NotifyOptions): NotificationReturn
  remove: NotificationMethod['remove']
  clear: NotificationMethod['clear']
}

interface DefaultConfig extends Omit<NotifyOptions, 'message'> {
  type: (typeof NotifyType)[number]
}
// 默认配置
const defaultConfig: DefaultConfig = {
  type: NotifyType[0],
  closable: true,
}
const useNotify: Notify = (_opts: NotifyOptions) => {
  if (isServer) {
    // on server side, return a empty object
    return { close() {} }
  }
  const options = { ...defaultConfig, ..._opts }
  const { type, message = '', ...config } = options

  const isExclude = !NotifyType.includes(type)
  if (isExclude) {
    throw cs.error(`${type} is not a valid type`)
  }
  const configWrapper = { ...config, content: message }
  return Notification[type](configWrapper)
}

useNotify.remove = id => {
  $onClient(() => {
    Notification.remove(id)
  })
}

useNotify.clear = () => {
  $onClient(() => {
    Notification.clear()
  })
}

export { useNotify, useNotify as $notify }
