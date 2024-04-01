import * as R from 'ramda'
import styled from 'styled-components/native'
import { TextInputProps } from 'react-native'
import { SPACING, getRTLTextAlignment } from '@core/styled'
import { COLOR } from '../colors/colors.constants'
import { TEXT_SIZE } from '../text/text.constants'

interface CustomTextInputStyledProps {
  state?: boolean | null;
  centered?: boolean;
  color?: COLOR;
}

const getCustomTextInputStyledBorderColor = R.cond([
  [ R.propSatisfies(R.isNil, 'state'), R.propOr(COLOR.DODGER_BLUE, 'color') ],
  [ R.propSatisfies(Boolean, 'state'), R.always(COLOR.DARK_SEA_GREEN) ],
  [ R.T, R.always(COLOR.FIRE_BRICK) ],
])

const getCustomTextInputStyledTextColor = R.cond([
  [ R.propSatisfies(R.isNil, 'state'), R.propOr(COLOR.DODGER_BLUE, 'color') ],
  [ R.propSatisfies(Boolean, 'state'), R.always(COLOR.DARK_SEA_GREEN) ],
  [ R.T, R.always(COLOR.FIRE_BRICK) ],
])

const getTextAlignment = R.ifElse(
  R.propSatisfies(Boolean, 'centered'),
  R.always('center'),
  getRTLTextAlignment, 
)

export const CustomTextInputStyled = styled.TextInput.attrs(
  ({ placeholder, color }: TextInputProps & CustomTextInputStyledProps) => ({
    placeholder: placeholder ?? '',
    placeholderTextColor: COLOR.DIM_GREY_LIGHTER,
    selectionColor: color,
  }))<CustomTextInputStyledProps>`
    height: 50px;
    border-bottom-width: 1.5px;
    text-align: ${getTextAlignment};
    border-bottom-color: ${getCustomTextInputStyledBorderColor};
    margin: ${SPACING.S}px;
    padding: ${SPACING.XXS}px;
    font-size: ${TEXT_SIZE.XL}px;
    color: ${getCustomTextInputStyledTextColor};
  `
