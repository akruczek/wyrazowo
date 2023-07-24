import * as React from 'react'
import { genericShadow } from '../shadow/shadow.constants'
import { TEXT_SIZE } from '../text/text.constants'
import {
  LetterCardContainer, LetterCardContent, LetterCardForcedIndex,
  LetterCardForcedIndexContainer, MultiLetterCardGradient,
} from './letter-card.styled'

interface Props {
  content: string;
  fontSize?: TEXT_SIZE;
  indexFontSize?: TEXT_SIZE;
  size?: number;
  isSelected?: boolean;
  horizontalMarginSize?: number;
  withMargin?: boolean;
  selectable?: boolean;
  selectedLetters?: string[];
  multiLetter?: boolean;
  forcedIndex?: string;
  noMargin?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const LetterCard = ({
  content, size, fontSize, indexFontSize, isSelected, withMargin, horizontalMarginSize,
  selectable, selectedLetters, multiLetter, forcedIndex, noMargin, disabled,
  onPress, onLongPress
}: Props) => multiLetter ? (
  <LetterCardContainer {...{ onPress, withMargin, onLongPress, content, size,
      isSelected, horizontalMarginSize, selectable, selectedLetters, noMargin, disabled }}
  >
    <MultiLetterCardGradient size={size}>
      <LetterCardContent {...{ fontSize }} children={content} />
    </MultiLetterCardGradient>
  </LetterCardContainer>
) : forcedIndex ? (
  <LetterCardContainer {...{ onPress, withMargin, onLongPress, content, size,
    isSelected, horizontalMarginSize, selectable, selectedLetters, noMargin, disabled }}
  >
    <LetterCardForcedIndexContainer style={genericShadow}>
      <LetterCardForcedIndex fontSize={indexFontSize} children={Number(forcedIndex) + 1} />
    </LetterCardForcedIndexContainer>
    <LetterCardContent {...{ fontSize }} children={content} />
  </LetterCardContainer>
) : (
  <LetterCardContainer {...{ onPress, withMargin, onLongPress, content, size,
    isSelected, horizontalMarginSize, selectable, selectedLetters, noMargin, disabled }}
  >
    <LetterCardContent {...{ fontSize }} children={content} />
  </LetterCardContainer>
)
