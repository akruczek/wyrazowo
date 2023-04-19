/**
 * Returns true when given array is empty (length: 0), false otherwise
 * @example
 * ```typescript
 * isE([])        //=> true
 * isE([ 1, 2 ])  //=> false
 * ```
 */

export const isE = <T>(
  array: T[],
): boolean => array?.length === 0
