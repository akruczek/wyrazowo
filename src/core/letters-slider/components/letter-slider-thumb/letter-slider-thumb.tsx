import * as React from 'react'
import { LetterSliderThumb, LetterSliderThumbInner } from './letter-slider-thumb.styled'

export const renderLetterSliderThumb = (name: 'low' | 'high', [ min, max ]: [ number, number ]) => (
  <LetterSliderThumb>
    <LetterSliderThumbInner {...{ name, min, max }} />
  </LetterSliderThumb>
)
