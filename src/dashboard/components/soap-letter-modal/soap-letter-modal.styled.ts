import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING } from '@core/styled'

export const SoapLetterModalContainer = styled.View`
  padding: ${SPACING.L}px 0 ${SPACING.L}px;
`

export const SetSoapButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'filter-check',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``
