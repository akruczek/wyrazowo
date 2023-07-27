import styled from 'styled-components/native'
import { SPACING, getThemeProp } from '@core/styled'
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

export const DictionarlySeparator = styled.View`
  border-bottom-width: 1px;
  margin: ${SPACING.S}px;
  border-bottom-color: ${getThemeProp('textSecondary')}50;
`
