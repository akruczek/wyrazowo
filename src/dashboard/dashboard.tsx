import * as React from 'react'
import { Host } from 'react-native-portalize'
import { View } from 'react-native'
import { useSelectLetter } from './hooks/use-select-letter.hook'
import { PossibleWordsModal } from './components/possible-words-modal/possible-words-modal'
import { LettersSlider } from '../core/letters-slider/letters-slider'
import { SelectedLetters } from './components/selected-letters/selected-letters'
import { LettersGrid } from './components/letters-grid/letters-grid'
import { CustomButton } from '../core/custom-button/custom-button'
import { useSearchPossibleWords } from './hooks/use-search-possible-words.hook'
import { DashboardSafeArea, SearchButtonIcon } from './dashboard.styled'

export const Dashboard = () => {
  const modalizeRef = React.useRef<any>(null)

  const {
    letters, selectedLetters, handleSelectLetter, handleDeselectLetter, soapCharactersIndexes,
  } = useSelectLetter()

  const {
    possibleWords, noWordsFound, searchPossibleWords, onLengthChange, clearPossibleWords,
  } = useSearchPossibleWords(selectedLetters)

  return React.useMemo(() => (
    <Host>
      <DashboardSafeArea>
        <SelectedLetters {...{ selectedLetters, handleDeselectLetter }} />

        <View>
          <LettersGrid {...{ letters, handleSelectLetter }} />
          <LettersSlider onChange={onLengthChange} />
          <CustomButton onPress={modalizeRef?.current?.open}>
            <SearchButtonIcon />
          </CustomButton>

        </View>

        <PossibleWordsModal
          possibleWords={possibleWords}
          modalizeRef={modalizeRef}
          onOpened={searchPossibleWords}
          onClosed={clearPossibleWords}
          soapCharactersIndexes={soapCharactersIndexes}
          noWordsFound={noWordsFound}
        />
      </DashboardSafeArea>
    </Host>
  ), [ selectedLetters, letters, possibleWords ])
}
