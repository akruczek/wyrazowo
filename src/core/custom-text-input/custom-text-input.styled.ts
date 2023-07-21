import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '../colors/colors.constants'
import { TEXT_SIZE } from '../text/text.constants'

interface CustomTextInputStyledProps {
  state?: boolean | null;
}

const getCustomTextInputStyledBorderColor = R.cond([
  [ R.propSatisfies(R.isNil, 'state'), R.always(COLOR.DODGER_BLUE) ],
  [ R.propSatisfies(Boolean, 'state'), R.always(COLOR.DARK_SEA_GREEN) ],
  [ R.T, R.always(COLOR.FIRE_BRICK) ],
])

const getCustomTextInputStyledTextColor = R.cond([
  [ R.propSatisfies(R.isNil, 'state'), R.always(COLOR.DODGER_BLUE) ],
  [ R.propSatisfies(Boolean, 'state'), R.always(COLOR.DARK_SEA_GREEN) ],
  [ R.T, R.always(COLOR.FIRE_BRICK) ],
])

export const CustomTextInputStyled = styled.TextInput.attrs(({ placeholder }) => ({
  placeholder: placeholder ?? '',
  placeholderTextColor: COLOR.DIM_GREY_LIGHTER,
}))<CustomTextInputStyledProps>`
  height: 50px;
  border-bottom-width: 1.5px;
  border-bottom-color: ${getCustomTextInputStyledBorderColor};
  margin: 10px;
  padding: 5px 5px;
  font-size: ${TEXT_SIZE.XL}px;
  color: ${getCustomTextInputStyledTextColor};
`
