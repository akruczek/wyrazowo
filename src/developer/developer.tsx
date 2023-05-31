import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { Host } from 'react-native-portalize'
import { useDispatch, useSelector } from 'react-redux'
import { O } from '_otils'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaFlexContainer } from '@core/styled'
import { Header } from '@core/header/header'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { OptionItem } from '../more/components'
import { DeveloperContainer } from './developer.styled'
import { nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'
import { setNativeSearchEngineEnabledAction } from '../settings/store/settings.slice'
import { SCREEN } from '../navigation/navigation.constants'

export const Developer = () => {
  const theme = useTheme() as ThemeModel
  const dispatch = useDispatch()
  const localize = useLocalize()
  const navigation = useNavigation<any>()

  const nativeSearchEngineEnabled = useSelector(nativeSearchEngineEnabledSelector)

  const handleClearSearchHistory = () => {
    navigation.navigate(SCREEN.DEVELOPER_SEARCH_HISTORY)
  }

  const handleChangeNativeSearchEngine = (_nativeSearchEngineEnabled: boolean) =>
    dispatch(setNativeSearchEngineEnabledAction(O.toNumberFlag(_nativeSearchEngineEnabled)))

  return (
    <Host>
      <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
        <Header type="more" title={localize().settings.toUpperCase()} backButton />

        <DeveloperContainer>
          <OptionItem
            title={localize().search_history}
            icon="history"
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
