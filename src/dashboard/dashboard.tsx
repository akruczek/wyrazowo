import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { LettersSlider } from '@core/letters-slider/letters-slider'
import { useIsPremium } from '@core/hooks/use-is-premium.hook'
import { LetterSliderDefaultValues } from '@core/letters-slider/models'
import { isForceIndexAvailable } from './helpers'
import { SelectedLetters, LettersGrid, DashboardButtonsAndModals } from './components'
import { useSelectLetter, useSearchPossibleWords, useSoapModal, useDashboardRehydration } from './hooks'
import { DashboardHost, DashboardSafeArea, DashboardStatusBar } from './dashboard.styled'
import { nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'

export const Dashboard = () => {
  useDashboardRehydration()
  const forceIndexModalizeRef = React.useRef<Modalize>(null)
  const forceIndexLetterIndexRef = React.useRef<null | number>(null)
  const nativeSearchEngineEnabled = useSelector(nativeSearchEngineEnabledSelector)

  const {
    letters, selectedLetters,
    handleSelectLetter, handleDeselectLetter, handleClearSelectedLetters, soapCharactersIndexes, handleForceIndex,
  } = useSelectLetter()

  const { handleLongPress, onSelectSoapLetters, soapModalizeRef } = useSoapModal(handleSelectLetter)

  const {
    possibleWords, onLengthChange, noWordsFound, searchPossibleWords, clearPossibleWords,
  } = useSearchPossibleWords(selectedLetters, nativeSearchEngineEnabled)

  const isPremium = useIsPremium()
  const sliderDefaultValues: LetterSliderDefaultValues = [ 2, 8, 2, 14, isPremium ? 14 : 9 ]

  const onLongPressSelectedLetter = (index: number) => () => {
    if (isForceIndexAvailable(selectedLetters[index])) {
      forceIndexModalizeRef?.current?.open?.()
      forceIndexLetterIndexRef.current = index
    }
  }

  return React.useMemo(() => (
    <DashboardHost>
      <DashboardSafeArea>
        <DashboardStatusBar />
        <SelectedLetters {...{ selectedLetters, onLongPressSelectedLetter, handleDeselectLetter }} />

        <View>
          <LettersGrid {...{ letters, handleSelectLetter, handleLongPress }} />
          <LettersSlider onChange={onLengthChange} defaultValues={sliderDefaultValues} />
          <DashboardButtonsAndModals {...{
            selectedLetters, handleClearSelectedLetters, soapCharactersIndexes, handleForceIndex, onSelectSoapLetters,
            soapModalizeRef, noWordsFound, searchPossibleWords, clearPossibleWords, forceIndexLetterIndexRef,
            letters, possibleWords, forceIndexModalizeRef }}
          />
        </View>
      </DashboardSafeArea>
    </DashboardHost>
  ), [ selectedLetters, letters, possibleWords ])
}
