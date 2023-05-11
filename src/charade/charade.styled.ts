import styled from 'styled-components/native'
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants'

export const CharadeConfigurationContainer = styled.View`
  margin-top: 30px;
  height: 100%;
`

interface CharadeButtonsContainerProps {
  topInset: number;
}

const getCharadeButtonsContainerBottom = ({ topInset }: CharadeButtonsContainerProps) =>
  BOTTOM_NAVIGATION_HEIGHT - topInset + 75

export const CharadeButtonsContainer = styled.View<CharadeButtonsContainerProps>`
  position: absolute;
  align-self: center;
  bottom: ${getCharadeButtonsContainerBottom}px;
`
