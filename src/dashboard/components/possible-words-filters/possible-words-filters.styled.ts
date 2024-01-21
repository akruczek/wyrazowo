import styled from 'styled-components/native'
import { RESPONSIVE } from '@core/responsive/responsive'
import { SPACING } from '@core/styled'
import { COLOR } from '@core/colors/colors.constants'

export const SearchHistoryFiltersList = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: SPACING.XXS,
  }
})``

export const SearchHistoryFiltersItem = styled.Pressable`
  height: ${SPACING.XL}px;
  width: ${RESPONSIVE.WIDTH(30)}px;
  align-items: center;
  justify-content: center;
`
