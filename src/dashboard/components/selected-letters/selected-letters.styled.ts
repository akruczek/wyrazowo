import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'

export const SelectedLettersContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  min-height: ${RESPONSIVE.WIDTH(14)}px;
  border-bottom-width: 1px;
  margin-horizontal: 2px;
  border-bottom-color: ${COLOR.SLATE_GREY};
`
