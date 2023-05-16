import * as React from 'react'
import { KeyboardType, ReturnKeyType, View } from 'react-native'
import { CustomTextInputErrorText, CustomTextInputStyled } from './custom-text-input.styled'

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
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words';
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

export const CustomTextInput = ({
  value, state, maxLength, autoCapitalize, placeholder, returnKeyType, returnKeyLabel,
  errorMessage, keyboardType, children,
  onChange, onSubmit,
}: Props) => {
  return (
    <View>
      <CustomTextInputStyled
        maxLength={maxLength}
        value={value}
        state={state}
        onChangeText={onChange}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        onSubmitEditing={onSubmit}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
      />
      {children ?? null}
      {(state === false && errorMessage) ? <CustomTextInputErrorText children={errorMessage} /> : null}
    </View>
  )
}
