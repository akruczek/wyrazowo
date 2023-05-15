import * as R from 'ramda'

export const appendSortedWords = (value: string) => R.pipe(
  R.append(value),
  R.sort((a, b) => a.localeCompare(b)),
)
