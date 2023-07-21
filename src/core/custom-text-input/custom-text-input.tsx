import * as React from 'react'
import { KeyboardType, ReturnKeyType, View } from 'react-native'
import { Tx } from '@core/tx'
import { CustomTextInputStyled } from './custom-text-input.styled'

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
  return (
    <View>
      <CustomTextInputStyled
        maxLength={maxLength}
        value={value}
        state={state}
        editable={!disabled}
        onChangeText={onChange}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        onSubmitEditing={onSubmit}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        blurOnSubmit={blurOnSubmit}
      />
      {children ?? null}
      {(state === false && errorMessage) ? <Tx tx={errorMessage} absolute={[ null, null, -10, 10 ]} XS error /> : null}
    </View>
  )
}
