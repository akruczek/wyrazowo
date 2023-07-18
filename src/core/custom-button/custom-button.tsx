import * as React from 'react'
import { COLOR } from '../colors/colors.constants'
import { useHapticFeedback } from '../hooks/use-haptic-feedback.hook'
import { genericShadow } from '../shadow/shadow.constants'
import { TEXT_SIZE } from '../text/text.constants'
import { CustomButtonContainer, CustomButtonTitle } from './custom-button.styled'

interface Props {
  title?: string;
  minHeight?: number;
  children?: any;
  titleSize?: TEXT_SIZE;
  invisible?: boolean;
  color?: COLOR;
  withHaptic?: boolean;
  onPress: (args?: any) => void;
}

export const CustomButton = ({
  title, minHeight, children, titleSize, invisible, color, withHaptic, onPress,
}: Props) => {
  const { triggerHaptic } = useHapticFeedback()

  const handlePress = invisible ? undefined : () => {
    if (withHaptic) {
      triggerHaptic()
    }

    onPress()
  }

  return (
    <CustomButtonContainer
      style={genericShadow}
      onPress={handlePress}
      {...{ invisible, color, minHeight }}
    >
      {title ? (
        <CustomButtonTitle titleSize={titleSize} children={title} />
      ) : children ?? null}
    </CustomButtonContainer>
  )
}
