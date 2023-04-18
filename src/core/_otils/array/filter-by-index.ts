/**
 * Returns given array without element with given index
 * @example
 * ```typescript
 * _o([ 'x', 'y', 'z' ]).filterByIndex(1) //=> [ 'x', 'z' ]
 * ```
 */

export const filterByIndex = <T>(
  index: number,
  array: T[],
): T[] => array
  .filter((_, _index: number) => _index !== index)
