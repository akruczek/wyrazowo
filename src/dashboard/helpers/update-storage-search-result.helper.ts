import wrzw from 'wrzw'
import { Storage } from '@core/storage/storage'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { SearchResultModel } from '@core/storage/storage.models'

export const updateStorageSearchResult = (index: number, savedResults: SearchResultModel[]) => {
  const newItem = {
    ...savedResults[index],
    timestamp: wrzw.getTime(),
  }

  const filteredByIndex = savedResults.filter((_, _index: number) => _index !== index)
  const updatedDataToSave = [ newItem, ...filteredByIndex ]

  Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify(updatedDataToSave))
}
