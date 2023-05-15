import * as React from 'react'
import { useTheme } from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { ThemeModel } from '@core/styled/models'
import { CustomCounter } from '@core/custom-counter/custom-counter'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { CharadeButtonsContainer, CharadeConfigurationContainer } from './charade.styled'
import { useCharadePlay } from './hooks'

export const Charade = () => {
  const localize = useLocalize()
  const theme = useTheme() as ThemeModel
  const { top: topInset } = useSafeAreaInsets()
  const { handlePlayCharade, count, setCount } = useCharadePlay()

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="charade" />

      <CharadeConfigurationContainer>
        <CustomCounter value={count} range={[ 3, 9 ]} setValue={setCount} />

        <CharadeButtonsContainer {...{ topInset }}>
          <CustomButton onPress={handlePlayCharade} color={COLOR.DARK_SEA_GREEN} title={localize().play} />
        </CharadeButtonsContainer>
      </CharadeConfigurationContainer>
    </SafeAreaFlexContainer>
  )
}
