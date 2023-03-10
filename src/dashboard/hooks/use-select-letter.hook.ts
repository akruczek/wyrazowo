import * as React from 'react'
import * as R from 'ramda'
import { ALL_LETTERS_SORTED, LETTER_ANY, LETTER_SOAP } from '../../core/letter-card/letter-card.constants'

interface UseSelectLetter {
  letters: string[];
  selectedLetters: string[];
  selectedAnyLettersIndexes: number[];
  handleSelectLetter: (letter: string, index: number) => () => void;
  handleDeselectLetter: (index: number) => () => void;
  isAnyLetterSelected: (index: number) => boolean;
  soapCharactersIndexes: (letter: string) => number[];
}

export const useSelectLetter = (): UseSelectLetter => {
  const MAX_SELECTED_LETTERS = 7

  const [ selectedLetters, updateSelectedLetters ] = React.useState<string[]>([])
  const [ selectedAnyLettersIndexes, updateSelectedAnyLettersIndexes ] = React.useState<number[]>([])

  const hasMaxSelectedLetters = selectedLetters?.length < MAX_SELECTED_LETTERS

  const letters = [ ...ALL_LETTERS_SORTED, LETTER_SOAP, LETTER_ANY, LETTER_ANY ]

  const handleSelectLetter = (letter: string, index: number) => () => {
    if (R.equals(letter, LETTER_ANY)) {
      if (R.includes(index, selectedAnyLettersIndexes)) {
        updateSelectedAnyLettersIndexes(R.without([ index ]))
      } else {
        updateSelectedAnyLettersIndexes(R.append(index))
      }
    } else {
      if (hasMaxSelectedLetters) {
        updateSelectedLetters(R.append(letter, selectedLetters))
      }
    }
  }

  const handleDeselectLetter = (index: number) => () => {
    updateSelectedLetters(R.remove(index, 1, selectedLetters))
  }

  const isAnyLetterSelected = (index: number) => selectedAnyLettersIndexes.includes(index)

  const soapCharactersIndexes = (word: string) => {
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
  }

  return {
    letters, selectedLetters, selectedAnyLettersIndexes,
    handleSelectLetter, handleDeselectLetter, isAnyLetterSelected, soapCharactersIndexes,
  }
}