import * as React from 'react'
import { TEXT_SIZE } from '@core/text/text.constants'
import { ListedOptionContainer, ListedOptionHeadline } from './listed-option.styled'
import { COLOR } from '@core/colors/colors.constants'

interface Props {
  title: string;
  withPadding?: boolean;
  titleSize?: TEXT_SIZE;
  titleColor?: COLOR;
  children?: JSX.Element;
}

export const ListedOption = ({ title, withPadding, titleSize, titleColor, children }: Props) => (
  <ListedOptionContainer withPadding={withPadding}>
    <ListedOptionHeadline titleSize={titleSize} titleColor={titleColor} children={title} />
    {children}
  </ListedOptionContainer>
)
