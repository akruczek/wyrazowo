import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { LETTER_SOAP_PLACEHOLDER } from '@core/letter-card/letter-card.constants'

interface UseSoapModal {
  handleLongPress: () => void;
  onSelectSoapLetters: (soapLetters: string[]) => void;
  soapModalizeRef: React.MutableRefObject<any>;
}

export const useSoapModal = (
  handleSelectLetter: (letter: string) => void,
): UseSoapModal => {
  const soapModalizeRef = React.useRef<Modalize>(null)

  const handleLongPress = () => {
    soapModalizeRef?.current?.open?.()
  }

  const onSelectSoapLetters = (soapLetters: string[]) => {
    if (soapLetters.length === 1) {
      handleSelectLetter(soapLetters[0])
    } else {
      handleSelectLetter(soapLetters.join(LETTER_SOAP_PLACEHOLDER))
    }
  }

  return { handleLongPress, onSelectSoapLetters, soapModalizeRef }
}
