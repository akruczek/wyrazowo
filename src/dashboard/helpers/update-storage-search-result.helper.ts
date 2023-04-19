import { O } from '../../core/_otils'
import { Storage } from '../../core/storage/storage'
import { STORAGE_KEY } from '../../core/storage/storage.constants'
import { SearchResultModel } from '../../core/storage/storage.models'

export const updateStorageSearchResult = (index: number, savedResults: SearchResultModel[]) => {
  const newItem = {
    ...savedResults[index],
    timestamp: O.getTime(),
  }

  const filteredByIndex = O.filterByIndex(index, savedResults)
  const updatedDataToSave = O.appendFirst(newItem, filteredByIndex)

  Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify(updatedDataToSave))
}
