import styled from 'styled-components/native'
import { ThemeProps } from '@core/styled/models'
import { FlatListProps } from 'react-native'
import { SPACING, ThemeModel } from '@core/styled/models'
import { isPlatform } from '@core/is-platform/is-platform'
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants'

export const PlaygroundFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 1,
    paddingVertical: 10,
  },
})<FlatListProps<any> & any>``

interface PlaygroundBottomContainerProps {
  bottomInset: number;
}

export const PlaygroundBottomContainer = styled.View<PlaygroundBottomContainerProps & ThemeProps<ThemeModel>>`
  top: ${({ bottomInset }) => isPlatform('ios') ? bottomInset + 45 : BOTTOM_NAVIGATION_HEIGHT}px;
  padding-top: ${SPACING.S}px;
`
