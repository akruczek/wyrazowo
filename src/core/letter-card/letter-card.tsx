import * as React from 'react'
import { genericShadow } from '../shadow/shadow.constants'
import { TEXT_SIZE } from '../text/text.constants'
import { LetterCardContainer, LetterCardContent } from './letter-card.styled'

interface Props {
  content: string;
  fontSize?: TEXT_SIZE;
  size?: number;
  isSelected?: boolean;
  horizontalMarginSize?: number;
  withMargin?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const LetterCard = ({ content, size, fontSize, isSelected, withMargin, horizontalMarginSize, onPress, onLongPress }: Props) => (
  <LetterCardContainer
    style={genericShadow}
    {...{ onPress, withMargin, onLongPress, content, size, isSelected, horizontalMarginSize }}
  >
    <LetterCardContent {...{ fontSize }} children={content} />
  </LetterCardContainer>
)
