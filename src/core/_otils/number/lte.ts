/**
 * Returns true if given argument is less than or equal the second, false otherwise
 * @example
 * ```typescript
 * _o(3).lte(3) //=> true
 * _o(3).lte(2) //=> true
 * _o(3).lte(4) //=> false
 * ```
 */

export const lte = (
  number2: number,
  number1: number,
): boolean => number1 <= number2
