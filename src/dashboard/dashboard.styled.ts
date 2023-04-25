import styled, { ThemeProps } from 'styled-components/native'
import { Host } from 'react-native-portalize'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { getThemeProp } from '@core/styled/theme'

export const DashboardSafeArea = styled(SafeAreaFlexContainer).attrs({
  justifyContent: 'space-between',
  height: 100,
})``

export const DashboardStatusBar = styled(FocusAwareStatusBar).attrs(props => ({
  backgroundColor: getThemeProp('backgroundPrimary')(props),
  animated: true,
  barStyle: 'dark-content',
}))``

export const DashboardHost = styled(Host)`
  background-color: ${getThemeProp('backgroundPrimary')};
`
