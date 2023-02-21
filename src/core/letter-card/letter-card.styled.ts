import * as R from 'ramda'
import styled from 'styled-components/native'
import { TEXT_SIZE } from '../text/text.constants'

interface LetterCardContainerProps {
  size?: number;
  fontSize?: number;
}

const LETTER_CARD_DEFAULT_SIZE = 50
const LETTER_CARD_DEFAULT_CONTENT_SIZE = TEXT_SIZE.L

const getLetterCardContainerSize = R.propOr(LETTER_CARD_DEFAULT_SIZE, 'size')

const getLetterCardBorderRadius = R.pipe(
  getLetterCardContainerSize,
  R.divide(R.__, 5),
)

const getLetterCardContentFontSize = R.propOr(LETTER_CARD_DEFAULT_CONTENT_SIZE, 'fontSize')

export const LetterCardContainer = styled.TouchableOpacity<LetterCardContainerProps>`
  justify-content: center;
  align-items: center;
  width: ${getLetterCardContainerSize}px;
  height: ${getLetterCardContainerSize}px;
  border: 1px solid grey;
  border-radius: ${getLetterCardBorderRadius}px;
  margin-bottom: 5px;
`

export const LetterCardContent = styled.Text`
  font-size: ${getLetterCardContentFontSize}px;
`
