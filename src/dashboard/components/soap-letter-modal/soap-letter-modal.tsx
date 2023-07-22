import * as React from 'react'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { SpacingView } from '@core/styled'
import { useModalTopOffset } from '@core/hooks/use-modal-top-offset.hook'
import { CustomModalize } from '@core/custom-modalize/cutom-modalize'
import { LettersGrid } from '../letters-grid/letters-grid'
import { SetSoapButtonIcon, SoapLetterModalContainer } from './soap-letter-modal.styled'
import { toggleSelectedSoapLetters, filterSoapLetters } from '../../helpers'

interface Props {
  modalizeRef: React.MutableRefObject<any>;
  onSelectSoapLetters: (soapLetters: string[]) => void;
  letters: string[];
}

export const SoapLetterModal = ({ letters, onSelectSoapLetters, modalizeRef }: Props) => {
  const modalOffset = useModalTopOffset()
  const [ selectedSoapLetters, setSelectedSoapLetters ] = React.useState<string[]>([])

  const toggleSelectedSoapLetter = (letter: string) => setSelectedSoapLetters(
    toggleSelectedSoapLetters<string[]>(letter)
  )

  const filteredLetters = filterSoapLetters(letters)

  const onSetSoapLetters = () => {
    onSelectSoapLetters(selectedSoapLetters)
    modalizeRef?.current?.close?.()
  }

  const onClosed = () => {
    setSelectedSoapLetters([])
  }

  return (
    <CustomModalize
      reference={modalizeRef}
      modalTopOffset={modalOffset}
      onClosed={onClosed}
      adjustToContentHeight
      disableScrollIfPossible
      avoidKeyboardLikeIOS
      useNativeDriver
    >
      <SoapLetterModalContainer>
        <LettersGrid
          letters={filteredLetters}
          handleSelectLetter={toggleSelectedSoapLetter}
          selectedLetters={selectedSoapLetters}
          selectable
        />
      </SoapLetterModalContainer>

      <SpacingView spacings="0 0 L 0" type="padding">
        <CustomButton
          color={COLOR.DARK_SEA_GREEN}
          onPress={onSetSoapLetters}
          invisible={selectedSoapLetters.length < 1}
        >
          <SetSoapButtonIcon />
        </CustomButton>
      </SpacingView>
    </CustomModalize>
  )
}
