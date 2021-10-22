export function getRndInteger(
  min: number,
  max: number,
  exceptions: number[] = []
): number {
  let selected = Math.floor(Math.random() * (max - min + 1)) + min
  if (exceptions.some((item) => selected === item)) {
    selected = getRndInteger(min, max, exceptions)
  }
  return selected
}

export function getNRandomItemsFromListWithExceptions<T>(
  data: T[],
  nbItems: number,
  exceptions: number[]
) {
  let selected: T[] = []
  if (nbItems <= data.length)
    selected = [...Array(nbItems)].map((_, index) => {
      const indexOfData = getRndInteger(0, data.length - 1, exceptions)
      exceptions.push(indexOfData)
      return data[indexOfData]
    })
  return { selected, exceptions }
}

export function callFnNtime<T>(n = 1, callback: () => T) {
  return [...Array(n)].map(() => {
    return callback()
  })
}
