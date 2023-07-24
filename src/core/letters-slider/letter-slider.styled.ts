import styled from 'styled-components/native'
import RangeSlider from 'rn-range-slider'

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
