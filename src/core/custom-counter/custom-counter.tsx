import * as React from 'react'
import {
  CustomCounterButtonContainer, CustomCounterContainer, CustomCounterLabel,
  CustomCounterLabelIconContainer, CustomCounterMinusIcon, CustomCounterPlusIcon,
  CustomCounterText, CustomCounterTextContainer,
} from './custom-counter.styled'

interface Props {
  value: number;
  setValue: (value: number) => void;
}

export const CustomCounter = ({ value, setValue }: Props) => {
  const handleDecrement = () => {
    setValue(value - 1)
  }

  const handleIncrement = () => {
    setValue(value + 1)
  }

  return (
    <>
      <CustomCounterLabelIconContainer>
        <CustomCounterLabel />
      </CustomCounterLabelIconContainer>

      <CustomCounterContainer>
        <CustomCounterButtonContainer onPress={handleDecrement}>
          <CustomCounterMinusIcon />
        </CustomCounterButtonContainer>

        <CustomCounterTextContainer>
          <CustomCounterText children={value} />
        </CustomCounterTextContainer>

        <CustomCounterButtonContainer onPress={handleIncrement}>
          <CustomCounterPlusIcon />
        </CustomCounterButtonContainer>
      </CustomCounterContainer>
    </>
  )
}
