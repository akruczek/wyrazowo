import * as R from 'ramda'
import styled from 'styled-components/native'
import { RESPONSIVE } from '@core/responsive/responsive'
import { COLOR } from '@core/colors/colors.constants';

interface CharadeFieldContainerProps {
  count: number;
}

const getCharadeFieldContainerSize = R.pipe(
  R.propOr(5, 'count'),
  R.divide(RESPONSIVE.WIDTH(90)),
)

const getCharadeFieldContainerRadius = R.pipe(
  getCharadeFieldContainerSize,
  R.divide(R.__, 10),
)

export const CharadeFieldContainer = styled.View<CharadeFieldContainerProps>`
  width: ${getCharadeFieldContainerSize}px;
  height: ${getCharadeFieldContainerSize}px;
  border-radius: ${getCharadeFieldContainerRadius}px;
  border: 1px solid ${COLOR.DIM_GREY};
`
