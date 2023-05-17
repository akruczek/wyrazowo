import * as React from 'react'
import { CharadeFieldContainer, CharadeFieldContentText, CharadeFieldInnerContainer } from './charade-field.styled'

interface Props {
  count: number;
  isActive: boolean;
  isSent: boolean;
  isError: boolean;
  word: string;
  index: number;
  content: string;
  onPress: () => void;
}

export const CharadeField = ({ count, onPress, content, isSent, isError, index, word, isActive }: Props) => (
  <CharadeFieldContainer {...{ onPress, index, count, content, word, isError, isSent }}>
    <CharadeFieldInnerContainer {...{ isError, isActive }} />
    <CharadeFieldContentText isError={isError} children={content} />
  </CharadeFieldContainer>
)
