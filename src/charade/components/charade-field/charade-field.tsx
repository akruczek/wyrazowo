import * as React from 'react'
import { Tx } from '@core/tx'
import { CharadeFieldContainer, CharadeFieldInnerContainer } from './charade-field.styled'

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
    <Tx tx={content} error={isError} />
  </CharadeFieldContainer>
)
