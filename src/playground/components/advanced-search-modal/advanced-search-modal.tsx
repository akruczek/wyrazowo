import * as React from 'react'
import { Modalize } from 'react-native-modalize'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize>;
}

export const AdvancedSearchModal = ({ modalizeRef }: Props) => {
  return (
    <Modalize ref={modalizeRef}>

    </Modalize>
  )
}
