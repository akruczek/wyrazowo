import * as React from 'react'
import * as R from 'ramda'
import { findPossibleWords } from '../helpers/find-possible-words.helper'
import { LETTER_SOAP } from '../../core/letter-card/letter-card.constants'

interface UseSearchPossibleWords {
  possibleWords: string[];
  noWordsFound: boolean;
  searchPossibleWords: () => void;
  onLengthChange: (minMax: [ number, number ]) => void;
  clearPossibleWords: () => void;
}

export const useSearchPossibleWords = (
  selectedLetters: string[],
  selectedAnyLettersIndexes: number[],
): UseSearchPossibleWords => {
  const wordLengthRef = React.useRef<[ number, number ]>([ 1, 10 ])
  const selectedAnyLettersIndexesRef = React.useRef<number[]>([])

  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])
  const [ noWordsFound, setNoWordsFound ] = React.useState<boolean>(false)

  React.useEffect(() => {
    selectedAnyLettersIndexesRef.current = selectedAnyLettersIndexes
  }, [ selectedAnyLettersIndexes ])

  const searchPossibleWords = React.useCallback(() => {
    setNoWordsFound(false)
    const _selectedLetters = selectedAnyLettersIndexesRef.current.length
      ? [ ...selectedLetters, ...R.map(R.always(LETTER_SOAP), selectedAnyLettersIndexesRef.current) ]
      : selectedLetters

    findPossibleWords(_selectedLetters, wordLengthRef.current).then((result: string[]) => {
      setNoWordsFound(result?.length === 0)
      setPossibleWords(result)
    })
  }, [ selectedLetters, selectedAnyLettersIndexesRef.current ])

  const ___searchMorePossibleWords = React.useCallback(() => {
    setNoWordsFound(false)
    const _selectedLetters = selectedAnyLettersIndexesRef.current.length
      ? [ ...selectedLetters, ...R.map(R.always(LETTER_SOAP))(selectedAnyLettersIndexesRef.current) ]
      : selectedLetters

    findPossibleWords(_selectedLetters, wordLengthRef.current).then((result: string[]) => {
      setNoWordsFound(result?.length === 0)
      setPossibleWords([ ...possibleWords, ...result ])
    })
  }, [ selectedLetters, selectedAnyLettersIndexesRef.current ])

  const onLengthChange = (minMax: [ number, number ]) => {
    if (minMax.join('') !== wordLengthRef.current.join('')) {
      wordLengthRef.current = minMax
    }
  }

  const clearPossibleWords = () => {
    setPossibleWords([])
    setNoWordsFound(false)
  }

  return { possibleWords, noWordsFound, searchPossibleWords, onLengthChange, clearPossibleWords }
}