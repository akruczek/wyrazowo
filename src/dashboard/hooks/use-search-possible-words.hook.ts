import * as React from 'react'
import * as R from 'ramda'
import { Storage } from '../../core/storage/storage'
import { STORAGE_KEY } from '../../core/storage/storage.constants'
import { SearchResultModel } from '../../core/storage/storage.models'
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
  const savedResultRef = React.useRef<SearchResultModel[]>([])

  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])
  const [ noWordsFound, setNoWordsFound ] = React.useState<boolean>(false)

  const updateResult = (index: number, savedResults: SearchResultModel[]) => {
    const newItem = { ...savedResults[index], timestamp: new Date().getTime() }
    const updatedDataToSave = [ newItem, ...savedResults.filter((_, _index: number) => _index !== index) ]
    Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify(updatedDataToSave))
  }

  const saveResult = (result: string[]) => {
    const dataToSave: SearchResultModel = {
      wordLength: wordLengthRef.current,
      timestamp: new Date().getTime(),
      selectedLetters, result,
    }

    Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([ dataToSave, ...savedResultRef.current ]))
  }

  const searchPossibleWords = React.useCallback(async () => {
    setNoWordsFound(false)

    const searchWords = () => {
      findPossibleWords(selectedLetters, wordLengthRef.current).then((result: string[]) => {
        setNoWordsFound(result?.length === 0)
        setPossibleWords(result)
        saveResult(result)
      })
    }

    const savedResults = await Storage.get<SearchResultModel[]>(STORAGE_KEY.SEARCH_RESULT)

    if (savedResults !== null) {
      savedResultRef.current = savedResults

      const _selectedLetters = [ ...selectedLetters ]
      
      const resultAlreadySavedIndex = savedResults.findIndex((savedResult: SearchResultModel) => {
        const _savedResultSelectedLetters = [ ...savedResult.selectedLetters ]

        return (
          savedResult.wordLength.join('') === wordLengthRef.current.join('') &&
          _selectedLetters.sort().join('') === _savedResultSelectedLetters.sort().join('')
        )
      })

      if (savedResults[resultAlreadySavedIndex]) {
        setNoWordsFound(savedResults[resultAlreadySavedIndex].result.length === 0)
        setPossibleWords(savedResults[resultAlreadySavedIndex].result)
        updateResult(resultAlreadySavedIndex, savedResults)
      } else {
        searchWords()
      }
    } else {
      searchWords()
    }
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