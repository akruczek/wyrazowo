import * as React from 'react'
import {
  CustomCounterButtonContainer, CustomCounterContainer, CustomCounterLabel,
  CustomCounterLabelIconContainer, CustomCounterMinusIcon, CustomCounterPlusIcon,
  CustomCounterText, CustomCounterTextContainer,
} from './custom-counter.styled'

interface Props {
  value: number;
  range: [ number, number ];
  setValue: (value: number) => void;
}

export const CustomCounter = ({ value, range, setValue }: Props) => {
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

  return (
    <>
      <CustomCounterLabelIconContainer>
        <CustomCounterLabel />
      </CustomCounterLabelIconContainer>

      <CustomCounterContainer>
        <CustomCounterButtonContainer disabled={value === range[0]} onPress={handleDecrement}>
          <CustomCounterMinusIcon />
        </CustomCounterButtonContainer>

        <CustomCounterTextContainer>
          <CustomCounterText children={value} />
        </CustomCounterTextContainer>

        <CustomCounterButtonContainer disabled={value === range[1]} onPress={handleIncrement}>
          <CustomCounterPlusIcon />
        </CustomCounterButtonContainer>
      </CustomCounterContainer>
    </>
  )
}