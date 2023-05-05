import * as React from 'react'
import { CharadeFieldContainer, CharadeFieldContentText, CharadeFieldInnerContainer } from './charade-field.styled'

interface Props {
  count: number;
  isActive: boolean;
  content: string;
  onPress: () => void;
}

export const CharadeField = ({ count, onPress, content, isActive }: Props) => {
  return (
    <CharadeFieldContainer {...{ onPress, count }}>
      <CharadeFieldInnerContainer isActive={isActive} />
      <CharadeFieldContentText children={content} />
    </CharadeFieldContainer>
  )
}
