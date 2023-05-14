import * as React from 'react'
import { COLOR } from '@core/colors/colors.constants'
import { SwitchButtonContainer, SwitchButtonContent, SwitchButtonsContainer } from './switch-button.styled'

interface Props {
  value: number;
  labels: string[];
  colors?: COLOR[];
  onChange: (newValue: number) => void;
}

export const SwitchButton = ({ value, labels, colors, onChange }: Props) => {
  const isActive = (index: number) => index === value
  const _onChange = (index: number) => () => onChange(index)

  return (
    <SwitchButtonsContainer>
      {labels.map((label: string, index: number) => (
        <SwitchButtonContainer
          color={colors?.[index]}
          onPress={_onChange(index)}
          isActive={isActive(index)}
          key={label}
        >
          <SwitchButtonContent isActive={isActive(index)} children={label} />
        </SwitchButtonContainer>
      ))}
    </SwitchButtonsContainer>
  )
}
