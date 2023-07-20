import * as React from 'react'
import { NativeModules } from 'react-native'
import { useDispatch } from 'react-redux'
import { clearSearchHistoryAlert } from '@core/alerts/clear-search-history-alert'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { Storage } from '@core/storage/storage'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { SearchResultModel } from '@core/storage/storage.models'
import { overwriteSearchHistoryAlert } from '@core/alerts/overwrite-search-history-alert'
import { saveSearchHistoryAlert } from '@core/alerts/save-search-history-alert'
import { Template } from '@core/template/template'
import { OptionItem } from '../../../more/components'
import { useReadSearchHistory } from '../../hooks/use-read-search-history.hook'
import { setSearchHistoryTimestampAction } from '../../../dashboard/store/dashboard.slice'

export const DeveloperSearchHistory = () => {
  const localize = useLocalize()
  const dispatch = useDispatch()

  useReadSearchHistory()

  const handleClearSearchHistory = () => {
    clearSearchHistoryAlert(localize, () => {
      Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([]))
      dispatch(setSearchHistoryTimestampAction(new Date().getTime()))
    })
  }

  const handleSaveSearchHistory = () => {
    saveSearchHistoryAlert(localize, () => {
      Storage.get<SearchResultModel[]>(STORAGE_KEY.SEARCH_RESULT).then((searchHistory: SearchResultModel[] | null) => {
        NativeModules.FSModule.saveSearchHistory(JSON.stringify(searchHistory))
      })
    })
  }

  const handleImportSearchHistory = () => {
    overwriteSearchHistoryAlert(localize, () => {
      NativeModules.FSModule.readSearchHistory()
    })
  }

  return (
    <Template type="more" title={localize().search_history.toUpperCase()} backButton>
      <OptionItem
        title={localize().clear_search_history}
        icon="trash-can-outline"
        onChange={handleClearSearchHistory}
        withPadding
      />

      <OptionItem
        title={localize().save_search_history}
        icon="content-save-move-outline"
        onChange={handleSaveSearchHistory}
        withPadding
      />

      <OptionItem
        title={localize().import_search_history}
        icon="file-import-outline"
        onChange={handleImportSearchHistory}
        withPadding
      />
    </Template>
  )
}
