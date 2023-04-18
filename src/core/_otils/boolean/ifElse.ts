/**
 * Returns first argument if given condition in truthy, second argument otherwise
 * @example
 * ```typescript
 * _o('soap'.length === 4).ifElse('YES', 'NO') //=> 'YES'
 * _o(typeof 'soap' === 'number').ifElse(1, 0) //=> 0
 * ```
 */

export const ifElse = <T, F>(
  onTrue: T,
  onFalse: F,
  condition: boolean,
): T | F => condition
  ? onTrue
  : onFalse
