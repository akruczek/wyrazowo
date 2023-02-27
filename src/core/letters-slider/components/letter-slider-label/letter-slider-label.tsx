import * as React from 'react'
import { Text } from 'react-native'
import { LetterSliderLabel } from './letter-slider-label.styled'

export const renderLetterSliderLabel = (value: number) => (
  <LetterSliderLabel>
    <Text>
      {value}
    </Text>
  </LetterSliderLabel>
)
