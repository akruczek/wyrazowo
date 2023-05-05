import styled from 'styled-components/native'
import { FlatListProps } from 'react-native'
import { CUSTOM_KEYBOARD_HEIGHT } from '@core/custom-keyboard/custom-keyboard.styled'
import { RESPONSIVE } from '@core/responsive/responsive';
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants';

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
})`
  margin-top: 5px;
  padding-horizontal: 10%;
`

