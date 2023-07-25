import * as React from 'react'
import { Tx } from '@core/tx'
import {
  CustomCounterButtonContainer, CustomCounterContainer, CustomCounterLabelIconContainer,
  CustomCounterMinusIcon, CustomCounterPlusIcon, CustomCounterTextContainer,
} from './custom-counter.styled'

interface Props {
  value: number;
  label?: string,
  colorBreakpoints?: [ number, number, number ];
  range: [ number, number ];
  setValue: (value: number) => void;
}

export const CustomCounter = ({ value, label, colorBreakpoints, range, setValue }: Props) => {
  const handleDecrement = () => {
    if (value > range[0]) {
      setValue(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < range[1]) {
      setValue(value + 1)
    }
  }

  const colorProps = {
    ok: colorBreakpoints && value <= colorBreakpoints[0],
    link: colorBreakpoints && value > colorBreakpoints[0] && value <= colorBreakpoints[1],
    warning: colorBreakpoints && value > colorBreakpoints[1] && value <= colorBreakpoints[2],
    error: colorBreakpoints && value > colorBreakpoints[2],
  }

  return (
    <>
      <CustomCounterLabelIconContainer>
        <Tx tx={label} bolder />
      </CustomCounterLabelIconContainer>

      <CustomCounterContainer>
        <CustomCounterButtonContainer disabled={value === range[0]} onPress={handleDecrement} {...colorProps}>
          <CustomCounterMinusIcon name="minus" {...colorProps} />
        </CustomCounterButtonContainer>

        <CustomCounterTextContainer>
          <Tx tx={value} {...colorProps} />
        </CustomCounterTextContainer>

        <CustomCounterButtonContainer disabled={value === range[1]} onPress={handleIncrement} {...colorProps}>
          <CustomCounterPlusIcon name="plus" {...colorProps} />
        </CustomCounterButtonContainer>
      </CustomCounterContainer>
    </>
  )
}
