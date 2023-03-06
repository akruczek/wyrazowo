import * as React from 'react'
import { genericShadow } from '../shadow/shadow.constants'
import { TEXT_SIZE } from '../text/text.constants'
import { CustomButtonContainer, CustomButtonTitle } from './custom-button.styled'

interface Props {
  title?: string;
  children?: any;
  titleSize?: TEXT_SIZE;
  onPress: () => void;
}

export const CustomButton = ({ title, children, titleSize, onPress }: Props) => {
  return (
    <CustomButtonContainer style={genericShadow} onPress={onPress}>
      {title ? (
        <CustomButtonTitle titleSize={titleSize} children={title} />
      ) : children ?? null}
    </CustomButtonContainer>
  )
}
