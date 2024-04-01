import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING } from '@core/styled'
import { AlertType } from './alert-icon.models'

const alertColorsMap = {
  error: COLOR.FIRE_BRICK,
  warning: COLOR.GOLD,
  info: COLOR.DODGER_BLUE,
  ok: COLOR.DARK_SEA_GREEN,
}

interface AlertIconProps {
  type?: AlertType;
}

export const AlertIconStyled = styled(MaterialCommunityIcons).attrs<AlertIconProps>(({ type }) => ({
  color: alertColorsMap[type ?? 'info'],
  size: TEXT_SIZE.M,
}))`
  margin: 0 ${SPACING.XXS}px;
`

export const AlertIconTouchable = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  },
})``
