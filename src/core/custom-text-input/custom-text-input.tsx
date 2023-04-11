import * as React from 'react'
import { CustomTextInputStyled } from './custom-text-input.styled'

interface Props {
  state?: boolean | null;
  value: string;
  maxLength?: number;
  placeholder?: string;
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words';
  onChange: (value: string) => void;
}

export const CustomTextInput = ({ value, state, maxLength, autoCapitalize, placeholder, onChange }: Props) => {
  return (
    <CustomTextInputStyled
      maxLength={maxLength}
      value={value}
      state={state}
      onChangeText={onChange}
      autoCapitalize={autoCapitalize}
      placeholder={placeholder}
    />
  )
}
