import * as R from 'ramda'
import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RESPONSIVE } from '../../../core/responsive/responsive'
import { COLOR } from '../../../core/colors/colors.constants'
import { TEXT_SIZE } from '../../../core/text/text.constants'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../../navigation/navigation.constants'
import { LETTER_CARD_DEFAULT_SIZE } from '../../../core/letter-card/letter-card.styled'

interface GestureLetterCardsArrowWrapperProps {
  y: number;
}

const ARROW_WRAPPER_SIZE = RESPONSIVE.WIDTH(7)

const getGestureLetterCardsTopArrowWrapper = R.pipe(
  R.propOr(0, 'y'),
  R.subtract(R.__, ARROW_WRAPPER_SIZE),
)

export const GestureLetterCardsTopArrowWrapper = styled.TouchableOpacity.attrs({
  hitSlop: {
    right: 5,
    left: 5,
  },
})<GestureLetterCardsArrowWrapperProps>`
  width: ${ARROW_WRAPPER_SIZE}px;
  height: ${ARROW_WRAPPER_SIZE}px;
  border-radius: 25px;
  background-color: ${COLOR.FLORAL_WHITE};
  align-self: center;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 1;
  top: ${getGestureLetterCardsTopArrowWrapper}px;
`

const getGestureLetterCardsBottomArrowWrapper = R.pipe(
  R.propOr(0, 'y'),
  R.add(RESPONSIVE.WIDTH(28)),
)

export const GestureLetterCardsBottomArrowWrapper = styled.TouchableOpacity.attrs({
  hitSlop: {
    right: 5,
    left: 5,
  },
})<GestureLetterCardsArrowWrapperProps>`
  width: ${ARROW_WRAPPER_SIZE}px;
  height: ${ARROW_WRAPPER_SIZE}px;
  border-radius: 25px;
  background-color: ${COLOR.FLORAL_WHITE};
  align-self: center;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 1;
  top: ${getGestureLetterCardsBottomArrowWrapper}px;
`

const getGestureLetterCardsPagingStateText = R.pipe(
  getGestureLetterCardsTopArrowWrapper,
  R.add(RESPONSIVE.WIDTH(2)),
)

export const GestureLetterCardsPagingStateText = styled.Text<GestureLetterCardsArrowWrapperProps>`
  font-size: ${TEXT_SIZE.XS}px;
  color: ${COLOR.DIM_GREY};
  position: absolute;
  top: ${getGestureLetterCardsPagingStateText}px;
  right: 10px;
`

export const GestureLetterCardsUserSelectedLettersText = styled.Text<GestureLetterCardsArrowWrapperProps>`
  font-size: ${TEXT_SIZE.S}px;
  font-weight: bold;
  color: ${COLOR.DIM_GREY};
  position: absolute;
  top: ${getGestureLetterCardsPagingStateText}px;
  margin-top: -2.5px;
  left: 31px;
`

export const GestureLetterCardsUserSelectedLettersIconContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 2,
    right: 30,
    bottom: 2,
    left: 5,
  },
})<GestureLetterCardsArrowWrapperProps>`
  align-self: center;
  position: absolute;
  top: ${getGestureLetterCardsPagingStateText}px;
  margin-top: -6px;
  left: 5px;
  z-index: 1;
`

export const GestureLetterCardsUserSelectedLettersIcon = styled(MaterialCommunityIcons).attrs({
  name: 'alpha-a-box',
  color: COLOR.DIM_GREY,
  size: 26,
})``

interface GestureLetterCardsBackgroundProps {
  topInset: number;
  bottomInset: number;
}

export const GestureLetterCardsBackground = styled.View<GestureLetterCardsBackgroundProps>`
  width: 100%;
  height: 800px;
  top: ${({ topInset, bottomInset }) => -(RESPONSIVE.HEIGHT() - RESPONSIVE.WIDTH() - BOTTOM_NAVIGATION_HEIGHT - topInset - bottomInset) + bottomInset + LETTER_CARD_DEFAULT_SIZE - 30}px;
  position: absolute;
  background-color: ${COLOR.WHITE_SMOKE};
`

export const GestureLetterButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 5px;
`
