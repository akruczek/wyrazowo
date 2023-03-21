import * as React from 'react'
import { COLOR } from '../colors/colors.constants'
import { genericShadow } from '../shadow/shadow.constants'
import { TEXT_SIZE } from '../text/text.constants'
import { CustomButtonContainer, CustomButtonTitle } from './custom-button.styled'

interface Props {
  title?: string;
  children?: any;
  titleSize?: TEXT_SIZE;
  invisible?: boolean;
  color?: COLOR;
  onPress: () => void;
}

export const CustomButton = ({ title, children, titleSize, invisible, color, onPress }: Props) => {
  return (
    <CustomButtonContainer
      style={genericShadow}
      onPress={invisible ? undefined : onPress}
      {...{ invisible, color }}
    >
      {title ? (
        <CustomButtonTitle titleSize={titleSize} children={title} />
      ) : children ?? null}
    </CustomButtonContainer>
  )
}
