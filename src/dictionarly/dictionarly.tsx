import * as React from 'react'
import { useTheme } from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { CustomButton } from '@core/custom-button/custom-button'
import { SwitchButton } from '@core/switch-button/switch-button'
import { SCREEN } from '../navigation/navigation.constants'
import { DictionarlyButtonsContainer } from './dictionarly.styled'
import { allWordsByLength, longWordsByLength } from '../dashboard/helpers'

export const Dictionarly = () => {
  const [ difficulty, setDifficulty ] = React.useState<number>(0)

  const theme = useTheme() as ThemeModel
  const navigation = useNavigation<any>()
  const localize = useLocalize()
  const { top: topInset } = useSafeAreaInsets()

  const handleNavigateToDictionary = () => {
    navigation.navigate(SCREEN.DICTIONARY_DICTIONARY)
  }

  const leftContentConfig = {
    onPress: handleNavigateToDictionary,
    icon: 'book-alphabet',
  }

  const handlePlay = () => {
    const getWords = (words: string[]) => words
      .map((str: string) => str.length > 0 ? str.split('.') : null)
      .filter((elements: string[] | null) => elements !== null)
      .flat<any, number>()

    const allWords = difficulty ? getWords(longWordsByLength) : getWords(allWordsByLength)
    const word = allWords[Math.floor(Math.random() * allWords.length)]?.toUpperCase?.()
    navigation.navigate(SCREEN.DICTIONARY_PLAY, { word, difficulty })
  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="dictionary" title={localize().dictionarly} {...{ leftContentConfig }} />

      <SwitchButton
        onChange={setDifficulty}
        value={difficulty}
        labels={[ localize().easy, localize().hard ]}
        colors={[ COLOR.DARK_SEA_GREEN, COLOR.FIRE_BRICK ]}
      />

      <DictionarlyButtonsContainer topInset={topInset}>
        <CustomButton onPress={handlePlay} color={COLOR.DODGER_BLUE} title={localize().play} />
      </DictionarlyButtonsContainer>
    </SafeAreaFlexContainer>
  )
}
