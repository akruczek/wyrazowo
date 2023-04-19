import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { PLAYGROUND_FIELD_TYPE } from '../../playground.constants'

const PLAYGROUND_FIELD_SPACING = 3
export const PLAYGROUND_SPACING_MULTIPLIER = 2.2
export const PLAYGROUND_FIELD_SIZE = (RESPONSIVE.WIDTH() / 15) - PLAYGROUND_FIELD_SPACING

const addOpacity = (color: COLOR) => `${color}80`

const getFieldBackgroundColor = R.cond([
  [ R.propEq('type', PLAYGROUND_FIELD_TYPE.RED), R.always(addOpacity(COLOR.FIRE_BRICK)) ],
  [ R.propEq('type', PLAYGROUND_FIELD_TYPE.GREEN), R.always(addOpacity(COLOR.DARK_SEA_GREEN)) ],
  [ R.propEq('type', PLAYGROUND_FIELD_TYPE.YELLOW), R.always(addOpacity(COLOR.GOLD)) ],
  [ R.propEq('type', PLAYGROUND_FIELD_TYPE.BLUE), R.always(addOpacity(COLOR.DODGER_BLUE)) ],
  [ R.propEq('type', PLAYGROUND_FIELD_TYPE.EMPTY), R.always(COLOR.FLORAL_WHITE) ],
  [ R.propEq('type', PLAYGROUND_FIELD_TYPE.STAR), R.always(addOpacity(COLOR.FIRE_BRICK)) ],
  [ R.propEq('type', PLAYGROUND_FIELD_TYPE.DOUBLE), R.always(`${COLOR.DIM_GREY}30`) ],
  [ R.propEq('type', PLAYGROUND_FIELD_TYPE.TRIPLE), R.always(`${COLOR.DIM_GREY}30`) ],
])

export const PlaygroundFieldContainer = styled.View`
  width: ${PLAYGROUND_FIELD_SIZE}px;
  height: ${PLAYGROUND_FIELD_SIZE}px;
  margin-bottom: ${PLAYGROUND_FIELD_SPACING}px;
  margin-left: ${PLAYGROUND_FIELD_SPACING / PLAYGROUND_SPACING_MULTIPLIER}px;
  margin-right: ${PLAYGROUND_FIELD_SPACING / PLAYGROUND_SPACING_MULTIPLIER}px;
  border-radius: 5px;
  background-color: ${getFieldBackgroundColor};
  justify-content: center;
  align-items: center;
`

export const PlaygroundFieldBackgroundText = styled.Text`
  font-size: ${TEXT_SIZE.XXS}px;
  color: ${COLOR.DIM_GREY};
`
