import styled from 'styled-components/native'
import RangeSlider from 'rn-range-slider'
import { TEXT_SIZE } from '../text/text.constants'

export const LetterSliderContainer = styled.View`
  padding-horizontal: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
`

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
  font-weight: bold;
  margin-left: 10px;
  margin-right: 5px;
`

export const LetterSlider = styled(RangeSlider)`
  width: 100%;
`
