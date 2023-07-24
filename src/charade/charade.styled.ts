import styled from 'styled-components/native'
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants'
import { SPACING, getThemeProp } from '@core/styled'

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

export const CharadeSeparator = styled.View`
  border-bottom-width: 1px;
  margin: ${SPACING.S}px;
  border-bottom-color: ${getThemeProp('textSecondary')}50;
`

export const CharadeSwitchWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${SPACING.S}px;
`
