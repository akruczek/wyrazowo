import * as React from 'react'
import * as R from 'ramda'
import { ALL_LETTERS_SORTED, LETTER_SOAP } from '../../core/letter-card/letter-card.constants'

interface UseSelectLetter {
  letters: string[];
  selectedLetters: string[];
  handleSelectLetter: (letter: string, index: number) => () => void;
  handleDeselectLetter: (index: number) => () => void;
  soapCharactersIndexes: (letter: string) => number[];
  handleClearSelectedLetters: () => void;
}

export const useSelectLetter = (): UseSelectLetter => {
  const MAX_SELECTED_LETTERS = 14

  const [ selectedLetters, updateSelectedLetters ] = React.useState<string[]>([])

  const hasMaxSelectedLetters = selectedLetters?.length < MAX_SELECTED_LETTERS

  const letters = [ ...ALL_LETTERS_SORTED, LETTER_SOAP, LETTER_SOAP, LETTER_SOAP ]

  const handleSelectLetter = (letter: string, index: number) => () => {
    if (hasMaxSelectedLetters) {
      updateSelectedLetters(R.append(letter, selectedLetters))
    }
  }

  const handleDeselectLetter = (index: number) => () => {
    updateSelectedLetters(R.remove(index, 1, selectedLetters))
  }

  const handleClearSelectedLetters = () => {
    updateSelectedLetters([])
  }

  const soapCharactersIndexes = React.useCallback((word: string) => {
    let soapIndexes: number[] = []
    let _letters = selectedLetters

    word.toUpperCase().split('').filter((value: string) => value !== LETTER_SOAP).forEach((character: string, index: number) => {
      if (_letters.includes(character)) {
        _letters = R.remove(R.findIndex(R.equals(character), _letters), 1, _letters)
      } else {
        soapIndexes = R.append(index, soapIndexes)
      }
    })

    return soapIndexes
  }, [ selectedLetters ])

  return {
    letters, selectedLetters,
    handleSelectLetter, handleDeselectLetter, soapCharactersIndexes, handleClearSelectedLetters,
  }
}