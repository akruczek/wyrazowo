import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CustomTextInput } from '@core/custom-text-input/custom-text-input'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { isPlatform } from '@core/is-platform/is-platform'
import { SPACING } from '@core/styled'

export const DictionarlyContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    height: '100%',
  },
})`
  flex: 1;
`

export const DictionarlyTextInputWrapper = styled.View`
  margin: ${SPACING.XXS}px 0 ${SPACING.L}px;
`

export const DictionarlyTextInput = styled(CustomTextInput).attrs({
  autoCapitalize: 'characters',
  maxLength: 15,
})``

export const DictionarlySendButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 20,
    right: 10,
    bottom: 20,
    left: 20,
  },
})`
  position: absolute;
  right: 10px;
  bottom: 20px;
`

export const DictionarlySendButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'send',
  color: COLOR.DODGER_BLUE,
  size: TEXT_SIZE.XXXL,
})``

export const DictionarlyKeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: isPlatform('ios') ? 'padding' : 'height',
})`
  flex: 1;
`
