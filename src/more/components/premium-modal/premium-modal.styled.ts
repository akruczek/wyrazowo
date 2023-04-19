import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CustomTextInput } from '@core/custom-text-input/custom-text-input'
import { COLOR } from '@core/colors/colors.constants'

export const PremiumModalTextInput = styled(CustomTextInput).attrs({
  autoCapitalize: 'characters',
  maxLength: 15,
})``

export const PremiumModalButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'check-bold',
  color: COLOR.WHITE,
  size: 26,
})``
