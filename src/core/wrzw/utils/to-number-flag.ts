/**
 * Returns number 1 or 0 (parsed boolean)
 * @example
 * ```typescript
 * toNumberFlag(false) //=> 0
 * toNumberFlag(true)  //=> 1
 * ```
 */

export const toNumberFlag = (
  value: boolean
): 0 | 1 => value ? 1 : 0
