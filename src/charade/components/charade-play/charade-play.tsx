import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { Header } from '@core/header/header'
import { CharadePlayground } from '../charade-playground/charade-playground'
import { useCharadeWords } from '../../hooks'
import { useCharadeSpy } from 'charade/hooks/use-charade-spy.hook'

export const CharadePlay = () => {
  const theme = useTheme() as ThemeModel
  const { word, allWords } = useCharadeWords()

  const { onTouchEnd } = useCharadeSpy(word)

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="charade" onTouchEnd={onTouchEnd} backButton />
      <CharadePlayground {...{ word, allWords }} />
    </SafeAreaFlexContainer>
  )
}
