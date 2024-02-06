import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Template } from '@core/template/template'
import { Tx } from '@core/tx'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import { CustomButton } from '@core/custom-button/custom-button'
import { SCREEN } from '../navigation/navigation.constants'
import { getNavigationParam } from '../navigation/navigation.helpers'
import { WordExtension } from './components/word-extension/word-extension'
import { PossibleWordsModal, SelectedLetters } from '../dashboard/components'
import { SearchButtonIcon } from '../dashboard/components/dashboard-buttons-and-modals/dashboard-buttons.styled'
import { AdvancedSearchButtonsContainer } from './advanced-search.styled'
import { useSearchPossibleWords } from '../dashboard/hooks'
import { nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'
import { getSoapCharactersIndexes } from '../dashboard/helpers'

export const AdvancedSearch = () => {
  const RTL = useRTL()
  const modalizeRef = React.useRef<Modalize>(null)

  const [ wordToExtend, setWordToExtend ] = React.useState('')

  const navigation = useNavigation()
  const nativeSearchEngineEnabled = useSelector(nativeSearchEngineEnabledSelector)
  const selectedLetters = getNavigationParam<string[]>('selectedLetters', navigation)

  const soapCharactersIndexes = (word: string) => getSoapCharactersIndexes(word, selectedLetters)

  const {
    possibleWords, noWordsFound, searchPossibleWords, clearPossibleWords,
  } = useSearchPossibleWords(selectedLetters, nativeSearchEngineEnabled)

  const onSearch = () => {
    modalizeRef?.current?.open()
    setTimeout(() => {
      searchPossibleWords()
    }, 200)
  }

  return (
    <Template type="dashboard" local="advanced_search" leftIcon="magnify" leftScreen={SCREEN.DASHBOARD_SEARCH}>
      {nativeSearchEngineEnabled ? (
        <>
          <Tx local="selected_letters" bolder disabled center />
          <SelectedLetters selectedLetters={selectedLetters} />

          <Tx local="word_extension" bolder disabled center spacings="L 0 0" />
          <WordExtension {...{ wordToExtend, setWordToExtend }} />

          <AdvancedSearchButtonsContainer RTL={RTL}>
            <CustomButton invisible={selectedLetters.length < 2} onPress={onSearch} withHaptic>
              <SearchButtonIcon />
            </CustomButton>
          </AdvancedSearchButtonsContainer>

          <PossibleWordsModal
            onClosed={clearPossibleWords}
            {...{ possibleWords, modalizeRef, soapCharactersIndexes, noWordsFound }}
          />
        </>
      ) : (
        <Tx local="advanced_search_not_supported" bolder disabled center spacings="0 M" />
      )}
    </Template>
  )
}
