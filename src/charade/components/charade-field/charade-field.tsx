import * as React from 'react'
import { CharadeFieldContainer, CharadeFieldContentText, CharadeFieldInnerContainer } from './charade-field.styled'

interface Props {
  count: number;
  isActive: boolean;
  isSent: boolean;
  word: string;
  index: number;
  content: string;
  onPress: () => void;
}

export const CharadeField = ({ count, onPress, content, isSent, index, word, isActive }: Props) => {
  return (
    <CharadeFieldContainer {...{ onPress, index, count, content, word, isSent }}>
      <CharadeFieldInnerContainer isActive={isActive} />
      <CharadeFieldContentText children={content} />
    </CharadeFieldContainer>
  )
}
