import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CustomTextInput } from '@core/custom-text-input/custom-text-input'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { getThemeProp } from '@core/styled/theme'
import { ThemeModel } from '@core/styled/models'

export const DictionarlyContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    height: '100%',
  },
})`
  flex: 1;
`

export const DictionarlyTextInputWrapper = styled.View`
  margin-bottom: 20px;
  margin-top: 5px;
`

export const DictionarlyTextInput = styled(CustomTextInput).attrs({
  autoCapitalize: 'characters',
  maxLength: 15,
})``

interface DictionarlyTextProps {
  isOK?: boolean;
}

const getDictionarlyTextColor = R.ifElse(
  R.propSatisfies(Boolean, 'isOK'),
  R.always(COLOR.DARK_SEA_GREEN),
  getThemeProp('textSecondary')
)

export const DictionarlyText = styled.Text<DictionarlyTextProps & ThemeProps<ThemeModel>>`
  font-size: ${TEXT_SIZE.XL}px;
  color: ${getDictionarlyTextColor};
  margin-left: 10px;
`

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
  behavior: 'padding',
})`
  flex: 1;
`
