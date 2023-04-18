/**
 * Returns given array without element with given index
 */

export const filterByIndex = <T>(
  index: number,
  array: T[],
): T[] => array
  .filter((_, _index: number) => _index !== index)
