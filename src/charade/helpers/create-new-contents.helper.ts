export const createNewContents = (
  activeIndex: number,
  activeRow: number,
  count: number,
  newContent: undefined | string,
) => (oldContents: (string | undefined)[]): (string | undefined)[] => {
  let newContents = oldContents
  newContents[activeIndex + (activeRow * (count + 1))] = newContent
  return newContents
}
