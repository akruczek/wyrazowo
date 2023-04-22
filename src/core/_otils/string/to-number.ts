/**
 * Returns string parsed to number if possible, 0 otherwise
 * @example
 * ```typescript
 * toNumber('1')    //=> 1
 * toNumber('0')    //=> 0
 * toNumber('soap') //=> 0
 * ```
 */

export const toNumber = <R>(
  value: string
): R | number => Number.isNaN(Number(value)) ? 0 : Number(value)
