import * as R from 'ramda'
import { LETTER_SOAP } from '../../core/letter-card/letter-card.constants'

export const getSoapCharactersIndexes = (word: string, _selectedLetters: string[]) => {
  let soapIndexes: number[] = []
  let _letters = _selectedLetters

  word.toUpperCase().split('').filter((value: string) => value !== LETTER_SOAP).forEach((character: string, index: number) => {
    if (_letters.includes(character)) {
      _letters = R.remove(R.findIndex(R.equals(character), _letters), 1, _letters)
    } else {
      soapIndexes = R.append(index, soapIndexes)
    }
  })

  return soapIndexes
}
