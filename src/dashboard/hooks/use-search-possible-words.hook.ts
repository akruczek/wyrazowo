import * as React from 'react'
import { findPossibleWords } from '../helpers/find-possible-words.helper'

interface UseSearchPossibleWords {
  possibleWords: string[];
  noWordsFound: boolean;
  searchPossibleWords: () => void;
  onLengthChange: (minMax: [ number, number ]) => void;
  clearPossibleWords: () => void;
}

export const useSearchPossibleWords = (selectedLetters: string[]): UseSearchPossibleWords => {
  const wordLengthRef = React.useRef<[ number, number ]>([ 1, 10 ])

  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])
  const [ noWordsFound, setNoWordsFound ] = React.useState<boolean>(false)

  const searchPossibleWords = React.useCallback(() => {
    setNoWordsFound(false)

    findPossibleWords(selectedLetters, wordLengthRef.current).then((result: string[]) => {
      setNoWordsFound(result?.length === 0)
      setPossibleWords(result)
    })
  }, [ selectedLetters ])

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