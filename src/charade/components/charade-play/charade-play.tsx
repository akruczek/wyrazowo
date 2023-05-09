import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { CharadeHeader } from '../charade-header/charade-header'
import { CharadeStatusBar } from '../../charade.styled'
import { CharadePlayground } from '../charade-playground/charade-playground'
import { getNavigationParam } from '../../../navigation/navigation.helpers'

export const CharadePlay = () => {
  const theme = useTheme() as ThemeModel
  const navigation = useNavigation()

  const word = getNavigationParam<string>('word', navigation)

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <CharadeStatusBar />
      <CharadeHeader isPlaying />
      <CharadePlayground word={word} />
    </SafeAreaFlexContainer>
  )
}
