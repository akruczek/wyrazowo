/**
 * Returns true if given argument is less than the second, false otherwise
 * @example
 * ```typescript
 * lt(2, 3) //=> false
 * lt(3, 3) //=> false
 * lt(4, 3) //=> true
 * ```
 */

export const lt = (
  number2: number,
  number1: number,
): boolean => number1 < number2
