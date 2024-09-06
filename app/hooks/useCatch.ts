type Fn<T> = () => T | Promise<T>

/**
 * promise try catch wrap function
 * @param {Fn<T>} fn - callback function
 * @returns {Promise<T>}
 */
export const $catch = async <T>(fn: Fn<T>): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useCatch = $catch
