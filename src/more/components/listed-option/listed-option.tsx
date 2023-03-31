import * as React from 'react'
import { TEXT_SIZE } from '../../../core/text/text.constants'
import { ListedOptionContainer, ListedOptionHeadline } from './listed-option.styled'

interface Props {
  title: string;
  titleSize?: TEXT_SIZE;
  children?: JSX.Element;
}

export const ListedOption = ({ title, titleSize, children }: Props) => {
  return (
    <ListedOptionContainer>
      <ListedOptionHeadline titleSize={titleSize} children={title} />

      {children}
    </ListedOptionContainer>
  )
}
