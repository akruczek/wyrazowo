import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { COLOR } from '@core/colors/colors.constants'
import { CustomSwitch } from '@core/custom-switch/custom-switch'
import { noop } from '@core/noop/noop'
import { Localization } from '@core/localize/localize.models'
import { Tx } from '@core/tx'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import { TestView } from '@core/test-view/test-view'
import { ListedOption } from '../listed-option/listed-option'
import { OptionItemImage } from './option-item.styled'
import { getTestID } from '../../../../e2e/helpers/get-test-id.helper'

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
  const RTL = useRTL()
  const theme = useTheme() as ThemeModel

  if (hidden) return null

  if (value !== undefined) {
    return (
      <ListedOption
        {...{ local, tx, suffix, withPadding, uppercase }}
        testID={getTestID("more_option", [ local ])}
        staticHeight
      >
        <CustomSwitch defaultValue={value} onValueChange={onChange ?? noop} />
      </ListedOption>
    )
  }

  return (
    <ListedOption
      onPress={onChange}
      onLongPress={handleDeactivatePremium}
      testID={getTestID("more_option", [ local ])}
      {...{ local, tx, suffix, withPadding, uppercase, RTL }}
      staticHeight
    >
      {imageUrl ? (
        <OptionItemImage source={{ uri: imageUrl }} />
      ) : (
        emoji ? (
          <Tx tx={emoji} XL />
        ) : icon ? (
          <TestView t={getTestID("more_option", [ local, "icon", iconColor ?? theme.textPrimary ])}>
            <MaterialCommunityIcons name={icon} color={iconColor ?? theme.textPrimary} size={28} />
          </TestView>
        ) : null
      )}
    </ListedOption>
  )
}
