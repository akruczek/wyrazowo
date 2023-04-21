import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'

export const PlaygroundBacklightContainer = styled.View`
  width: ${RESPONSIVE.WIDTH()}px;
  height: ${RESPONSIVE.WIDTH()}px;
  background-color: ${COLOR.DIM_GREY}40;
  z-index: 1;
  top: 10px;
  position: absolute;
`

interface PlaygroundColumnBacklightProps {
  index: number;
}

const getPlaygroundColumnBacklightLeftPosition = R.pipe(
  R.propOr(0, 'index'),
  R.multiply(6.66666667),
)

export const PlaygroundColumnBacklight = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<PlaygroundColumnBacklightProps>`
  background-color: ${COLOR.GOLD}50;
  position: absolute;
  z-index: 1;
  height: 100%;
  left: ${getPlaygroundColumnBacklightLeftPosition}%;
  width: 6.66666667%;
`

export const PlaygroundRowBacklight = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})<PlaygroundColumnBacklightProps>`
  background-color: ${COLOR.GOLD}50;
  position: absolute;
  z-index: 1;
  width: 100%;
  top: ${getPlaygroundColumnBacklightLeftPosition}%;
  height: 6.66666667%;
`
