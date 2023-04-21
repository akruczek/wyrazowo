import * as R from 'ramda'
import { LETTER_INDEX_SEPARATOR, LETTER_SOAP } from '@core/letter-card/letter-card.constants'

export const getSoapCharactersIndexes = (word: string, _selectedLetters: string[]) => {
  let soapIndexes: number[] = []
  let _letters = _selectedLetters
  const forcedIndexes = _selectedLetters
    ?.map((letter: string) => letter.includes(LETTER_INDEX_SEPARATOR) ? Number(letter?.split(LETTER_INDEX_SEPARATOR)?.[1]) : null)
    .filter((value: number | null) => value !== null)

  word.toUpperCase().split('').filter((value: string) => value !== LETTER_SOAP).forEach((character: string, index: number) => {
    if (forcedIndexes.includes(index)) {
      return
    }

    if (_letters.includes(character)) {
      _letters = R.remove(R.findIndex(R.equals(character), _letters), 1, _letters)
    } else {
      soapIndexes = R.append(index, soapIndexes)
    }
  })

  return soapIndexes
}
