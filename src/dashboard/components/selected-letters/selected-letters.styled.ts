import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { SPACING } from '@core/styled'

export const SelectedLettersContainer = styled.View`
  flex-direction: row;
  margin: ${SPACING.XS}px ${SPACING.XXS}px 0;
  min-height: ${RESPONSIVE.WIDTH(14)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.SLATE_GREY};
`
