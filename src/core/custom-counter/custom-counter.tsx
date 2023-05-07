import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import {
  CustomCounterButtonContainer, CustomCounterContainer,
  CustomCounterLabelIconContainer, CustomCounterText, CustomCounterTextContainer,
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
        <MaterialCommunityIcons name="format-letter-spacing" color={COLOR.BLACK} size={TEXT_SIZE.L} />
      </CustomCounterLabelIconContainer>

      <CustomCounterContainer>
        <CustomCounterButtonContainer onPress={handleDecrement}>
          <MaterialCommunityIcons name="minus" color={COLOR.BLACK} size={TEXT_SIZE.XXL} />
        </CustomCounterButtonContainer>

        <CustomCounterTextContainer>
          <CustomCounterText children={value} />
        </CustomCounterTextContainer>

        <CustomCounterButtonContainer onPress={handleIncrement}>
          <MaterialCommunityIcons name="plus" color={COLOR.BLACK} size={TEXT_SIZE.XXL} />
        </CustomCounterButtonContainer>
      </CustomCounterContainer>
    </>
  )
}
