import * as React from 'react'
import { Switch } from 'react-native-paper'
import { ViewProps } from 'react-native'
import { COLOR } from '../colors/colors.constants'
import { CustomSwitchContainer } from './custom-switch.styled'

interface Props {
  defaultValue: boolean;
  onValueChange: (value: boolean) => void;
}

export const CustomSwitch = ({ defaultValue, onValueChange }: Props) => {
  const [ value, setValue ] = React.useState(defaultValue)

  const _onValueChange = React.useCallback((newValue: boolean) => {
    setValue(newValue)
    onValueChange(newValue)
  }, [])

  return (
    <CustomSwitchContainer>
      <Switch color={COLOR.GOLD} value={value} onValueChange={_onValueChange} />
    </CustomSwitchContainer>
  )
}
