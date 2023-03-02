import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '../colors/colors.constants'
import { TEXT_SIZE } from '../text/text.constants'

export const CustomButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 10px 30px;
  border-radius: 15px;
  background-color: ${COLOR.DODGER_BLUE};
`

const getCustomButtonTitleFontSize = R.propOr(TEXT_SIZE.M, 'titleSize')

interface CustomButtonTitleProps {
  titleSize?: TEXT_SIZE;
}

export const CustomButtonTitle = styled.Text<CustomButtonTitleProps>`
  font-size: ${getCustomButtonTitleFontSize}px;
  color: ${COLOR.WHITE};
  font-weight: bold;
`
