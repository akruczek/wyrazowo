import * as React from 'react'
import { Tx } from '@core/tx'
import { LetterSliderLabel } from './letter-slider-label.styled'

export const renderLetterSliderLabel = (min: number, max: number) =>
  (value: number) => value !== min && value !== max ? (
    <LetterSliderLabel>
      <Tx tx={value} spacings="0 XXS 0 S" bold />
    </LetterSliderLabel>
  ) : null
