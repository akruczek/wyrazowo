import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { Header } from '@core/header/header'
import { CharadePlayground } from '../charade-playground/charade-playground'
import { getNavigationParam } from '../../../navigation/navigation.helpers'

export const CharadePlay = () => {
  const theme = useTheme() as ThemeModel
  const navigation = useNavigation()

  const word = getNavigationParam<string>('word', navigation)
  const allWords = getNavigationParam<string[]>('allWords', navigation)

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="charade" backButton />
      <CharadePlayground {...{ word, allWords }} />
    </SafeAreaFlexContainer>
  )
}
