import styled, { ThemeProps } from 'styled-components/native'
import { FlatListProps } from 'react-native'
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
})<FlatListProps<any> & any>``

export const PlaygroundBottomContainer = styled.View<ThemeProps<ThemeModel>>`
  width: 100%;
  padding-top: 3px;
  background-color: ${getThemeProp('backgroundSecondary')};
  justify-content: center;
`
