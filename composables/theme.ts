export const setThemeColor = (color: string) => {
  document.documentElement.style.setProperty('--theme-color', color)
}

export const initTheme = () => {
  if (isServer) {
    return
  }

  const isDark = useState<boolean>('isDark').value

  const color = isDark ? '#e5e7eb' : '#000'
  document.documentElement.style.setProperty('--theme-color', color)
}

export const setTheme = (isDark: Ref<boolean>) => {
  return $onClient(async () => {
    await new Promise(resolve => {
      setTimeout(resolve)
    })

    useState<boolean>('isDark', () => isDark)

    initTheme()

    if (isDark.value) {
      document.body.setAttribute('arco-theme', 'dark')
      return
    }
    document.body.removeAttribute('arco-theme')
  })
}
