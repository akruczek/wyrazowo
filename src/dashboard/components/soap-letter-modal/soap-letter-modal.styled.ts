import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '../../../core/colors/colors.constants'
import { TEXT_SIZE } from '../../../core/text/text.constants'

export const SoapLetterModalContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`

export const SetSoapButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'filter-check',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``

export const SetSoapButtonIconContainer = styled.View`
  padding-bottom: 20px;
`
