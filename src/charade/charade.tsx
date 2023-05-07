import * as React from 'react'
import { useTheme } from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SafeAreaFlexContainer } from '@core/styled'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { ThemeModel } from '@core/styled/models'
import { CustomCounter } from '@core/custom-counter/custom-counter'
import { CharadePlayground, CharadeHeader } from './components'
import {
  CharadeButtonsContainer, CharadeConfigurationContainer, CharadeStatusBar,
} from './charade.styled'

export const Charade = () => {
  const DEFAULT_COUNT = 5

  const theme = useTheme() as ThemeModel
  const { top: topInset } = useSafeAreaInsets()
  const [ isPlaying, setIsPlaying ] = React.useState(false)
  const [ count, setCount ] = React.useState(DEFAULT_COUNT)

  const handlePress = () => {
    setIsPlaying(true)
  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <CharadeStatusBar />
      <CharadeHeader {...{ isPlaying, setIsPlaying }} />

      {isPlaying ? (
        <CharadePlayground count={count} />
      ) : (
        <CharadeConfigurationContainer>
          <CustomCounter value={count} setValue={setCount} />

          <CharadeButtonsContainer {...{ topInset }}>
            <CustomButton onPress={handlePress} color={COLOR.DARK_SEA_GREEN} title="PLAY!" />
          </CharadeButtonsContainer>
        </CharadeConfigurationContainer>
      )}
    </SafeAreaFlexContainer>
  )
}
