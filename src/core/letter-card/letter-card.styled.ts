import * as R from 'ramda'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import { COLOR } from '../colors/colors.constants'
import { TEXT_SIZE } from '../text/text.constants'
import { LETTERS_1, LETTERS_2, LETTERS_3, LETTERS_5 } from './letter-card.constants'
import { RESPONSIVE } from '../responsive/responsive'

interface LetterCardContainerProps {
  size?: number;
  fontSize?: number;
  content?: string;
  selectable?: boolean;
  selectedLetters?: string[];
  noMargin?: boolean;
}

export const LETTER_CARD_DEFAULT_SIZE = RESPONSIVE.WIDTH(12.7)
const LETTER_CARD_DEFAULT_CONTENT_SIZE = TEXT_SIZE.L
const SELECTED_CARD_SPACE_SIZE = Math.floor(RESPONSIVE.WIDTH() / 7 - LETTER_CARD_DEFAULT_SIZE)

const getLetterCardContainerSize = R.propOr(LETTER_CARD_DEFAULT_SIZE, 'size')

const getLetterCardBorderRadius = R.pipe(
  getLetterCardContainerSize,
  R.divide(R.__, 5),
)

const getLetterCardContentFontSize = R.propOr(LETTER_CARD_DEFAULT_CONTENT_SIZE, 'fontSize')

const isContentSatisfiesList = (list: string[]) => R.propSatisfies(R.includes(R.__, list), 'content')

const getLetterCardContainerBackgroundColor = R.ifElse(
  R.either(
    R.both(
      R.propSatisfies(Boolean, 'selectable'),
      ({ selectedLetters, content }: LetterCardContainerProps) =>
        (selectedLetters as string[])?.includes?.(content ?? ''),
    ),
    R.propSatisfies(R.complement(Boolean), 'selectable'),
  ),
  R.cond([
    [ R.propSatisfies(Boolean, 'isSelected'), R.always(COLOR.FLORAL_WHITE) ],
    [ isContentSatisfiesList(LETTERS_1), R.always(COLOR.GOLD) ],
    [ isContentSatisfiesList(LETTERS_2), R.always(COLOR.DARK_SEA_GREEN) ],
    [ isContentSatisfiesList(LETTERS_3), R.always(COLOR.DODGER_BLUE) ],
    [ isContentSatisfiesList(LETTERS_5), R.always(COLOR.FIRE_BRICK) ],
    [ R.T, R.always(COLOR.WHITE_SMOKE) ],
  ]),
  R.always(COLOR.WHITE_SMOKE),
)

const getLetterCardBorderColor = R.ifElse(
  R.propSatisfies(Boolean, 'isSelected'),
  R.always(COLOR.DARK_RED),
  R.always(COLOR.DIM_GREY),
)

const LetterCardContainerMarginRight = R.ifElse(
  R.propSatisfies(Boolean, 'withMargin'),
  R.always(SELECTED_CARD_SPACE_SIZE),
  R.always(0),
)

export const LetterCardContainer = styled.TouchableOpacity.attrs(({ onPress, onLongPress }) => ({
  activeOpacity: (onPress || onLongPress) ? 0.5 : 1,
}))<LetterCardContainerProps>`
  justify-content: center;
  align-items: center;
  background-color: ${getLetterCardContainerBackgroundColor};
  width: ${getLetterCardContainerSize}px;
  height: ${getLetterCardContainerSize}px;
  border: 1px solid ${getLetterCardBorderColor};
  border-radius: ${getLetterCardBorderRadius}px;
  ${(props: LetterCardContainerProps) => props.noMargin ? '' : `margin-bottom: 5px; margin-right: ${LetterCardContainerMarginRight(props)}px;`}
`

const getMultiLetterCardBorderRadius = R.pipe(
  getLetterCardBorderRadius,
  R.dec,
)

interface MultiLetterCardGradientProps {
  size?: number;
}

export const MultiLetterCardGradient = styled(LinearGradient).attrs({
  colors: [ COLOR.FIRE_BRICK, COLOR.DODGER_BLUE, COLOR.GOLD, COLOR.DARK_SEA_GREEN ],
})<MultiLetterCardGradientProps>`
  justify-content: center;
  align-items: center;
  border-radius: ${getMultiLetterCardBorderRadius}px;
  margin-right: ${LetterCardContainerMarginRight}px;
  width: 100%;
  height: 100%;
`

export const LetterCardContent = styled.Text`
  font-size: ${getLetterCardContentFontSize}px;
  font-weight: bold;
  color: ${COLOR.BLACK};
`
