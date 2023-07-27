import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { COLOR } from '@core/colors/colors.constants'
import { MultiToggle } from '@core/multi-toggle/multi-toggle'
import { CustomSwitch } from '@core/custom-switch/custom-switch'
import { noop } from '@core/noop/noop'
import { Localization } from '@core/localize/localize.models'
import { ListedOption } from '../listed-option/listed-option'
import { OptionItemImage, OptionItemTouchableOpacity } from './option-item.styled'

interface Props {
  local?: keyof typeof Localization;
  tx?: string | number;
  suffix?: string | number;
  onChange?: (newValue: any) => void;
  handleDeactivatePremium?: () => void;
  value?: any;
  values?: any[];
  labels?: any[];
  icon?: string;
  imageUrl?: string;
  iconColor?: COLOR;
  hidden?: boolean;
  withPadding?: boolean;
}

export const OptionItem = ({
  local, tx, suffix, value, values, labels, imageUrl, hidden, withPadding, icon, iconColor,
  onChange, handleDeactivatePremium,
}: Props) => {
  const theme = useTheme() as ThemeModel

  if (hidden) return null

  if (values !== undefined) {
    return (
      <ListedOption {...{ local, tx, suffix, withPadding }} staticHeight>
        <MultiToggle
          values={values}
          value={value}
          labels={labels}
          onChange={onChange}
        />
      </ListedOption>
    )
  }

  if (value !== undefined) {
    return (
      <ListedOption {...{ local, tx, suffix, withPadding }} staticHeight>
        <CustomSwitch defaultValue={value} onValueChange={onChange ?? noop} />
      </ListedOption>
    )
  }

  return (
    <ListedOption {...{ local, tx, suffix, withPadding }} staticHeight>
      <OptionItemTouchableOpacity onPress={onChange} onLongPress={handleDeactivatePremium}>
        {imageUrl ? (
          <OptionItemImage source={{ uri: imageUrl }} />
        ) : (
          <MaterialCommunityIcons name={icon ?? 'help'} color={iconColor ?? theme.textPrimary} size={28} />
        )}
      </OptionItemTouchableOpacity>
    </ListedOption>
  )
}
