import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { TEXT_SIZE } from '@core/text/text.constants'
import { getThemeProp } from '@core/styled/theme'

export const CustomCounterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
  margin-vertical: 10px;
  height: 50px;
`

export const CustomCounterLabelIconContainer = styled.View`
  align-self: center;
`

export const CustomCounterTextContainer = styled.View`
  width: 40px;
  justify-content: center;
  align-items: center;
`

export const CustomCounterText = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  color: ${getThemeProp('textPrimary')};
`

export const CustomCounterButtonContainer = styled.TouchableOpacity`
  width: ${RESPONSIVE.WIDTH(10)}px;
  height: ${RESPONSIVE.WIDTH(10)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLOR.DIM_GREY_LIGHTER};
  border-radius: 10px;
`

export const CustomCounterLabel = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'format-letter-spacing',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.L,
}))``

export const CustomCounterMinusIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'minus',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.XXL,
}))``

export const CustomCounterPlusIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'plus',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.XXL,
}))``
