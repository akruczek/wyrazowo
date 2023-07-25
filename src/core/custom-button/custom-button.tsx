import * as React from 'react'
import { Tx } from '@core/tx'
import { COLOR } from '../colors/colors.constants'
import { useHapticFeedback } from '../hooks/use-haptic-feedback.hook'
import { genericShadow } from '../shadow/shadow.constants'
import { CustomButtonContainer } from './custom-button.styled'

interface Props {
  title?: string;
  minHeight?: number;
  children?: any;
  invisible?: boolean;
  color?: COLOR;
  withHaptic?: boolean;
  onPress: (args?: any) => void;
}

export const CustomButton = ({
  title, minHeight, children, invisible, color, withHaptic, onPress,
}: Props) => {
  const { triggerHaptic } = useHapticFeedback()

  const handlePress = invisible ? undefined : () => {
    if (withHaptic) {
      triggerHaptic()
    }

    onPress()
  }

  return (
    <CustomButtonContainer onPress={handlePress} {...{ invisible, color, minHeight }}>
      {title ? <Tx tx={title} white bold /> : children ?? null}
    </CustomButtonContainer>
  )
}
