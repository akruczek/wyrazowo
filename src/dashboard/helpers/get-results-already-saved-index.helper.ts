import wrzw from 'wrzw'
import { SearchResultModel } from '@core/storage/storage.models'

export const getResultAlreadySavedIndex = (
  savedResults: SearchResultModel[],
  _selectedLetters: string[],
  wordLengthRef: React.MutableRefObject<[ number, number ]>,
) => savedResults.findIndex((savedResult: SearchResultModel) => {
  const _savedResultSelectedLetters = [ ...savedResult.selectedLetters ]

  return (
    wrzw.compareJoined(savedResult.wordLength, wordLengthRef.current) &&
    wrzw.compareJoined(_selectedLetters.sort(), _savedResultSelectedLetters.sort())
  )
})
