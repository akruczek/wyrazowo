import * as R from 'ramda'

export const toggleSelectedSoapLetters = <T extends string[]>(letter: string) =>
  R.ifElse<T[], string[], string[]>(
    R.includes(letter),
    R.without([letter]),
    R.append(letter),
  )
