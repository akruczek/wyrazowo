/**
 * Returns given array with additional given element at the beginning of array (index: 0)
 */

export const appendFirst = <A, T>(
  newItem: A,
  array: T[],
): (A | T)[] => [
  newItem,
  ...array,
]
