import styled from 'styled-components/native'
import { SPACING } from '@core/styled'

interface PlayButtonsContainerProps {
  topInset: number;
}

export const PlayButtonsContainer = styled.View<PlayButtonsContainerProps>`
  position: absolute;
  align-self: center;
  bottom: ${SPACING.XL}px;
`
