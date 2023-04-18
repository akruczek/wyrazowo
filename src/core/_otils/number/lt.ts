/**
 * Returns true if given argument is less than the second, false otherwise
 * @example
 * ```typescript
 * _o(3).lt(2) //=> false
 * _o(3).lt(3) //=> false
 * _o(3).lt(4) //=> true
 * ```
 */

export const lt = (
  number2: number,
  number1: number,
): boolean => number1 < number2
