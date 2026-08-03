import * as React from 'react'
import { CustomModalize, CustomModalizeRef } from '@core/custom-modalize/cutom-modalize'
import { LetterCard } from '@core/letter-card/letter-card'
import { ForceIndexModalContainer } from './force-index-modal.styled'

interface Props {
  modalizeRef: React.MutableRefObject<CustomModalizeRef | null>;
  handleForceIndex: (index: number) => void;
}

export const ForceIndexModal = ({ modalizeRef, handleForceIndex }: Props) => {
  const INDEXES = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
 
  const onPress = (index: number) => () => {
    handleForceIndex(index)
    modalizeRef?.current?.close?.()
  }

  return (
    <CustomModalize reference={modalizeRef} adjustToContentHeight>
      <ForceIndexModalContainer>
        {INDEXES.map((index: number, realIndex: number) => (
          <LetterCard content={String(index)} key={index} onPress={onPress(realIndex)} withMargin />
        ))}
      </ForceIndexModalContainer>
    </CustomModalize>
  )
}
