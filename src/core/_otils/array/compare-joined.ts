/**
 * Returns boolean when given arrays values are equal
 */

export const compareJoined = <A, T>(
  array1: A[],
  array2: T[],
): boolean => array1?.join?.('') === array2?.join?.('')
