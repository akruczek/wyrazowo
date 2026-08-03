import * as React from 'react'
import { CustomModalize, CustomModalizeRef } from '@core/custom-modalize/cutom-modalize'

interface Props {
  modalizeRef: React.MutableRefObject<CustomModalizeRef | null>;
}

export const AdvancedSearchModal = ({ modalizeRef }: Props) => {
  return (
    <CustomModalize reference={modalizeRef}>
      {null}
    </CustomModalize>
  )
}
