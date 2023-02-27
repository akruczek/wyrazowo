import * as React from 'react'
import { Text } from 'react-native'
import { LetterSliderBottomLabel } from '../../letter-slider.styled'
import { LetterSliderLabel } from './letter-slider-label.styled'

export const renderLetterSliderLabel = (min: number, max: number) =>
  (value: number) => value !== min && value !== max ? (
    <LetterSliderLabel>
      <LetterSliderBottomLabel>
        {value}
      </LetterSliderBottomLabel>
    </LetterSliderLabel>
  ) : null
