/**
 * Returns true if given argument is greater than the second, false otherwise
 * @example
 * ```typescript
 * _o(3).gt(3) //=> false
 * _o(4).gt(3) //=> true
 * ```
 */

export const gt = (
  number2: number,
  number1: number,
): boolean => number1 > number2
