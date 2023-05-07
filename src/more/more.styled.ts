import styled from 'styled-components/native'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { COLOR } from '@core/colors/colors.constants'

export const MoreContainer = styled.View`
  padding: 10px;
  flex: 1;
`

export const MoreStatusBar = styled(FocusAwareStatusBar).attrs(props => ({
  backgroundColor: COLOR.GOLD,
  animated: true,
  barStyle: 'light-content',
}))``
