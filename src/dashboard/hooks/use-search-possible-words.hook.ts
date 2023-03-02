import * as React from 'react'
import * as R from 'ramda'
import { findPossibleWords } from '../helpers/find-possible-words.helper'
import { LETTER_SOAP } from '../../core/letter-card/letter-card.constants'
import { asyncReadFile } from '../../core/read-file/read-file'

interface UseSearchPossibleWords {
  possibleWords: string[];
  searchPossibleWords: () => void;
  searchMorePossibleWords: () => void;
  onLengthChange: (minMax: [ number, number ]) => void;
  clearPossibleWords: () => void;
}

export const useSearchPossibleWords = (
  selectedLetters: string[],
  selectedAnyLettersIndexes: number[],
): UseSearchPossibleWords => {
  const MAX_RESULTS_PER_SEARCH = 20
  const resultSearchIndexRef = React.useRef(0)
  const wordLengthRef = React.useRef<[ number, number ]>([ 1, 10 ])

  const [ allWords, setAllWords ] = React.useState<string[]>([])
  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])

  React.useEffect(() => {
    asyncReadFile('words').then(setAllWords)
  }, [])

  const searchPossibleWords = () => {
    const _selectedLetters = selectedAnyLettersIndexes.length
      ? [ ...selectedLetters, ...R.map(R.always(LETTER_SOAP))(selectedAnyLettersIndexes) ]
      : selectedLetters

    findPossibleWords(
      allWords,
      _selectedLetters,
      wordLengthRef.current,
      [ MAX_RESULTS_PER_SEARCH, 0 ],
    ).then(({ result, searchBreakIndex }) => {
      resultSearchIndexRef.current = searchBreakIndex
      setPossibleWords(result)
    })
  }

  const searchMorePossibleWords = () => {
    const _selectedLetters = selectedAnyLettersIndexes.length
      ? [ ...selectedLetters, ...R.map(R.always(LETTER_SOAP))(selectedAnyLettersIndexes) ]
      : selectedLetters

    findPossibleWords(
      allWords,
      _selectedLetters,
      wordLengthRef.current,
      [ MAX_RESULTS_PER_SEARCH, resultSearchIndexRef.current ],
    ).then(({ result, searchBreakIndex }) => {
      resultSearchIndexRef.current = searchBreakIndex
      setPossibleWords([ ...possibleWords, ...result ])
    })
  }

  const onLengthChange = (minMax: [ number, number ]) => {
    if (minMax.join('') !== wordLengthRef.current.join('')) {
      wordLengthRef.current = minMax
    }
  }

  const clearPossibleWords = () => {
    setPossibleWords([])
  }

  return { possibleWords, searchPossibleWords, searchMorePossibleWords, onLengthChange, clearPossibleWords }
}