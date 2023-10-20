export const setThemeColor = (color: string) => {
  $states('themeColor', color)
  document.documentElement.style.setProperty('--theme-color', color)
}

export const initTheme = () => {
  if (isServer) {
    return
  }

  const isDark = $states<boolean>('isDark').value

  const color = isDark ? '#e5e7eb' : '#000'
  document.documentElement.style.setProperty('--theme-color', color)
}

export const setTheme = (isDark: Ref<boolean>) => {
  return $onClient(async () => {
    await $sleep()

    $states<boolean>('isDark', () => isDark)

    initTheme()

    if (isDark.value) {
      document.body.setAttribute('arco-theme', 'dark')
      return
    }
    document.body.removeAttribute('arco-theme')
  })
}
