/**
 * Equals true when given argument equals null, false otherwise
 * @example
 * ```typescript
 * _o(null).isNull        //=> true
 * _o(undefined).isNull   //=> false
 * _o(NaN).isNull         //=> false
 * _o(0).isNull           //=> false
 * ```
 */

export const isNull = <T>(
  arg: T,
): boolean => arg === null
