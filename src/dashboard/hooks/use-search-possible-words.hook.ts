import * as React from 'react'
import _o from '../../core/_otils'
import { Storage } from '../../core/storage/storage'
import { STORAGE_KEY } from '../../core/storage/storage.constants'
import { SearchResultModel } from '../../core/storage/storage.models'
import { findPossibleWords } from '../helpers/find-possible-words.helper'
import { NATIVE_DB_TAG } from '../../native-db/native-db.constants'
import { useNativeDBEvents } from '../../native-db/hooks/use-native-sb-events.hook'
import { updateStorageSearchResult } from '../helpers/update-storage-search-result.helper'

interface UseSearchPossibleWords {
  possibleWords: string[];
  noWordsFound: boolean;
  searchPossibleWords: () => void;
  onLengthChange: (minMax: [ number, number ]) => void;
  clearPossibleWords: () => void;
}

export const useSearchPossibleWords = (
  selectedLetters: string[],
  nativeSearchEngineEnabled: boolean | null,
): UseSearchPossibleWords => {
  const selectedLettersRef = React.useRef(selectedLetters)

  const wordLengthRef = React.useRef<[ number, number ]>([ 1, 10 ])
  const savedResultRef = React.useRef<SearchResultModel[]>([])

  React.useEffect(() => {
    selectedLettersRef.current = selectedLetters
  }, [ selectedLetters ])

  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])
  const [ noWordsFound, setNoWordsFound ] = React.useState<boolean>(false)

  const saveResult = React.useCallback((result: string[]) => {
    const getDataToSave: () => SearchResultModel = () => ({
      wordLength: wordLengthRef.current,
      timestamp: _o().getTime(),
      selectedLetters: selectedLettersRef.current,
      result,
    })

    Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify(_o(savedResultRef.current).appendFirst(getDataToSave())))
  }, [ selectedLetters ])

  const resultsCallback = (result: string[]) => {
    setNoWordsFound(_o(result).isE)
    setPossibleWords(result)
    saveResult(result)
  }

  useNativeDBEvents(resultsCallback)

  const searchPossibleWords = React.useCallback(async () => {
    setNoWordsFound(false)

    const searchWords = () => {
      findPossibleWords(selectedLetters, wordLengthRef.current, nativeSearchEngineEnabled).then((result: string[]) => {
        if (!_o(result).incl(NATIVE_DB_TAG)) {
          resultsCallback(result)
        }
      })
    }

    const savedResults = await Storage.get<SearchResultModel[]>(STORAGE_KEY.SEARCH_RESULT)

    if (savedResults !== null) {
      savedResultRef.current = savedResults

      const _selectedLetters = [ ...selectedLetters ]
      
      const resultAlreadySavedIndex = savedResults.findIndex((savedResult: SearchResultModel) => {
        const _savedResultSelectedLetters = [ ...savedResult.selectedLetters ]

        return (
          _o(wordLengthRef.current).compareJoined(savedResult.wordLength) &&
          _o(_savedResultSelectedLetters.sort()).compareJoined(_selectedLetters.sort())
        )
      })

      if (savedResults[resultAlreadySavedIndex]) {
        setNoWordsFound(_o(savedResults[resultAlreadySavedIndex].result).isE)
        setPossibleWords(savedResults[resultAlreadySavedIndex].result)
        updateStorageSearchResult(resultAlreadySavedIndex, savedResults)
      } else {
        searchWords()
      }
    } else {
      searchWords()
    }
  }, [ selectedLetters ])

  const onLengthChange = (minMax: [ number, number ]) => {
    if (!_o(wordLengthRef.current).compareJoined(minMax)) {
      wordLengthRef.current = minMax
    }
  }

  const clearPossibleWords = () => {
    setPossibleWords([])
    setNoWordsFound(false)
  }

  return { possibleWords, noWordsFound, searchPossibleWords, onLengthChange, clearPossibleWords }
}
