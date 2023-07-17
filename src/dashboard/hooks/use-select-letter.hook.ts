import * as React from 'react'
import * as R from 'ramda'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import _o from '_otils'
import { ALL_LETTERS_SORTED, LETTER_INDEX_SEPARATOR, LETTER_SOAP } from '@core/letter-card/letter-card.constants'
import { goPremiumAlert } from '@core/alerts/go-premium-alert'
import { useHapticFeedback } from '@core/hooks/use-haptic-feedback.hook'
import { useIsPremium } from '@core/hooks/use-is-premium.hook'
import { SCREEN } from '../../navigation/navigation.constants'
import { setSelectedLettersAction } from '../store/dashboard.slice'
import { getSoapCharactersIndexes } from '../helpers'
import { LayoutAnimation } from 'react-native'

interface UseSelectLetter {
  letters: string[];
  selectedLetters: string[];
  handleSelectLetter: (letter: string) => void;
  handleDeselectLetter: (index: number) => () => void;
  handleForceIndex: (letterIndex: number, forceIndex: number) => void;
  soapCharactersIndexes: (letter: string) => number[];
  handleClearSelectedLetters: () => void;
}

export const useSelectLetter = (): UseSelectLetter => {
  const MAX_SELECTED_LETTERS = 14

  const isPremium = useIsPremium()
  const dispatch = useDispatch()

  const MAX_NO_PREMIUM_SELECTED_LETTERS = isPremium ? 14 : 9
  const navigation = useNavigation<any>()

  const [ selectedLetters, updateSelectedLetters ] = React.useState<string[]>([])

  const { triggerHaptic } = useHapticFeedback()

  const hasMaxSelectedLetters = selectedLetters?.length < MAX_SELECTED_LETTERS
  const hasMaxNoPremiumSelectedLetters = selectedLetters?.length > MAX_NO_PREMIUM_SELECTED_LETTERS

  const letters = [ ...ALL_LETTERS_SORTED, LETTER_SOAP, LETTER_SOAP, LETTER_SOAP ]

  React.useEffect(() => {
    dispatch(setSelectedLettersAction(selectedLetters))
  }, [ selectedLetters ])

  const handleSelectLetter = (letter: string) => {
    LayoutAnimation.easeInEaseOut()
    triggerHaptic()

    if (hasMaxNoPremiumSelectedLetters) {
      goPremiumAlert(() => {
        navigation.navigate(SCREEN.MORE)
      })
    } else if (hasMaxSelectedLetters) {
      updateSelectedLetters(R.append(letter, selectedLetters))
    }
  }

  const handleForceIndex = (letterIndex: number, forceIndex: number) => {
    if (selectedLetters[letterIndex].includes(LETTER_INDEX_SEPARATOR)) {
      updateSelectedLetters(
        R.update(letterIndex, `${selectedLetters[letterIndex].split(LETTER_INDEX_SEPARATOR)[0]}!${forceIndex}`),
      )
    } else {
      updateSelectedLetters(
        R.update(letterIndex, `${selectedLetters[letterIndex]}!${forceIndex}`),
      )
    }
  }

  const handleDeselectLetter = (index: number) => () => {
    triggerHaptic()
    updateSelectedLetters(R.remove(index, 1, selectedLetters))
  }

  const handleClearSelectedLetters = () => {
    updateSelectedLetters([])
  }

  const soapCharactersIndexes = React.useCallback((word: string, _selectedLetters?: string[]) =>
    getSoapCharactersIndexes(word, _selectedLetters ?? selectedLetters),
  [ selectedLetters ])

  return {
    letters, selectedLetters,
    handleSelectLetter, handleDeselectLetter, soapCharactersIndexes, handleClearSelectedLetters, handleForceIndex,
  }
}
