import * as React from 'react'
import { ListedOptionContainer } from './listed-option.styled'
import { Tx } from '@core/tx'

interface Props {
  title: string;
  withPadding?: boolean;
  children?: JSX.Element;
  XS?: boolean;
  error?: boolean;
  ok?: boolean;
  link?: boolean;
}

export const ListedOption = ({ title, withPadding, XS, error, ok, link, children }: Props) => (
  <ListedOptionContainer withPadding={withPadding}>
    <Tx tx={title} {...{ XS, error, ok, link }} bolder />
    {children}
  </ListedOptionContainer>
)
