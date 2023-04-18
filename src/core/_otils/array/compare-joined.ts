/**
 * Returns true when given arrays values are equal, false otherwise
 * @example
 * ```typescript
 * _o([ 'x', 'C', 'l' ]).compareJoined([ 'x', 'C', 'l' ]) //=> true
 * _o([ 'x', 'C', 'l' ]).compareJoined([ 'x', 'c', 'l' ]) //=> false
 * ```
 */

export const compareJoined = <A, T>(
  array1: A[],
  array2: T[],
): boolean => array1?.join?.('') === array2?.join?.('')
