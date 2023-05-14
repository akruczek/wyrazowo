import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { Host } from 'react-native-portalize'
import { useDispatch, useSelector } from 'react-redux'
import { O } from '_otils'
import { SafeAreaFlexContainer } from '@core/styled'
import { Header } from '@core/header/header'
import { ThemeModel } from '@core/styled/models'
import { clearSearchHistoryAlert } from '@core/alerts/clear-seearch-history-alert'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { Storage } from '@core/storage/storage'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { OptionItem } from '../more/components'
import { DeveloperContainer } from './developer.styled'
import { nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'
import { setNativeSearchEngineEnabledAction } from 'settings/store/settings.slice'

export const Developer = () => {
  const theme = useTheme() as ThemeModel
  const dispatch = useDispatch()
  const localize = useLocalize()

  const nativeSearchEngineEnabled = useSelector(nativeSearchEngineEnabledSelector)

  const handleClearSearchHistory = () => {
    clearSearchHistoryAlert(() => {
      Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([]))
    })
  }

  const handleChangeNativeSearchEngine = (_nativeSearchEngineEnabled: boolean) =>
    dispatch(setNativeSearchEngineEnabledAction(O.toNumberFlag(_nativeSearchEngineEnabled)))

  return (
    <Host>
      <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
        <Header type="more" title={localize().settings.toUpperCase()} backButton />

        <DeveloperContainer>
          <OptionItem
            title={localize().clear_search_history}
            icon="delete"
            onChange={handleClearSearchHistory}
          />

          <OptionItem
            title={localize().native_search_engine}
            value={!!nativeSearchEngineEnabled}
            onChange={handleChangeNativeSearchEngine}
          />
        </DeveloperContainer>
      </SafeAreaFlexContainer>
    </Host>
  )
}
