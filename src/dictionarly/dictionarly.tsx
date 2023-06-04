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
import { DictionarlyButtonsContainer } from './dictionarly.styled'
import { usePlayDictionarly } from './hooks'

export const Dictionarly = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const { top: topInset } = useSafeAreaInsets()
  const { handlePlay, handleNavigateToDictionary, wordsLength, setWordsLength } = usePlayDictionarly()

  const leftContentConfig = {
    onPress: handleNavigateToDictionary,
    icon: 'book-alphabet',
  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="dictionary" title={localize().dictionarly} {...{ leftContentConfig }} />

      <SwitchButton
        onChange={setWordsLength}
        value={wordsLength}
        labels={[ localize().short, localize().long ]}
        colors={[ COLOR.DARK_SEA_GREEN, COLOR.FIRE_BRICK ]}
      />

      <DictionarlyButtonsContainer topInset={topInset}>
        <CustomButton onPress={handlePlay} color={COLOR.DODGER_BLUE} title={localize().play} />
      </DictionarlyButtonsContainer>
    </SafeAreaFlexContainer>
  )
}
