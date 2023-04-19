/**
 * Returns true if given argument is less than or equal the second, false otherwise
 * @example
 * ```typescript
 * lte(3, 3) //=> true
 * lte(2, 3) //=> true
 * lte(4, 3) //=> false
 * ```
 */

export const lte = (
  number2: number,
  number1: number,
): boolean => number1 <= number2
