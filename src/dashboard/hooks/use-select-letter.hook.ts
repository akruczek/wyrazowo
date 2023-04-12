import * as React from 'react'
import * as R from 'ramda'
import { ALL_LETTERS_SORTED, LETTER_SOAP } from '../../core/letter-card/letter-card.constants'
import { goPremiumAlert } from '../../core/alerts/go-premium-alert'
import { useHapticFeedback } from '../../core/hooks/use-haptic-feedback.hook'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '../../navigation/navigation.constants'
import { useIsPremium } from '../../core/hooks/use-is-premium.hook'
import { setSelectedLettersAction } from '../store/dashboard.slice'
import { useDispatch } from 'react-redux'

interface UseSelectLetter {
  letters: string[];
  selectedLetters: string[];
  handleSelectLetter: (letter: string) => void;
  handleDeselectLetter: (index: number) => () => void;
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
    triggerHaptic()

    if (hasMaxNoPremiumSelectedLetters) {
      goPremiumAlert(() => {
        navigation.navigate(SCREEN.MORE)
      })
    } else if (hasMaxSelectedLetters) {
      updateSelectedLetters(R.append(letter, selectedLetters))
    }
  }

  const handleDeselectLetter = (index: number) => () => {
    triggerHaptic()
    updateSelectedLetters(R.remove(index, 1, selectedLetters))
  }

  const handleClearSelectedLetters = () => {
    updateSelectedLetters([])
  }

  const soapCharactersIndexes = React.useCallback((word: string, _selectedLetters?: string[]) => {
    let soapIndexes: number[] = []
    let _letters = _selectedLetters ?? selectedLetters

    word.toUpperCase().split('').filter((value: string) => value !== LETTER_SOAP).forEach((character: string, index: number) => {
      if (_letters.includes(character)) {
        _letters = R.remove(R.findIndex(R.equals(character), _letters), 1, _letters)
      } else {
        soapIndexes = R.append(index, soapIndexes)
      }
    })

    return soapIndexes
  }, [ selectedLetters ])

  return {
    letters, selectedLetters,
    handleSelectLetter, handleDeselectLetter, soapCharactersIndexes, handleClearSelectedLetters,
  }
}