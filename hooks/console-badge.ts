type LogParam = string | number
const useLogBadge = (param1: LogParam, param2: LogParam) => {
  console.log(
    `\uD83C\uDF89 %c${param1} %c ${param2}`,
    'color: black; border-radius: 3px 0 0 3px; padding: 2px 2px 1px 10px; background: #00DC82',
    'border-radius: 0 3px 3px 0; padding: 2px 10px 1px 2px; background: #00DC8220',
  )
}

export { useLogBadge, useLogBadge as $logBadge }
