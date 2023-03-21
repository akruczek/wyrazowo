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
import { COLOR } from '../core/colors/colors.constants'
import {
  ClearLettersButtonIcon, DashboardButtonsContainer, DashboardSafeArea, SearchButtonIcon,
} from './dashboard.styled'

export const Dashboard = () => {
  const modalizeRef = React.useRef<any>(null)

  const {
    letters, selectedLetters,
    handleSelectLetter, handleDeselectLetter, soapCharactersIndexes, handleClearSelectedLetters,
  } = useSelectLetter()

  const {
    possibleWords, noWordsFound, searchPossibleWords, onLengthChange, clearPossibleWords,
  } = useSearchPossibleWords(selectedLetters)

  const onSearch = () => {
    modalizeRef?.current?.open()
    setTimeout(() => {
      searchPossibleWords()
    }, 200)
  }

  return React.useMemo(() => (
    <Host>
      <DashboardSafeArea>
        <SelectedLetters {...{ selectedLetters, handleDeselectLetter }} />

        <View>
          <LettersGrid {...{ letters, handleSelectLetter }} />
          <LettersSlider onChange={onLengthChange} />

          <DashboardButtonsContainer>
            <CustomButton onPress={() => null} invisible>
              <SearchButtonIcon />
            </CustomButton>

            <CustomButton
              invisible={selectedLetters.length < 2}
              onPress={onSearch}
            >
              <SearchButtonIcon />
            </CustomButton>

            <CustomButton
              color={COLOR.FIRE_BRICK}
              invisible={!selectedLetters.length}
              onPress={handleClearSelectedLetters}
            >
              <ClearLettersButtonIcon />
            </CustomButton>
          </DashboardButtonsContainer>
        </View>

        <PossibleWordsModal
          possibleWords={possibleWords}
          modalizeRef={modalizeRef}
          onClosed={clearPossibleWords}
          soapCharactersIndexes={soapCharactersIndexes}
          noWordsFound={noWordsFound}
        />
      </DashboardSafeArea>
    </Host>
  ), [ selectedLetters, letters, possibleWords ])
}
