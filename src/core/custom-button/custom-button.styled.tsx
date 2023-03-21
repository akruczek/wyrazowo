import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '../colors/colors.constants'
import { TEXT_SIZE } from '../text/text.constants'

interface CustomButtonContainerProps {
  invisible?: boolean;
  color?: COLOR;
}

const getCustomButtonContainerOpacity = R.pipe(
  R.propOr(false, 'invisible'),
  R.not,
  Number,
)

const getCustomButtonContainerBackgroundColor = R.propOr(COLOR.DODGER_BLUE, 'color')

export const CustomButtonContainer = styled.TouchableOpacity.attrs<CustomButtonContainerProps>(({ invisible }) => ({
  activeOpacity: invisible ? 0 : undefined,
}))`
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 10px 15px;
  border-radius: 30px;
  background-color: ${getCustomButtonContainerBackgroundColor};
  opacity: ${getCustomButtonContainerOpacity};
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
