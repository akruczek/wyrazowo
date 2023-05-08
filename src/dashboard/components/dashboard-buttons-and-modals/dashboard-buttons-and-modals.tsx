import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { COLOR } from '@core/colors/colors.constants'
import { CustomButton } from '@core/custom-button/custom-button'
import { SearchHistoryModal } from '../search-history-modal/search-history-modal'
import { PossibleWordsModal } from '../possible-words-modal/possible-words-modal'
import { SoapLetterModal } from '../soap-letter-modal/soap-letter-modal'
import { ForceIndexModal } from '../force-index-modal/force-index-modal'
import { useSearchHistory } from '../../../dashboard/hooks/use-search-history-modal.hook'
import {
  ClearLettersButtonIcon, DashboardButtonsContainer, HistoryButtonIcon, SearchButtonIcon,
} from './dashboard-buttons.styled'

interface Props {
  selectedLetters: string[];
  soapModalizeRef: React.MutableRefObject<Modalize | null>;
  forceIndexLetterIndexRef: React.MutableRefObject<number | null>;
  noWordsFound: boolean;
  letters: string[];
  possibleWords: string[];
  forceIndexModalizeRef: React.MutableRefObject<Modalize | null>;
  handleClearSelectedLetters: () =>  void;
  handleForceIndex: (letterIndex: number, forceIndex: number) => void;
  soapCharactersIndexes: (letter: string) => number[];
  onSelectSoapLetters: (soapLetters: string[]) => void;
  searchPossibleWords: () => void;
  clearPossibleWords: () => void;
}

export const DashboardButtonsAndModals = ({
  selectedLetters, handleClearSelectedLetters, handleForceIndex, letters,
  soapCharactersIndexes, forceIndexLetterIndexRef, onSelectSoapLetters, possibleWords,
  soapModalizeRef, noWordsFound, searchPossibleWords, clearPossibleWords, forceIndexModalizeRef,
}: Props) => {
  const modalizeRef = React.useRef<Modalize>(null)
  const { historyModalizeRef, openHistoryModal, historyAvailable, setHistoryAvailable } = useSearchHistory()

  const _handleForceIndex = (index: number) => {
    handleForceIndex(forceIndexLetterIndexRef.current ?? 0, index)
    forceIndexLetterIndexRef.current = null
  }

  const onSearch = () => {
    modalizeRef?.current?.open()
    setTimeout(() => {
      setHistoryAvailable(true)
      searchPossibleWords()
    }, 200)
  }

  return (
    <>
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

      <Portal>
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

        <ForceIndexModal
          modalizeRef={forceIndexModalizeRef}
          handleForceIndex={_handleForceIndex}
        />
      </Portal>
    </>
  )
}
