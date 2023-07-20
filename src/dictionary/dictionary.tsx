import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Template } from '@core/template/template'
import { DictionaryDefinitions, DictionaryButtons, DictionaryCustomizeRandom } from './components'
import { useDictionaryWord, useDictionaryRandomFilters } from './hooks'
import { useWordDefinitions } from '../dashboard/hooks'
import { SCREEN } from '../navigation/navigation.constants'
import { DictionaryTextInput } from './dictionary.styled'

export const Dictionary = () => {
  const localize = useLocalize()
  const navigation = useNavigation<any>()
  const customizeRandomModalizeRef = React.useRef<Modalize & any>(null)
  const { onApply, onClear, isFilterActive, filtersRef } = useDictionaryRandomFilters()

  const { state, word, isPending, wordFromDB, handlePressRandom, handleLongPressRandom, handleChange, onSearch } =
    useDictionaryWord(customizeRandomModalizeRef, filtersRef)

  const { definitions } = useWordDefinitions(wordFromDB)

  const handlePlayDictionarly = () => {
    navigation.navigate(SCREEN.DICTIONARY_DICTIONARLY)
  }

  const rightContentConfig = {
    onPress: handlePressRandom,
    onLongPress: handleLongPressRandom,
    icon: 'dice-5',
    indicator: isFilterActive,
  }

  const leftContentConfig = {
    onPress: handlePlayDictionarly,
    icon: 'gamepad-variant',
  }

  return (
    <Template type="dictionary" {...{ rightContentConfig, leftContentConfig }}>
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
    </Template>
  )
}
