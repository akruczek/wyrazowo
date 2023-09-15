import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { SPACING, getRTLFlexDirection } from '@core/styled'

export const SelectedLettersContainer = styled.View`
  flex-direction: ${getRTLFlexDirection};
  margin: ${SPACING.XS}px ${SPACING.XXS}px 0;
  min-height: ${RESPONSIVE.WIDTH(14)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.SLATE_GREY};
`

export const SelectedLettersAddSoapContainer = styled.View`
  position: absolute;
  right: 0;
`
