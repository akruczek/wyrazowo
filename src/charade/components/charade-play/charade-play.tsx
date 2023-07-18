import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { Header } from '@core/header/header'
import { CharadePlayground } from '../charade-playground/charade-playground'
import { useCharadeWords } from '../../hooks'
import { useCharadeSpy } from 'charade/hooks/use-charade-spy.hook'
import { leaveGameAlert } from '@core/alerts/leave-game-alert'

export const CharadePlay = () => {
  const theme = useTheme() as ThemeModel
  const { word, allWords } = useCharadeWords()
  const [end, setEnd] = React.useState(false)

  const { onTouchEnd } = useCharadeSpy(word)

  const backButtonAlert = end ? undefined : leaveGameAlert

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="charade" onTouchEnd={onTouchEnd} backButtonAlert={backButtonAlert} backButton />
      <CharadePlayground {...{ word, allWords, setEnd }} />
    </SafeAreaFlexContainer>
  )
}
