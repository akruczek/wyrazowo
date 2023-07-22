import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING } from '@core/styled'

export const DictionaryCustomizeRandomContainer = styled.View`
  width: 100%;
  margin: ${SPACING.XS}px 0 ${SPACING.XXL}px
`

export const DictionaryCustomizeRandomButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: ${SPACING.L}px;
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
