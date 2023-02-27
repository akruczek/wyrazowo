import * as React from 'react'
import { TEXT_SIZE } from '../text/text.constants'
import { LetterCardContainer, LetterCardContent } from './letter-card.styled'

interface Props {
  content: string;
  fontSize?: TEXT_SIZE;
  size?: number;
  isSelected?: boolean;
  horizontalMarginSize?: number;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const LetterCard = ({ content, size, fontSize, isSelected, horizontalMarginSize, onPress, onLongPress }: Props) => (
  <LetterCardContainer {...{ onPress, onLongPress, content, size, isSelected, horizontalMarginSize }}>
    <LetterCardContent {...{ fontSize }} children={content} />
  </LetterCardContainer>
)
