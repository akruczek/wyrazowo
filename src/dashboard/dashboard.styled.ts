import styled from 'styled-components/native'
import { Host } from 'react-native-portalize'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { SafeAreaFlexContainer } from '@core/styled'
import { getThemeProp } from '@core/styled/theme'
import { COLOR } from '@core/colors/colors.constants'

export const DashboardSafeArea = styled(SafeAreaFlexContainer).attrs({
  justifyContent: 'space-between',
  height: 100,
})``

export const DashboardStatusBar = styled(FocusAwareStatusBar).attrs(props => ({
  backgroundColor: COLOR.FIRE_BRICK,
  animated: true,
  barStyle: 'light-content',
}))``

export const DashboardHost = styled(Host)`
  background-color: ${getThemeProp('backgroundPrimary')};
`
