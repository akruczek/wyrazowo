import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { SafeAreaFlexContainer } from '@core/styled'

export const PlaygroundSafeArea = styled(SafeAreaFlexContainer).attrs({
  justifyContent: 'space-between',
  height: 100,
  backgroundColor: COLOR.WHITE_SMOKE,
})``

export const PlaygroundFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 1,
    paddingVertical: 10,
  },
})<any>``

export const PlaygroundBottomContainer = styled.View`
  width: 100%;
  padding-top: 3px;
  background-color: ${COLOR.WHITE_SMOKE};
  justify-content: center;
`

export const PlaygroundStatusBar = styled(FocusAwareStatusBar).attrs({
  backgroundColor: COLOR.WHITE_SMOKE,
  animated: true,
  barStyle: 'dark-content',
})``
