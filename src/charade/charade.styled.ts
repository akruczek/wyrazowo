import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants'

export const CharadeStatusBar = styled(FocusAwareStatusBar).attrs({
  backgroundColor: COLOR.DARK_SEA_GREEN,
  animated: true,
  barStyle: 'light-content',
})``

export const CharadeConfigurationContainer = styled.View`
  margin-top: 30px;
  height: 100%;
`

interface CharadeButtonsContainerProps {
  topInset: number;
}

const getCharadeButtonsContainerBottom = ({ topInset }: CharadeButtonsContainerProps) =>
  BOTTOM_NAVIGATION_HEIGHT - topInset + 50

export const CharadeButtonsContainer = styled.View<CharadeButtonsContainerProps>`
  position: absolute;
  align-self: center;
  bottom: ${getCharadeButtonsContainerBottom}px;
`
