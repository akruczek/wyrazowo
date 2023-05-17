import * as R from 'ramda'

export const isCharOK = (
  searchedWord: string,
  word: string,
): (index: number) => boolean => R.pipe(
  R.inc,
  R.times(R.identity),
  R.map(i => word[i] === searchedWord[i]),
  R.all(Boolean),
)
