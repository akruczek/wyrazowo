import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import { SPACING } from '@core/styled'
import { Tx } from '@core/tx'
import { RESPONSIVE } from '@core/responsive/responsive'
import { COLOR } from '@core/colors/colors.constants'

export const SearchHistoryFiltersList = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: SPACING.XXS,
  }
})`
  border-bottom-width: 1px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-color: ${COLOR.DIM_GREY_LIGHTER};
`

interface SearchHistoryFiltersItemProps {
  isSelected: boolean;
}

export const SearchHistoryFiltersItem = styled(LinearGradient)
  .attrs(({ isSelected }: SearchHistoryFiltersItemProps) => ({
    colors: [
      COLOR.WHITE,
      isSelected ? COLOR.GOLD : COLOR.WHITE,
      COLOR.WHITE,
    ],
    start: { x: 0.1, y: 1 },
    end: { x: 0.9, y: 1 },
  }))<SearchHistoryFiltersItemProps>`
    height: ${SPACING.XL + SPACING.S}px;
    width: ${RESPONSIVE.WIDTH(30)}px;
    align-items: center;
    justify-content: center;
    padding-top: ${SPACING.S}px;
    ${({ isSelected }: SearchHistoryFiltersItemProps) => isSelected ? `background-color: red;` : ''}
  `

export const SearchHistoryFiltersItemTx = styled(Tx)`
  background-color: transparent;
`
