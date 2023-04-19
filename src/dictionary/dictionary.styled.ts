import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { CustomTextInput } from '@core/custom-text-input/custom-text-input'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'

export const DictionaryTextInput = styled(CustomTextInput).attrs({
  autoCapitalize: 'characters',
  maxLength: 15,
})``

export const DictionaryStatusBar = styled(FocusAwareStatusBar).attrs({
  backgroundColor: COLOR.DODGER_BLUE,
  animated: true,
  barStyle: 'light-content',
})``
