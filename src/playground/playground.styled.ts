import styled from 'styled-components/native'
import { ThemeProps } from '@core/styled/models'
import { ResumableZoom } from 'react-native-zoom-toolkit'
import { FlatListProps } from 'react-native'
import { SPACING, ThemeModel } from '@core/styled/models'
import { isPlatform } from '@core/is-platform/is-platform'
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants'
import { PLAYGROUND_SPACING_MULTIPLIER } from './components/playground-field/playground-field.styled'

export const PlaygroundZoom = styled(ResumableZoom).attrs({
  maxScale: PLAYGROUND_SPACING_MULTIPLIER,
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
  top: ${({ bottomInset }) => isPlatform('ios') ? bottomInset + 45 : BOTTOM_NAVIGATION_HEIGHT}px;
  padding-top: ${SPACING.S}px;
`
