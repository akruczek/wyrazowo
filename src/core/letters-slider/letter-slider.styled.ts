import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RangeSlider from 'rn-range-slider'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING } from '@core/styled'

export const LetterSliderBottomLabelBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const LetterSliderTopLabelBar = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const LetterSlider = styled(RangeSlider)`
  width: 100%;
`

export const LetterSliderWarningIcon = styled(MaterialCommunityIcons).attrs({
  name: 'alert-circle-outline',
  color: COLOR.FIRE_BRICK,
  size: TEXT_SIZE.M,
})`
  margin-left: ${SPACING.XXS}px;
`
