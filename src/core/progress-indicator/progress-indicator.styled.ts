import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'

const PROGRESS_INDICATOR_POINT_SIZE = RESPONSIVE.WIDTH(5)

export const ProgressIndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  min-height: 20px;
`

interface ProgressIndicatorProps {
  color?: COLOR;
  done?: boolean;
}

export const ProgressIndicatorLine = styled.View<ProgressIndicatorProps>`
  height: 2px;
  width: 95%;
  position: absolute;
  z-index: -1;
  align-self: center;
  background-color: ${R.propOr(COLOR.DODGER_BLUE, 'color')};
`

const getProgressIndicatorPointBackgroundColor = R.ifElse(
  R.propSatisfies(Boolean, 'done'),
  R.propOr(COLOR.DODGER_BLUE, 'color'),
  R.always(COLOR.WHITE as any),
)

export const ProgressIndicatorPoint = styled.View<ProgressIndicatorProps>`
  width: ${PROGRESS_INDICATOR_POINT_SIZE}px;
  height: ${PROGRESS_INDICATOR_POINT_SIZE}px;
  background-color: ${getProgressIndicatorPointBackgroundColor};
  border: 2px solid ${R.propOr(COLOR.DODGER_BLUE, 'color')};
  border-radius: ${PROGRESS_INDICATOR_POINT_SIZE / 2}px;
`
