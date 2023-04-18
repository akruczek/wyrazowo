/**
 * Returns true if given argument is greater than or equal to the second, false otherwise
 * @example
 * ```typescript
 * _o(3).gte(3) //=> true
 * _o(3).gte(2) //=> true
 * _o(2).gte(3) //=> false
 * ```
 */

export const gte = (
  number2: number,
  number1: number,
): boolean => number1 >= number2
