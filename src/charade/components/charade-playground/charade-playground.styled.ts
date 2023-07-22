import styled from 'styled-components/native'
import { FlatListProps } from 'react-native'
import { SPACING } from '@core/styled'

interface CharadePlaygroundRowProps extends FlatListProps<any> {
  count: number;
}

export const CharadePlaygroundRow = styled.FlatList.attrs({
  horizontal: true,
  scrollEnabled: false,
  contentContainerStyle: {
    justifyContent: 'space-around',
    width: '100%',
  },
})<CharadePlaygroundRowProps>`
  margin-bottom: ${SPACING.XS}px;
`

export const CharadePlaygroundRowsList = styled.FlatList.attrs({
  scrollEnabled: true,
})<FlatListProps<any> & any>`
  margin: ${SPACING.XXS}px 10% 0;
`

