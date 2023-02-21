import * as React from 'react'
import { LetterCardContainer, LetterCardContent } from './letter-card.styled'

interface Props {
  content: string;
  size?: number;
  isSelected?: boolean;
  horizontalMarginSize?: number;
  onPress?: () => void;
}

export const LetterCard = ({ content, size, isSelected, horizontalMarginSize, onPress }: Props) => (
  <LetterCardContainer {...{ onPress, content, size, isSelected, horizontalMarginSize }}>
    <LetterCardContent children={content} />
  </LetterCardContainer>
)
