import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useTheme } from 'styled-components/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { Header } from '@core/header/header'
import { DictionaryDefinitions, DictionaryButtons, DictionaryCustomizeRandom } from './components'
import { useDictionaryWord, useDictionaryRandomFilters } from './hooks'
import { useWordDefinitions } from '../dashboard/hooks'
import { DictionaryTextInput } from './dictionary.styled'

export const Dictionary = () => {
  const localize = useLocalize()
  const theme = useTheme() as ThemeModel
  const customizeRandomModalizeRef = React.useRef<Modalize & any>(null)
  const { onApply, onClear, isFilterActive, filtersRef } = useDictionaryRandomFilters()

  const { state, word, isPending, wordFromDB, handlePressRandom, handleLongPressRandom, handleChange, onSearch } =
    useDictionaryWord(customizeRandomModalizeRef, filtersRef)

  const { definitions } = useWordDefinitions(wordFromDB)

  const rightContentConfig = {
    onPress: handlePressRandom,
    onLongPress: handleLongPressRandom,
    icon: 'dice-5',
    indicator: isFilterActive,
  }

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="dictionary" rightContentConfig={rightContentConfig} />

      <DictionaryTextInput
        placeholder={`${localize().search_for_word}...`}
        onChange={handleChange}
        value={word}
        state={state}
      />

      <DictionaryDefinitions {...{ isPending, wordFromDB, state, definitions }} />
      <DictionaryButtons onSearch={onSearch} />
      <DictionaryCustomizeRandom
        modalizeRef={customizeRandomModalizeRef}
        {...{ onApply, onClear, isFilterActive, filtersRef }}
      />
    </SafeAreaFlexContainer>
  )
}
