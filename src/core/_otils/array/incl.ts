/**
 * Returns true when given array contains given item, false otherwise
 * @example
 * ```typescript
 * incl('SOAP', [ 'soap', 'S', 'SOAP' ]) //=> true
 * incl('s', [ 'soap', 'S', 'SOAP' ])    //=> false
 * ```
 */

export const incl = <T>(
  item: T,
  collection: T[],
): boolean => collection?.includes?.(item)
