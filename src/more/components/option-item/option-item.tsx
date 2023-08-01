import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { COLOR } from '@core/colors/colors.constants'
import { CustomSwitch } from '@core/custom-switch/custom-switch'
import { noop } from '@core/noop/noop'
import { Localization } from '@core/localize/localize.models'
import { Tx } from '@core/tx'
import { ListedOption } from '../listed-option/listed-option'
import { OptionItemImage } from './option-item.styled'

interface Props {
  local?: keyof typeof Localization;
  tx?: string | number;
  suffix?: string | number;
  onChange?: () => void;
  handleDeactivatePremium?: () => void;
  value?: any;
  icon?: string;
  emoji?: string;
  imageUrl?: string;
  iconColor?: COLOR;
  hidden?: boolean;
  withPadding?: boolean;
  uppercase?: boolean;
}

export const OptionItem = ({
  local, tx, suffix, value, imageUrl, hidden, withPadding, icon, emoji, iconColor, uppercase,
  onChange, handleDeactivatePremium,
}: Props) => {
  const theme = useTheme() as ThemeModel

  if (hidden) return null

  if (value !== undefined) {
    return (
      <ListedOption {...{ local, tx, suffix, withPadding, uppercase }} staticHeight>
        <CustomSwitch defaultValue={value} onValueChange={onChange ?? noop} />
      </ListedOption>
    )
  }

  return (
    <ListedOption
      onPress={onChange}
      onLongPress={handleDeactivatePremium}
      {...{ local, tx, suffix, withPadding, uppercase }}
      staticHeight
    >
      {imageUrl ? (
        <OptionItemImage source={{ uri: imageUrl }} />
      ) : (
        emoji ? (
          <Tx tx={emoji} XL />
        ) : icon ? (
          <MaterialCommunityIcons name={icon} color={iconColor ?? theme.textPrimary} size={28} />
        ) : null
      )}
    </ListedOption>
  )
}
