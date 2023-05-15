import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { DictionarlyEndModalContainer } from './dictionarly-end-modal.styled'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize | null>;
}

export const DictionarlyEndModal = ({ modalizeRef }: Props) => {
  return (
    <Modalize ref={modalizeRef}>
      <DictionarlyEndModalContainer>

      </DictionarlyEndModalContainer>
    </Modalize>
  )
}
