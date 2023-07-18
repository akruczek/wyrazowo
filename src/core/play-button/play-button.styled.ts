import styled from 'styled-components/native'
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants'

interface PlayButtonsContainerProps {
  topInset: number;
}

const getPlayButtonsContainerBottom = ({ topInset }: PlayButtonsContainerProps) =>
  BOTTOM_NAVIGATION_HEIGHT - topInset + 75

export const PlayButtonsContainer = styled.View<PlayButtonsContainerProps>`
  position: absolute;
  align-self: center;
  bottom: ${getPlayButtonsContainerBottom}px;
`
