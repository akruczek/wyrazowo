import styled from 'styled-components/native'
import { SPACING, getRTLFlexDirection } from '@core/styled'

export const AdvancedSearchButtonsContainer = styled.View`
  flex-direction: ${getRTLFlexDirection};
  justify-content: space-around;
  margin-bottom: -${SPACING.XXXS}px;
`
