export const getCharadeFieldContent = (
  contents: (string | undefined)[],
  index: number,
  rowIndex: number,
  count: number,
) => contents[index + (rowIndex * (count + 1))] ?? ''
