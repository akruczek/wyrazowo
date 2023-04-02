import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../core/colors/colors.constants'

export const PlaygroundSafeArea = styled(SafeAreaView)`
  justify-content: space-between;
  height: 100%;
`

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
