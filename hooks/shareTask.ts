const clientTask: Record<string, any> = {}

const uesClientTask = <T = any>(key: string, value?: T): T | undefined => {
  if (isServer) {
    return
  }

  if (typeof key !== 'string' || key === '') {
    return
  }

  if (value !== undefined) {
    clientTask[key] = value
  }

  return clientTask[key]
}

export { uesClientTask, uesClientTask as $clientTask }
