import styled from 'styled-components/native'
import { Host } from 'react-native-portalize'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '../core/colors/colors.constants'
import { TEXT_SIZE } from '../core/text/text.constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FocusAwareStatusBar } from '../core/focus-aware-status-bar/focus-aware-status-bar'
import { SafeAreaFlexContainer } from '../core/styled'

export const SearchButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'book-search',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``

export const ClearLettersButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'close-outline',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``

export const HistoryButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'history',
  color: COLOR.WHITE_SMOKE,
  size: TEXT_SIZE.L,
})``

export const DashboardSafeArea = styled(SafeAreaFlexContainer).attrs({
  justifyContent: 'space-between',
  height: 100,
})``

export const DashboardButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 10px;
`

export const DashboardStatusBar = styled(FocusAwareStatusBar).attrs({
  backgroundColor: COLOR.WHITE,
  animated: true,
  barStyle: 'dark-content',
})``

export const DashboardHost = styled(Host)`
  background-color: ${COLOR.WHITE};
`
