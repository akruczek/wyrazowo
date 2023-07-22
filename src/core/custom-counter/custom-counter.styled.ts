import * as R from 'ramda'
import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SPACING, getThemeProp } from '@core/styled'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { TEXT_SIZE } from '@core/text/text.constants'

export const CustomCounterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
  margin: ${SPACING.S}px 0 ${SPACING.M}px;
  height: 50px;
`

export const CustomCounterLabelIconContainer = styled.View`
  align-self: center;
  margin-top: ${SPACING.S}px;
`

export const CustomCounterTextContainer = styled.View`
  width: 40px;
  justify-content: center;
  align-items: center;
`

interface CustomCounterButtonContainerProps {
  disabled: boolean;
}

const getCustomCounterButtonContainerOpacity = R.ifElse(
  R.propSatisfies(Boolean, 'disabled'),
  R.always(0.3),
  R.always(1),
)

export const CustomCounterButtonContainer = styled.TouchableOpacity<CustomCounterButtonContainerProps>`
  width: ${RESPONSIVE.WIDTH(10)}px;
  height: ${RESPONSIVE.WIDTH(10)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLOR.DIM_GREY_LIGHTER};
  border-radius: 10px;
  opacity: ${getCustomCounterButtonContainerOpacity};
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
