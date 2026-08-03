import styled from 'styled-components/native'
import MaterialCommunityIcons from '@core/icon/icon'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING, getRTLFlexDirection } from '@core/styled'

export const ClearLettersButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'close-outline',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``

export const SearchButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'book-search',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``

export const HistoryButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'history',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``

export const DashboardButtonsContainer = styled.View<{ RTL?: boolean }>`
  flex-direction: ${getRTLFlexDirection};
  justify-content: space-around;
  padding-bottom: ${SPACING.XL}px;
`
