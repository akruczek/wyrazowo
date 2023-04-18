/**
 * Equals true when given array is empty (length: 0), false otherwise
 * @example
 * ```typescript
 * _o([]).isE        //=> true
 * _o([ 1, 2 ]).isE  //=> false
 * ```
 */

export const isE = <T>(
  array: T[],
): boolean => array?.length === 0
