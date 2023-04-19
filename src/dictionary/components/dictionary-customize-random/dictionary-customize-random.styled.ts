import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'

export const DictionaryCustomizeRandomContainer = styled.View`
  width: 100%;
  padding-bottom: 50px;
  margin-top: 10px;
`

export const DictionaryCustomizeRandomButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-around;
`

export const DictionaryCustomizeRandomFilterButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'filter-check',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``

export const DictionaryCustomizeRandomClearButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'close-outline',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``
