import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '../colors/colors.constants'
import { TEXT_SIZE } from '../text/text.constants'
import { LETTERS_1, LETTERS_2, LETTERS_3, LETTERS_5 } from './letter-card.constants'

interface LetterCardContainerProps {
  size?: number;
  fontSize?: number;
  content?: string;
}

export const LETTER_CARD_DEFAULT_SIZE = 50
const LETTER_CARD_DEFAULT_CONTENT_SIZE = TEXT_SIZE.L

const getLetterCardContainerSize = R.propOr(LETTER_CARD_DEFAULT_SIZE, 'size')

const getLetterCardBorderRadius = R.pipe(
  getLetterCardContainerSize,
  R.divide(R.__, 5),
)

const getLetterCardContentFontSize = R.propOr(LETTER_CARD_DEFAULT_CONTENT_SIZE, 'fontSize')

const isContentSatisfiesList = (list: string[]) => R.propSatisfies(R.includes(R.__, list), 'content')

const getLetterCardContainerBackgroundColor = R.cond([
  [ R.propSatisfies(Boolean, 'isSelected'), R.always(COLOR.FLORAL_WHITE) ],
  [ isContentSatisfiesList(LETTERS_1), R.always(COLOR.GOLD) ],
  [ isContentSatisfiesList(LETTERS_2), R.always(COLOR.DARK_SEA_GREEN) ],
  [ isContentSatisfiesList(LETTERS_3), R.always(COLOR.DODGER_BLUE) ],
  [ isContentSatisfiesList(LETTERS_5), R.always(COLOR.FIRE_BRICK) ],
  [ R.T, R.always(COLOR.WHITE_SMOKE) ],
])

const getLetterCardBorderColor = R.ifElse(
  R.propSatisfies(Boolean, 'isSelected'),
  R.always(COLOR.DARK_RED),
  R.always(COLOR.DIM_GREY),
)

export const LetterCardContainer = styled.TouchableOpacity.attrs(({ onPress }) => ({
  activeOpacity: onPress ? 0.5 : 1,
}))<LetterCardContainerProps>`
  justify-content: center;
  align-items: center;
  background-color: ${getLetterCardContainerBackgroundColor};
  width: ${getLetterCardContainerSize}px;
  height: ${getLetterCardContainerSize}px;
  border: 1px solid ${getLetterCardBorderColor};
  border-radius: ${getLetterCardBorderRadius}px;
  margin-bottom: 5px;
`

export const LetterCardContent = styled.Text`
  font-size: ${getLetterCardContentFontSize}px;
  font-weight: bold;
`
