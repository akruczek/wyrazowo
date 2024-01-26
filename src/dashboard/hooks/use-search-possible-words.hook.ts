import * as React from 'react'
import * as R from 'ramda'
import wrzw from 'wrzw'
import { NumberFlag } from '@core/models'
import { Storage } from '@core/storage/storage'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { SearchResultModel } from '@core/storage/storage.models'
import { NATIVE_DB_TAG } from '../../native-db/native-db.constants'
import { useNativeDBEvents } from '../../native-db/hooks/use-native-sb-events.hook'
import { findPossibleWords, updateStorageSearchResult, getResultAlreadySavedIndex } from '../helpers'

interface UseSearchPossibleWords {
  possibleWords: string[];
  noWordsFound: boolean;
  searchPossibleWords: () => void;
  onLengthChange: (minMax: [ number, number ]) => void;
  clearPossibleWords: () => void;
  lengthFilter: number | null;
  setLengthFilter: (lengthFilter: number | null) => void;
}

export const useSearchPossibleWords = (
  selectedLetters: string[],
  nativeSearchEngineEnabled: NumberFlag | null,
): UseSearchPossibleWords => {
  const selectedLettersRef = React.useRef(selectedLetters)

  const wordLengthRef = React.useRef<[ number, number ]>([ 1, 10 ])
  const savedResultRef = React.useRef<SearchResultModel[]>([])

  React.useEffect(() => {
    selectedLettersRef.current = selectedLetters
  }, [ selectedLetters ])

  const [ lengthFilter, setLengthFilter ] = React.useState<number | null>(null)
  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])
  const [ noWordsFound, setNoWordsFound ] = React.useState<boolean>(false)

  const saveResult = React.useCallback((result: string[]) => {
    const getDataToSave: () => SearchResultModel = () => ({
      wordLength: wordLengthRef.current,
      timestamp: wrzw.getTime(),
      selectedLetters: selectedLettersRef.current,
      result,
    })

    Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([ getDataToSave(), ...savedResultRef.current ]))
  }, [ selectedLetters, lengthFilter ])

  const resultsCallback = (result: string[]) => {
    setNoWordsFound(wrzw.isE(result))
    setPossibleWords(result)
    saveResult(result)
  }

  useNativeDBEvents(resultsCallback)

  const searchPossibleWords = React.useCallback(async () => {
    setNoWordsFound(false)

    const searchWords = () => {
      findPossibleWords(selectedLetters, wordLengthRef.current, nativeSearchEngineEnabled).then((result: string[]) => {
        if (!R.includes(NATIVE_DB_TAG, result)) {
          resultsCallback(result)
        }
      })
    }

    const savedResults = await Storage.get<SearchResultModel[]>(STORAGE_KEY.SEARCH_RESULT)

    if (savedResults !== null) {
      savedResultRef.current = savedResults
      const _selectedLetters = [ ...selectedLetters ]
      const resultAlreadySavedIndex = getResultAlreadySavedIndex(savedResults, _selectedLetters, wordLengthRef)

      if (savedResults[resultAlreadySavedIndex]) {
        setNoWordsFound(wrzw.isE(savedResults[resultAlreadySavedIndex].result))
        setPossibleWords(savedResults[resultAlreadySavedIndex].result)
        updateStorageSearchResult(resultAlreadySavedIndex, savedResults)
      } else {
        searchWords()
      }
    } else {
      searchWords()
    }
  }, [ selectedLetters, lengthFilter ])

  React.useEffect(() => {
    if (lengthFilter) {
      searchPossibleWords()
    }
  }, [ lengthFilter ])

  const onLengthChange = (minMax: [ number, number ]) => {
    if (!wrzw.compareJoined(minMax, wordLengthRef.current)) {
      wordLengthRef.current = minMax
    }
  }

  const clearPossibleWords = () => {
    setPossibleWords([])
    setNoWordsFound(false)
  }

  return {
    possibleWords, noWordsFound, lengthFilter,
    searchPossibleWords, onLengthChange, clearPossibleWords, setLengthFilter,
  }
}
