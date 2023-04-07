import * as R from 'ramda'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { COLOR } from '../../../core/colors/colors.constants'
import { TEXT_SIZE } from '../../../core/text/text.constants'

const DICTIONARY_HEADER_HEIGHT = 75

export const DictionarySafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.WHITE};
`

const getDictionaryHeaderHeight = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(DICTIONARY_HEADER_HEIGHT)
)

const getDictionaryMarginTop = R.propOr(0, 'topInset')

interface DictionaryHeaderContainerProps {
  topInset: number;
}

export const DictionaryHeaderContainer = styled(LinearGradient).attrs({
  colors: [COLOR.DODGER_BLUE, COLOR.WHITE],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})<DictionaryHeaderContainerProps>`
  flex-direction: row;
  height: ${getDictionaryHeaderHeight}px;
  background-color: ${COLOR.DODGER_BLUE};
  margin-top: -${getDictionaryMarginTop}px;
  padding-top: ${getDictionaryMarginTop}px;
  justify-content: center;
`

export const DictionaryHeaderText = styled.Text`
  font-size: ${TEXT_SIZE.XL}px;
  color: ${COLOR.WHITE};
  font-weight: bold;
  padding: 10px 20px 0;
`

const getDictionaryRandomWordButtonContainerTop = R.pipe(
  getDictionaryMarginTop,
  R.add(10),
)

export const DictionaryRandomWordButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 20,
    left: 20,
  },
})<DictionaryHeaderContainerProps>`
  position: absolute;
  width: ${TEXT_SIZE.XL}px;
  height: ${TEXT_SIZE.XL}px;
  top: ${getDictionaryRandomWordButtonContainerTop}px;
  right: 10px;
  justify-content: center;
  align-items: center;
`
