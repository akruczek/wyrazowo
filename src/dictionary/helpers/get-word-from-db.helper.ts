import * as R from 'ramda'

export const getWordFromDB = (word: string) => R.pipe<string[], any[], string | undefined>(
  R.split('.'),
  R.find(
    R.equals(
      R.toLower(word),
    ),
  ),
)
