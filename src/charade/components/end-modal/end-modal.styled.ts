import { RESPONSIVE } from '@core/responsive/responsive'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'
import styled from 'styled-components/native'

export const EndModalContainer = styled.View`
  height: ${RESPONSIVE.HEIGHT(50)}px;
  margin-top: 20px;
`

export const EndModalTitle = styled.Text`
  font-size: ${TEXT_SIZE.XXL}px;
  color: ${getThemeProp('textPrimary')};
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`

export const EndModalButtonsContainer = styled.View`
  position: absolute;
  bottom: 30px;
  align-self: center;
`
