import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { COLOR } from '@core/colors/colors.constants'
import { MultiToggle } from '@core/multi-toggle/multi-toggle'
import { CustomSwitch } from '@core/custom-switch/custom-switch'
import { noop } from '@core/noop/noop'
import { ListedOption } from '../listed-option/listed-option'
import { OptionItemImage, OptionItemTouchableOpacity } from './option-item.styled'

interface Props {
  title: string;
  onChange?: (newValue: any) => void;
  handleDeactivatePremium?: () => void;
  value?: any;
  values?: any[];
  labels?: any[];
  icon?: string;
  imageUrl?: string;
  iconColor?: COLOR;
  hidden?: boolean;
}

export const OptionItem = ({
  title, value, values, labels, imageUrl, hidden, icon, iconColor, onChange, handleDeactivatePremium,
}: Props) => {
  const theme = useTheme() as ThemeModel

  if (hidden) return null

  if (values !== undefined) {
    return (
      <ListedOption title={title}>
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
      <ListedOption title={title}>
        <CustomSwitch defaultValue={value} onValueChange={onChange ?? noop} />
      </ListedOption>
    )
  }

  return (
    <ListedOption title={title}>
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
