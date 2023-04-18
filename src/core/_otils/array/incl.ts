/**
 * Returns true when given array contains given item, false otherwise
 * @example
 * ```typescript
 * _o([ 'soap', 'S', 'SOAP' ]).incl('SOAP') //=> true
 * _o([ 'soap', 'S', 'SOAP' ]).incl('s')    //=> false
 * ```
 */

export const incl = <T>(
  item: T,
  collection: T[],
): boolean => collection?.includes?.(item)
