import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWordDefinitions } from '../dashboard/hooks/use-word-definitions.hook'
import { useDictionaryWord } from './hooks/use-dictionary-word.hook'
import { DictionaryDefinitions } from './components/dictionary-definitions/dictionary-definitions'
import { DictionarySafeAreaContainer, DictionaryStatusBar, DictionaryTextInput } from './dictionary.styled'
import { DictionaryButtons } from './components/dictionary-buttons/dictionary-buttons'
import { DictionaryHeader } from './components/dictionary-header/dictionary-header'

export const Dictionary = () => {
  const { top: topInset } = useSafeAreaInsets()
  const { state, word, isPending, wordFromDB, handlePressRandom, handleChange, onSearch } = useDictionaryWord()
  const { definitions } = useWordDefinitions(wordFromDB)

  return (
    <DictionarySafeAreaContainer>
      <DictionaryStatusBar />
      <DictionaryHeader {...{ topInset, handlePressRandom }} />
      <DictionaryTextInput onChange={handleChange} value={word} state={state} />
      <DictionaryDefinitions {...{ isPending, wordFromDB, state, definitions }} />
      <DictionaryButtons onSearch={onSearch} />
    </DictionarySafeAreaContainer>
  )
}
