import * as R from 'ramda'
import styled from 'styled-components/native'
import { RESPONSIVE } from '../../../core/responsive/responsive'
import { COLOR } from '../../../core/colors/colors.constants'
import { TEXT_SIZE } from '../../../core/text/text.constants'

export const GestureLetterCardsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

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
