import styled from 'styled-components/native'
import { FlatListProps } from 'react-native'

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
  margin-bottom: 10px;
`

export const CharadePlaygroundRowsList = styled.FlatList.attrs({
  scrollEnabled: true,
})<FlatListProps<any> & any>`
  margin-top: 5px;
  padding-horizontal: 10%;
`

