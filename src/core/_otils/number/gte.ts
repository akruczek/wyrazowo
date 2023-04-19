/**
 * Returns true if given argument is greater than or equal to the second, false otherwise
 * @example
 * ```typescript
 * gte(3, 3) //=> true
 * gte(2, 3) //=> true
 * gte(3, 2) //=> false
 * ```
 */

export const gte = (
  number2: number,
  number1: number,
): boolean => number1 >= number2
