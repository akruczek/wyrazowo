/**
 * Returns given array without element with given index
 * @example
 * ```typescript
 * filterByIndex(1, [ 'x', 'y', 'z' ]) //=> [ 'x', 'z' ]
 * ```
 */

export const filterByIndex = <T>(
  index: number,
  array: T[],
): T[] => array
  .filter((_, _index: number) => _index !== index)
