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
  staticHeight?: boolean;
}

export const ListedOption = ({ title, withPadding, XS, error, ok, link, staticHeight, children }: Props) => (
  <ListedOptionContainer {...{ withPadding, staticHeight }}>
    <Tx tx={title} {...{ XS, error, ok, link }} bolder />
    {children}
  </ListedOptionContainer>
)
