import * as R from 'ramda'
import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RESPONSIVE } from '@core/responsive/responsive'
import { COLOR } from '@core/colors/colors.constants'
import { SPACING } from '@core/styled'
import { TEXT_SIZE } from '@core/text/text.constants'

interface CustomCheckboxStyledProps {
  value?: boolean;
}

const getCustomCheckboxColor = R.ifElse(
  R.propSatisfies(Boolean, 'value'),
  R.always(COLOR.DARK_SEA_GREEN),
  R.always(COLOR.DIM_GREY_LIGHTER),
)

export const CustomCheckboxBox = styled.View<CustomCheckboxStyledProps>`
  width: ${RESPONSIVE.WIDTH(10)}px;
  height: ${RESPONSIVE.WIDTH(10)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${getCustomCheckboxColor};
  border-radius: 10px;
  margin-right: ${SPACING.S}px;
`

interface CustomCheckboxTouchableWrapperProps {
  value?: boolean;
}

const getCustomCheckboxContainerOpacity = R.ifElse(
  R.propSatisfies(Boolean, 'value'),
  R.always(1),
  R.always(0.5),
)

export const CustomCheckboxTouchableWrapper = styled.Pressable<CustomCheckboxTouchableWrapperProps>`
  flex-direction: row;
  align-items: center;
  align-self: center;
  opacity: ${getCustomCheckboxContainerOpacity};
`

export const CustomCheckboxCheckmarkIcon = styled(MaterialCommunityIcons).attrs<CustomCheckboxStyledProps>(props => ({
  color: getCustomCheckboxColor(props),
  size: TEXT_SIZE.L,
}))<CustomCheckboxStyledProps>``
