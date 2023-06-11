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
  onStepTouchEnd?: () => void;
}

export const ProgressIndicator = ({ steps, onStepTouchEnd, progress, color }: Props) => (
  <ProgressIndicatorContainer>
    {R.times(R.identity, steps).map((step: number) => (
      <ProgressIndicatorPoint onTouchEnd={onStepTouchEnd} key={step} done={progress > step} color={color} />
    ))}
    <ProgressIndicatorLine {...{ steps, color }} />
  </ProgressIndicatorContainer>
)
