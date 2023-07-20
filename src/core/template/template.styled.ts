import * as R from 'ramda'
import styled from 'styled-components/native'
import { Host } from 'react-native-portalize'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getThemeProp } from '@core/styled/theme'
import { COLOR } from '@core/colors/colors.constants'
import { appendStyleWhenProvided } from '@core/styled'
import { JustifyContent } from '@core/styled/models'

export const TemplateHost = styled(Host)`
  background-color: ${getThemeProp('backgroundPrimary')};
`

interface TemplateSafeAreaProps {
  backgroundColor?: COLOR;
  justifyContent?: JustifyContent;
  containerHeight?: number;
}

export const TemplateSafeArea = styled(SafeAreaView)<TemplateSafeAreaProps>`
  flex: 1;
  background-color: ${R.propOr('transparent', 'backgroundColor')};
  ${appendStyleWhenProvided<TemplateSafeAreaProps>('justify-content', 'justifyContent')}
  ${appendStyleWhenProvided<TemplateSafeAreaProps>('height', 'containerHeight')}
`
