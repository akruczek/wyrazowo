import styled from 'styled-components/native'
import { BOTTOM_NAVIGATION_HEIGHT } from '../navigation/navigation.constants'

interface DictionarlyButtonsContainerProps {
  topInset: number;
}

const getDictionarlyButtonsContainerBottom = ({ topInset }: DictionarlyButtonsContainerProps) =>
  BOTTOM_NAVIGATION_HEIGHT - topInset + 75

export const DictionarlyButtonsContainer = styled.View<DictionarlyButtonsContainerProps>`
  position: absolute;
  align-self: center;
  bottom: ${getDictionarlyButtonsContainerBottom}px;
`
