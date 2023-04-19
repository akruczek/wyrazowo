import * as R from 'ramda'

export const reverseNotNilWords = R.pipe<string[][][], string[][], string[][]>(
  R.reverse,
  R.filter(R.complement(R.isNil)),
)
