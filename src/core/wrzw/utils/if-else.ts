/**
 * Returns first argument if given condition in truthy, second argument otherwise
 * @example
 * ```typescript
 * ifElse('YES', 'NO', 'soap'.length === 4) //=> 'YES'
 * ifElse(1, 0, typeof 'soap' === 'number') //=> 0
 * ```
 */

export const ifElse = <T, F>(
  onTrue: T,
  onFalse: F,
  condition: boolean,
): T | F => condition
  ? onTrue
  : onFalse
