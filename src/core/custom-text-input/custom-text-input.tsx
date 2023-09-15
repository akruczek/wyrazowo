import * as React from 'react'
import { KeyboardType, ReturnKeyType, View } from 'react-native'
import { Tx } from '@core/tx'
import { CustomTextInputStyled } from './custom-text-input.styled'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'

interface Props {
  state?: boolean | null;
  value: string;
  maxLength?: number;
  placeholder?: string;
  children?: any;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  returnKeyLabel?: string;
  errorMessage?: string;
  blurOnSubmit?: boolean;
  disabled?: boolean;
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words';
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

export const CustomTextInput = ({
  value, state, maxLength, autoCapitalize, placeholder, returnKeyType, returnKeyLabel,
  errorMessage, keyboardType, children, blurOnSubmit, disabled,
  onChange, onSubmit,
}: Props) => {
  const RTL = useRTL()

  return (
    <View>
      <CustomTextInputStyled
        editable={!disabled}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        {...{
          maxLength, value, state,autoCapitalize, placeholder, keyboardType,
          returnKeyType, returnKeyLabel, blurOnSubmit, RTL
        }}
      />
      {children ?? null}
      {(state === false && errorMessage) ? <Tx tx={errorMessage} absolute={[ null, null, -10, 10 ]} XS error /> : null}
    </View>
  )
}
