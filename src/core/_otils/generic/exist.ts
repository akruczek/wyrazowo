/**
 * Returns true when given argument is defined, false otherwise
 * @example
 * ```typescript
 * exist([])           //=> true
 * exist(undefined)    //=> false
 * exist(null)         //=> false
 * exist(0)            //=> true
 * ```
 */

export const exist = <T>(
  arg: T,
): boolean => arg !== null && arg !== undefined
