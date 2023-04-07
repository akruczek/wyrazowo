import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../core/colors/colors.constants'
import { CustomTextInput } from '../core/custom-text-input/custom-text-input'

export const DictionarySafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.WHITE};
`

export const DictionarySearchButtonContainer = styled.View`
  margin-top: 10px;
`

export const DictionaryTextInput = styled(CustomTextInput).attrs({
  autoCapitalize: 'characters',
  maxLength: 15,
})``

export const DictionaryStatusBar = styled.StatusBar.attrs({
  backgroundColor: COLOR.DODGER_BLUE,
})``
