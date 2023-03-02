import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Host } from 'react-native-portalize'
import { useSelectLetter } from './hooks/use-select-letter.hook'
import { PossibleWordsModal } from './components/possible-words-modal/possible-words-modal'
import { LettersSlider } from '../core/letters-slider/letters-slider'
import { SelectedLetters } from './components/selected-letters/selected-letters'
import { LettersGrid } from './components/letters-grid/letters-grid'
import { CustomButton } from '../core/custom-button/custom-button'
import { useSearchPossibleWords } from './hooks/use-search-possible-words.hook'

export const Dashboard = () => {
  const modalizeRef = React.useRef<any>(null)

  const {
    letters, selectedLetters, selectedAnyLettersIndexes,
    handleSelectLetter, handleDeselectLetter, isAnyLetterSelected,
  } = useSelectLetter()

  const {
    possibleWords, searchPossibleWords, searchMorePossibleWords, onLengthChange, clearPossibleWords,
  } = useSearchPossibleWords(selectedLetters, selectedAnyLettersIndexes)

  return React.useMemo(() => (
    <Host>
      <SafeAreaView>
        <SelectedLetters {...{ selectedLetters, handleDeselectLetter }} />
        <LettersGrid {...{ letters, handleSelectLetter, isAnyLetterSelected }} />
        <LettersSlider onChange={onLengthChange} />
        <CustomButton title="CHECK" onPress={modalizeRef?.current?.open} />

        <PossibleWordsModal
          possibleWords={possibleWords}
          modalizeRef={modalizeRef}
          onOpened={searchPossibleWords}
          onLoadMore={searchMorePossibleWords}
          onClosed={clearPossibleWords}
        />
      </SafeAreaView>
    </Host>
  ), [ selectedLetters, letters, possibleWords ])
}
