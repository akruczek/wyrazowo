import styled from 'styled-components/native'
import { FlatListProps } from 'react-native'

export const MoreFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    height: '100%',
  },
  ListFooterComponentStyle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
})<FlatListProps<any> & any>`
  padding: 10px;
`
