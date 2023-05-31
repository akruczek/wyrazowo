import * as React from 'react'
import { NativeModules } from 'react-native'
import { useTheme } from 'styled-components/native'
import { clearSearchHistoryAlert } from '@core/alerts/clear-search-history-alert'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { Storage } from '@core/storage/storage'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Header } from '@core/header/header'
import { SearchResultModel } from '@core/storage/storage.models'
import { DeveloperContainer } from '../../developer.styled'
import { OptionItem } from '../../../more/components'

export const DeveloperSearchHistory = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()

  const handleClearSearchHistory = () => {
    clearSearchHistoryAlert(localize, () => {
      Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([]))
    })
  }

  const handleSaveSearchHistory = () => {
    Storage.get<SearchResultModel[]>(STORAGE_KEY.SEARCH_RESULT).then((searchHistory: SearchResultModel[] | null) => {
      NativeModules.FSModule.saveSearchHistory(JSON.stringify(searchHistory))
    })
  }

  const handleImportSearchHistory = () => {

  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="more" title={localize().search_history.toUpperCase()} backButton />

      <DeveloperContainer>
        <OptionItem
          title={localize().clear_search_history}
          icon="trash-can-outline"
          onChange={handleClearSearchHistory}
        />

        <OptionItem
          title={localize().save_search_history}
          icon="content-save-move-outline"
          onChange={handleSaveSearchHistory}
        />

        <OptionItem
          title={localize().import_search_history}
          icon="file-import-outline"
          onChange={handleImportSearchHistory}
        />
      </DeveloperContainer>
    </SafeAreaFlexContainer>
  )
}
