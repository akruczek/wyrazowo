import styled from 'styled-components/native'
import { RESPONSIVE } from '@core/responsive/responsive'
import { SPACING } from '@core/styled'

export const EndModalContainer = styled.View`
  height: ${RESPONSIVE.HEIGHT(50)}px;
  margin-top: ${SPACING.L}px;
`

export const EndModalButtonsContainer = styled.View`
  position: absolute;
  bottom: 30px;
  align-self: center;
`
