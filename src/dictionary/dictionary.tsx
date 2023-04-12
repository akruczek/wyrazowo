import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Modalize } from 'react-native-modalize'
import { useWordDefinitions } from '../dashboard/hooks/use-word-definitions.hook'
import { useDictionaryWord } from './hooks/use-dictionary-word.hook'
import { DictionaryDefinitions } from './components/dictionary-definitions/dictionary-definitions'
import { DictionarySafeAreaContainer, DictionaryStatusBar, DictionaryTextInput } from './dictionary.styled'
import { DictionaryButtons } from './components/dictionary-buttons/dictionary-buttons'
import { DictionaryHeader } from './components/dictionary-header/dictionary-header'
import { DictionaryCustomizeRandom } from './components/dictionary-customize-random/dictionary-customize-random'
import { useDictionaryRandomFilters } from './hooks/use-dictionary-random-filters.hook'
import { useLocalize } from '../core/hooks/use-localize.hook'

export const Dictionary = () => {
  const localize = useLocalize()

  const customizeRandomModalizeRef = React.useRef<Modalize & any>(null)

  const { top: topInset } = useSafeAreaInsets()

  const { onApply, onClear, isFilterActive, filtersRef } = useDictionaryRandomFilters()

  const { state, word, isPending, wordFromDB, handlePressRandom, handleLongPressRandom, handleChange, onSearch } =
    useDictionaryWord(customizeRandomModalizeRef, filtersRef)

  const { definitions } = useWordDefinitions(wordFromDB)

  return (
    <DictionarySafeAreaContainer>
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
    </DictionarySafeAreaContainer>
  )
}
