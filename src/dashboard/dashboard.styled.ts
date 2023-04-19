import styled from 'styled-components/native'
import { Host } from 'react-native-portalize'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { SafeAreaFlexContainer } from '@core/styled'

export const DashboardSafeArea = styled(SafeAreaFlexContainer).attrs({
  justifyContent: 'space-between',
  height: 100,
})``

export const DashboardStatusBar = styled(FocusAwareStatusBar).attrs({
  backgroundColor: COLOR.WHITE,
  animated: true,
  barStyle: 'dark-content',
})``

export const DashboardHost = styled(Host)`
  background-color: ${COLOR.WHITE};
`
