/**
 * Returns given array with additional given element at the beginning of array (index: 0)
 * @example
 * ```typescript
 * _o([ 1, 2, 3 ]).appendFirst(4) //=> [ 4, 1, 2, 3 ]
 * ```
 */

export const appendFirst = <A, T>(
  newItem: A,
  array: T[],
): (A | T)[] => [
  newItem,
  ...array,
]
