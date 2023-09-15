import * as React from 'react'
import { LayoutAnimation } from 'react-native'
import { Tx } from '@core/tx'
import { Localization } from '@core/localize/localize.models'
import {
  CustomCheckboxBox, CustomCheckboxCheckmarkIcon, CustomCheckboxTouchableWrapper,
} from './custom-checkbox.styled'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'

interface Props {
  defaultValue?: boolean;
  local?: keyof typeof Localization;
  onChange?: (value: boolean) => void;
}

export const CustomCheckbox = ({ defaultValue, local, onChange }: Props) => {
  const RTL = useRTL()

  const [ value, setValue ] = React.useState<boolean>(defaultValue ?? false)

  const handleChange = () => {
    LayoutAnimation.easeInEaseOut()
    setValue(!value)
    onChange?.(!value)
  }

  return (
    <CustomCheckboxTouchableWrapper onPress={handleChange} {...{ value, RTL }}>
      <CustomCheckboxBox value={value}>
        {value ? <CustomCheckboxCheckmarkIcon name="check-bold" value={value} /> : null}
      </CustomCheckboxBox>

      <Tx local={local} spacings="0 0 0 S" disabled bolder />
    </CustomCheckboxTouchableWrapper>
  )
}
