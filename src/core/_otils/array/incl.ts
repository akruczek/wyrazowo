/**
 * Returns boolean when given array contains given item
 */

export const incl = <T>(
  item: T,
  collection: T[],
): boolean => collection?.includes?.(item)
