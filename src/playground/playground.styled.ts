import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import { Zoom } from 'react-native-reanimated-zoom'
import { Host } from 'react-native-portalize'
import { Dimensions, FlatListProps, StatusBar } from 'react-native'
import { ThemeModel } from '@core/styled/models'
import { getThemeProp } from '@core/styled/theme'
import { PLAYGROUND_SPACING_MULTIPLIER } from './components/playground-field/playground-field.styled'
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants'
import { isPlatform } from '@core/is-platform/is-platform'

export const PlaygroundHost = styled(Host)`
  background-color: ${getThemeProp('backgroundPrimary')};
`

export const PlaygroundZoom = styled(Zoom).attrs({
  maximumZoomScale: PLAYGROUND_SPACING_MULTIPLIER,
})`
  flex: 1;
  z-index: 0;
`

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
  top: ${({ bottomInset }) => isPlatform('ios') ? bottomInset + 10 : BOTTOM_NAVIGATION_HEIGHT}px;
  padding-top: 10px;
`
