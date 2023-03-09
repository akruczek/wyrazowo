import * as React from 'react'
import * as R from 'ramda'
import { findPossibleWords } from '../helpers/find-possible-words.helper'
import { LETTER_SOAP } from '../../core/letter-card/letter-card.constants'
import { asyncReadFile } from '../../core/read-file/read-file'

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

  const [ allWords, setAllWords ] = React.useState<string[]>([])
  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])
  const [ noWordsFound, setNoWordsFound ] = React.useState<boolean>(false)

  React.useEffect(() => {
    asyncReadFile('words').then(setAllWords)
  }, [])

  const searchPossibleWords = () => {
    setNoWordsFound(false)
    const _selectedLetters = selectedAnyLettersIndexes.length
      ? [ ...selectedLetters, ...R.map(R.always(LETTER_SOAP))(selectedAnyLettersIndexes) ]
      : selectedLetters

    findPossibleWords(
      allWords,
      _selectedLetters,
      wordLengthRef.current,
    ).then((result: string[]) => {
      setNoWordsFound(result?.length === 0)
      setPossibleWords(result)
    })
  }

  const ___searchMorePossibleWords = () => {
    setNoWordsFound(false)
    const _selectedLetters = selectedAnyLettersIndexes.length
      ? [ ...selectedLetters, ...R.map(R.always(LETTER_SOAP))(selectedAnyLettersIndexes) ]
      : selectedLetters

    findPossibleWords(
      allWords,
      _selectedLetters,
      wordLengthRef.current,
    ).then((result: string[]) => {
      setNoWordsFound(result?.length === 0)
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
    setNoWordsFound(false)
  }

  return { possibleWords, noWordsFound, searchPossibleWords, onLengthChange, clearPossibleWords }
}