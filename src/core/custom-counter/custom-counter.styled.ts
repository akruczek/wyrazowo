import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { TEXT_SIZE } from '@core/text/text.constants'
import styled from 'styled-components/native'

export const CustomCounterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
  margin-vertical: 10px;
  height: 50px;
`

export const CustomCounterLabelIconContainer = styled.View`
  align-self: center;
`

export const CustomCounterTextContainer = styled.View`
  width: 40px;
  justify-content: center;
  align-items: center;
`

export const CustomCounterText = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  color: ${COLOR.BLACK};
`

export const CustomCounterButtonContainer = styled.TouchableOpacity`
  width: ${RESPONSIVE.WIDTH(10)}px;
  height: ${RESPONSIVE.WIDTH(10)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLOR.DIM_GREY_LIGHTER};
  border-radius: 10px;
`
