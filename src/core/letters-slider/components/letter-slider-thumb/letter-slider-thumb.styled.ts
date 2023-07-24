import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '../../../colors/colors.constants'

export const THUMB_SIZE = 30

export const LetterSliderThumb = styled.View`
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  align-items: center;
  justify-content: center;
  border-radius: ${THUMB_SIZE / 2}px;
  background-color: ${COLOR.FLORAL_WHITE};
  border: 0.5px solid ${COLOR.DIM_GREY_LIGHTER};
`

interface LetterSliderThumbInnerProps {
  name: 'low' | 'high';
  min: number;
  max: number;
}

const getThumbInnerColorByValue = (value: number) => {
  if (value <= 4) return COLOR.GOLD
  if (value <= 6) return COLOR.DARK_SEA_GREEN
  if (value <= 10) return COLOR.DODGER_BLUE
  return COLOR.FIRE_BRICK
}

const getLetterSliderThumbInnerBackgroundColor = ({ name, min, max }: LetterSliderThumbInnerProps) => {
  if (name === 'low') {
    return getThumbInnerColorByValue(min)
  }

  return getThumbInnerColorByValue(max)
}

export const LetterSliderThumbInner = styled.View<LetterSliderThumbInnerProps>`
  width: ${THUMB_SIZE / 3}px;
  height: ${THUMB_SIZE / 3}px;
  border-radius: ${THUMB_SIZE / 3 / 2}px;
  background-color: ${getLetterSliderThumbInnerBackgroundColor};
  border: 0.5px solid ${COLOR.DIM_GREY_LIGHTER};
`
