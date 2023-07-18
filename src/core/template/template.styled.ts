import styled from 'styled-components/native'
import { Host } from 'react-native-portalize'
import { getThemeProp } from '@core/styled/theme'
import { SafeAreaFlexContainer } from '@core/styled'

export const TemplateHost = styled(Host)`
  background-color: ${getThemeProp('backgroundPrimary')};
`

export const TemplateSafeArea = styled(SafeAreaFlexContainer).attrs({
  justifyContent: 'space-between',
  height: 100,
})``
