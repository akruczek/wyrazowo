import styled from 'styled-components/native'
import RangeSlider from 'rn-range-slider'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '../text/text.constants'

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

export const LetterSliderLengthIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'format-letter-spacing',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.L,
}))`
  padding-top: 3px;
`
