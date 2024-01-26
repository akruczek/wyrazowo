import * as React from 'react'
import { Tx } from '@core/tx'
import { Localization } from '@core/localize/localize.models'
import { COLOR } from '../colors/colors.constants'
import { useHapticFeedback } from '../hooks/use-haptic-feedback.hook'
import { CustomButtonContainer } from './custom-button.styled'

interface Props {
  tx?: string | number;
  local?: keyof typeof Localization;
  testID?: string;
  minHeight?: number;
  children?: any;
  invisible?: boolean;
  color?: COLOR;
  withHaptic?: boolean;
  onPress: (args?: any) => void;
}

export const CustomButton = ({
  tx, local, testID, minHeight, children, invisible, color, withHaptic, onPress,
}: Props) => {
  const { triggerHaptic } = useHapticFeedback()

  const handlePress = invisible ? undefined : () => {
    if (withHaptic) {
      triggerHaptic()
    }

    onPress()
  }

  return (
    <CustomButtonContainer onPress={handlePress} {...{ invisible, testID, color, minHeight }}>
      {tx || local ? <Tx {...{ tx, local }} white bold /> : children ?? null}
    </CustomButtonContainer>
  )
}
