export const getColors = () => {
  return useState('colors', () => baseColors)
}

export const matchColor = (keyword: string) => {
  keyword = keyword.toLowerCase().trim()
  let list = []

  if (keyword === '') {
    list = baseColors
  } else {
    list = baseColors.filter(color => {
      const c1 = color.name.toLowerCase().includes(keyword)
      const c2 = color.hex.toLowerCase().includes(keyword)
      const c3 = color.rgb.toLowerCase().includes(keyword)
      return c1 || c2 || c3
    })
  }
  const colors = useState('colors')
  colors.value = list
}
