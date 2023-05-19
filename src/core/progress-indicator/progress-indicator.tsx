import * as React from 'react'
import * as R from 'ramda'
import { COLOR } from '@core/colors/colors.constants'
import {
  ProgressIndicatorContainer, ProgressIndicatorLine, ProgressIndicatorPoint,
} from './progress-indicator.styled'

interface Props {
  steps: number;
  progress: number;
  color?: COLOR;
}

export const ProgressIndicator = ({ steps, progress, color }: Props) => (
  <ProgressIndicatorContainer>
    {R.times(R.identity, steps).map((step: number) => (
      <ProgressIndicatorPoint key={step} done={progress > step} color={color} />
    ))}
    <ProgressIndicatorLine color={color} />
  </ProgressIndicatorContainer>
)
