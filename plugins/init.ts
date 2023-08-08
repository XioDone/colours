import { inject as analytics } from '@vercel/analytics'

export default defineNuxtPlugin(app => {
  analytics()
})
