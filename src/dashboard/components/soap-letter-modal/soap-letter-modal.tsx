import * as React from 'react'
import * as R from 'ramda'
import { Modalize } from 'react-native-modalize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { LETTER_EMPTY, LETTER_SOAP } from '@core/letter-card/letter-card.constants'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../../navigation/navigation.constants'
import { LettersGrid } from '../letters-grid/letters-grid'
import { SetSoapButtonIcon, SetSoapButtonIconContainer, SoapLetterModalContainer } from './soap-letter-modal.styled'

interface Props {
  modalizeRef: React.MutableRefObject<any>;
  onSelectSoapLetters: (soapLetters: string[]) => void;
  letters: string[];
}

export const SoapLetterModal = ({ letters, onSelectSoapLetters, modalizeRef }: Props) => {
  const { top: topInset } = useSafeAreaInsets()

  const [ selectedSoapLetters, setSelectedSoapLetters ] = React.useState<string[]>([])

  const toggleSelectedSoapLetter = (letter: string) => {
    setSelectedSoapLetters(
      R.ifElse<any, string[], string[]>(
        R.includes(letter),
        R.without([letter]),
        R.append(letter),
      ),
    )
  }

  const filteredLetters = R.map(
    R.when(
      R.equals(LETTER_SOAP),
      R.always(LETTER_EMPTY),
    )
  )(letters)

  const onSetSoapLetters = () => {
    onSelectSoapLetters(selectedSoapLetters)
    modalizeRef?.current?.close?.()
  }

  const onClosed = () => {
    setSelectedSoapLetters([])
  }

  return (
    <Modalize
      ref={modalizeRef}
      modalTopOffset={topInset + BOTTOM_NAVIGATION_HEIGHT + 30}
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

      <SetSoapButtonIconContainer>
        <CustomButton
          color={COLOR.DARK_SEA_GREEN}
          onPress={onSetSoapLetters}
          invisible={selectedSoapLetters.length < 1}
        >
          <SetSoapButtonIcon />
        </CustomButton>
      </SetSoapButtonIconContainer>
    </Modalize>
  )
}
