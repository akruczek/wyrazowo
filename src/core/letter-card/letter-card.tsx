import * as React from 'react'
import { genericShadow } from '../shadow/shadow.constants'
import { TEXT_SIZE } from '../text/text.constants'
import { LetterCardContainer, LetterCardContent, MultiLetterCardGradient } from './letter-card.styled'

interface Props {
  content: string;
  fontSize?: TEXT_SIZE;
  size?: number;
  isSelected?: boolean;
  horizontalMarginSize?: number;
  withMargin?: boolean;
  selectable?: boolean;
  selectedLetters?: string[];
  multiLetter?: boolean;
  noMargin?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const LetterCard = ({
  content, size, fontSize, isSelected, withMargin, horizontalMarginSize, selectable, selectedLetters, multiLetter, noMargin,
  onPress, onLongPress
}: Props) => multiLetter ? (
  <LetterCardContainer
    style={genericShadow}
    {...{ onPress, withMargin, onLongPress, content, size, isSelected, horizontalMarginSize, selectable, selectedLetters, noMargin }}
  >
    <MultiLetterCardGradient size={size}>
      <LetterCardContent {...{ fontSize }} children={content} />
    </MultiLetterCardGradient>
  </LetterCardContainer>
) : (
  <LetterCardContainer
    style={genericShadow}
    {...{ onPress, withMargin, onLongPress, content, size, isSelected, horizontalMarginSize, selectable, selectedLetters, noMargin }}
  >
    <LetterCardContent {...{ fontSize }} children={content} />
  </LetterCardContainer>
)
