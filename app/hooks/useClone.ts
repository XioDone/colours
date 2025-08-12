/**
 * Simple clone a data with JSON.parse and JSON.stringify.
 * It is important to note that is only suitable for copying simple JSON-serializable objects.
 * For complex objects or situations involving special objects, it is recommended to use more advanced deep cloning methods.
 *
 * @param data The data to clone.
 */
const useClone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export { useClone as $clone, useClone }
