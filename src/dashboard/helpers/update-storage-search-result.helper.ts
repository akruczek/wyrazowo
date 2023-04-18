import _o from '../../core/_otils'
import { Storage } from '../../core/storage/storage'
import { STORAGE_KEY } from '../../core/storage/storage.constants'
import { SearchResultModel } from '../../core/storage/storage.models'

export const updateStorageSearchResult = (index: number, savedResults: SearchResultModel[]) => {
  const newItem = {
    ...savedResults[index],
    timestamp: _o().getTime(),
  }

  const filteredByIndex = _o(savedResults).filterByIndex(index)
  const updatedDataToSave = _o(filteredByIndex).appendFirst(newItem)

  Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify(updatedDataToSave))
}
