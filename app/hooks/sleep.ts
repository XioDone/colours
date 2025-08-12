const useSleep = (ms = 0) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms)
  })
}

export { useSleep as $sleep, useSleep }
