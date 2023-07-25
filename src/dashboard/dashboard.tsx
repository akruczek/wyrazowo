import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { LettersSlider } from '@core/letters-slider/letters-slider'
import { useIsPremium } from '@core/hooks/use-is-premium.hook'
import { LetterSliderDefaultValues } from '@core/letters-slider/models'
import { Template } from '@core/template/template'
import { isForceIndexAvailable } from './helpers'
import { SelectedLetters, LettersGrid, DashboardButtonsAndModals } from './components'
import { useSelectLetter, useSearchPossibleWords, useSoapModal, useDashboardRehydration } from './hooks'
import { nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'
import { SCREEN } from '../navigation/navigation.constants'
import { DashboardBottomContent } from './dashboard.styled'

export const Dashboard = () => {
  useDashboardRehydration()
  const navigation = useNavigation<any>()
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
  const sliderDefaultValues: LetterSliderDefaultValues = [ 2, 8, 2, 15, isPremium ? 15 : 9 ]

  const onLongPressSelectedLetter = (index: number) => () => {
    if (isForceIndexAvailable(selectedLetters[index])) {
      forceIndexModalizeRef?.current?.open?.()
      forceIndexLetterIndexRef.current = index
    }
  }

  const handleSwitchToPlayground = () => {
    navigation.navigate(SCREEN.DASHBOARD_PLAYGROUND)
  }

  const leftContentConfig = {
    onPress: handleSwitchToPlayground,
    icon: 'checkerboard',
  }

  return React.useMemo(() => (
    <Template type="dashboard" leftContentConfig={leftContentConfig}>
      <SelectedLetters {...{
        selectedLetters, onLongPressSelectedLetter, handleDeselectLetter, handleSelectLetter, handleLongPress }}
      />

      <DashboardBottomContent>
        <LettersGrid {...{ handleSelectLetter, selectedLetters, handleLongPress }} />
        <LettersSlider onChange={onLengthChange} defaultValues={sliderDefaultValues} />
        <DashboardButtonsAndModals {...{
          selectedLetters, handleClearSelectedLetters, soapCharactersIndexes, handleForceIndex, onSelectSoapLetters,
          soapModalizeRef, noWordsFound, searchPossibleWords, clearPossibleWords, forceIndexLetterIndexRef,
          letters, possibleWords, forceIndexModalizeRef }}
        />
      </DashboardBottomContent>
    </Template>
  ), [ selectedLetters, letters, possibleWords ])
}
