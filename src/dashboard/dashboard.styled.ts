import styled from 'styled-components/native'
import { Host } from 'react-native-portalize'
import { SafeAreaFlexContainer } from '@core/styled'
import { getThemeProp } from '@core/styled/theme'

export const DashboardSafeArea = styled(SafeAreaFlexContainer).attrs({
  justifyContent: 'space-between',
  height: 100,
})``

export const DashboardHost = styled(Host)`
  background-color: ${getThemeProp('backgroundPrimary')};
`
