import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '../core/colors/colors.constants'
import { TEXT_SIZE } from '../core/text/text.constants'

export const SearchButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'book-search',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``
