import styled from 'styled-components/native'
import RangeSlider from 'rn-range-slider'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TEXT_SIZE } from '../text/text.constants'
import { COLOR } from '../colors/colors.constants'

export const LetterSliderBottomLabelBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const LetterSliderTopLabelBar = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const LetterSliderBottomLabel = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  color: ${COLOR.BLACK};
  font-weight: bold;
  margin-left: 10px;
  margin-right: 5px;
`

export const LetterSlider = styled(RangeSlider)`
  width: 100%;
`

export const LetterSliderLengthIcon = styled(MaterialCommunityIcons).attrs({
  name: 'format-letter-spacing',
  color: COLOR.BLACK,
  size: TEXT_SIZE.L,
})`
  padding-top: 3px;
`
