import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RESPONSIVE } from '@core/responsive/responsive'
import { ThemeModel } from '@core/styled/models'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { LETTER_CARD_DEFAULT_SIZE } from '@core/letter-card/letter-card.styled'
import { getThemeProp } from '@core/styled/theme'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../../navigation/navigation.constants'

interface GestureLetterCardsArrowWrapperProps {
  y: number;
}

const ARROW_WRAPPER_SIZE = RESPONSIVE.WIDTH(7)

const getGestureLetterCardsTopArrowWrapper = R.pipe(
  R.propOr(0, 'y'),
  R.add(5),
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
  z-index: 2;
  top: ${getGestureLetterCardsTopArrowWrapper}px;
`

const getGestureLetterCardsBottomArrowWrapper = R.pipe(
  R.propOr(0, 'y'),
  R.add(10),
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
  z-index: 2;
  top: ${getGestureLetterCardsBottomArrowWrapper}px;
`

const getGestureLetterCardsPagingStateText = R.pipe(
  getGestureLetterCardsTopArrowWrapper,
  R.add(RESPONSIVE.WIDTH(2)),
)

export const GestureLetterCardsPagingStateText = styled
  .Text<GestureLetterCardsArrowWrapperProps & ThemeProps<ThemeModel>>`
    font-size: ${TEXT_SIZE.XS}px;
    color: ${getThemeProp('textSecondary')};
    position: absolute;
    top: ${getGestureLetterCardsPagingStateText}px;
    right: 10px;
  `

export const GestureLetterCardsUserSelectedLettersText = styled
  .Text<GestureLetterCardsArrowWrapperProps & ThemeProps<ThemeModel>>`
    font-size: ${TEXT_SIZE.S}px;
    font-weight: bold;
    color: ${getThemeProp('textSecondary')};
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

export const GestureLetterCardsUserSelectedLettersIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'alpha-a-box',
  color: getThemeProp('textSecondary')(props),
  size: 26,
}))``

interface GestureLetterCardsBackgroundProps {
  topInset: number;
  bottomInset: number;
}

export const GestureLetterCardsBackground = styled.View<GestureLetterCardsBackgroundProps & ThemeProps<ThemeModel>>`
  width: 100%;
  top: ${({ topInset, bottomInset }) => -(RESPONSIVE.HEIGHT() - RESPONSIVE.WIDTH() - BOTTOM_NAVIGATION_HEIGHT - topInset - bottomInset) + bottomInset + LETTER_CARD_DEFAULT_SIZE - 30}px;
  position: absolute;
  background-color: ${getThemeProp('backgroundPrimary')};
  min-height: 500px;
`

export const GestureLetterButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-self: flex-end;
  right: 50px;
  position: absolute;
  bottom: ${RESPONSIVE.HEIGHT() < 820 ? 5 : 10}px;
`
