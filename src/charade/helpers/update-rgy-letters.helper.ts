import * as R from 'ramda'

export const updateRGYLetters = (
  contents: (string | undefined)[],
  activeRow: number,
  count: number,
  word: string,
  [ redLetters, greenLetters, yellowLetters ]: [ string[], string[], string[] ],
): [ string[], string[], string[] ] => {
  const letters = R.map(
    (index: number) => contents[index + (activeRow * (count + 1))]
  )(R.times(R.identity, count)) as string[]

  let newGreenLetters: string[] = [ ...greenLetters ]
  let newYellowLetters: string[] = [ ...yellowLetters ]
  let newRedLetters: string[] = [ ...redLetters ]

  letters.forEach((l: string, i: number) => {
    if (word.includes(l)) {
      if (word[i] === l) {
        newGreenLetters = [ ...newGreenLetters, l ]
      } else {
        newYellowLetters = [ ...newYellowLetters, l ]
      }
    } else {
      newRedLetters = [ ...newRedLetters, l ]
    }
  })

  return [ newRedLetters, newGreenLetters, newYellowLetters ]
}