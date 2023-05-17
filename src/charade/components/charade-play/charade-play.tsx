import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { Header } from '@core/header/header'
import { CharadePlayground } from '../charade-playground/charade-playground'
import { useCharadeWords } from '../../hooks'

export const CharadePlay = () => {
  const theme = useTheme() as ThemeModel
  const { word, allWords } = useCharadeWords()

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="charade" backButton />
      <CharadePlayground {...{ word, allWords }} />
    </SafeAreaFlexContainer>
  )
}
