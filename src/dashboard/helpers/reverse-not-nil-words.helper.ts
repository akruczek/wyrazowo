import * as R from 'ramda'

export const reverseNotNilWords = R.pipe(
  R.reverse as any,
  R.filter(R.complement(R.isNil)) as any,
) as (words: string[][]) => string[][]
