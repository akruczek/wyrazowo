import * as React from 'react'
import { useTheme } from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { CustomButton } from '@core/custom-button/custom-button'
import { SwitchButton } from '@core/switch-button/switch-button'
import { usePlayDictionarly } from './hooks'
import {
  DictionarlyButtonsContainer, DictionarlyDifficultyIcon, DictionarlySeparator, DictionarlyWordsLengthIcon,
} from './dictionarly.styled'

export const Dictionarly = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const { top: topInset } = useSafeAreaInsets()
  const { handlePlay, handleNavigateToDictionary, wordsLength, setWordsLength, difficulty, setDifficulty } =
    usePlayDictionarly()

  const leftContentConfig = {
    onPress: handleNavigateToDictionary,
    icon: 'book-alphabet',
  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="dictionary" title={localize().dictionarly} {...{ leftContentConfig }} />

      <DictionarlyWordsLengthIcon />
      <SwitchButton
        onChange={setWordsLength}
        value={wordsLength}
        labels={[ localize().short, localize().long ]}
        colors={[ COLOR.DARK_SEA_GREEN, COLOR.FIRE_BRICK ]}
      />

      <DictionarlySeparator />

      <DictionarlyDifficultyIcon />
      <SwitchButton
        onChange={setDifficulty}
        value={difficulty}
        elementsInRowCount={2}
        labels={[ localize().easy, localize().normal, localize().hard, localize().very_hard ]}
        colors={[ COLOR.DARK_SEA_GREEN, COLOR.DODGER_BLUE, COLOR.GOLD, COLOR.FIRE_BRICK ]}
      />

      <DictionarlyButtonsContainer topInset={topInset}>
        <CustomButton onPress={handlePlay} color={COLOR.DODGER_BLUE} title={localize().play} />
      </DictionarlyButtonsContainer>
    </SafeAreaFlexContainer>
  )
}
