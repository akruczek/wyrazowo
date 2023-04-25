import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Modalize } from 'react-native-modalize'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { SafeAreaFlexContainer } from '@core/styled'
import { COLOR } from '@core/colors/colors.constants'
import { DictionaryDefinitions, DictionaryButtons, DictionaryHeader, DictionaryCustomizeRandom } from './components'
import { useDictionaryWord, useDictionaryRandomFilters } from './hooks'
import { useWordDefinitions } from '../dashboard/hooks'
import { DictionaryStatusBar, DictionaryTextInput } from './dictionary.styled'

export const Dictionary = () => {
  const localize = useLocalize()
  const customizeRandomModalizeRef = React.useRef<Modalize & any>(null)
  const { top: topInset } = useSafeAreaInsets()
  const { onApply, onClear, isFilterActive, filtersRef } = useDictionaryRandomFilters()

  const { state, word, isPending, wordFromDB, handlePressRandom, handleLongPressRandom, handleChange, onSearch } =
    useDictionaryWord(customizeRandomModalizeRef, filtersRef)

  const { definitions } = useWordDefinitions(wordFromDB)

  return (
    <SafeAreaFlexContainer backgroundColor={COLOR.WHITE}>
      <DictionaryStatusBar />
      <DictionaryHeader {...{ topInset, handlePressRandom, isFilterActive, handleLongPressRandom }} />
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
