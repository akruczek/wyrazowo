/**
 * Returns true when given arrays values are equal, false otherwise
 * @example
 * ```typescript
 * compareJoined([ 'x', 'C', 'l' ], [ 'x', 'C', 'l' ]) //=> true
 * compareJoined([ 'x', 'c', 'l' ], [ 'x', 'C', 'l' ]) //=> false
 * ```
 */

export const compareJoined = <A, T>(
  array1: A[],
  array2: T[],
): boolean => array1?.join?.('') === array2?.join?.('')
