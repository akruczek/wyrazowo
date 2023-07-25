import * as React from 'react'
import { LayoutAnimation } from 'react-native'
import { Tx } from '@core/tx'
import {
  CustomCheckboxBox, CustomCheckboxCheckmarkIcon, CustomCheckboxTouchableWrapper,
} from './custom-checkbox.styled'

interface Props {
  defaultValue?: boolean;
  label?: string;
  onChange?: (value: boolean) => void;
}

export const CustomCheckbox = ({ defaultValue, label, onChange }: Props) => {
  const [ value, setValue ] = React.useState<boolean>(defaultValue ?? false)

  const handleChange = () => {
    LayoutAnimation.easeInEaseOut()
    setValue(!value)
    onChange?.(!value)
  }

  return (
    <CustomCheckboxTouchableWrapper onPress={handleChange} value={value}>
      <CustomCheckboxBox value={value}>
        {value ? <CustomCheckboxCheckmarkIcon name="check-bold" value={value} /> : null}
      </CustomCheckboxBox>

      <Tx ok={value} tx={label} bolder />
    </CustomCheckboxTouchableWrapper>
  )
}
