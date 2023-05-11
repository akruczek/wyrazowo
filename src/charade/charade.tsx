import * as React from 'react'
import { useTheme } from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SCREEN } from 'navigation/navigation.constants'
import { useNavigation } from '@react-navigation/native'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { ThemeModel } from '@core/styled/models'
import { CustomCounter } from '@core/custom-counter/custom-counter'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { getRandomWords } from '../dictionary/helpers'
import { allWordsByLength } from '../dashboard/helpers'
import { CharadeButtonsContainer, CharadeConfigurationContainer } from './charade.styled'

export const Charade = () => {
  const DEFAULT_COUNT = 5

  const localize = useLocalize()
  const theme = useTheme() as ThemeModel
  const navigation = useNavigation<any>()

  const { top: topInset } = useSafeAreaInsets()
  const [ count, setCount ] = React.useState(DEFAULT_COUNT)

  const handlePress = () => {
    const getWords = (words: string[]) => getRandomWords(words, (word: string) => word.length === count)
    const allWords = getWords(allWordsByLength)
    const word = allWords[Math.floor(Math.random() * allWords.length)]?.toUpperCase?.()
    navigation.navigate(SCREEN.CHARADE_PLAY, { word, allWords })
  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="charade" />

      <CharadeConfigurationContainer>
        <CustomCounter value={count} range={[ 3, 9 ]} setValue={setCount} />

        <CharadeButtonsContainer {...{ topInset }}>
          <CustomButton onPress={handlePress} color={COLOR.DARK_SEA_GREEN} title={localize().play} />
        </CharadeButtonsContainer>
      </CharadeConfigurationContainer>
    </SafeAreaFlexContainer>
  )
}
