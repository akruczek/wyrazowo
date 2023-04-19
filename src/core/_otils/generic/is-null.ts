/**
 * Equals true when given argument equals null, false otherwise
 * @example
 * ```typescript
 * isNull(null)        //=> true
 * isNull(undefined)   //=> false
 * isNull(NaN)         //=> false
 * isNull(0)           //=> false
 * ```
 */

export const isNull = <T>(
  arg: T,
): boolean => arg === null
