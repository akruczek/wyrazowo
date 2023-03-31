import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native'
import { COLOR } from '../core/colors/colors.constants'
import { LETTER_CARD_DEFAULT_SIZE } from '../core/letter-card/letter-card.styled'

export const PlaygroundSafeArea = styled(SafeAreaView)`
  justify-content: space-between;
  height: 100%;
`

export const PlaygroundFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    justifyContent: 'space-between',
    height: Dimensions.get('screen').width + 10,
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
