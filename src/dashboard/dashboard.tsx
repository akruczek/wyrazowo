import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'
import { SoapLetterModal } from './components/soap-letter-modal/soap-letter-modal'
import { useSelectLetter } from './hooks/use-select-letter.hook'
import { PossibleWordsModal } from './components/possible-words-modal/possible-words-modal'
import { LettersSlider } from '../core/letters-slider/letters-slider'
import { SelectedLetters } from './components/selected-letters/selected-letters'
import { LettersGrid } from './components/letters-grid/letters-grid'
import { CustomButton } from '../core/custom-button/custom-button'
import { useSearchPossibleWords } from './hooks/use-search-possible-words.hook'
import { COLOR } from '../core/colors/colors.constants'
import { useSoapModal } from './hooks/use-soap-modal.hook'
import { useSearchHistory } from './hooks/use-search-history-modal.hook'
import { SearchHistoryModal } from './components/search-history-modal/search-history-modal'
import { useRehydrateStore } from '../core/hooks/use-rehydrate-store.hook'
import { STORAGE_KEY } from '../core/storage/storage.constants'
import {
  setHapticFeedbackEnabledAction, setNativeSearchEngineEnabledAction,
} from '../settings/store/settings.slice'
import {
  ClearLettersButtonIcon, DashboardButtonsContainer, DashboardHost, DashboardSafeArea,
  DashboardStatusBar, HistoryButtonIcon, SearchButtonIcon,
} from './dashboard.styled'

export const Dashboard = () => {
  const modalizeRef = React.useRef<Modalize>(null)

  useRehydrateStore(STORAGE_KEY.HAPTIC_FEEDBACK_ENABLED, setHapticFeedbackEnabledAction)
  useRehydrateStore(STORAGE_KEY.NATIVE_SEARCH_ENGINE_ENABLED, setNativeSearchEngineEnabledAction)

  const nativeSearchEngineEnabled = useSelector(nativeSearchEngineEnabledSelector)

  const {
    letters, selectedLetters,
    handleSelectLetter, handleDeselectLetter, soapCharactersIndexes, handleClearSelectedLetters,
  } = useSelectLetter()

  const { handleLongPress, onSelectSoapLetters, soapModalizeRef } = useSoapModal(handleSelectLetter)
  const { historyModalizeRef, openHistoryModal, historyAvailable, setHistoryAvailable } = useSearchHistory()

  const {
    possibleWords, noWordsFound, searchPossibleWords, onLengthChange, clearPossibleWords,
  } = useSearchPossibleWords(selectedLetters, nativeSearchEngineEnabled)

  const onSearch = () => {
    modalizeRef?.current?.open()
    setTimeout(() => {
      setHistoryAvailable(true)
      searchPossibleWords()
    }, 200)
  }

  return React.useMemo(() => (
    <DashboardHost>
      <DashboardSafeArea>
        <DashboardStatusBar />
        <SelectedLetters {...{ selectedLetters, handleDeselectLetter }} />

        <View>
          <LettersGrid {...{ letters, handleSelectLetter, handleLongPress }} />
          <LettersSlider onChange={onLengthChange} />

          <DashboardButtonsContainer>
            <CustomButton
              color={COLOR.DARK_SEA_GREEN}
              onPress={openHistoryModal}
              invisible={!historyAvailable}
              withHaptic
            >
              <HistoryButtonIcon />
            </CustomButton>

            <CustomButton
              invisible={selectedLetters.length < 2}
              onPress={onSearch}
              withHaptic
            >
              <SearchButtonIcon />
            </CustomButton>

            <CustomButton
              color={COLOR.FIRE_BRICK}
              invisible={!selectedLetters.length}
              onPress={handleClearSelectedLetters}
              withHaptic
            >
              <ClearLettersButtonIcon />
            </CustomButton>
          </DashboardButtonsContainer>
        </View>

        <SearchHistoryModal
          historyModalizeRef={historyModalizeRef}
          soapCharactersIndexes={soapCharactersIndexes}
          historyAvailable={historyAvailable}
          setHistoryAvailable={setHistoryAvailable}
        />

        <PossibleWordsModal
          possibleWords={possibleWords}
          modalizeRef={modalizeRef}
          onClosed={clearPossibleWords}
          soapCharactersIndexes={soapCharactersIndexes}
          noWordsFound={noWordsFound}
        />

        <SoapLetterModal
          letters={letters}
          modalizeRef={soapModalizeRef}
          onSelectSoapLetters={onSelectSoapLetters}
        />
      </DashboardSafeArea>
    </DashboardHost>
  ), [ selectedLetters, letters, possibleWords ])
}
