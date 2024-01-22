export const useTyper = (rawText: string, handler: (result: string) => void) => {
  if (isServer) {
    return {}
  }

  let isSuspend = false

  const t = rawText
  const tLength = t.length
  let index = 0
  let result = ''

  function runner() {
    $catch(async () => {
      await useSleep(Math.random() * 300)
      result += t[index]
      index++

      if (index > tLength) {
        await useSleep(2000)
        result = ''
      }

      handler && handler(result)

      if (index > tLength) {
        index = 0
        await useSleep(300)
      }

      if (isSuspend) {
        return
      }
      runner()
    }).catch(err => {
      console.log(err)
    })
  }
  runner()

  return {
    pause() {
      isSuspend = true
    },
    play() {
      if (!isSuspend) {
        return
      }
      isSuspend = false
      runner()
    },
  }
}
