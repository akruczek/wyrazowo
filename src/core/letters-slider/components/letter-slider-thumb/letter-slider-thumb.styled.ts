import styled from 'styled-components/native'
import { COLOR } from '../../../colors/colors.constants'

export const THUMB_SIZE = 30

export const LetterSliderThumb = styled.View`
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  border-radius: ${THUMB_SIZE / 2}px;
  background-color: ${COLOR.DARK_SEA_GREEN};
`
