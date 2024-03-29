import * as R from 'ramda'
import styled from 'styled-components/native'
import { SPACING, appendStyleWhenProvided } from '@core/styled'
import { COLOR } from '../colors/colors.constants'

interface CustomButtonContainerProps {
  invisible?: boolean;
  color?: COLOR;
  minHeight?: number;
}

const getCustomButtonContainerOpacity = R.pipe(
  R.propOr(false, 'invisible'),
  R.not,
  Number,
)

const getCustomButtonContainerBackgroundColor = R.propOr(COLOR.DODGER_BLUE, 'color')

export const CustomButtonContainer = styled.TouchableOpacity.attrs<CustomButtonContainerProps>(({ invisible }) => ({
  activeOpacity: invisible ? 0 : undefined,
}))<CustomButtonContainerProps>`
  justify-content: center;
  align-items: center;
  align-self: center;
  border: 0.5px solid ${COLOR.DIM_GREY_LIGHTER};
  padding: ${SPACING.XS}px ${SPACING.M}px;
  border-radius: 30px;
  background-color: ${getCustomButtonContainerBackgroundColor};
  opacity: ${getCustomButtonContainerOpacity};
  ${appendStyleWhenProvided('min-height', 'minHeight', 'px')};
`
