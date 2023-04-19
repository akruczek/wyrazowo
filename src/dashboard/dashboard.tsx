import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { LettersSlider } from '@core/letters-slider/letters-slider'
import { useRehydrateStore } from '@core/hooks/use-rehydrate-store.hook'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { useIsPremium } from '@core/hooks/use-is-premium.hook'
import { LetterSliderDefaultValues } from '@core/letters-slider/models'
import { nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'
import { SoapLetterModal } from './components/soap-letter-modal/soap-letter-modal'
import { useSelectLetter } from './hooks/use-select-letter.hook'
import { PossibleWordsModal } from './components/possible-words-modal/possible-words-modal'
import { SelectedLetters } from './components/selected-letters/selected-letters'
import { LettersGrid } from './components/letters-grid/letters-grid'
import { useSearchPossibleWords } from './hooks/use-search-possible-words.hook'
import { useSoapModal } from './hooks/use-soap-modal.hook'
import { useSearchHistory } from './hooks/use-search-history-modal.hook'
import { SearchHistoryModal } from './components/search-history-modal/search-history-modal'
import { DashboardHost, DashboardSafeArea, DashboardStatusBar } from './dashboard.styled'
import { DashboardButtons } from './components/dashboard-buttons/dashboard-buttons'
import {
  setHapticFeedbackEnabledAction, setNativeSearchEngineEnabledAction, setPremiumAction,
} from '../settings/store/settings.slice'

export const Dashboard = () => {
  const modalizeRef = React.useRef<Modalize>(null)

  useRehydrateStore(STORAGE_KEY.HAPTIC_FEEDBACK_ENABLED, setHapticFeedbackEnabledAction)
  useRehydrateStore(STORAGE_KEY.NATIVE_SEARCH_ENGINE_ENABLED, setNativeSearchEngineEnabledAction)
  useRehydrateStore(STORAGE_KEY.PREMIUM, setPremiumAction)

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

  const isPremium = useIsPremium()
  const sliderDefaultValues: LetterSliderDefaultValues = [ 2, 8, 2, 14, isPremium ? 14 : 9 ]

  return React.useMemo(() => (
    <DashboardHost>
      <DashboardSafeArea>
        <DashboardStatusBar />
        <SelectedLetters {...{ selectedLetters, handleDeselectLetter }} />

        <View>
          <LettersGrid {...{ letters, handleSelectLetter, handleLongPress }} />
          <LettersSlider onChange={onLengthChange} defaultValues={sliderDefaultValues} />
          <DashboardButtons
            {...{ openHistoryModal, historyAvailable, selectedLetters, onSearch, handleClearSelectedLetters }}
          />
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
