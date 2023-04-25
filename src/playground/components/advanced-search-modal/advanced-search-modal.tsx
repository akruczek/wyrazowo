import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { CustomModalize } from '@core/custom-modalize/cutom-modalize'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize>;
}

export const AdvancedSearchModal = ({ modalizeRef }: Props) => {
  return (
    <CustomModalize reference={modalizeRef}>

    </CustomModalize>
  )
}
