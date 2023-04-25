import styled, { ThemeProps } from 'styled-components/native'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { getThemeProp } from '@core/styled/theme'

export const PlaygroundSafeArea = styled(SafeAreaFlexContainer).attrs(props => ({
  justifyContent: 'space-between',
  height: 100,
  backgroundColor: getThemeProp('backgroundSecondary')(props),
}))``

export const PlaygroundFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 1,
    paddingVertical: 10,
  },
})<any>``

export const PlaygroundBottomContainer = styled.View<ThemeProps<ThemeModel>>`
  width: 100%;
  padding-top: 3px;
  background-color: ${getThemeProp('backgroundSecondary')};
  justify-content: center;
`

export const PlaygroundStatusBar = styled(FocusAwareStatusBar).attrs(props => ({
  backgroundColor: getThemeProp('backgroundSecondary')(props),
  animated: true,
  barStyle: 'dark-content',
}))``
