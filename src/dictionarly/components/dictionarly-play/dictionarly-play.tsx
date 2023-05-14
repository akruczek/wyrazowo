import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { ThemeModel } from '@core/styled/models'
import { getNavigationParam } from '../../../navigation/navigation.helpers'

export const DictionarlyPlay = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const navigation = useNavigation()

  const word = getNavigationParam<string>('word', navigation)

  console.log('WORD -> ', word)

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="dictionary" title={localize().dictionarly} backButton />
    </SafeAreaFlexContainer>
  )
}
