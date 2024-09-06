const usePerfMode = () => {
  const perfMode = $cookiz({ name: 'perfMode', default: false })

  const switchPerfMode = () => {
    $catch(async () => {
      if (perfMode.value) {
        perfMode.value = false

        await $sleep(1)
        $clientTask('loopThemeColor')()
        return
      }
      perfMode.value = true
      await $sleep(1)
      $clientTask('clearLoopThemeColor')()
    }).catch(err => {
      c.info(err)
    })
  }

  return {
    perfMode,
    switchPerfMode,
  }
}
export { usePerfMode, usePerfMode as $perfMode }
