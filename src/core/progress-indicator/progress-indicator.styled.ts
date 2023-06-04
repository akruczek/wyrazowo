import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { getThemeProp } from '@core/styled/theme'
import { ThemeModel } from '@core/styled/models'

const PROGRESS_INDICATOR_POINT_SIZE = RESPONSIVE.WIDTH(5)

export const ProgressIndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  min-height: 20px;
`

interface ProgressIndicatorProps {
  color?: COLOR;
  difficulty?: number;
  done?: boolean;
}

const getProgressIndicatorLineWidth = R.ifElse<any, number, number>(
  R.propEq('steps', 8),
  R.always(90),
  R.always(95),
)

export const ProgressIndicatorLine = styled.View<ProgressIndicatorProps>`
  height: 2px;
  width: ${getProgressIndicatorLineWidth}%;
  position: absolute;
  z-index: -1;
  align-self: center;
  background-color: ${R.propOr(COLOR.DODGER_BLUE, 'color')};
`

const getProgressIndicatorPointBackgroundColor: any = R.ifElse(
  R.propSatisfies(Boolean, 'done'),
  R.propOr(COLOR.DODGER_BLUE, 'color'),
  getThemeProp('backgroundPrimary'),
)

export const ProgressIndicatorPoint = styled.View<ProgressIndicatorProps & ThemeProps<ThemeModel>>`
  width: ${PROGRESS_INDICATOR_POINT_SIZE}px;
  height: ${PROGRESS_INDICATOR_POINT_SIZE}px;
  background-color: ${getProgressIndicatorPointBackgroundColor};
  border: 2px solid ${R.propOr(COLOR.DODGER_BLUE, 'color')};
  border-radius: ${PROGRESS_INDICATOR_POINT_SIZE / 2}px;
`
