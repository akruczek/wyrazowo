import * as React from 'react'
import * as R from 'ramda'
import { MultiToggleContainer, MultiToggleValue } from './multi-toggle.styled'

interface Props {
  values: string[];
  value: string;
  labels?: string[];
  onChange?: (newValue: string) => void;
}

export const MultiToggle = ({ value, values, labels, onChange }: Props) => {
  const selectedIndex = R.findIndex(R.equals(value))(values)

  const onPress = () => {
    onChange?.(values[selectedIndex + 1] ?? values[0])
  }

  return (
    <MultiToggleContainer onPress={onPress}>
      <MultiToggleValue children={labels?.[selectedIndex] ?? value} />
    </MultiToggleContainer>
  )
}
