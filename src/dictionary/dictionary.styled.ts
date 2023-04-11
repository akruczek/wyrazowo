import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../core/colors/colors.constants'
import { CustomTextInput } from '../core/custom-text-input/custom-text-input'
import { FocusAwareStatusBar } from '../core/focus-aware-status-bar/focus-aware-status-bar'

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
  placeholder: 'Search for word...',
})``

export const DictionaryStatusBar = styled(FocusAwareStatusBar).attrs({
  backgroundColor: COLOR.DODGER_BLUE,
  animated: true,
  barStyle: 'light-content',
})``
