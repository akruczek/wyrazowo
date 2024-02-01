import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING } from '@core/styled'

export const WordExtensionContainer = styled.View`
  flex: 1;
`

export const WordExtensionInputWrapper = styled.View`
  flex: 1;
`

export const WordExtensionInputContainer = styled.View`
  flex-direction: row;
  height: 100px;
  align-items: center;
`

export const WordExtensionInputIcon = styled(MaterialCommunityIcons).attrs({
  color: COLOR.DIM_GREY,
  size: TEXT_SIZE.XL,
})`
  margin: 0 ${SPACING.XXS}px;
`