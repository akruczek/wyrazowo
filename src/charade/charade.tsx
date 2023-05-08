import * as React from 'react'
import { useTheme } from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SafeAreaFlexContainer } from '@core/styled'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { ThemeModel } from '@core/styled/models'
import { CustomCounter } from '@core/custom-counter/custom-counter'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { CharadePlayground, CharadeHeader } from './components'
import { getRandomWords } from '../dictionary/helpers'
import { allWordsByLength } from '../dashboard/helpers'
import {
  CharadeButtonsContainer, CharadeConfigurationContainer, CharadeStatusBar,
} from './charade.styled'

export const Charade = () => {
  const DEFAULT_COUNT = 5

  const localize = useLocalize()
  const theme = useTheme() as ThemeModel
  const { top: topInset } = useSafeAreaInsets()
  const [ isPlaying, setIsPlaying ] = React.useState(false)
  const [ count, setCount ] = React.useState(DEFAULT_COUNT)
  const [ word, setWord ] = React.useState('')

  const handlePress = () => {
    const getWords = (words: string[]) => getRandomWords(words, (word: string) => word.length === count)
    const allWords = getWords(allWordsByLength)
    const word = allWords[Math.floor(Math.random() * allWords.length)]

    setWord(word.toUpperCase())
    setIsPlaying(true)
  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <CharadeStatusBar />
      <CharadeHeader {...{ isPlaying, setIsPlaying }} />

      {isPlaying ? (
        <CharadePlayground word={word} />
      ) : (
        <CharadeConfigurationContainer>
          <CustomCounter value={count} range={[ 3, 9 ]} setValue={setCount} />

          <CharadeButtonsContainer {...{ topInset }}>
            <CustomButton onPress={handlePress} color={COLOR.DARK_SEA_GREEN} title={localize().play} />
          </CharadeButtonsContainer>
        </CharadeConfigurationContainer>
      )}
    </SafeAreaFlexContainer>
  )
}
