import * as React from 'react'
import { Tx } from '@core/tx'
import { testID } from '@core/localize/testID'
import { Localization } from '@core/localize/localize.models'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import {
  CustomCounterButtonContainer, CustomCounterContainer,
  CustomCounterMinusIcon, CustomCounterPlusIcon, CustomCounterTextContainer,
} from './custom-counter.styled'

interface Props {
  value: number;
  local?: keyof typeof Localization,
  colorBreakpoints?: [ number, number, number ];
  range: [ number, number ];
  setValue: (value: number) => void;
}

export const CustomCounter = ({ value, local, colorBreakpoints, range, setValue }: Props) => {
  const RTL = useRTL()

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
      <Tx local={local} disabled bolder center />

      <CustomCounterContainer RTL={RTL}>
        <CustomCounterButtonContainer
          disabled={value === range[0]}
          onPress={handleDecrement}
          testID={testID('counter', [ 'minus' ])}
          {...colorProps}
        >
          <CustomCounterMinusIcon name="minus" {...colorProps} />
        </CustomCounterButtonContainer>

        <CustomCounterTextContainer>
          <Tx
            tx={value}
            testID={testID('counter', [ 'value' ])}
            {...colorProps}
          />
        </CustomCounterTextContainer>

        <CustomCounterButtonContainer
          disabled={value === range[1]}
          onPress={handleIncrement}
          testID={testID('counter', [ 'plus' ])}
          {...colorProps}
        >
          <CustomCounterPlusIcon name="plus" {...colorProps} />
        </CustomCounterButtonContainer>
      </CustomCounterContainer>
    </>
  )
}
